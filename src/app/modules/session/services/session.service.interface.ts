import { PostLoginResDto } from '@app/modules/session/dtos/responses/post-login-res.dto';
import { PostLoginReqDto } from '@app/modules/session/dtos/requests/post-login-req.dto';
import { AxiosResponse } from 'axios';

export interface SessionServiceInterface {
  postLogin(body: PostLoginReqDto): Promise<AxiosResponse<PostLoginResDto>>;
}