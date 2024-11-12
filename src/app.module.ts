import { Module } from '@nestjs/common';
import { SessionModule } from '@app/modules/session/session.module';
import { UserModule } from '@app/modules/user/user.module';
import { ClientModule } from '@app/modules/client/client.module';
import { AppointmentModule } from '@app/modules/appointment/appointment.module';
import { ProfessionalModule } from '@app/modules/professional/professional.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/configs/app.config';

@Module({
  imports: [
    SessionModule,
    UserModule,
    ClientModule,
    AppointmentModule,
    ProfessionalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ]
})

export class AppModule {}