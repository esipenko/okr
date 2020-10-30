import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACLRule } from 'src/roles/acl.rules';
import { RoleControl } from 'src/roles/decorator/role.decorator';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @UseGuards(AuthGuard())
    @Get('/:company_id')
    @RoleControl(ACLRule.COMPANY_READ)
    async getCompany(@Param('company_id') companyId: number): Promise<CompanyDto> {
        const companyEntity = await this.companyService.getCompany(companyId);
        return new CompanyDto(companyEntity);
    }

    @UseGuards(AuthGuard())
    @Post()
    async createCompany(@Body() companyDto: CompanyDto): Promise<CompanyDto> {
        const companyEntity = await this.companyService.createCompany(companyDto);
        return new CompanyDto(companyEntity);
    }

    @UseGuards(AuthGuard())
    @Put('/:company_id')
    @RoleControl(ACLRule.COMPANY_UPDATE)
    async updateCompany(@Body() companyDto: CompanyDto): Promise<CompanyDto> {
        const companyEntity = await this.companyService.updateCompany(companyDto);
        return new CompanyDto(companyEntity);
    }

    @UseGuards(AuthGuard())
    @Delete('/:company_id')
    @RoleControl(ACLRule.COMPANY_DELETE)
    async deleteCompany(@Param('company_id') companyId: number): Promise<CompanyDto> {
        const companyEntity = await this.companyService.deleteCompany(companyId);
        return new CompanyDto(companyEntity);
    }
}
