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

    async findBySlug(slug: string): Promise<Question> {
        const question = await this.prisma.questions.findUnique({
            where: { slug }
        })

        if (!question) {
            return null
        }

        return PrismaQuestionsMapper.toDomain(question)
    }

    async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
        const questions = await this.prisma.questions.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return questions.map(question => PrismaQuestionsMapper.toDomain(question))
    }

    async create(question: Question): Promise<void> {
        const data = PrismaQuestionsMapper.toPrisma(question)

        await this.prisma.questions.create({
            data
        })
    }

    async save(question: Question): Promise<void> {
        const data = PrismaQuestionsMapper.toPrisma(question)

        await this.prisma.questions.update({
            where: { id: data.id },
            data
        })
    }

    async delete(question: Question): Promise<void> {
        const data = PrismaQuestionsMapper.toPrisma(question)

        await this.prisma.questions.delete({
            where: { id: data.id }
        })
    }
}