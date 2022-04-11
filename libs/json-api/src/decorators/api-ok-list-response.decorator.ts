import { applyDecorators, Type } from '@nestjs/common';
import * as NestJS from '@nestjs/swagger';
import { ResponseOkListDto } from '../dto';

export const ApiOkListResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    NestJS.ApiExtraModels(ResponseOkListDto),
    NestJS.ApiOkResponse({
      schema: {
        allOf: [
          { $ref: NestJS.getSchemaPath(ResponseOkListDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: NestJS.getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
