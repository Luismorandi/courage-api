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

    @IsOptional() // Si el argumento 'arg' es opcional, puedes marcarlo con @IsOptional
    @IsObject() // Agrego una validación de tipo 'object' a 'arg'
    arg: Record<string, any>; // Definir `arg` como un objeto clave-valor opcional
}
