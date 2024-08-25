import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from 'src/entities/entities/Rooms';
import { RoomsOrder } from 'src/entities/entities/RoomsOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms,RoomsOrder])],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
