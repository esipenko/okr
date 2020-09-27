import { CompanyEntity, UserEntity } from 'entities';
import { UserDto } from 'src/user/dto/user.dto';
import { Token } from '../interfaces/token.interface';

export class LoginDto {
    user: UserDto;
    token: Token;

    constructor(userEntity: UserEntity, companyEntity: CompanyEntity, token: Token) {
        this.token = token;
        this.user = new UserDto(userEntity, companyEntity);
    }
}
