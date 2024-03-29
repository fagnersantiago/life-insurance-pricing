import { CreateCoverageService } from './coverage.service';
import { InMemoryCoverageRepository } from '../infra/database/prisma/repositories/inMemoryRepository/coverage-InMemory.repository';
import { CovegareAlreadyExists } from '../errors/coverage-already-exists.error';

let inMemoryUserRepository: InMemoryCoverageRepository;
let createCoverageService: CreateCoverageService;

describe(' Create Coverage', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryCoverageRepository();
    createCoverageService = new CreateCoverageService(inMemoryUserRepository);
  });

  it('Should be able create a new Covegare', async () => {
    const sut = await createCoverageService.execute({
      name: 'fake-coverage',
      description: 'fake-description',
      capital: '1000',
      premium: 'fake-premiun',
    });

    expect(sut).toHaveProperty('coverageId');
  });

  it('Should not be able to create an exiting coverage', async () => {
    await expect(async () => {
      const sut = await createCoverageService.execute({
        name: 'fake-coverage',
        description: 'fake-description',
        capital: '1000',
        premium: 'fake-premiun',
      });

      console.log('SUT', sut);
      await createCoverageService.execute({
        name: sut.name,
        description: sut.description,
        capital: sut.capital,
        premium: sut.premium,
      });
    }).rejects.toThrow(CovegareAlreadyExists);
  });

  // it('Should validate rules of password', async () => {
  //   await expect(
  //     createUserService.execute({
  //       userName: 'johnDoe',
  //       password: '12222',
  //     }),
  //   ).rejects.toBeInstanceOf(PasswordValidator);
  //});
});
