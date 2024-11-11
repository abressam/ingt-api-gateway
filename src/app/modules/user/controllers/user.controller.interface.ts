import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { GetUsersByCrpResDto } from '../dtos/responses/get-users-by-crp-res.dto';
import { GetUsersByPatientIdResDto } from '../dtos/responses/get-users-by-patientId-res.dto';
import { PostUserReqDto } from '../dtos/requests/post-user-req.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';

export interface UserControllerInterface {
  getUser(req: Request): Promise<GetUserResDto>;
  getUsersByCrp(): Promise<GetUsersByCrpResDto>;
  getUsersByPatientId(req: Request): Promise<GetUsersByPatientIdResDto>;
  postUser(body: PostUserReqDto): Promise<GetUserResDto>;
  putUser(req: Request, body: PutUserReqDto): Promise<GetUserResDto>;
  deleteUser(req: Request): Promise<DeleteUserResDto>;
}