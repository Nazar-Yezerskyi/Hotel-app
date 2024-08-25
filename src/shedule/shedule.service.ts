import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffShedule } from 'src/entities/entities/StaffShedule';
import { Repository } from 'typeorm';

@Injectable()
export class SheduleService {
    constructor(@InjectRepository(StaffShedule) private staffSheduleRepo: Repository<StaffShedule>){}

    async createShedule(startTime: string, endTime:string, workingDays:string){
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);

        const differenceInMilliseconds = end.getTime() - start.getTime();
        const hoursPerDay = differenceInMilliseconds / (1000 * 60 * 60);
        const shedule = await this.staffSheduleRepo.create({startTime, endTime, hoursPerDay, workingDays})
        return this.staffSheduleRepo.save(shedule)
    }
}
