export interface FilterProfile {
    gender?: string[];
    ageRange?: { min: number; max: number };
    role?: string;
    status?: string;
    type?: Date;
}
