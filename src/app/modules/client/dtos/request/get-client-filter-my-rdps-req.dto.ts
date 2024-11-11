import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class GetClietMyRdpsReqDto {
    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    endDate?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    emotion?: string;
}