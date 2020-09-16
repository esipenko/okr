import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() req: AuthUserDto, @Res() res: Response): void {
        this.authService
            .validateUser(req.email, req.password)
            .then((user: LoginDto) => {
                res.status(HttpStatus.OK).send(user);
            })
            .catch((err: any) => {
                res.status(HttpStatus.UNAUTHORIZED).send(err.message);
            });
    }
}
