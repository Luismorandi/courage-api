export const HASH_SALT = process.env.HASH_SALT ?? 10;

export enum EnumUserRepository {
    PROFILE_REPOSITORY = 'IProfileRepository',
    USER_REPOSITORY = 'IUserRepository',
}
