import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Kafka, Consumer, ConsumerRunConfig, ConsumerSubscribeTopics } from "kafkajs";
import { HttpService } from "@nestjs/axios";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'], // endereço do broker Kafka
  });

  private readonly consumers: Consumer[] = [];

  constructor(private readonly httpService: HttpService) {}

  // Método para iniciar o consumo
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
        // Processar a mensagem aqui, por exemplo, chamando um método do AppointmentService
        try {
          // Supondo que você tenha um método para processar a mensagem:
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
    const maxRetries = 3; // Número máximo de tentativas
    const retryInterval = 20000; // Intervalo de 20 segundos entre as tentativas
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        // Tentativa de processamento da requisição PATCH
        await this.makePatchRequest(message);
        console.log(`Mensagem processada com sucesso: ${message.url}`);
        break;  // Se o processamento for bem-sucedido, sai do loop
      } catch (error) {
        attempt++;
        console.error(`Erro ao processar a mensagem (tentativa ${attempt}):`, error);
        if (attempt < maxRetries) {
          console.log(`Tentando novamente em ${retryInterval / 1000} segundos...`);
          await this.sleep(retryInterval);  // Aguarda o intervalo antes de tentar novamente
        } else {
          console.error('Número máximo de tentativas atingido. A mensagem será registrada.');
        }
      }
    }
  }

  // Função de "sleep" para aguardar o intervalo entre tentativas
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Lógica para enviar a requisição PATCH para o microserviço
  async makePatchRequest(message: any) {
    const { url, method, headers } = message;
    try {
      await this.httpService.patch(url, {}, { headers }).pipe(
        catchError(error => {
          console.error('Erro ao fazer a requisição PATCH:', error);
          throw error;  // Lança o erro para que a lógica de retry seja acionada
        })
      ).toPromise();
    } catch (error) {
      throw new Error(`Falha ao fazer requisição PATCH para ${url}`);
    }
  }

  // Método de shutdown para desconectar os consumidores corretamente
  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
