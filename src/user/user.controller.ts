import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService){}

    @Get(':email')
    find(@Param('email') email: string){
        return this.usersService.find(email)
    }
   
}
