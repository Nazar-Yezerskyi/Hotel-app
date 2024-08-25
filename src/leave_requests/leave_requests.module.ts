import { Module } from '@nestjs/common';
import { LeaveRequestsController } from './leave_requests.controller';
import { LeaveRequestsService } from './leave_requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequests } from 'src/entities/entities/LeaveRequests';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([LeaveRequests]), EmailModule,UserModule],
  controllers: [LeaveRequestsController],
  providers: [LeaveRequestsService]
})
export class LeaveRequestsModule {}
