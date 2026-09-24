import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import type { Project } from './project.model.js';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => GraphQLISODateTime)
  startedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  finishedAt?: Date;

  @Field(() => 'Project')
  project: Project;
}
