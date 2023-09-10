import { BadRequestException } from '@nestjs/common';

export const checkReg = (reg: RegExp, name: string, data: string) => {
  if (!reg.test(data)) throw new BadRequestException(`Incorrectly entered data for: ${name}`);
};
