import { z } from "zod";
import { JwtService } from "@nestjs/jwt";
import { UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

// const authenticatedBodySchema = z.object({
//     name: z.string(),
//     email: z.string().email(),
//     password: z.string(),
// });

// type AuthenticatedBodySchema = z.infer<typeof authenticatedBodySchema>;

@Controller("/sessions")
export class AuthenticatedController {
    constructor(private jwt: JwtService) {}

    @Post()
    // @HttpCode(201)
    // @UsePipes(new ZodValidationPipe(authenticatedBodySchema))
    async handle() {
        const token = this.jwt.sign({ sub: "user-id" });
        return token;
    }
}
