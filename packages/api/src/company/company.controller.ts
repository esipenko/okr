import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { Response } from 'express';
import { CompanyDto } from './dto/company.dto';
import { CompanyEntity } from 'entities';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @UseGuards(AuthGuard())
    @Get('/:company_id')
    async getCompany(@Param('company_id') companyId: number, @Res() response: Response): Promise<void> {
        const companyEntity = await this.companyService.getCompany(companyId);

        if (companyEntity !== undefined) {
            response.status(HttpStatus.OK).send(new CompanyDto(companyEntity));
        } else {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }

    @UseGuards(AuthGuard())
    @Post()
    async createCompany(@Body() companyDto: CompanyDto, @Res() response: Response): Promise<void> {
        this.companyService
            .createCompany(companyDto)
            .then((companyEntity: CompanyEntity) => {
                response.status(HttpStatus.OK).send(new CompanyDto(companyEntity));
            })
            .catch(() => {
                response.status(HttpStatus.BAD_REQUEST).send('Such company already exists');
            });
    }

    @UseGuards(AuthGuard())
    @Put('/:company_id')
    updateCompany(@Body() companyDto: CompanyDto, @Res() response: Response): void {
        this.companyService
            .updateCompany(companyDto)
            .then((companyEntity: CompanyEntity) => {
                response.status(HttpStatus.OK).send(new CompanyDto(companyEntity));
            })
            .catch((err) => {
                response.send(err);
            });
    }

    @UseGuards(AuthGuard())
    @Delete('/:company_id')
    deleteCompany(@Param('company_id') companyId: number, @Res() response: Response): void {
        this.companyService
            .deleteCompany(companyId)
            .then(() => {
                response.status(HttpStatus.OK).send();
            })
            .catch((err) => {
                response.send(err);
            });
    }
}
