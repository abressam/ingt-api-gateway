import { DeleteAppointmentResDto } from '@app/modules/appointment/dtos/responses/delete-appointment-res.dto';
import { GetAppointmentResDto } from '@app/modules/appointment/dtos/responses/get-appointment-res.dto';
import { PostAppointmentReqDto } from '@app/modules/appointment/dtos/requests/post-appointment-req.dto';
import { PutAppointmentReqDto } from '@app/modules/appointment/dtos/requests/put-appointment-req.dto';
import { GetAppointmentReqDto } from '@app/modules/appointment/dtos/requests/get-appointment-req.dto';

export interface AppointmentControllerInterface {
    getAppointment(req: Request, filter?: GetAppointmentReqDto): Promise<GetAppointmentResDto>;
    // getMyAppointments(
    //     req: Request,
    // ): Promise<GetAppointmentResDto>;
}