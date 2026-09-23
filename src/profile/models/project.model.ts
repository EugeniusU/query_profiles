import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Experience } from './experience.model.js';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  projectLink?: string;

  @Field({ nullable: true })
  sourceCode?: string;

  @Field(() => [Experience])
  experiences: Experience[];
}
