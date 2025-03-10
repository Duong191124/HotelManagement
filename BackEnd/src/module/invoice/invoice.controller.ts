import { Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('invoice')
@ApiBearerAuth()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':bookingId/generate-invoice/:userId')
  async generateInvoice(
    @Param('bookingId') bookingId: number,
    @Param('userId') userId: number
  ) {
    return this.invoiceService.generateInvoice(bookingId, userId);
  }
}
