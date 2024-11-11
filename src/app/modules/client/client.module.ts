import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientService } from '@app/modules/client/services/client.service';
import { ClientController } from '@app/modules/client/controllers/client.controller';

@Module({
  imports: [HttpModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule  {}