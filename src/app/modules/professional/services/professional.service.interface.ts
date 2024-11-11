import { DeleteProfessionalResDto } from '@app/modules/professional/dtos/responses/delete-professional-res.dto';
import { GetProfessionalResDto } from '@app/modules/professional/dtos/responses/get-professional-res.dto';
import { GetProfessionalHistoryByPacientDto } from '@app/modules/professional/dtos/requests/get-professional-history-by-pacient-req.dto';
import { PostProfessionalReqDto } from '@app/modules/professional/dtos/requests/post-professional-req.dto';
import { PutProfessionalReqDto } from '@app/modules/professional/dtos/requests/put-professional-req.dto';
import { AxiosHeaders } from 'axios';

export interface ProfessionalServiceInterface {
    getPacientCase(headers: AxiosHeaders, filter: GetProfessionalHistoryByPacientDto): Promise<GetProfessionalResDto>;
    postCase(headers: AxiosHeaders, body: PostProfessionalReqDto): Promise<GetProfessionalResDto>;
    // putCase(crp: string, body: PutProfessionalReqDto): Promise<GetProfessionalResDto>;
    // deleteHistory(crp: string, uuid: string): Promise<DeleteProfessionalResDto>;
}