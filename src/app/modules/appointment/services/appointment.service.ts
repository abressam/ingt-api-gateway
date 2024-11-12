import { AppointmentServiceInterface } from '@app/modules/appointment/services/appointment.service.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosHeaders } from 'axios';
import { DeleteAppointmentResDto } from '@app/modules/appointment/dtos/responses/delete-appointment-res.dto';
import { GetAppointmentResDto } from '@app/modules/appointment/dtos/responses/get-appointment-res.dto';
import { GetAppointmentReqDto } from '@app/modules/appointment/dtos/requests/get-appointment-req.dto';
import { PostAppointmentReqDto } from '@app/modules/appointment/dtos/requests/post-appointment-req.dto';
import { PutAppointmentReqDto } from '@app/modules/appointment/dtos/requests/put-appointment-req.dto';
import { ProducerService } from '@app/modules/kafka/services/producer.service';
import { ConsumerService } from '@app/modules/kafka/services/consumer.service';
import { v4 as uuidv4 } from 'uuid';

function createAuthHeader(headers: AxiosHeaders): AxiosHeaders {
  const token = headers['authorization'] || headers['Authorization'];

  // Cria uma instância de AxiosHeaders e define o cabeçalho Authorization
  const newHeaders = new AxiosHeaders();
  newHeaders.set('Authorization', token);

  return newHeaders;
}

@Injectable()
export class AppointmentService implements AppointmentServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {}

  async getAppointment(headers: AxiosHeaders, filter: GetAppointmentReqDto): Promise<GetAppointmentResDto> {
    const url = this.configService.get('MS_APPOINTMENT_URL') + '/appointment/get/professional-appointments';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.get<GetAppointmentResDto>(url, { params: filter , headers: authHeaders }));

    return response.data;
  }

  async getMyAppointments(headers: AxiosHeaders): Promise<GetAppointmentResDto> {
    const url = this.configService.get('MS_APPOINTMENT_URL') + '/appointment/get/my-appointments';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.get<GetAppointmentResDto>(url, { headers: authHeaders }));

    return response.data;
  }

  async postAppointment(headers: AxiosHeaders, body: PostAppointmentReqDto): Promise<GetAppointmentResDto> {
    const url = this.configService.get('MS_APPOINTMENT_URL') + '/appointment/post';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.post<GetAppointmentResDto>(url, body, { headers: authHeaders }));

    return response.data;
  }

  async putAppointment(headers: AxiosHeaders, body: PutAppointmentReqDto): Promise<GetAppointmentResDto> {
    const url = this.configService.get('MS_APPOINTMENT_URL') + '/appointment/put';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.put<GetAppointmentResDto>(url, body, { headers: authHeaders }));

    return response.data;
  }

  async patchLinkAppointment(headers: AxiosHeaders, uuid: string): Promise<any> {
    const url = `${this.configService.get('MS_APPOINTMENT_URL')}/appointment/patch/link-appointment/${uuid}`;
    const authHeaders = createAuthHeader(headers);
    
    const correlationId = uuidv4();

    // Filtra a resposta para evitar incluir referências circulares
    const messageData: { 
      url: string, 
      method: string, 
      headers: AxiosHeaders, 
      correlationId: string,
      data?: any // Adiciona o 'data' como opcional
    } = {
      url,
      method: 'patch',
      headers: authHeaders,
      correlationId,
    };

    try {
      // Tenta enviar a requisição diretamente para o MS
      const response = await lastValueFrom(this.httpService.patch<GetAppointmentResDto>(url, null, { headers: authHeaders }));

      return response.data;
    } catch (error) {
      // Caso o MS esteja fora do ar, registra a requisição no Kafka
      console.error('MS offline, registrando requisição na fila Kafka...', error);

      // Registra a requisição no Kafka para reprocessamento posterior
      await this.producerService.produce({
        topic: 'meu-teste',
        messages: [{ value: JSON.stringify(messageData) }],
      });
    }

    return { success: true, message: 'Appointment request registered for future processing' };
  }

  async patchCancelAppointment(headers: AxiosHeaders, uuid: string): Promise<GetAppointmentResDto> {
    const url = `${this.configService.get('MS_APPOINTMENT_URL')}/appointment/patch/cancel-appointment/${uuid}`;
    const authHeaders = createAuthHeader(headers);

    const response = await lastValueFrom(this.httpService.patch<GetAppointmentResDto>(url, null, { headers: authHeaders }));

    return response.data;
  }

  async deleteAppointment(headers: AxiosHeaders, uuid: string): Promise<DeleteAppointmentResDto> {
    const url = `${this.configService.get('MS_APPOINTMENT_URL')}/appointment/delete/${uuid}`;
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.delete<DeleteAppointmentResDto>(url, { headers: authHeaders }));

    return response.data;
  }

  // Função para aguardar a confirmação do Kafka
  async waitForKafkaResponse(correlationId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('Timeout de espera da resposta do Kafka');
      }, 20000); // Timeout de 10 segundos

      // Aqui, você deve configurar um "listener" que será chamado quando o Kafka processar a mensagem
      this.consumerService.onMessageProcessed((id) => {
        if (id === correlationId) {
          clearTimeout(timeout);
          resolve(true);
        }
      });
    });
  }
}