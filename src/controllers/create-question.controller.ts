import { Controller, Post, UseGuards } from "@nestjs/common";

import { JwtAutGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/questions")
@UseGuards(JwtAutGuard)
export class CreateQuestionsController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle() {
        return "Ok";
    }
}
