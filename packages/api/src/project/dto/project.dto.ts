import { ProjectEntity } from 'entities/project.entity';
import { UserDto } from 'src/user/dto/user.dto';

export class ProjectDto {
    projectId: number;
    name: string;
    users: UserDto[];

    constructor(projectEntity: ProjectEntity) {
        this.projectId = projectEntity.projectId;
        this.name = projectEntity.name;
        this.users = projectEntity?.users?.map((userEntity) => new UserDto(userEntity));
    }
}
