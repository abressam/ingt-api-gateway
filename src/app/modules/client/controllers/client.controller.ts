import { ClientService } from '@app/modules/client/services/client.service';
import { ClientControllerInterface } from '@app/modules/client/controllers/client.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteClientResDto } from '@app/modules/client/dtos/response/delete-client-res.dto';
import { GetClietRdpReqDto } from '@app/modules/client/dtos/request/get-client-filter-rdp-req.dto';
import { GetClietMyRdpsReqDto } from '@app/modules/client/dtos/request/get-client-filter-my-rdps-req.dto';
import { GetClientResDto } from '@app/modules/client/dtos/response/get-client-res.dto';
import { PostClientReqDto } from '@app/modules/client/dtos/request/post-client-req.dto';
import { PutClientReqDto } from '@app/modules/client/dtos/request/put-client.req.dto';
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
  Param,
  Body,
  HttpCode,
  HttpException,
  Logger,
  Query,
} from '@nestjs/common';

@ApiTags('client')
@Controller('client')
export class ClientController implements ClientControllerInterface {
  constructor(private readonly clientService: ClientService) {}

  @Get('get-my-patients-rdps')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the client data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the client data',
    type: GetClientResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getPatientsRDP(
    @Request() req: Request,
    @Query() filter?: GetClietRdpReqDto
) {
    const logger = new Logger(ClientController.name);

    try {
        const headers = req.headers as unknown as AxiosHeaders;
        logger.log('getPatientsRDP()');
        return await this.clientService.getPatientsRDP(headers, filter);
    } catch (error) {
        logger.error(error);
        throw new HttpException(error.message, error.getStatus());
    }
  }

  @Get('get/my-rdps')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the client data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the client data',
    type: GetClientResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getMyRDP(
    @Request() req: Request,
    @Query() filter?: GetClietMyRdpsReqDto
) {
    const logger = new Logger(ClientController.name);

    try {
        const headers = req.headers as unknown as AxiosHeaders;
        logger.log('getMyRDP()');
        return await this.clientService.getMyRDP(headers, filter);
    } catch (error) {
        logger.error(error);
        throw new HttpException(error.message, error.getStatus());
    }
  }
}