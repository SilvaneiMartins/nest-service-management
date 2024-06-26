import { z } from "zod";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { UserPayload } from "@/infra/auth/jwt.strategy";
import { JwtAutGuard } from "@/infra/auth/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
@UseGuards(JwtAutGuard)
export class CreateQuestionsController {
    constructor(private createQuestions: CreateQuestionUseCase) {}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload,
    ) {
        const { title, content } = body;
        const userId = user.sub;

        await this.createQuestions.execute({
            title,
            content,
            authorId: userId,
            attachmentsIds: [],
        });
    }
}
