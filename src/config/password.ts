import * as bcrypt from 'bcrypt';

class Password {
  // Generate password hash
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // Check password
  async verify(getPassword: string, userPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(getPassword, userPassword);
    return result;
  }
}

export const password = new Password();
