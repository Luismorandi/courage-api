export enum Details {
    BIO = 'BIO',
    PHISIC_ATRACTION = 'PHISIC_ATRACTION',
    HEALTHY = 'HEALTHY',
    PROXIMITY = 'PROXIMITY',
    VULNERABILITY = 'VULNERABILITY',
    EMOTIONAL_CARE = 'EMOTIONAL_CARE',
    RELATION_TIME = 'RELATION_TIME',
    JOKE = 'JOKE',
}

export type IProfileDetails = {
    [key in Details]: string;
};
