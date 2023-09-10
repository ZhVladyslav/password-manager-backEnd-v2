import { SetMetadata } from '@nestjs/common';

export const ClaimsSet = (claims: string[]) => SetMetadata('claims', claims);
