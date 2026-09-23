import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Experience } from './experience.model.js';
import { Project } from './project.model.js';
import { Skill } from './skill.model.js';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Experience])
  experiences: Experience[];

  @Field(() => [Project])
  projects: Project[];

  @Field(() => [Skill])
  skills: Skill[];
}
