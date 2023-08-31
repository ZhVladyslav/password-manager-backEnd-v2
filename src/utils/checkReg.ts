import { BadRequestException } from '@nestjs/common';
import { log } from 'console';

export const checkReg = (reg: RegExp, name: string, data: string) => {
  if (!reg.test(data)) throw new BadRequestException(`Incorrectly entered data for: ${name}`);
};
