import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';

@Entity('project')
export class ProjectEntity {
    @PrimaryGeneratedColumn({ name: 'project_id' })
    projectId: number;

    @ManyToOne(() => CompanyEntity, (company) => company.projects)
    company: CompanyEntity;

    @Column({ nullable: false })
    name: string;

    @ManyToMany(() => UserEntity, (users) => users.projects)
    users: UserEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
