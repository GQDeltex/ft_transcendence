import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  constructor(property: Item) {
    Object.assign(this, property);
  }

  @Field(() => Int)
  id: number;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  picture: string;

  @Field()
  metadata: string;
}

const itemList: Item[] = [
  new Item({
    id: 0,
    type: 'map',
    name: 'Blue map',
    description: 'Blue map',
    price: 6.69,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/800px-Solid_blue.svg.png',
    metadata: 'blue',
  }),
  new Item({
    id: 1,
    type: 'map',
    name: 'Red map',
    description: 'Red map',
    price: 6.69,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png',
    metadata: 'red',
  }),
  new Item({
    id: 2,
    type: 'map',
    name: 'Yellow map',
    description: 'Yellow map',
    price: 6.69,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/d/d0/Color-yellow.JPG',
    metadata: 'yellow',
  }),
  new Item({
    id: 3,
    type: 'ball',
    name: 'Blue ball',
    description: 'Blue ball',
    price: 6.69,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/800px-Solid_blue.svg.png',
    metadata: 'blue',
  }),
  new Item({
    id: 4,
    type: 'ball',
    name: 'Red ball',
    description: 'Red ball',
    price: 6.69,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png',
    metadata: 'red',
  }),
  new Item({
    id: 5,
    type: 'ball',
    name: 'Yellow ball',
    description: 'Yellow ball',
    price: 6.69,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/d/d0/Color-yellow.JPG',
    metadata: 'yellow',
  }),
];

export default itemList;
