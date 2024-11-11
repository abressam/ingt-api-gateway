import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class GetProfessionalHistoryByPacientDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    patientId?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    startDate?: string

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    endDate?: string
}