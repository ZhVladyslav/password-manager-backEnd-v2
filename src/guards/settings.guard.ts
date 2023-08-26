import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class SettingsGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.SETTING_MODE !== 'true') return false;
    return true;
  }
}
