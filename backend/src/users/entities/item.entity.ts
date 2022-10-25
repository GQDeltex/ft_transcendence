import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  constructor(property: Item) {
    Object.assign(this, property);
  }

  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  picture: string;
}

// TODO: serve static picture from server instead
const itemList: Item[] = [
  new Item({
    id: 0,
    name: 'Sexy avatar',
    description: 'Sexy guy 001 modified',
    price: 6.69,
    picture:
      'https://github.com/GQDeltex/ft_transcendence/blob/main/frontend/src/assets/sexy-guy-001-modified.png?raw=true',
  }),
  new Item({
    id: 1,
    name: 'Sexier avatar',
    description: 'Sexier guy 001 modified',
    price: 69.69,
    picture:
      'https://github.com/GQDeltex/ft_transcendence/blob/main/frontend/src/assets/even-sexier-guy-001-modified.png?raw=true',
  }),
  new Item({
    id: 2,
    name: 'Sexiest avatar',
    description: 'Sexiest guy 001 modified',
    price: 696.69,
    picture:
      'https://github.com/GQDeltex/ft_transcendence/blob/main/frontend/src/assets/sexiest-guy-001-modified.png?raw=true',
  }),
];

export default itemList;
