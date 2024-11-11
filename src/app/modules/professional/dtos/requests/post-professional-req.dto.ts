import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class PostProfessionalReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    patientId: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startOfAppointments: string;
  
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    responses: Record<string, string | string[]>;
}