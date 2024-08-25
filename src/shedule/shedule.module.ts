import { Module } from '@nestjs/common';
import { SheduleController } from './shedule.controller';
import { SheduleService } from './shedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffShedule } from 'src/entities/entities/StaffShedule';

@Module({
  imports: [TypeOrmModule.forFeature([StaffShedule])],
  controllers: [SheduleController],
  providers: [SheduleService],
  exports: [SheduleService]
})
export class SheduleModule {}
