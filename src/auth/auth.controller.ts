import { Body, Controller, Post, Session, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import session from 'express-session';
import { AuthUserDto } from './dtos/auth-user-create.dto';
import { AuthUserSingInDto } from './dtos/auth-singin.dto';
import { AuthAdminInterceptor } from 'src/interceptors/auth-admin.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/singup-user')
    async createUser(@Body() body: AuthUserDto, @Session() session: any){
        const user = await this.authService.createUsersAcc(body.email, body.password_typed, body.name, body.lastName)
        session.idusers = user.idusers
        session.roleId = user.roleId
        console.log(session)
        return user;
    } 

    @Post('singin-user')
    async singinUser(@Body() body:AuthUserSingInDto, @Session() session: any){
        const user = await this.authService.signinUser(body.email, body.password_typed)
        session.idusers = user.idusers
        session.roleId = user.roleId
        session.possitionId = user.positionId
        return user;
    }
    @Post('singup-user-by-admin')
    @UseInterceptors(AuthAdminInterceptor)
    async singUserByAdmin(@Body() body:any, @Session() session: any){
        const user = await this.authService.createUserByAdmin(body.email, body.name, body.lastName)
        session.idusers = user.idusers
        session.roleId = user.roleId
        return user;
    }
    @Post('singup-staff-by-admin')
    @UseInterceptors(AuthAdminInterceptor)
    async singStaffByAdmin(@Body() body:any, @Session() session: any){
        console.log(body)
        const user = await this.authService.createStaffByAdmin(body.email, body.name, body.lastName, body.positionName, body.startTime, body.endTime, body.workingDays)
        session.idusers = user.idusers
        session.roleId = user.roleId
        console.log(body)
        return user;
    }
}
