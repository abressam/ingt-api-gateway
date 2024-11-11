import { DeleteClientResDto } from '@app/modules/client/dtos/response/delete-client-res.dto';
import { GetClientResDto } from '@app/modules/client/dtos/response/get-client-res.dto';
import { GetClietRdpReqDto } from '@app/modules/client/dtos/request/get-client-filter-rdp-req.dto';
import { GetClietMyRdpsReqDto } from '@app/modules/client/dtos/request/get-client-filter-my-rdps-req.dto';
import { PostClientReqDto } from '@app/modules/client/dtos/request/post-client-req.dto';
import { PutClientReqDto } from '@app/modules/client/dtos/request/put-client.req.dto';
import { AxiosHeaders } from 'axios';

export interface ClientServiceInterface {
    getPatientsRDP(headers: AxiosHeaders,filter?: GetClietRdpReqDto): Promise<GetClientResDto>;
    getPatientsRDP(headers: AxiosHeaders,bfilter?: GetClietRdpReqDto): Promise<GetClientResDto>;
}