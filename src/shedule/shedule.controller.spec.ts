import { Test, TestingModule } from '@nestjs/testing';
import { SheduleController } from './shedule.controller';

describe('SheduleController', () => {
  let controller: SheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheduleController],
    }).compile();

    controller = module.get<SheduleController>(SheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
