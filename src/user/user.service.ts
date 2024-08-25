import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/entities/Position';

import { Users } from 'src/entities/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
    ){}
    find(email: string){
        return this.usersRepo.find({where: {email}})
    }
    findOne(id:number){
        return this.usersRepo.findOne({where: {idusers: id}})
    }
    async getUserWithPosition(id: number){
        return await this.usersRepo.createQueryBuilder('u')
          .leftJoinAndSelect('u.position', 'po')
          .where('u.idusers = :id', { id })
          .getOne();
      }

}
