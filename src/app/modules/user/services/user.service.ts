import { UserServiceInterface } from '@app/modules/user/services/user.service.interface';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { GetUsersByCrpResDto } from '@app/modules/user/dtos/responses/get-users-by-crp-res.dto';
import { GetUsersByPatientIdResDto } from '@app/modules/user/dtos/responses/get-users-by-patientId-res.dto';
import { PostUserReqDto } from '@app/modules/user/dtos/requests/post-user-req.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { HttpService } from '@nestjs/axios';

function createAuthHeader(headers: AxiosHeaders): AxiosHeaders {
  const token = headers['authorization'] || headers['Authorization'];

  // Cria uma instância de AxiosHeaders e define o cabeçalho Authorization
  const newHeaders = new AxiosHeaders();
  newHeaders.set('Authorization', token);

  return newHeaders;
}

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUser(headers: AxiosHeaders): Promise<AxiosResponse<GetUserResDto>> {
    const url = this.configService.get('MS_USER_URL') + '/user/get';
    const authHeaders = createAuthHeader(headers);
    const response = this.httpService.get<GetUserResDto>(url, { headers: authHeaders });

    return lastValueFrom(response);
  }

  async getUsersByCrp(): Promise<GetUsersByCrpResDto> {
    const url = this.configService.get('MS_USER_URL') + '/user/get/professionals';
    const response = await lastValueFrom(this.httpService.get<GetUsersByCrpResDto>(url));

    return response.data;
  }

  async getUsersByPatientId(headers: AxiosHeaders): Promise<GetUsersByPatientIdResDto> {
    const url = this.configService.get('MS_USER_URL') + '/user/get/patients';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.get<GetUsersByPatientIdResDto>(url, { headers: authHeaders }));

    return response.data;
  }

  async postUser(body: PostUserReqDto): Promise<GetUserResDto> {
    const url = this.configService.get('MS_USER_URL') + '/user/post';
    const response = await lastValueFrom(this.httpService.post<GetUserResDto>(url, body));

    return response.data;
  }

  async putUser(headers: AxiosHeaders, body: PutUserReqDto): Promise<GetUserResDto> { // não está funcionando
    const url = this.configService.get('MS_USER_URL') + '/user/put';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.put<GetUserResDto>(url, body, { headers: authHeaders }));

    return response.data;
  }
 
  async deleteUser(headers: AxiosHeaders): Promise<DeleteUserResDto> {
    const url = this.configService.get('MS_USER_URL') + '/user/delete';
    const authHeaders = createAuthHeader(headers);
    const response = await lastValueFrom(this.httpService.delete<DeleteUserResDto>(url, { headers: authHeaders }));

    return response.data;
  }
}