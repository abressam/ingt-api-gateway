import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class PutProfessionalReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    uuid: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    startOfAppointments?: string;
  
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    responses: Record<string, string | string[]>;
}