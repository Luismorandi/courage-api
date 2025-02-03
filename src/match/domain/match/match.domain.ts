export class Match {
    private readonly id?: string;
    private to: string;
    private from: string;
    private readonly createdAt: Date;

    constructor({
        id,
        to,
        from,
        createdAt = new Date(),
    }: {
        id?: string;
        from: string;
        to: string;
        createdAt?: Date;
    }) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.createdAt = createdAt;
    }

    getId(): string | null {
        if (!this.id) return null;
        return this.id;
    }

    getFrom(): string {
        return this.from;
    }

    getTo(): string {
        return this.to;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
}
