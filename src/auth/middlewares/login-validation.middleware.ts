import { BadRequestException } from "@nestjs/common";
import { validate } from "class-validator";
import { Response, Request, NextFunction } from "express";
import { LoginRequestBody } from "../models/loginRequestBody";

export class LoginValidationMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const userRequestBody = new LoginRequestBody();
        userRequestBody.email = req.body.email;
        userRequestBody.senha = req.body.senha;

        const validations = await validate(userRequestBody);

        if (validations.length > 0) {
            throw new BadRequestException("Email ou Senha inválidos");
        }

        next();
    }
}