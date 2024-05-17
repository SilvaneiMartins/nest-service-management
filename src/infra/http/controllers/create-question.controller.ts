import { z } from "zod";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { UserPayload } from "@/infra/auth/jwt.strategy";
import { JwtAutGuard } from "@/infra/auth/jwt-auth.guard";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
@UseGuards(JwtAutGuard)
export class CreateQuestionsController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload,
    ) {
        const { title, content } = body;
        const userId = user.sub;

        const slug = this.convertToSlug(title);

        await this.prisma.questions.create({
            data: {
                authorId: userId,
                title,
                content,
                slug,
            },
        });
    }

    private convertToSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    }
}