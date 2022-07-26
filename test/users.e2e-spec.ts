import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController E2E Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()
        
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    describe('Test user when signing.', () => {

        it('should login a user', () => {
            return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: "abs123",
                password: "P@ssw0rd",
            })
            .expect(201);
        })

        it('should return a 401 code, when user entered invalid credentials', () => {
            return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: "abs123",
                password: "password"
            })
        })
    })

    describe('Test user when signing up or create user', () => {
        const sampleUserData = {
            roles: "Admin",
            firstName: "Omair",
            lastName: "Mangondaya",
            address: "Makati, City",
            postCode: "4217",
            contactNumber: "09303549784",
            email: "omair@gmail.com",
            username: "Omair123",
            password: "P@ssw0rd",
        }

        it('should create a new user', () => {
            return request(app.getHttpServer())
            .post('/users/register')
            .send({sampleUserData})
            .expect(201);
        })
    
        it('should response 400 code on username or email already used or registered when signing up account.', () => {
            return request(app.getHttpServer())
            .post('/users/register')
            .send({sampleUserData})
            .expect(400);
        })
    
        it('should response 400 code when fields are not complete when signing up account.', () => {
            return request(app.getHttpServer())
            .post('/users/register')
            .send({
                roles: "Admin",
                firstName: "",
                lastName: "Mangondaya",
                address: "",
                postCode: "",
                contactNumber: "09303549784",
                email: "omair@gmail.com",
                username: "Omair123",
                password: "P@ssw0rd",
            })
            .expect(400);
        })
    })

    describe('Test user when updating or modifying user details', () => {
        const sampleUserData = {
            roles: "Admin",
            firstName: "Omair",
            lastName: "Mangondaya",
            address: "Makati, City",
            postCode: "4217",
            contactNumber: "09303549784",
            email: "omair@gmail.com",
            username: "Omair123",
            password: "P@ssw0rd",
        }

        it('should return 401 code, when user is not signed in', () => {
            return request(app.getHttpServer())
            .patch('/users/edit/2')
            .send({
                ...sampleUserData, id: 3
            })
            .expect(401);
        })
    })

    describe('Test user when deleting of user', () => {
        const sampleUserId = [4];

        it('should return 401 code, when user is not signed in', () => {
            return request(app.getHttpServer())
            .delete('/users/delete/4')
            .send({
                sampleUserId
            })
            .expect(401);
        })
    })

    describe('Test user when get list of all users', () => {
        const sampleUserId = [4];

        it('should return 401 code, when user is not signed in', () => {
            return request(app.getHttpServer())
            .get('/users/display')
            .expect(401);
        })
    })


})