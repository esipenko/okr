import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'entities';
import { Request } from 'express';
import { ACLRule } from 'src/roles/acl.rules';
import { RoleControl } from 'src/roles/decorator/role.decorator';
import { RoleGuard } from 'src/roles/guard/role.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { ProjectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    @RoleControl(ACLRule.PROJECTS_LIST)
    @UseGuards(AuthGuard(), RoleGuard)
    async getProjects(@Req() req: Request): Promise<ProjectDto[]> {
        const { user } = req;

        const projectEntities = await this.projectService.getProjectsByCompanyId(
            (user as UserEntity).company.companyId,
        );

        return projectEntities.map((p) => new ProjectDto(p));
    }

    @Get('/:project_id')
    @RoleControl(ACLRule.PROJECTS_LIST)
    @UseGuards(AuthGuard(), RoleGuard)
    async getProject(@Param('project_id') projectId: number): Promise<ProjectDto> {
        const projectEntity = await this.projectService.getProject(projectId);
        return new ProjectDto(projectEntity);
    }

    @Get('/:project_id/users')
    @RoleControl(ACLRule.PROJECTS_USERS_LIST)
    @UseGuards(AuthGuard(), RoleGuard)
    async getUsersByProjectId(@Param('project_id') projectId: number): Promise<UserDto[]> {
        const userEntities = await this.projectService.getUsersByProjectId(projectId);
        return userEntities.map((u) => new UserDto(u));
    }

    @Post()
    @RoleControl(ACLRule.PROJECTS_CREATE)
    @UseGuards(AuthGuard(), RoleGuard)
    async createProject(@Body() projectDto: ProjectDto, @Req() req: Request): Promise<ProjectDto> {
        const { user } = req;
        const projectEntity = await this.projectService.createProject(user as UserEntity, projectDto);
        return new ProjectDto(projectEntity);
    }

    @Put('/:project_id')
    @RoleControl(ACLRule.PROJECTS_UPDATE)
    @UseGuards(AuthGuard(), RoleGuard)
    async updateProject(@Body() projectDto: ProjectDto): Promise<ProjectDto> {
        const projectEntity = await this.projectService.updateProject(projectDto);
        return new ProjectDto(projectEntity);
    }

    @Delete('/:project_id')
    @RoleControl(ACLRule.PROJECTS_DELETE)
    @UseGuards(AuthGuard(), RoleGuard)
    async deleteProject(@Param('project_id') projectId: number): Promise<ProjectDto> {
        const projectEntity = await this.projectService.deleteProject(projectId);
        return new ProjectDto(projectEntity);
    }

    @Delete('/:project_id/delete-user/:user_id')
    @RoleControl(ACLRule.PROJECTS_UPDATE)
    @UseGuards(AuthGuard(), RoleGuard)
    async deleteUserFromProject(
        @Param('project_id') projectId: number,
        @Param('user_id') userId: number,
    ): Promise<ProjectDto> {
        const projectEntity = await this.projectService.deleteUserFromProject(projectId, userId);
        return new ProjectDto(projectEntity);
    }
}
