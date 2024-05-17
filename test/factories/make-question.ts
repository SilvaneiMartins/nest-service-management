import { faker } from '@faker-js/faker'

import {
    Question,
    QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityID,
) {
    const question = Question.create(
        {
            authorId: new UniqueEntityID(),
            title: faker.lorem.sentence(),
            content: faker.lorem.text(),
            ...override,
        },
        id,
    )

    return question
}
