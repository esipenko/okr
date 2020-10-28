import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ProjectEntity } from './project.entity';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({ name: 'first_name', nullable: false })
    firstName: string;

    @Column({ name: 'last_name', nullable: false })
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    salt: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => CompanyEntity, (company) => company.users, { eager: true })
    company: CompanyEntity;

    @ManyToMany(() => ProjectEntity, (project) => project.users)
    @JoinTable({
        name: 'projects_to_users',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'userId',
        },
        inverseJoinColumn: {
            name: 'project_id',
            referencedColumnName: 'projectId',
        },
    })
    projects: ProjectEntity[];

    @ManyToOne(() => RoleEntity, (role) => role.users, { eager: true })
    role: RoleEntity;

    @Column({ name: 'is_enabled', default: true })
    isEnabled: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
