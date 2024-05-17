import { Injectable } from "@nestjs/common";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
    findById(id: string): Promise<Answer> {
        throw new Error("Method not implemented.");
    }

    findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]> {
        throw new Error("Method not implemented.");
    }

    create(answer: Answer): Promise<void> {
        throw new Error("Method not implemented.");
    }

    save(answer: Answer): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(answer: Answer): Promise<void> {
        throw new Error("Method not implemented.");
    }
}