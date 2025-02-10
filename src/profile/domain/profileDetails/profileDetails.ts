import { Details } from './details';

export class ProfileDetails {
    private details: Record<Details, string>;
    constructor(details: Record<Details, string>) {
        this.details = details;
    }

    getDetails(): Record<Details, string> {
        return this.details;
    }

    getDetail(detail: Details): string {
        const detailFound = this.details[detail];
        if (!detailFound) throw new Error(`Detail ${detail} not found.`);
        return detailFound;
    }
    setDetail(detail: string, value: string): void {
        if (!Details.hasOwnProperty(detail)) return;
        this.details[detail as Details] = value;
    }
}
