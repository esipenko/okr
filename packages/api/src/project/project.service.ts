import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectEntity } from 'entities';
import { ProjectEntity } from 'entities/project.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(UserProjectEntity)
        private userProjectRepositroy: Repository<UserProjectEntity>,
    ) {}

    async createProject(companyId: number, project: ProjectDto): Promise<ProjectEntity> {
        const projectEntity = await this.projectRepository.save({ name: project.name, company_id: companyId });

        if (projectEntity !== undefined) {
            await this.updateUsersOnProject(projectEntity.project_id, project.users);

            return projectEntity;
        }

        throw new BadRequestException();
    }

    getProject(projectId: number): Promise<ProjectEntity> {
        return this.projectRepository.findOne({ project_id: projectId, is_enabled: true });
    }

    async deleteProject(projectId: number): Promise<ProjectEntity> {
        const projectEntity = await this.getProject(projectId);

        if (projectEntity) {
            projectEntity.is_enabled = false;

            return this.projectRepository.save(projectEntity);
        }

        throw new NotFoundException();
    }

    async updateProject(projectDto: ProjectDto): Promise<ProjectEntity> {
        const projectEntity = await this.getProject(projectDto.projectId);

        if (projectEntity) {
            projectEntity.name = projectDto.name;
            await this.projectRepository.update(projectEntity, { name: projectDto.name });
            await this.updateUsersOnProject(projectEntity.project_id, projectDto.users);

            return projectEntity;
        }

        throw new NotFoundException();
    }

    async updateUsersOnProject(projectId: number, users: UserDto[]): Promise<UserProjectEntity[]> {
        await this.userProjectRepositroy.delete({ project_id: projectId });
        const userPromises = users.map((user) =>
            this.userProjectRepositroy.save({ project_id: projectId, user_id: user.userId }),
        );

        return Promise.all(userPromises);
    }

    getProjectsByCompanyId(companyId: number): Promise<ProjectEntity[]> {
        return this.projectRepository.find({ company_id: companyId, is_enabled: true });
    }

    async deleteUserFromProject(projectId: number, userId: number): Promise<void> {
        this.userProjectRepositroy.delete({ project_id: projectId, user_id: userId });
    }
}
