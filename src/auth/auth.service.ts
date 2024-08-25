import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes , scrypt as _scrypt} from 'crypto';
import { EmailService } from 'src/email/email.service';
import { Position } from 'src/entities/entities/Position';
import { Users } from 'src/entities/entities/Users';
import { SheduleService } from 'src/shedule/shedule.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        @InjectRepository(Position) private positionRepo: Repository<Position>,
        private userService: UserService,
        private emailService:EmailService,
        private sheduleService:SheduleService
    ){}
    
    
    async createUsersAcc(email: string, password_typed: string, name:string, lastName: string){
        
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('email in use')
        }
   
        const salt = randomBytes(8).toString('hex');
            
        const hash = (await scrypt(password_typed,salt, 32)) as Buffer;
           
        const password = salt + '.' + hash.toString('hex');
  
        const roleId = 1;
        const user =  this.usersRepo.create({email, name, lastName, password, roleId});
      
       return this.usersRepo.save(user);
      
    }
    async createUserByAdmin(email: string, name: string, lastName:string){
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('email in use')
        }
        const generatePassword = randomBytes(10).toString('hex').slice(0, 10);
        
        const salt = randomBytes(8).toString('hex');
            
        const hash = (await scrypt(generatePassword,salt, 32)) as Buffer;
        this.emailService.sendEmail(email,`Your password`,
        `Dear guest,\nWelcome to the hotel-recreation complex "REST"!\nThank you for registering on our website.\nWe are happy to welcome you to the numerous company of our satisfied customers who choose our complex for rest and relaxation.\nPassword to your account: ${generatePassword} - do not share it with anyone, you can change the password in your personal account\nBest regards,\n"Rest" team`)
        
        const password = salt + '.' + hash.toString('hex');
      
        const roleId = 1;
        const user =  this.usersRepo.create({email, name, lastName, password, roleId});
    
       return this.usersRepo.save(user);
    }
    async signinUser(email: string, password: string){
        const [user] = await this.userService.find(email);
        if( !user){
            throw new NotFoundException('user not found');
        }
        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password,salt, 32)) as Buffer;

        if( storedHash !== hash.toString('hex') ){
            throw new BadRequestException('bad password')
        } 
        return user;
    }
    async createStaffByAdmin(email: string, name: string, lastName:string, positionName: string, startTime: string,endTime: string, workingDays: string){
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('email in use')
        }
        const generatePassword = randomBytes(10).toString('hex').slice(0, 10);
        
        const salt = randomBytes(8).toString('hex');
        const position = await this.positionRepo.findOne({where:{positionName}})
        const positionId  = position.idposition
        const hash = (await scrypt(generatePassword,salt, 32)) as Buffer;
        this.emailService.sendEmail(email,`Your password`,
        `Password to your account: ${generatePassword} - do not share it with anyone.\nBest regards,\n"Rest" team`)
        
        const password = salt + '.' + hash.toString('hex');
        const shedule = await this.sheduleService.createShedule(startTime,endTime, workingDays)
        const staffSheduleId = shedule.idstaffShedule
        
        const roleId = 2;
        const user =  this.usersRepo.create({email, name, lastName, password, roleId, positionId, staffSheduleId});
    
        return this.usersRepo.save(user);
    }
}
