import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/entities/entities/Services';
import { ServicesOrder } from 'src/entities/entities/ServicesOrder';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
    constructor(@InjectRepository(Services) private servicesRepo: Repository<Services>,
                @InjectRepository(ServicesOrder) private OrderRepo: Repository<ServicesOrder>){}

    find(){
        return this.servicesRepo.find()
    }
    private findOne(idservices: number){
        return this.servicesRepo.findOne({where: {idservices}})
    }
    private calculateExpirationDate(startDate: string, termInMonth: number): string {
        const startDateObject = new Date(startDate);
        const expirationDateObject = new Date(startDateObject.getFullYear(), startDateObject.getMonth() + termInMonth, startDateObject.getDate());
        const expirationDateString = expirationDateObject.toISOString().split('T')[0];
        return expirationDateString;
    }

    async createOrder(servicesId: number, usersId: number){
        console.log(usersId)
        const service = await this.findOne(servicesId) 
        const dateOfOrder = new Date().toISOString().split('T')[0];
        const expirationDate = this.calculateExpirationDate(dateOfOrder, service.termInMonth);
        const totalPrice = service.price;
        const serviceOrder = this.OrderRepo.create({totalPrice, dateOfOrder,expirationDate,usersId,servicesId})
        return this.OrderRepo.save(serviceOrder);
        
    }
}
