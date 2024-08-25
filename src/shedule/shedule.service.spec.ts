import { Test, TestingModule } from '@nestjs/testing';
import { SheduleService } from './shedule.service';

describe('SheduleService', () => {
  let service: SheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheduleService],
    }).compile();

    service = module.get<SheduleService>(SheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
