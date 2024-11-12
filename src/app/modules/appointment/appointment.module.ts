import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppointmentService } from '@app/modules/appointment/services/appointment.service';
import { AppointmentController } from '@app/modules/appointment/controllers/appointment.controller';
import { ProducerService } from '@app/modules/kafka/services/producer.service';
import { ConsumerService } from '@app/modules/kafka/services/consumer.service';

@Module({
  imports: [HttpModule],
  providers: [AppointmentService, ProducerService, ConsumerService],
  controllers: [AppointmentController],
  exports: [AppointmentService, ProducerService, ConsumerService]
})
export class AppointmentModule {}