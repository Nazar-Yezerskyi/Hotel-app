import { Body, Controller, Get, Post, Query, Session, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('rooms')
export class RoomsController {

    constructor(private roomsService: RoomsService){}

    @Get()
    async findRooms(@Query('check_in_date') checkInDate: string,
    @Query('check_out_date') checkOutDate: string,
    @Query('guests') guests: string, @Session() session: any){
        const rooms = await this.roomsService.findRooms(checkInDate, checkOutDate, parseInt(guests));
        console.log(rooms)
        console.log(session)
        return rooms;
    }
    @Post()
    @UseGuards(AuthGuard)
    createOrder(@Body() body:CreateOrderDto, @Session() session: any){
        return this.roomsService.orderRoom(body.checkIn, body.checkOut, session.idusers,body.roomsId)
    }
}
