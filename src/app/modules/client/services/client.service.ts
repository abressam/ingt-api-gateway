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
import { ClientDto } from '@app/modules/client/dtos/client.dto';

@Injectable()
export class ClientService implements ClientServiceInterface {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async getPatientsRDP(
        headers: AxiosHeaders,
        filter?: GetClietRdpReqDto
    ): Promise<GetClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/get-my-patients-rdps';
        const response = await lastValueFrom(this.httpService.get<GetClientResDto>(url, { params: filter , headers }));
    
        return response.data;
    }

    async getMyRDP(
        headers: AxiosHeaders,
        filter?: GetClietMyRdpsReqDto
    ): Promise<GetClientResDto> {
        const url = this.configService.get('MS_CLIENT_URL') + '/client/get/my-rdps';
        const response = await lastValueFrom(this.httpService.get<GetClientResDto>(url, { params: filter , headers }));
    
        return response.data;
    }
}