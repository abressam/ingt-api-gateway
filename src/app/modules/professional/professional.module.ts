import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProfessionalService } from '@app/modules/professional/services/professional.service';
import { ProfessionalController } from '@app/modules/professional/controllers/professional.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        logLevel: 0,
      },
      consumer: {
        groupId: 'api-gateway-consumer'
      }
    }
  }]),
  HttpModule
],
  providers: [ProfessionalService],
  controllers: [ProfessionalController],
})
export class ProfessionalModule  {}