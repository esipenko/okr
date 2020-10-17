import { CompanyDto } from 'src/company/dto/company.dto';
import { UserEntity } from '../../../entities';

export class UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    email?: string;
    company?: CompanyDto;

    constructor(user: UserEntity) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;

        if (user.company) {
            this.company = new CompanyDto(user.company);
        }
    }
}
