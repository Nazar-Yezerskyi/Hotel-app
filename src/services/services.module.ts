import { Get, Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Services } from 'src/entities/entities/Services'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOrder } from 'src/entities/entities/ServicesOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Services, ServicesOrder])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {
}
