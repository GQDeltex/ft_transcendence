import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum AllowedUpdateEquippedItemsMethod {
  EQUIP = 'EQUIP',
  UNEQUIP = 'UNEQUIP',
}

registerEnumType(AllowedUpdateEquippedItemsMethod, {
  name: 'AllowedUpdateEquippedItemsMethod',
});

@ArgsType()
export class UpdateUserEquippedItemsInput {
  @IsNotEmpty()
  @Field(() => AllowedUpdateEquippedItemsMethod)
  method: AllowedUpdateEquippedItemsMethod;

  @IsNotEmpty()
  @Field(() => Int)
  itemId: number;
}
