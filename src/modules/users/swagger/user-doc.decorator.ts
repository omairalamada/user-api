import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { STATUS_CODES } from 'http'


const GetAllUsersDoc = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get of all users' }),
        ApiOkResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    statusCode: STATUS_CODES.Success,
                    message: 'success',
                    data: [
                        {
                            firstName: "Omair",
                            lastName: "Mangondaya",
                            address: "Lipa City, Batangas",
                            postCode: 4217,
                            contactNumber: "09303549784",
                            email: "omair@gmail.com",
                            username: "Omair123"
                        },
                        {
                            firstName: "Juan",
                            lastName: "Dela Cruz",
                            address: "Makati, City",
                            postCode: 4217,
                            contactNumber: "09878889888",
                            email: "juan@gmail.com",
                            username: "juan123"
                        },
                    ],
                },
            },
        }),
    )

    const EditUserDocDecorator = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update user by id' }),
        ApiBody({
            schema: {
                example: {
                    firstName: "Omair",
                    lastName: "Mangondaya",
                    address: "Lipa City, Batangas",
                    postCode: 4217,
                    contactNumber: "09303549784",
                    email: "omair@gmail.com",
                    username: "Omair123",
                    password: "P@ssw0rd",
                },
            },
        }),
    )

    const RegisterUserDocDecorator = () =>
    applyDecorators(
        ApiOperation({ summary: 'Register user' }),
        ApiBody({
            schema: {
                example: {
                    roles: 'Admin',
                    firstName: "Omair",
                    lastName: "Mangondaya",
                    address: "Lipa City, Batangas",
                    postCode: 4217,
                    contactNumber: "09303549784",
                    email: "omair@gmail.com",
                    username: "Omair123",
                    password: "P@ssw0rd",
                },
            },
        }),

        ApiOkResponse({
            status: 201,
            description: 'Success',
            schema: {
                example: {
                    statusCode: 201,
                    message: 'Success',
                    data: {
                        firstName: "Omair",
                        lastName: "Mangondaya",
                        address: "Lipa City, Batangas",
                        postCode: 4217,
                        contactNumber: "09303549784",
                        email: "omair@gmail.com",
                        username: "Omair123"
                    },
                },
            },
        }),
    )

export { GetAllUsersDoc, EditUserDocDecorator, RegisterUserDocDecorator }
