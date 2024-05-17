import { z } from "zod";
import { hash } from "bcryptjs";
import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
    constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
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
