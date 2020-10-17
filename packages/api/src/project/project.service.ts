import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity, UserEntity } from 'entities';
import { ProjectEntity } from 'entities/project.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CompanyEntity)
        private companyRepository: Repository<CompanyEntity>,
    ) {}

    async createProject(user: UserEntity, project: ProjectDto): Promise<ProjectEntity> {
        const projectEntity = await this.projectRepository.save({ name: project.name, company: user.company });

        await this.updateUsersOnProject(projectEntity.projectId, project.users);
        return projectEntity;
    }

    async getProject(projectId: number): Promise<ProjectEntity> {
        return await this.projectRepository.findOneOrFail({ projectId });
    }

    async deleteProject(projectId: number): Promise<ProjectEntity> {
        const entity = await this.getProject(projectId);
        await this.projectRepository.remove(entity);
        return entity;
    }

    async updateProject(projectDto: ProjectDto): Promise<ProjectEntity> {
        const projectEntity = await this.getProject(projectDto.projectId);

        projectEntity.name = projectDto.name;
        await this.projectRepository.update(projectEntity, { name: projectDto.name });
        await this.updateUsersOnProject(projectEntity.projectId, projectDto.users);

        return projectEntity;
    }

    async updateUsersOnProject(projectId: number, users: UserDto[]): Promise<ProjectEntity> {
        const project = await this.getProject(projectId);
        const userIds = users.map((u) => u.userId);
        const usersEntities = await this.userRepository.findByIds(userIds);
        project.users = usersEntities ?? [];
        return this.projectRepository.save(project);
    }

    async getProjectsByCompanyId(companyId: number): Promise<ProjectEntity[]> {
        const company = await this.companyRepository.findOneOrFail({
            relations: ['projects'],
            where: { companyId },
        });
        return company.projects;
    }

    async deleteUserFromProject(projectId: number, userId: number): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOneOrFail({
            relations: ['users'],
            where: { projectId },
        });

        const newUsers = project.users.filter((u) => u.userId !== +userId);

        project.users = newUsers;
        return this.projectRepository.save(project);
    }

    async getUsersByProjectId(projectId: number): Promise<UserEntity[]> {
        const project = await this.projectRepository.findOneOrFail({
            relations: ['users'],
            where: { projectId },
        });

        return project.users;
    }
}
