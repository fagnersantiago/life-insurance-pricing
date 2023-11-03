import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error', 'query'],
    });
  }

  async onModuleInit() {
    return console.log('CONECTOU', await this.$connect());
  }
  async onModuleDestroy() {
    return console.log(await this.$disconnect());
  }
}
