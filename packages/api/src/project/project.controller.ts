import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'entities';
import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard())
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    async getProjects(@Req() req: Request): Promise<ProjectDto[]> {
        const { user } = req;

        const projectEntities = await this.projectService.getProjectsByCompanyId(
            (user as UserEntity).company.companyId,
        );

        return projectEntities.map((p) => new ProjectDto(p));
    }

    @Get('/:project_id')
    async getProject(@Param('project_id') projectId: number): Promise<ProjectDto> {
        const projectEntity = await this.projectService.getProject(projectId);
        return new ProjectDto(projectEntity);
    }

    @Get('/:project_id/users')
    async getUsersByProjectId(@Param('project_id') projectId: number): Promise<UserDto[]> {
        const userEntities = await this.projectService.getUsersByProjectId(projectId);
        return userEntities.map((u) => new UserDto(u));
    }

    @Post()
    async createProject(@Body() projectDto: ProjectDto, @Req() req: Request): Promise<ProjectDto> {
        const { user } = req;
        const projectEntity = await this.projectService.createProject(user as UserEntity, projectDto);
        return new ProjectDto(projectEntity);
    }

    @Put('/:project_id')
    async updateProject(@Body() projectDto: ProjectDto): Promise<ProjectDto> {
        const projectEntity = await this.projectService.updateProject(projectDto);
        return new ProjectDto(projectEntity);
    }

    @Delete('/:project_id')
    async deleteProject(@Param('project_id') projectId: number): Promise<ProjectDto> {
        const projectEntity = await this.projectService.deleteProject(projectId);
        return new ProjectDto(projectEntity);
    }

    @Delete('/:project_id/delete-user/:user_id')
    async deleteUserFromProject(
        @Param('project_id') projectId: number,
        @Param('user_id') userId: number,
    ): Promise<ProjectDto> {
        const projectEntity = await this.projectService.deleteUserFromProject(projectId, userId);
        return new ProjectDto(projectEntity);
    }
}
