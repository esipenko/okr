import { BadRequestException, Injectable } from '@nestjs/common';
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
        const companyEntity = await this.companyRepository.findOne(companyId);

        if (companyEntity !== undefined && companyEntity.is_enabled === true) {
            return companyEntity;
        } else {
            throw new BadRequestException('Company does not exists');
        }
    }

    async updateCompany(companyDto: CompanyDto): Promise<CompanyEntity> {
        const companyEntity = await this.getCompany(companyDto.companyId);

        if (companyEntity !== undefined) {
            companyEntity.name = companyDto.name;
            return this.companyRepository.save(companyEntity);
        } else {
            throw new BadRequestException('Company does not exists');
        }
    }

    async deleteCompany(companyId: number): Promise<CompanyEntity> {
        const companyEntity = await this.getCompany(companyId);

        if (companyEntity !== undefined) {
            companyEntity.is_enabled = false;
            return this.companyRepository.save(companyEntity);
        } else {
            throw new BadRequestException('Company does not exists');
        }
    }
}
