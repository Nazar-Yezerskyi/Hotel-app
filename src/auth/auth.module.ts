import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';
import { Position } from 'src/entities/entities/Position';
import { SheduleModule } from 'src/shedule/shedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Position]), UserModule, EmailModule,SheduleModule],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule {}
