import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/entities/entities/Tasks';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Tasks) private taskRepo: Repository<Tasks>){}

    createTask(usersIdCreated: number, description: string, taskName: string, usersIdStaff: number){
        const status: ("created" | "in process" | "done")[] = ["created"];    
        const task = this.taskRepo.create({taskName,description,usersIdCreated,status, usersIdStaff})
        return this.taskRepo.save(task)
    }
    private findTask(idtasks: number){
        return this.taskRepo.findOne({where: {idtasks}})
    }
    
    async getTask(idtasks: number){
        const task = await this.findTask(idtasks)
        const status: ("created" | "in process" | "done")[] = ["in process"];    
        if(!this.findTask){
            throw new Error
        }
        task.status = status
        return this.taskRepo.save(task)

    }
    async doneTask(idtasks: number){
        const task = await this.findTask(idtasks)
        const status: ("created" | "in process" | "done")[] = ["done"];    
        if(!this.findTask){
            throw new Error
        }
        task.status = status
        return this.taskRepo.save(task)
    }

}
