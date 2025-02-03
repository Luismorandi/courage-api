import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

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
