import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SessionService } from '@app/modules/session/services/session.service';
import { SessionController } from '@app/modules/session/controllers/session.controller';

@Module({ 
    imports: [HttpModule],
    providers: [SessionService],
    controllers: [SessionController],
})
export class SessionModule {}