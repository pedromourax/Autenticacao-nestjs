import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const data: Prisma.UsuarioCreateInput = {
      ...createUsuarioDto,
      senha: await bcrypt.hash(createUsuarioDto.senha, 10),
    }

    const usuarioCriado: CreateUsuarioDto = await this.prisma.usuario.create({ data });

    return {
      ...usuarioCriado, senha: undefined
    };
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
