import { Test, TestingModule } from '@nestjs/testing';
import { NodemailerController } from './nodemailer.controller';

describe('NodemailerController', () => {
  let controller: NodemailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodemailerController],
    }).compile();

    controller = module.get<NodemailerController>(NodemailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
