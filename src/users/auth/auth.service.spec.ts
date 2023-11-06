import { AuthService } from './auth.service';
import { InMemoryUserRepository } from '../infra/database/prisma/repositories/inMemoryRepository/user-InMemory.repository';
import { Rule } from '../entitie/user';

const jwtServiceMock = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userInMemroyRepository: InMemoryUserRepository;

  beforeEach(() => {
    authService = new AuthService(
      userInMemroyRepository,
      jwtServiceMock as any,
    );
    userInMemroyRepository = new InMemoryUserRepository();
  });

  it('should generate an access token for the user', async () => {
    const userDto = {
      userId: 1,
      userName: 'testuser',
      password: '$2b$10$1234567890',
      rule: Rule.USER,
    };

    const expectedPayload = {
      sub: userDto.userId,
      userName: userDto.userName,
      rule: userDto.rule,
    };

    jwtServiceMock.sign.mockReturnValue('mocked-access-token');

    const result = await authService.login(userDto);

    expect(result).toEqual({ access_token: 'mocked-access-token' });
    expect(jwtServiceMock.sign).toHaveBeenCalledWith(expectedPayload);
  });
});
