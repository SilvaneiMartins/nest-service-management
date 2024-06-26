import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaQuestionAttachmentsARepository } from "./prisma/repositories/prisma-question-attachments-repository";

import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";

@Module({
    providers: [
        PrismaService,
        PrismaAnswersRepository,
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRepository,
        },
        PrismaAnswerCommentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaQuestionAttachmentsARepository,
    ],
    exports: [
        PrismaService,
        PrismaAnswersRepository,
        QuestionsRepository,
        PrismaAnswerCommentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaQuestionAttachmentsARepository,
    ],
})
export class DatabaseModule {}
