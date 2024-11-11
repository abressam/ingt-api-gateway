import { Injectable, Inject } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { KafkaServiceInterface } from './kafka.service.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements KafkaServiceInterface {
  private consumer: Consumer;

  constructor(
    private readonly httpService: HttpService,
  ) {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
      logLevel: 0,
    });
    this.consumer = kafka.consumer({ groupId: 'api-gateway-consumer' });
  }

  async listenToMessages(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'api-gateway-consumer', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Mensagem recebida do Kafka no tópico ${topic}:`, message.value.toString());

        const {
          url,
          method,
          body,
          headers
        } = JSON.parse(message.value.toString());

        if(method === 'post') {
          console.log(await lastValueFrom(this.httpService.post(url, body, { headers })));
        }
      },
    });
  }
}