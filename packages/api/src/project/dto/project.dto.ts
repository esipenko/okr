import { UserEntity } from 'entities';
import { ProjectEntity } from 'entities/project.entity';
import { UserDto } from 'src/user/dto/user.dto';

export class ProjectDto {
    projectId: number;
    companyId: number;
    name: string;
    users: UserDto[];

    constructor(projectEntity: ProjectEntity, userEntities: UserEntity[]) {
        this.projectId = projectEntity.project_id;
        this.companyId = projectEntity.company_id;
        this.name = projectEntity.name;

        this.users = userEntities.map((userEntity) => new UserDto(userEntity));
    }
}
