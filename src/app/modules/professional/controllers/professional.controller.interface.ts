import { DeleteProfessionalResDto } from '@app/modules/professional/dtos/responses/delete-professional-res.dto';
import { GetProfessionalResDto } from '@app/modules/professional/dtos/responses/get-professional-res.dto';
import { GetProfessionalHistoryByPacientDto } from '@app/modules/professional/dtos/requests/get-professional-history-by-pacient-req.dto';
import { PostProfessionalReqDto } from '@app/modules/professional/dtos/requests/post-professional-req.dto';
import { PutProfessionalReqDto } from '@app/modules/professional/dtos/requests/put-professional-req.dto';

export interface ProfessionalControllerInterface {
    getPacientCase(req: Request, filter?: GetProfessionalHistoryByPacientDto): Promise<GetProfessionalResDto>;
    postCase(req: Request, body: PostProfessionalReqDto): Promise<GetProfessionalResDto>;
    // putCase(req: Request, body: PutProfessionalReqDto): Promise<GetProfessionalResDto>;
    // deleteHistory(req: Request, uuid: string ): Promise<DeleteProfessionalResDto>;
}