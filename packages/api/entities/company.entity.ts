import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn({ name: 'company_id' })
    companyId: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ name: 'is_enabled', default: true })
    isEnabled: boolean;

    @OneToMany(() => UserEntity, (users) => users.company)
    users: UserEntity[];

    @OneToMany(() => ProjectEntity, (projects) => projects.company)
    projects: ProjectEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
