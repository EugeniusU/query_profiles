import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from './profile.model.js';

@ObjectType()
export class Skill {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Profile])
  profiles: Profile[];
}
