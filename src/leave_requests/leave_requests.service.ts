import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { LeaveRequests } from 'src/entities/entities/LeaveRequests';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveRequestsService {
    constructor(@InjectRepository(LeaveRequests) private leaveReqRepo: Repository<LeaveRequests>,
    private emailServices: EmailService,
    private userService:UserService){}

    createLeaveReq(leaveType: string, startDate: string, endDate: string, reason: string, usersId: number){
        const status: ("Sent"| "Rejected" |"Approved")[] = ["Sent"];    
        const leave_requests = this.leaveReqRepo.create({leaveType, startDate,endDate,reason,usersId,status})
        return this.leaveReqRepo.save(leave_requests)
    }
    private findOne(idleaveRequests : number){
        return this.leaveReqRepo.findOne({where: {idleaveRequests}})
    }

    
    async updateStatus(id: number, status: "Sent" | "Rejected" | "Approved") {
        const leaveRequest = await this.leaveReqRepo.findOne({ where: { idleaveRequests: id } });
        if (!leaveRequest) {
          throw new NotFoundException(`Leave request with ID ${id} not found`);
        }

        leaveRequest.status = [status]; 
       
        return this.leaveReqRepo.save(leaveRequest);
      }

}
