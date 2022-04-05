import { applyDecorators, Type } from "@nestjs/common";
import * as NestJS from "@nestjs/swagger";
import { ApiOkDto } from "../dto";

export const ApiOkResponse = <TModel extends Type<any>>(
    model: TModel
) => {
    return applyDecorators(
        NestJS.ApiExtraModels(ApiOkDto),
        NestJS.ApiOkResponse({
            schema: {
                type: 'object',
                properties:{
                    data: {
                        $ref: NestJS.getSchemaPath(model)
                    }
                },
            },

        })
    );
};