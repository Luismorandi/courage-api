import { QuestionStatu } from '../profileInfo/profileInfo.status';
import { Details } from '../profileDetails/details';

export class Question {
    private readonly id?: string;
    private value: string;
    private type: Details;
    private status: QuestionStatu;
    constructor(id: string, value: string, type: Details, status: QuestionStatu) {
        this.id = id;
        this.value = value;
        this.type = type;
        this.status = status;
    }

    getId(): string | null {
        if (!this.id) return null;
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
}
