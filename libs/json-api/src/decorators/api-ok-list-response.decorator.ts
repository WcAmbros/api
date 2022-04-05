import { applyDecorators, Type } from "@nestjs/common";
import * as NestJS from "@nestjs/swagger";
import { ApiOkListDto } from "../dto";

export const ApiOkListResponse = <TModel extends Type<any>>(
    model: TModel
) => {

    return applyDecorators(
        NestJS.ApiExtraModels(ApiOkListDto),
        NestJS.ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: NestJS.getSchemaPath(ApiOkListDto) },
                    {
                        properties: {
                            data: {
                                type: "array",
                                items: { $ref: NestJS.getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        })
    );
};