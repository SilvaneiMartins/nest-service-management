import { hash } from 'bcryptjs'
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/infra/app.module'

describe('Authenticate (E2E)', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('[POST] /sessions', async () => {
        const response = await request(app.getHttpServer())
            .post('/sessions')
            .send({
                email: 'test@example.com',
                password: 'testpassword',
            });

        console.log('Response body:', response.body);
        console.log('Response status:', response.statusCode);

        expect(response.statusCode).toBe(201);
    });

    afterAll(async () => {
        await app.close();
    });
})