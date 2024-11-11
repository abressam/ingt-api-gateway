import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PutClientReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    uuid: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    emotion?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    physiologicalReaction?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    situation?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    thought?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    behavior?: string;
}