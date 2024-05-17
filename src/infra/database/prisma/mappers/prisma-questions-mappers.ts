import { Questions as PrismaQuestions } from "@prisma/client"
import { Question } from "@/domain/forum/enterprise/entities/question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"

export class PrismaQuestionsMapper {
    static toDomain(raw: PrismaQuestions): Question {
        return Question.create({
            title: raw.title,
            content: raw.content,
            authorId: new UniqueEntityID(raw.authorId),
            bestAnswerId: undefined,
            slug: Slug.create(raw.slug),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new UniqueEntityID(raw.id))
    }
}