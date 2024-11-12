import { Controller, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './services/consumer.service';

@Controller()
export class KafkaConsumerController implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    // Inicia o consumo das mensagens do tópico 'meu-teste'
    await this.consumerService.consume(
      { topics: ['meu-teste'], fromBeginning: true },
      { eachMessage: async ({ topic, partition, message }) => {
          console.log(`Mensagem recebida no tópico ${topic}: ${message.value.toString()}`);
        },
      },
    );
  }
}
