import { ProfileInfo } from '../profileInfo/profileInfo.domain';
import { ProfilePhotos } from './profilePhostos';

export interface IProfilePhotosRepository {
    save(photos: ProfilePhotos, profile: ProfileInfo): Promise<void>;
}
