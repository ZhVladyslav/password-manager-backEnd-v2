import * as bcrypt from 'bcrypt';

class Password {
  // Generate password hash
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // Check password
  async verify(first: string, second: string): Promise<boolean> {
    const result = await bcrypt.compare(first, second);
    return result;
  }
}

export const password = new Password();
