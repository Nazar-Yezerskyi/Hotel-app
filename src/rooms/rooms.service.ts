import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from 'src/entities/entities/Rooms';
import { RoomsOrder } from 'src/entities/entities/RoomsOrder';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {

    constructor(@InjectRepository(Rooms) private roomsRepo: Repository<Rooms>,
    @InjectRepository(RoomsOrder) private roomsOrderRepo: Repository<RoomsOrder>){}

    async findRooms(check_in_date: string, check_out_date: string, guests: number){
        console.log(check_in_date, check_out_date, guests)
        const room = this.roomsRepo.createQueryBuilder()
        .select('ro.roomsId')
        .from(RoomsOrder, 'ro')
        .where('ro.check_in < :check_out_date', { check_out_date })
        .andWhere('ro.check_out > :check_in_date', { check_in_date });

         const availableRooms = await this.roomsRepo
            .createQueryBuilder('r')
            .where('r.numberOfGuests >= :guests', { guests })
            .andWhere(`r.idrooms NOT IN (${room.getQuery()})`)
            .setParameters(room.getParameters())
            .getMany();

        return availableRooms
    }
    
    async findRoomById(idrooms:number){
        return this.roomsRepo.find({where: {idrooms}})
    }

    async orderRoom(checkIn: string, checkOut: string, usersId: number, roomsId: number ){
        const room = await this.findRoomById(roomsId)
        console.log(room[0].pricePerDay)

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
        const totalPrice = nights * room[0].pricePerDay;
        const dateOfOrder = new Date().toISOString().split('T')[0];

        const roomOrder = this.roomsOrderRepo.create({checkIn,checkOut,usersId, roomsId,totalPrice, dateOfOrder})

        return this.roomsOrderRepo.save(roomOrder);
    }
}
