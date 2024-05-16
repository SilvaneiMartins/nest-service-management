import { hash } from "bcryptjs";
import { ConflictException } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Controller("/accounts")
export class CreateAccountController {
    constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(201)
    async handle(@Body() body: any) {
        const { name, email, password } = body;

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userWithSameEmail) {
            throw new ConflictException(
                "Já existe um usuário com o mesmo endereço de e-mail.",
            );
        }

        const hashedPassword = await hash(password, 8);

        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    }
}
