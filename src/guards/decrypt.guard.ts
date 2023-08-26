import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { aes } from 'src/utils/aes';
import { rsa } from 'src/utils/rsa';

@Injectable()
export class DecryptGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    aes.generateKeys();
    const viDecrypt = Buffer.from(JSON.parse(rsa.decrypt(body.iv)), 'utf-8');
    const keyDecrypt = Buffer.from(JSON.parse(rsa.decrypt(body.key)), 'utf-8');
    aes.setKeys({ key: keyDecrypt, iv: viDecrypt });

    const dataDecrypt = JSON.parse(aes.decrypt(body.data));

    request.decryptedData = dataDecrypt;
    return true;
  }
}
