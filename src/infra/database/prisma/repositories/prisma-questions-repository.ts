import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { PrismaQuestionsMapper } from "../mappers/prisma-questions-mappers";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async findById(id: string): Promise<Question | null> {
        const question = await this.prisma.questions.findUnique({
            where: { id }
        })

        if (!question) {
            return null
        }

        return PrismaQuestionsMapper.toDomain(question)
    }

    findBySlug(slug: string): Promise<Question> {
        throw new Error("Method not implemented.");
    }

    findManyRecent(params: PaginationParams): Promise<Question[]> {
        throw new Error("Method not implemented.");
    }

    save(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }

    create(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }
}