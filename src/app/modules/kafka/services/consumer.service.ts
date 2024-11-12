import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";
import { EventEmitter } from 'events';
import axios, { AxiosError } from 'axios';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092']
  });

  private readonly consumers: Consumer[] = [];
  private eventEmitter = new EventEmitter();

  // Função para consumir com retry
  async consumeWithRetry(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
    await consumer.connect();
    await consumer.subscribe(topics);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageData = JSON.parse(message.value.toString());
        const maxRetries = 5;
        let attempt = 0;
        let success = false;

        console.log(`Mensagem recebida do tópico ${topic}:`, messageData);

        while (attempt < maxRetries && !success) {
          try {
            console.log(`Tentativa ${attempt + 1} de ${maxRetries} para processar a mensagem...`);
            await this.processMessage(messageData);  
            success = true;
            console.log(`Processamento bem-sucedido na tentativa ${attempt + 1}.`);
          } catch (error) {
            if (error instanceof AxiosError && error.code === 'ECONNREFUSED') {
              console.log(`Erro de conexão (ECONNREFUSED) na tentativa ${attempt + 1}.`);
              attempt++; // Incrementa o contador de tentativas após o erro
              if (attempt >= maxRetries) {
                console.error(`Falha ao processar a mensagem após ${maxRetries} tentativas.`);
                this.eventEmitter.emit('messageProcessedFailed', messageData.correlationId);
              } else {
                console.log(`Aguardando 2 segundos antes de tentar novamente...`);
                await this.sleep(2000); // Aguarda 2 segundos antes de tentar novamente
              }
            } else {
              console.error('Erro inesperado ao processar a mensagem:', error);
              break;  // Para o loop se o erro não for de conexão
            }
          }
        }
      },
    });

    this.consumers.push(consumer);
  }

  private async processMessage(messageData: any) {
    try {
      const authToken = messageData.headers?.Authorization;
      const url = messageData.url;
      const method = messageData.method?.toUpperCase() || 'PATCH';
  
      if (!authToken || !url) {
        throw new Error('Token de autenticação ou URL ausente na mensagem');
      }
  
      console.log(`Enviando requisição para o MS: Método: ${method}, URL: ${url}`);
  
      await axios({
        method: method,
        url: url,
        data: messageData.data,
        headers: {
          Authorization: authToken,
        },
      });
  
      console.log('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
      throw error;
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onMessageProcessed(callback: (correlationId: string) => void) {
    this.eventEmitter.on('messageProcessed', callback);
  }

  onMessageProcessedFailed(callback: (correlationId: string) => void) {
    this.eventEmitter.on('messageProcessedFailed', callback);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
