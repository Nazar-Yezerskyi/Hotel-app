import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import session from 'express-session';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('services')
export class ServicesController {


    constructor(private servicesService: ServicesService){}

  @Get()
  find(){
      return this.servicesService.find()
  }
 
  @Post()
  @UseGuards(AuthGuard)
  createOrder(@Body() body:any, @Session() session: any){
    console.log(session)
    return this.servicesService.createOrder(parseInt(body.servicesId), session.idusers)
  }
}
