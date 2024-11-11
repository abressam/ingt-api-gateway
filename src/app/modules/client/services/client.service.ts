import { ClientServiceInterface } from '@app/modules/client/services/client.service.interface';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AxiosHeaders } from 'axios';
import { DeleteClientResDto } from '@app/modules/client/dtos/response/delete-client-res.dto';
import { GetClientResDto } from '@app/modules/client/dtos/response/get-client-res.dto';
import { GetClietRdpReqDto } from '@app/modules/client/dtos/request/get-client-filter-rdp-req.dto';
import { GetClietMyRdpsReqDto } from '@app/modules/client/dtos/request/get-client-filter-my-rdps-req.dto';
import { PostClientReqDto } from '@app/modules/client/dtos/request/post-client-req.dto';
import { PutClientReqDto } from '@app/modules/client/dtos/request/put-client.req.dto';

function createAuthHeader(headers: AxiosHeaders): AxiosHeaders {
    const token = headers['authorization'] || headers['Authorization'];
  
    // Cria uma instância de AxiosHeaders e define o cabeçalho Authorization
    const newHeaders = new AxiosHeaders();
    newHeaders.set('Authorization', token);
  
    return newHeaders;
}

@Injectable()
export class ClientService implements ClientServiceInterface {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async getPatientsRDP(headers: AxiosHeaders, filter?: GetClietRdpReqDto): Promise<GetClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/get-my-patients-rdps';
        const authHeaders = createAuthHeader(headers);

        const response = await lastValueFrom(this.httpService.get<GetClientResDto>(url, { params: filter, headers: authHeaders }));
    
        return response.data;
    }

    async getMyRDP(headers: AxiosHeaders, filter?: GetClietMyRdpsReqDto): Promise<GetClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/get/my-rdps';
        const authHeaders = createAuthHeader(headers);

        const response = await lastValueFrom(this.httpService.get<GetClientResDto>(url, { params: filter, headers: authHeaders }));
    
        return response.data;
    }

    async postRDP(headers: AxiosHeaders, body: PostClientReqDto): Promise<GetClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/post';
        const authHeaders = createAuthHeader(headers);

        const response = await lastValueFrom(this.httpService.post<GetClientResDto>(url, body, { headers: authHeaders }));
    
        return response.data;
    }

    async putRDP(headers: AxiosHeaders, body: PutClientReqDto): Promise<GetClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/put';
        const authHeaders = createAuthHeader(headers);

        const response = await lastValueFrom(this.httpService.put<GetClientResDto>(url, body, { headers: authHeaders }));
    
        return response.data;
    }
    
    async deleteRPD(headers: AxiosHeaders, uuid: string): Promise<DeleteClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/delete/:uuid';
        const authHeaders = createAuthHeader(headers);

        const response = await lastValueFrom(this.httpService.delete<DeleteClientResDto>(url, { params: uuid, headers: authHeaders }));
    
        return response.data;
    }
}