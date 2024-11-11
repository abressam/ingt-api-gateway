import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { ProfessionalDto } from '@app/modules/professional/dtos/professional.dto';

export class GetProfessionalResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  professional: ProfessionalDto[];
}