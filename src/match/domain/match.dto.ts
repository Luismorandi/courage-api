import { IsDefined, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMatchInput {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    from: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    to: string;
}

export class FinderPosibleMatchInput {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    finderName: string;

    @IsOptional()
    @IsObject()
    arg: Record<string, any>;
}
