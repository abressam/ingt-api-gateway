import { DeleteAppointmentResDto } from '@app/modules/appointment/dtos/responses/delete-appointment-res.dto';
import { GetAppointmentResDto } from '@app/modules/appointment/dtos/responses/get-appointment-res.dto';
import { GetAppointmentReqDto } from '@app/modules/appointment/dtos/requests/get-appointment-req.dto';
import { PostAppointmentReqDto } from '@app/modules/appointment/dtos/requests/post-appointment-req.dto';
import { PutAppointmentReqDto } from '@app/modules/appointment/dtos/requests/put-appointment-req.dto';
import { AxiosHeaders } from 'axios';

export interface AppointmentServiceInterface {
    getAppointment(headers: AxiosHeaders, filter: GetAppointmentReqDto): Promise<GetAppointmentResDto>;
    getMyAppointments(headers: AxiosHeaders): Promise<GetAppointmentResDto>;
    postAppointment(headers: AxiosHeaders, body: PostAppointmentReqDto): Promise<GetAppointmentResDto>;
    putAppointment(headers: AxiosHeaders, body: PutAppointmentReqDto): Promise<GetAppointmentResDto>;
    patchLinkAppointment(headers: AxiosHeaders, uuid: string): Promise<GetAppointmentResDto>;
    patchCancelAppointment(headers: AxiosHeaders, uuid: string): Promise<GetAppointmentResDto>;
    deleteAppointment(headers: AxiosHeaders, uuid: string): Promise<DeleteAppointmentResDto>;
}