import { CompanyEntity } from 'entities';

export class CompanyDto {
    companyId: number;
    name: string;

    constructor(companyEntity: CompanyEntity) {
        this.companyId = companyEntity.company_id;
        this.name = companyEntity.name;
    }
}
