import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateOrderDto{
    @IsDateString()
    checkIn: string
    @IsDateString()
    checkOut: string
    @IsNumber()
    totalPrice: number;
    @IsDateString()
    dateOfOrder: string;
    @IsNumber()
    roomsId: number

}