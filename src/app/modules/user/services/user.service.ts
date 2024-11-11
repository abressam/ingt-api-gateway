import { UserServiceInterface } from '@app/modules/user/services/user.service.interface';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { GetUsersByCrpResDto } from '@app/modules/user/dtos/responses/get-users-by-crp-res.dto';
import { GetUsersByPatientIdResDto } from '@app/modules/user/dtos/responses/get-users-by-patientId-res.dto';
import { PostUserReqDto } from '@app/modules/user/dtos/requests/post-user-req.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { UserDto } from '@app/modules/user/dtos/user.dto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUser(headers: AxiosHeaders): Promise<AxiosResponse<GetUserResDto>> {
    const url = this.configService.get('MS_USER_URL') + '/user/get';
    const response = this.httpService.get<GetUserResDto>(url, { headers });

    return lastValueFrom(response);
  }

  async getUsersByCrp(): Promise<GetUsersByCrpResDto> {
    const url = this.configService.get('MS_USER_URL') + '/user/get/professionals';
    const response = await lastValueFrom(this.httpService.get<GetUsersByCrpResDto>(url));

    return response.data;
  }

  async getUsersByPatientId(headers: AxiosHeaders): Promise<GetUsersByPatientIdResDto> {
    const url = this.configService.get('MS_USER_URL') + '/user/get/patients';
    const response = await lastValueFrom(this.httpService.get<GetUsersByPatientIdResDto>(url, { headers }));

    return response.data;
  }
}