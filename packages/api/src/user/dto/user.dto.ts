import { CompanyDto } from 'src/company/dto/company.dto';
import { CompanyEntity, UserEntity } from '../../../entities';

export class UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    email?: string;
    company?: CompanyDto;

    constructor(user: UserEntity, companyEntity?: CompanyEntity) {
        this.userId = user.user_id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;

        if (companyEntity !== undefined) {
            this.company = new CompanyDto(companyEntity);
        }
    }
}
