import { z } from "zod";
import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

const authenticatedBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type AuthenticatedBodySchema = z.infer<typeof authenticatedBodySchema>;

@Controller("/sessions")
export class AuthenticatedController {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    @Post()
    // @HttpCode(201)
    @UsePipes(new ZodValidationPipe(authenticatedBodySchema))
    async handle(@Body() body: AuthenticatedBodySchema) {
        const { email, password } = body;

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnauthorizedException("User credentials do not match.");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("User credentials do not match.");
        }

        const accessToken = this.jwt.sign({ sub: user.id });

        return {
            access_token: accessToken,
        };
    }
}
