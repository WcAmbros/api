import { applyDecorators, Type } from "@nestjs/common";
import * as NestJS from "@nestjs/swagger";
import { ResponseOkDto } from "../dto";

export const ApiOkResponse = <TModel extends Type<any>>(
    model: TModel
) => {
    return applyDecorators(
        NestJS.ApiExtraModels(model),
        NestJS.ApiExtraModels(ResponseOkDto),
        NestJS.ApiOkResponse({
            schema: {
                type: 'object',
                properties:{
                    data: {
                        $ref: NestJS.getSchemaPath(model)
                    }
                },
            }
        }),
    );
};