import * as bcrypt from 'bcrypt';

class PassCheck {
  // Generate password hash
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // Check password
  async verify(data: string, encrypted: string): Promise<boolean> {
    const result = await bcrypt.compare(data, encrypted);
    return result;
  }
}

export const passCheck = new PassCheck();
