import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'senha muito fraca',
    })
    senha: string;

    @IsString()
    nome: string
}
