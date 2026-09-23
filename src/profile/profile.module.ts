import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';
import { ProfileService } from './profile.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  providers: [ProfileResolver, ProfileService, PrismaService],
})
export class ProfileModule {}
