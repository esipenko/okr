import { CompanyEntity } from 'entities';

export class CompanyDto {
    companyId: number;
    name: string;

    constructor(companyEntity: CompanyEntity) {
        this.companyId = companyEntity.companyId;
        this.name = companyEntity.name;
    }
}
