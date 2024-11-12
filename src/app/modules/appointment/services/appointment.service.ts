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
import { Kafka } from 'kafkajs';
import { ProducerService } from '@app/modules/kafka/services/producer.service';

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
    
    const response = await lastValueFrom(this.httpService.patch<GetAppointmentResDto>(url, null, { headers: authHeaders }));

    // Filtra a resposta para evitar incluir referências circulares
    const messageData = {
      url,
      method: 'post',
      headers: authHeaders,
      data: response.data
    };

    // Prepara a mensagem para o Kafka
    const record = {
      topic: 'meu-teste',  // Nome do tópico no Kafka
      messages: [
        { value: JSON.stringify(messageData) },  // Envia apenas os dados filtrados
      ],
    };

    // Envia a mensagem para o Kafka
    await this.producerService.produce(record);

    return this.configService.get('MESSAGE_SUCCESS');
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
}