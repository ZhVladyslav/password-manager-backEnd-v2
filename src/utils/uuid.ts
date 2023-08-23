import { v4 } from 'uuid';

class Uuid {
  // Generate uuid V4
  v4(): string {
    return v4();
  }
}

export const uuid = new Uuid();
