import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';
import { ClientDto } from '@app/modules/client/dtos/client.dto';

export class GetClientResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  client: ClientDto[];
}