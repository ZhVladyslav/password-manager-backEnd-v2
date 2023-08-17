import { RoleMiddleware } from './role.middleware';

describe('RoleMiddleware', () => {
  it('should be defined', () => {
    expect(new RoleMiddleware()).toBeDefined();
  });
});
