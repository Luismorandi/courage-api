import { ProfileDetails } from '../profileDetails/profileDetails';
import { ProfileInfo } from '../profileInfo/profileInfo.domain';
import { ProfilePhotos } from '../profilePhotos/profilePhostos';

export class Profile {
    private profileInfo: ProfileInfo;
    private profilePhotos?: ProfilePhotos;
    private profileDetails?: ProfileDetails;
    constructor(
        profileInfo: ProfileInfo,
        profilePhotos?: ProfilePhotos,
        profileDetails?: ProfileDetails,
    ) {
        this.profileInfo = profileInfo;
        this.profilePhotos = profilePhotos;
        this.profileDetails = profileDetails;
    }

    getProfileInfo(): ProfileInfo {
        return this.profileInfo;
    }
    getProfilePhotos(): ProfilePhotos | null {
        if (!this.profilePhotos) return null;
        return this.profilePhotos;
    }
    getProfileDetails(): ProfileDetails | undefined {
        return this.profileDetails;
    }
}
