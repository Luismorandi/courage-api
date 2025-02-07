import { Details } from './details';

export class ProfileDetails {
    private photos: string[];
    private details: Record<Details, string>;
    constructor(photos: string[], details: Record<Details, string>) {
        this.photos = photos;
        this.details = details;
    }

    getPhotos(): string[] {
        return this.photos;
    }

    getDetails(): Record<Details, string> {
        return this.details;
    }

    getDetail(detail: Details): string {
        const detailFound = this.details[detail];
        if (!detailFound) throw new Error(`Detail ${detail} not found.`);
        return detailFound;
    }
}
