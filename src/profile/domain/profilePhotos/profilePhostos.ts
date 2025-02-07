import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfilePhotos {
    private photos: string[];
    constructor() {
        this.photos = [];
    }
    addPhoto(photo: string) {
        this.photos.push(photo);
    }
    getPhotos(): string[] {
        return this.photos;
    }
}
