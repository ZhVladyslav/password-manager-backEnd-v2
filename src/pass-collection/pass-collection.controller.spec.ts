import { Test, TestingModule } from '@nestjs/testing';
import { PassCollectionController } from './pass-collection.controller';

describe('PassCollectionController', () => {
  let controller: PassCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassCollectionController],
    }).compile();

    controller = module.get<PassCollectionController>(PassCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
