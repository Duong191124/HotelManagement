import { Inject, Injectable } from '@nestjs/common';
import { InvoiceEntity } from 'src/common/shared/entities/invoice.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { BookingEntity } from 'src/common/shared/entities/booking.entity';
import { UserEntity } from 'src/common/shared/entities/user.entity';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';

@Injectable()
export class InvoiceService {
    constructor(
        @Inject('INVOICE_REPOSITORY')
        private readonly invoiceRepository: Repository<InvoiceEntity>,
        @Inject('BOOKING_REPOSITORY')
        private readonly bookingRepository: Repository<BookingEntity>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>,
        private readonly mailService: EmailService
    ) { }

    async generateInvoice(bookId: number, userId: number) {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookId },
            relations: ['room']
        });
        const user = await this.userRepository.findOne({
            where: { id: userId }
        })
        if (!booking || !user) {
            throw new CustomizeException('Can found booking', 400);
        }
        console.log(user.email);
        const invoice = new InvoiceEntity();
        invoice.invoice_number = `INV-${Math.floor(10000 + Math.random() * 90000)}`;
        invoice.issue_date = booking.check_in_date;
        invoice.due_date = booking.check_out_date;
        invoice.total_amount = booking.total_price;
        invoice.final_amount = booking.total_price;
        invoice.booking = booking;
        invoice.user = user;
        const newInvoice = this.invoiceRepository.create(invoice);
        await this.invoiceRepository.save(newInvoice);
        const newEmail = {
            email: user.email,
            subject: "Thank you for choosing our hotel for your stay",
            html: `
                <div>
                    <p>Thank you for choosing our hotel for your stay. We are pleased to inform you that your invoice has been generated. Below are the details:</p>
    
    <h3>Invoice Details:</h3>
    <ul>
        <li><strong>Invoice Number:</strong> ${invoice.invoice_number}</li>
        <li><strong>Issue Date:</strong> ${invoice.issue_date}</li>
        <li><strong>Due Date:</strong> ${invoice.due_date}</li>
        <li><strong>Total Amount:</strong> ${invoice.total_amount}</li>
        <li><strong>Final Amount (after discounts, if any):</strong> ${invoice.final_amount}</li>
    </ul>
    
    <h3>Booking Details:</h3>
    <table>
        <tr>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Total Price</th>
            <th>Payment Status</th>
        </tr>
        <tr>
            <td>${booking.check_in_date}</td>
            <td>${booking.check_out_date}</td>
            <td>${booking.room.room_number}</td>
            <td>${booking.room.room_type}</td>
            <td>${booking.total_price}</td>
            <td>${booking.payment_status}</td>
        </tr>
    </table>
    
    <p>If you have any questions regarding your invoice or need further assistance, please feel free to contact our front desk at <a href="mailto:[Hotel Contact Email]">[Hotel Contact Email]</a> or call us at [Hotel Contact Number].</p>
    
    <p>We appreciate your business and look forward to serving you again.</p>
    
    <p><strong>Best Regards,</strong></p>
    <p>[Hotel Name]<br>
    [Hotel Contact Information]<br>
    <a href="[Hotel Website]">[Hotel Website]</a></p>
                </div>
            `
        }
        await this.mailService.sendEmail(newEmail);
        return "send email successfully"
    }
}
