import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '@app/modules/user/services/user.service';
import { UserController } from '@app/modules/user/controllers/user.controller';

@Module({
  imports: [HttpModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule  {}
