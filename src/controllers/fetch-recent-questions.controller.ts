import { z } from "zod";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { JwtAutGuard } from "@/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";

const pageQueryParamSchema = z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/questions")
@UseGuards(JwtAutGuard)
export class FetchRecentQuestionsController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async handle(
        @Query("page", queryValidationPipe) page: PageQueryParamSchema,
    ) {
        const perPage = 2;

        const questions = await this.prisma.questions.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: {
                createdAt: "desc",
            },
        });

        return { questions };
    }
}
