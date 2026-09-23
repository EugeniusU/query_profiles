import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { SortOrder } from './sortOrderEnum.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneProfile(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async findManyProfiles() {
    return this.prisma.profile.findMany();
  }

  async findExperiencesByProfileId(profileId: number, startedAt?: SortOrder) {
    return this.prisma.experience.findMany({
      where: { profileId: profileId },
      include: { project: true },
      orderBy: {
        startedAt: startedAt || 'asc',
      },
    });
  }

  async findProjectsByProfileId(profileId: number) {
    return this.prisma.project.findMany({
      where: {
        experiences: {
          some: { profileId: profileId },
        },
      },
    });
  }

  async findSkillsByProfileId(profileId: number) {
    return this.prisma.skill.findMany({
      where: { profiles: { some: { id: profileId } } },
    });
  }
}
