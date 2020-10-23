import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'entities';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private companyRepository: Repository<CompanyEntity>,
    ) {}

    async createCompany(companyDto: CompanyDto): Promise<CompanyEntity> {
        return this.companyRepository.save({ name: companyDto.name });
    }

    async getCompany(companyId: number): Promise<CompanyEntity> {
        return await this.companyRepository.findOneOrFail(companyId);
    }

    async updateCompany(companyDto: CompanyDto): Promise<CompanyEntity> {
        const companyEntity = await this.getCompany(companyDto.companyId);

        if (companyEntity !== undefined) {
            companyEntity.name = companyDto.name;
            return this.companyRepository.save(companyEntity);
        }
    }

    async deleteCompany(companyId: number): Promise<CompanyEntity> {
        const companyEntity = await this.getCompany(companyId);
        await this.companyRepository.remove(companyEntity);
        return companyEntity;
    }
}
