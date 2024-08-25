import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'src/entities/entities/Tasks';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Tasks]), UserModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
