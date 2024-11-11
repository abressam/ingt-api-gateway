import { ProfessionalService } from '@app/modules/professional/services/professional.service';
import { ProfessionalControllerInterface } from '@app/modules/professional/controllers/professional.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteProfessionalResDto } from '@app/modules/professional/dtos/responses/delete-professional-res.dto';
import { GetProfessionalResDto } from '@app/modules/professional/dtos/responses/get-professional-res.dto';
import { GetProfessionalHistoryByPacientDto } from '@app/modules/professional/dtos/requests/get-professional-history-by-pacient-req.dto';
import { PostProfessionalReqDto } from '@app/modules/professional/dtos/requests/post-professional-req.dto';
import { PutProfessionalReqDto } from '@app/modules/professional/dtos/requests/put-professional-req.dto';
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
  Query,
  Body,
  HttpCode,
  HttpException,
  Logger,
  Param,
} from '@nestjs/common';

@ApiTags('professional')
@Controller('professional')
export class ProfessionalController implements ProfessionalControllerInterface {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Get('get')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the cases data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the professional data',
    type: GetProfessionalResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getPacientCase(
    @Request() req: Request,
    @Query() filter?: GetProfessionalHistoryByPacientDto,
  ) {
    const logger = new Logger(ProfessionalController.name);

    try {
      const headers = req.headers as unknown as AxiosHeaders;
      logger.log('getPacientCase()');
      return await this.professionalService.getPacientCase(headers, filter);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Post('post')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Post the case data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the professional data',
    type: GetProfessionalResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async postCase(@Request() req: Request, @Body() body: PostProfessionalReqDto) {
    const logger = new Logger(ProfessionalController.name);

    try {
      const headers = req.headers as unknown as AxiosHeaders;
      logger.log('postCase()');
      return await this.professionalService.postCase(headers, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  // @Put('put')
  // @HttpCode(200)
  // @ApiBearerAuth('auth')
  // @ApiOperation({ summary: 'Put the case data' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns a JSON with the professional data',
  //   type: GetProfessionalResDto,
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error',
  //   type: ErrorDto,
  // })
  // async putCase(@Request() req: Request, @Body() body: PutProfessionalReqDto) {
  //   const logger = new Logger(ProfessionalController.name);

  //   try {
  //     const user = req['crp'];
  //     logger.log('putCase()');
  //     return await this.professionalService.putCase(user, body);
  //   } catch (error) {
  //     logger.error(error);
  //     throw new HttpException(error.message, error.getStatus());
  //   }
  // }

  // @Delete('delete/:uuid')
  // @HttpCode(200)
  // @ApiBearerAuth('auth')
  // @ApiOperation({ summary: 'Delete the case history data' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns a JSON with the professional status',
  //   type: DeleteProfessionalResDto,
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error',
  //   type: ErrorDto,
  // })
  // async deleteHistory(@Request() req: Request, @Param('uuid') uuid: string) {
  //   const logger = new Logger(ProfessionalController.name);

  //   try {
  //     const user = req['crp'];      
  //     logger.log('deleteHistory()');
  //     return await this.professionalService.deleteHistory(user, uuid);
  //   } catch (error) {
  //     logger.error(error);
  //     throw new HttpException(error.message, error.getStatus());
  //   }
  // }
}