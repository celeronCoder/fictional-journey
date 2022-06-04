import { CacheModule, Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import { PrismaService } from '@/prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

export const TodoModuleMetaData = {
  imports: [
    CacheModule.register<RedisClientOptions>({
      name: 'redis',
      url: process.env.REDIS_URL,
      ttl: 30,
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
};

@Module(TodoModuleMetaData)
export class TodoModule {}
