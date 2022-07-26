import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

export function LoginDocDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Login user' }),
        ApiBody({
            schema: {
                example: {
                    username: 'Omair123',
                    password: 'P@ssw0rd',
                },
            },
        }),
        ApiOkResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: {
                    statusCode: 200,
                    message: 'success',
                    data: {
                        token: '123',
                        user: {
                            username: 'Omair123',
                        },
                    },
                },
            },
        }),
    )
}
