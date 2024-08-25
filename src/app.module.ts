import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Users } from './entities/entities/Users';
import { StaffShedule } from './entities/entities/StaffShedule';
import { ServicesOrder } from './entities/entities/ServicesOrder';
import { Services } from './entities/entities/Services';
import { RoomsPhoto } from './entities/entities/RoomsPhoto';
import { RoomsOrder } from './entities/entities/RoomsOrder';
import { Rooms } from './entities/entities/Rooms';
import { Role } from './entities/entities/Role';
import { Position } from './entities/entities/Position';
import { LeaveRequests } from './entities/entities/LeaveRequests';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { ServicesModule } from './services/services.module';
import { LeaveRequestsModule } from './leave_requests/leave_requests.module';
import { EmailModule } from './email/email.module';
import { Tasks } from './entities/entities/Tasks';
import { TaskModule } from './task/task.module';
import { SheduleModule } from './shedule/shedule.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '',
      port: 3306,
      username: '',
      password: '',
      database: '',
      entities: [Users,StaffShedule,Tasks,ServicesOrder, Services,RoomsPhoto, RoomsOrder,Rooms, Role,Position,LeaveRequests],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoomsModule,
    ServicesModule,
    LeaveRequestsModule,
    EmailModule,
    TaskModule,
    SheduleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

