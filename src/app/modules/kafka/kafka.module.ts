import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KafkaService } from './services/kafka.service';

@Module({
  imports: [HttpModule],
  providers: [KafkaService],
})
export class KafkaModule {}