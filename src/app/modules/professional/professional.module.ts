import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProfessionalService } from '@app/modules/professional/services/professional.service';
import { ProfessionalController } from '@app/modules/professional/controllers/professional.controller';

@Module({
  imports: [HttpModule],
  providers: [ProfessionalService],
  controllers: [ProfessionalController],
})
export class ProfessionalModule  {}