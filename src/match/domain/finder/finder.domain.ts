import { Gender } from '../match/gender.domain';
import { IProfile } from '../profile/profile.domain';

export class Finder {
    find(): IProfile[] {
        throw new Error('Method find could be implemnted.');
    }
}
export class AllStrategy extends Finder {
    private profiles: IProfile[];
    constructor(profiles: IProfile[]) {
        super();
        this.profiles = profiles;
    }

    find(): IProfile[] {
        return this.profiles;
    }
}

export class GenderStrategy extends Finder {
    private profiles: IProfile[];
    private genders: Gender[];

    constructor(profiles: IProfile[], genders: Gender[]) {
        super();
        this.profiles = profiles;
        this.genders = genders;
    }

    find(): IProfile[] {
        let profiles: IProfile[] = [];
        this.genders.forEach((gender) => {
            const profileGender = this.profiles.filter(
                (profile) => profile.gender === gender,
            );
            if (profileGender.length > 0) {
                profiles = [...profiles, ...profileGender];
            }
        });
        return profiles;
    }
}

export class ContextFinder {
    private finderStrategy: Finder;
    setFinderStrategy(strategy: Finder) {
        this.finderStrategy = strategy;
    }

    findProfile() {
        if (!this.finderStrategy) {
            throw new Error('No se ha definido una estrategia de busqueda de perfiles.');
        }
        return this.finderStrategy.find();
    }
}
