import { Injectable } from '@nestjs/common';
import { ProjectEntity } from 'entities';
import { UserService } from 'src/user/user.service';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectFactory {
    constructor(readonly userService: UserService) {}

    async createProjectDto(project: ProjectEntity): Promise<ProjectDto> {
        const usersEntities = await this.userService.getUsersByProjectId(project.project_id);
        return new ProjectDto(project, usersEntities);
    }
}
