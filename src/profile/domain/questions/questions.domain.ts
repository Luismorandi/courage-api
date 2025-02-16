import { QuestionStatu } from '../profileInfo/profileInfo.status';
import { Details } from '../profileDetails/details';

export class Question {
    private readonly id: string;
    private value: string;
    private type: Details;
    private status: QuestionStatu;
    private createdAt: Date;
    private updatedAt: Date;
    constructor(
        id: string,
        value: string,
        type: Details,
        status: QuestionStatu,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.value = value;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getId(): string {
        return this.id;
    }
    getValue(): string {
        return this.value;
    }
    getType(): Details {
        return this.type;
    }
    getStatus(): string {
        return this.status;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date {
        return this.updatedAt;
    }
}
