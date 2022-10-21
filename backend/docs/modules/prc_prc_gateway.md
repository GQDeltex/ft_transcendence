[backend](../README.md) / [Exports](../modules.md) / prc/prc.gateway

# Module: prc/prc.gateway

## Table of contents

### Classes

- [CustomPrcExceptionFilter](../classes/prc_prc_gateway.CustomPrcExceptionFilter.md)
- [PrcGateway](../classes/prc_prc_gateway.PrcGateway.md)

### Functions

- [CurrentUserFromWs](prc_prc_gateway.md#currentuserfromws)

## Functions

### CurrentUserFromWs

▸ **CurrentUserFromWs**(...`dataOrPipes`): `ParameterDecorator`

Defines HTTP route param decorator

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`string` \| `PipeTransform`<`any`, `any`\> \| `Type`<`PipeTransform`<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

#### Defined in

node_modules/@nestjs/common/decorators/http/create-route-param-metadata.decorator.d.ts:10
