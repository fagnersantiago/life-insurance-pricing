import { CoverageRepository } from '../infra/database/prisma/repositories/coverage.respository';
import { Injectable } from '@nestjs/common';
import { CoverageNotFound } from '../errors/coverage-not-found';
import { UpdateCoverageDto } from '../dto/update.coverage.dto';
//import { UserIsNotAdmin } from '../errors/user-not-admin';

@Injectable()
export class UpdateCoverageService {
  constructor(private updateCoverage: CoverageRepository) {}

  async execute(data: UpdateCoverageDto) {
    const coverageExists = await this.updateCoverage.findById(data.coverageId);
    console.log('iscover', coverageExists);
    if (!coverageExists) {
      throw new CoverageNotFound();
    }

    const coverage = await this.updateCoverage.update(data);
    console.log('coverage', coverage);
    return coverage;
  }
}
