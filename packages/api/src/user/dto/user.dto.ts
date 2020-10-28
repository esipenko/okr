import { CompanyDto } from 'src/company/dto/company.dto';
import { RoleDto } from 'src/roles/dto/role.dto';
import { UserEntity } from '../../../entities';

export class UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    email?: string;
    company?: CompanyDto;
    role?: RoleDto;

    constructor(user: UserEntity) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;

        if (user.company) {
            this.company = new CompanyDto(user.company);
        }

        if (user.role) {
            this.role = user.role;
        }
    }
}
