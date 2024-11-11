import { AppointmentServiceInterface } from '@app/modules/appointment/services/appointment.service.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosHeaders } from 'axios';
import { AppointmentDto } from '@app/modules/appointment/dtos/appointment.dto';
import { DeleteAppointmentResDto } from '@app/modules/appointment/dtos/responses/delete-appointment-res.dto';
import { GetAppointmentResDto } from '@app/modules/appointment/dtos/responses/get-appointment-res.dto';
import { GetAppointmentReqDto } from '@app/modules/appointment/dtos/requests/get-appointment-req.dto';
import { PostAppointmentReqDto } from '@app/modules/appointment/dtos/requests/post-appointment-req.dto';
import { PutAppointmentReqDto } from '@app/modules/appointment/dtos/requests/put-appointment-req.dto';

@Injectable()
export class AppointmentService implements AppointmentServiceInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAppointment(headers: AxiosHeaders, filter: GetAppointmentReqDto): Promise<GetAppointmentResDto> {
    const url = this.configService.get('MS_APPOINTMENT_URL') + '/appointment/get/professional-appointments';
    const response = await lastValueFrom(this.httpService.get<GetAppointmentResDto>(url, { params: filter , headers }));

    return response.data;
  }

  async getMyAppointments(headers: AxiosHeaders): Promise<GetAppointmentResDto> {
    const url = this.configService.get('MS_APPOINTMENT_URL') + '/appointment/get/my-appointments';
    const response = await lastValueFrom(this.httpService.get<GetAppointmentResDto>(url, { headers }));

    return response.data;
  }
}