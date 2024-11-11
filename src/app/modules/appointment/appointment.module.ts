import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppointmentService } from '@app/modules/appointment/services/appointment.service';
import { AppointmentController } from '@app/modules/appointment/controllers/appointment.controller';

@Module({
  imports: [HttpModule],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule  {}