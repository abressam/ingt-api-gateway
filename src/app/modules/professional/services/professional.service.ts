import { ProfessionalServiceInterface } from '@app/modules/professional/services/professional.service.interface';
import { Injectable, Inject } from '@nestjs/common';
import { GetProfessionalResDto } from '@app/modules/professional/dtos/responses/get-professional-res.dto';
import { GetProfessionalHistoryByPacientDto } from '@app/modules/professional/dtos/requests/get-professional-history-by-pacient-req.dto';
import { PostProfessionalReqDto } from '@app/modules/professional/dtos/requests/post-professional-req.dto';
import { AxiosHeaders } from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProfessionalService implements ProfessionalServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('api-gateway-consumer');
    await this.kafkaClient.connect();
  }

  async getPacientCase(headers: AxiosHeaders, filter: GetProfessionalHistoryByPacientDto): Promise<GetProfessionalResDto> {
      const url = this.configService.get('services.professionalService.url') + '/professional/get';
      const response = await lastValueFrom(this.httpService.get<GetProfessionalResDto>(url, { params: filter , headers }));
  
      return response.data;
  }

  async postCase(headers: AxiosHeaders, body: PostProfessionalReqDto): Promise<any> {
      const url = this.configService.get('services.professionalService.url') + '/professional/post';

      await this.kafkaClient.emit('api-gateway-consumer', {
        url,
        method: 'post',
        body,
        headers
      });

      return this.configService.get('messages.success')
  }
}