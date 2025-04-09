import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { EmailService } from '../email/email.service';
import { invoiceProvider } from 'src/common/repository/invoice.provider';
import { bookingProvider } from 'src/common/repository/booking.provider';
import { userProvider } from 'src/common/repository/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    EmailService,
    ...invoiceProvider,
    ...bookingProvider,
    ...userProvider
  ],
  exports: [InvoiceService]
})
export class InvoiceModule { }
