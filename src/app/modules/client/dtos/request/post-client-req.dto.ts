import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PostClientReqDto {
    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsString({ each: true })
    emotion: string[];

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsString({ each: true })
    physiologicalReaction: string[];
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    situation: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    thought: string;
  
    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsString({ each: true })
    behavior: string[];
}
