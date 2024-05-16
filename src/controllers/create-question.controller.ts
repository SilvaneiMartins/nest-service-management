import { Controller, Post, UseGuards } from "@nestjs/common";

import { UserPayload } from "src/auth/jwt.strategy";
import { JwtAutGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { CurrentUser } from "src/auth/current-user-decorator";

@Controller("/questions")
@UseGuards(JwtAutGuard)
export class CreateQuestionsController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(@CurrentUser() user: UserPayload) {
        console.log(user.sub);
        return "Ok";
    }
}
