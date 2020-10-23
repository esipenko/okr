import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { Token } from './interfaces/token.interface';
import { InvalidEmailOrPasswordError } from './errors';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    createToken(user: JwtPayload): Token {
        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn: 3600,
            accessToken,
        };
    }

    async validateUser(email: string, password: string): Promise<LoginDto> {
        const user = await this.userService.getUserByEmail(email);

        if (user && user.isEnabled) {
            const shasum = crypto.createHash('sha1');
            shasum.update(user.salt + password);

            if (user.password === shasum.digest('hex')) {
                const token = this.createToken({ userId: user.userId });
                return new LoginDto(user, token);
            }
        }

        throw new InvalidEmailOrPasswordError();
    }
}
