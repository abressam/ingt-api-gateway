import { ProfessionalServiceInterface } from '@app/modules/professional/services/professional.service.interface';
import { Injectable } from '@nestjs/common';
import { GetProfessionalResDto } from '@app/modules/professional/dtos/responses/get-professional-res.dto';
import { GetProfessionalHistoryByPacientDto } from '@app/modules/professional/dtos/requests/get-professional-history-by-pacient-req.dto';
import { PostProfessionalReqDto } from '@app/modules/professional/dtos/requests/post-professional-req.dto';
import { AxiosHeaders } from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PutProfessionalReqDto } from '../dtos/requests/put-professional-req.dto';
import { DeleteProfessionalResDto } from '../dtos/responses/delete-professional-res.dto';

function createAuthHeader(headers: AxiosHeaders): AxiosHeaders {
  const token = headers['authorization'] || headers['Authorization'];

  // Cria uma instância de AxiosHeaders e define o cabeçalho Authorization
  const newHeaders = new AxiosHeaders();
  newHeaders.set('Authorization', token);

  return newHeaders;
}

@Injectable()
export class ProfessionalService implements ProfessionalServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // Método para obter o caso de um paciente
  async getPacientCase(headers: AxiosHeaders, filter: GetProfessionalHistoryByPacientDto): Promise<GetProfessionalResDto> {
    const url = this.configService.get('services.professionalService.url') + '/professional/get';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.get<GetProfessionalResDto>(url, { params: filter, headers: authHeaders }));

    return response.data;
  }

  async postCase(headers: AxiosHeaders, body: PostProfessionalReqDto): Promise<GetProfessionalResDto> {
    const url = this.configService.get('services.professionalService.url') + '/professional/post';
    const authHeaders = createAuthHeader(headers);

    const response = await lastValueFrom(this.httpService.post<GetProfessionalResDto>(url, body, { headers: authHeaders }));

    return response.data;
  }

  async putCase(headers: AxiosHeaders, body: PutProfessionalReqDto): Promise<GetProfessionalResDto> {
    const url = this.configService.get('services.professionalService.url') + '/professional/put';
    const authHeaders = createAuthHeader(headers);

    const response = await lastValueFrom(this.httpService.put<GetProfessionalResDto>(url, body, { headers: authHeaders }));

    return response.data;
  }

  async deleteHistory(headers: AxiosHeaders, uuid: string): Promise<DeleteProfessionalResDto> {
    const url = this.configService.get('services.professionalService.url') + '/professional/delete/:uuid';
    const authHeaders = createAuthHeader(headers);

    const response = await lastValueFrom(this.httpService.delete<DeleteProfessionalResDto>(url, { params: uuid, headers: authHeaders }));

    return response.data;
  }
}
