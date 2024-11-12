import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from 'kafkajs';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosHeaders } from 'axios';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'], // Endereço do broker Kafka
  });

  private readonly consumers: Consumer[] = [];

  constructor(private readonly httpService: HttpService) {}

  // Método para iniciar o consumo das mensagens
  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    // Especifica o groupId do consumidor
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });

    // Conectar o consumidor ao Kafka
    await consumer.connect();

    // Inscreve o consumidor no tópico
    await consumer.subscribe(topics);

    // Configuração para o consumo das mensagens
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Mensagem recebida: ${message.value.toString()}`);
        // Processar a mensagem aqui
        try {
          const messageData = JSON.parse(message.value.toString());
          await this.processMessage(messageData);
        } catch (error) {
          console.error('Erro ao processar a mensagem:', error);
        }
      },
    });

    // Armazena o consumidor em um array para gerenciar desconexões
    this.consumers.push(consumer);
  }

  // Método de processamento das mensagens
  async processMessage(message: any) {
    console.log('Processando mensagem:', message);

    // Extrai os dados da mensagem
    const { url, method, headers } = message;

    try {
      // Envia a requisição PATCH com as informações da mensagem
      const response = await this.sendRequest(url, method, headers);
      console.log('Resposta da requisição:', response);
    } catch (error) {
      console.error('Erro ao processar requisição:', error);
    }
  }

  private async sendRequest(url: string, method: string, headers: AxiosHeaders) {
    // Envia uma requisição PATCH
    const response = await lastValueFrom(
      this.httpService.request({
        url,
        method,
        headers,
      })
    );
    return response.data;
  }

  // Método de shutdown para desconectar os consumidores corretamente
  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
