import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecryptRequest = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request['decryptedData'];
});
