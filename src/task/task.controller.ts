import { Body, Controller, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthStaffInterceptor } from 'src/interceptors/auth-staff.interceptor';
import { AuthAdminInterceptor } from 'src/interceptors/auth-admin.interceptor';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService){}

    @Post()
    @UseInterceptors(AuthAdminInterceptor)
    async createTask(@Body() body: any, @Session() session: any){
        const task = await this.taskService.createTask(session.idusers,body.description, body.task_name, parseInt(body.usersIdStaff))
        console.log(task)
    }

    @Patch('/get-task')
    @UseInterceptors(AuthStaffInterceptor)
    getTask(@Body() body: any){
        return this.taskService.getTask(parseInt(body.idtasks))
    }
   
    @UseInterceptors(AuthStaffInterceptor)
    @Patch('done-task')
    doneTask(@Body() body: any){
        return this.taskService.doneTask(parseInt(body.idtasks))
    }
}
