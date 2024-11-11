import { AppointmentService } from '@app/modules/appointment/services/appointment.service';
import { AppointmentControllerInterface } from '@app/modules/appointment/controllers/appointment.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteAppointmentResDto } from '@app/modules/appointment/dtos/responses/delete-appointment-res.dto';
import { GetAppointmentResDto } from '@app/modules/appointment/dtos/responses/get-appointment-res.dto';
import { GetAppointmentReqDto } from '@app/modules/appointment/dtos/requests/get-appointment-req.dto';
import { PostAppointmentReqDto } from '@app/modules/appointment/dtos/requests/post-appointment-req.dto';
import { PutAppointmentReqDto } from '@app/modules/appointment/dtos/requests/put-appointment-req.dto';
import { AxiosHeaders } from 'axios';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Patch,
  Request,
  Query,
  Body,
  HttpCode,
  HttpException,
  Logger,
  Param,
} from '@nestjs/common';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController implements AppointmentControllerInterface {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('get/professional-appointments')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the appointment data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the appointment data',
    type: GetAppointmentResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getAppointment(
    @Request() req: Request,
    @Query() filter?: GetAppointmentReqDto,
  ) {
    const logger = new Logger(AppointmentController.name);

    try {
      const headers = req.headers as unknown as AxiosHeaders;
      logger.log('getAppointment()');
      return await this.appointmentService.getAppointment(headers, filter);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  
  @Get('get/my-appointments')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get all the client data appointments' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the data from all client data appointments',
    type: GetAppointmentResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getMyAppointments(@Request() req: Request) {
    const logger = new Logger(AppointmentController.name);

    try {
      const headers = req.headers as unknown as AxiosHeaders;
      logger.log('getMyAppointments()');
      return await this.appointmentService.getMyAppointments(headers);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}