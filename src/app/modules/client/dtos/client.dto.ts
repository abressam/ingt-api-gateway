import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ClientDto {
    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    emotion: string[];

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    physiologicalReaction: string[];
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    situation: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    thought: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    behavior: string[];
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    patientId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsibleCrp: string;
}