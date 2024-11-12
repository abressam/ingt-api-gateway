import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PutClientReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    uuid: string;

    @ApiProperty({ type: [String] })
    @IsOptional()
    @IsString({ each: true })
    emotion?: string[];

    @ApiProperty({ type: [String] })
    @IsOptional()
    @IsString({ each: true })
    physiologicalReaction?: string[];
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    situation?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    thought?: string;
  
    @ApiProperty({ type: [String] })
    @IsOptional()
    @IsString({ each: true })
    behavior?: string[];
}