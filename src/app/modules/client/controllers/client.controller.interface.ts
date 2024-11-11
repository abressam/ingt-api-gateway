import { DeleteClientResDto } from '@app/modules/client/dtos/response/delete-client-res.dto';
import { GetClientResDto } from '@app/modules/client/dtos/response/get-client-res.dto';
import { GetClietMyRdpsReqDto } from '@app/modules/client/dtos/request/get-client-filter-my-rdps-req.dto';
import { PostClientReqDto } from '@app/modules/client/dtos/request/post-client-req.dto';
import { PutClientReqDto } from '@app/modules/client/dtos/request/put-client.req.dto';
import { GetClietRdpReqDto } from '@app/modules/client//dtos/request/get-client-filter-rdp-req.dto';

export interface ClientControllerInterface {
    getPatientsRDP(
        req: Request,
        filter?: GetClietRdpReqDto
    ): Promise<GetClientResDto>;
    getMyRDP(
        req: Request,
        filter?: GetClietMyRdpsReqDto
    ): Promise<GetClientResDto>;
    postRDP(req: Request, body: PostClientReqDto): Promise<GetClientResDto>;
    putRDP(req: Request, body: PutClientReqDto): Promise<GetClientResDto>;
    deleteRPD(req: Request, param: string ): Promise<DeleteClientResDto>;
}