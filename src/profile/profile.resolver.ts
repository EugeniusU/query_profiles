import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { Profile } from './models/profile.model.js';
import { SortOrder } from './sortOrderEnum.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile])
  profiles() {
    return this.profileService.findManyProfiles();
  }

  @Query(() => Profile, { nullable: true })
  profile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOneProfile(Number(id));
  }

  @ResolveField()
  experiences(
    @Parent() profile: Profile,
    @Args('startedAt', { type: () => SortOrder, nullable: true })
    startedAt?: SortOrder,
  ) {
    return this.profileService.findExperiencesByProfileId(
      profile.id,
      startedAt,
    );
  }

  @ResolveField()
  projects(@Parent() profile: Profile) {
    return this.profileService.findProjectsByProfileId(profile.id);
  }

  @ResolveField()
  skills(@Parent() profile: Profile) {
    return this.profileService.findSkillsByProfileId(profile.id);
  }
}
