import { Injectable } from '@nestjs/common';
import { SessionServiceInterface } from '@app/modules/session/services/session.service.interface';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PostLoginResDto } from '@app/modules/session/dtos/responses/post-login-res.dto';
import { PostLoginReqDto } from '@app/modules/session/dtos/requests/post-login-req.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionService implements SessionServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async postLogin(body: PostLoginReqDto): Promise<AxiosResponse<PostLoginResDto>> {
    const url = this.configService.get('MS_USER_URL') + '/session/login';

    const response = this.httpService.post<PostLoginResDto>(url, body);
    try {
        return await lastValueFrom(response);
    } catch (error) {
        console.error('Error during login request:', error.message);
        throw error;
    }
  }
}