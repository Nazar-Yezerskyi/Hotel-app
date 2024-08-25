import { Body, Controller, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { LeaveRequestsService } from './leave_requests.service';
import { AuthAdminInterceptor } from 'src/interceptors/auth-admin.interceptor';



@Controller('leave-requests')
export class LeaveRequestsController {
    constructor(private leaveReqService: LeaveRequestsService){}

    @Post()
    createLeaveReq(@Body() body: any, @Session() session: any){
        console.log(session)
        const requests = this.leaveReqService.createLeaveReq(body.leaveType, body.startDate, body.endDate, body.reason, parseInt(session.idusers))
    }

    @Patch()
    @UseInterceptors(AuthAdminInterceptor)
    updateReq(@Body() body: any){
        return this.leaveReqService.updateStatus(parseInt(body.idleaveRequests), body.status)
    }

}
