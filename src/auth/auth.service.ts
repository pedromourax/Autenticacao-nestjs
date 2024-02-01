import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioSerice: UsuarioService,
        private readonly JwtService: JwtService
    ) { }


    async validateUser(email: string, senha: string) {
        const user = await this.usuarioSerice.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (isPasswordValid) {
                return user;
            }
        }
        throw new UnauthorizedException;
    }

    async login(email: string, senha: string) {
        const usuario = await this.validateUser(email, senha);

        const { senha: _, ...result } = usuario;
        const token = this.JwtService.sign(result)

        return { token }
    }


    async getProfile(request: any) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const user = await this.JwtService.decode(token);
        const { iat, exp, ...result } = user
        return result
    }
}
