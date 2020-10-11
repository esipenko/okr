import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'entities';
import { Response, Request } from 'express';
import { ProjectDto } from './dto/project.dto';
import { ProjectFactory } from './factory/project.factory';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard())
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService, private readonly projectFactory: ProjectFactory) {}

    @Get()
    getProjects(@Req() req: Request, @Res() response: Response): void {
        const { user } = req;

        this.projectService
            .getProjectsByCompanyId((user as UserEntity).company_id)
            .then((projectEntities) => {
                const projectsDto = projectEntities.map((projectEntity) =>
                    this.projectFactory.createProjectDto(projectEntity),
                );

                Promise.all(projectsDto).then((projects) => {
                    response.status(HttpStatus.OK).send(projects);
                });
            })
            .catch((err) => {
                response.status(HttpStatus.BAD_REQUEST).send(err);
            });
    }

    @Get('/:project_id')
    getProject(@Param('project_id') projectId: number, @Res() response: Response): void {
        this.projectService
            .getProject(projectId)
            .then(async (projectEntity) => {
                const projectDto = await this.projectFactory.createProjectDto(projectEntity);
                response.status(HttpStatus.OK).send(projectDto);
            })
            .catch(() => {
                response.send(HttpStatus.NOT_FOUND).send();
            });
    }

    @Post()
    createProject(@Body() projectDto: ProjectDto, @Req() req: Request, @Res() response: Response): void {
        const { user } = req;
        this.projectService
            .createProject((user as UserEntity).company_id, projectDto)
            .then(async (projectEntity) => {
                response.status(HttpStatus.OK).send(await this.projectFactory.createProjectDto(projectEntity));
            })
            .catch((err) => {
                response.status(HttpStatus.BAD_REQUEST).send(err);
            });
    }

    @Put('/:project_id')
    updateProject(@Body() projectDto: ProjectDto, @Res() response: Response): void {
        this.projectService
            .updateProject(projectDto)
            .then(async (projectEntity) => {
                response.status(HttpStatus.OK).send(await this.projectFactory.createProjectDto(projectEntity));
            })
            .catch((err) => {
                response.status(err.status).send(err);
            });
    }

    @Delete('/:project_id')
    deleteProject(@Param('project_id') projectId: number, @Res() response: Response): void {
        this.projectService
            .deleteProject(projectId)
            .then(() => {
                response.status(HttpStatus.OK).send();
            })
            .catch((err) => {
                response.send(err);
            });
    }

    @Delete('/:project_id/delete-user/:user_id')
    deleteUserFromProject(@Param('project_id') projectId: number, @Param('user_id') userId: number): Promise<void> {
        return this.projectService.deleteUserFromProject(projectId, userId);
    }
}
