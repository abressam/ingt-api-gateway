import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfessionalDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    crp: string;

    @ApiProperty()
    @IsNotEmpty()
    patientId: string;
  
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    startOfAppointments: string;
  
    @ApiProperty({
        type: 'object',
        additionalProperties: {
            oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }]
        }
    })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Object)
    responses: Map<string, string | string[]>;
}