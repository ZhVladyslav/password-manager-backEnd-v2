import { Test, TestingModule } from '@nestjs/testing';
import { PassCollectionService } from './pass-collection.service';

describe('PassCollectionService', () => {
  let service: PassCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassCollectionService],
    }).compile();

    service = module.get<PassCollectionService>(PassCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
