import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('login')
    async login(@Body() req: AuthUserDto): Promise<LoginUserDto> {
        return await this.authService.validateUser(req.email, req.password);
    }
}
