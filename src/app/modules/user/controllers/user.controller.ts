import { UserService } from '@app/modules/user/services/user.service';
import { UserControllerInterface } from '@app/modules/user/controllers/user.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PostUserReqDto } from '@app/modules/user//dtos/requests/post-user-req.dto';
import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { GetUsersByCrpResDto } from '../dtos/responses/get-users-by-crp-res.dto';
import { GetUsersByPatientIdResDto } from '../dtos/responses/get-users-by-patientId-res.dto';
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
  Request,
  Body,
  Headers,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';

@ApiTags('user')
@Controller('user')
export class UserController implements UserControllerInterface {
  constructor(private readonly userService: UserService) {}

  @Get('get')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the user data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the user data',
    type: GetUserResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getUser(@Request() req: Request) {
    const logger = new Logger(UserController.name);

    try {
      const headers = req.headers as unknown as AxiosHeaders;
      logger.log('getUser()');
      const response = await this.userService.getUser(headers);
      return response.data;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.response.data.message, error.response.status);
    }
  }

  @Get('get/professionals')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all the data from the professionals' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the data from all the professionals',
    type: GetUsersByCrpResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getUsersByCrp() {
    const logger = new Logger(UserController.name);

    try {
      logger.log('getUsersByCrp()');
      return this.userService.getUsersByCrp();
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.response.data.message, error.response.status);
    }
  }

  @Get('get/patients')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get all the data from the patients' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the data from all the patients',
    type: GetUsersByPatientIdResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getUsersByPatientId(@Request() req: Request) {
    const logger = new Logger(UserController.name);

    try {
      const headers = req.headers as unknown as AxiosHeaders;
      logger.log('getUsersByPatientId()');
      return await this.userService.getUsersByPatientId(headers);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.response.data.message, error.response.status);
    }
  }
  
}