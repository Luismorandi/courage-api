import { Profile } from "./profile.domain";

export interface IProfileRepository{
     save(user: Profile): Promise<Profile|Error>
}