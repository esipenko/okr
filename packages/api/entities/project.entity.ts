import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('project')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    project_id: number;

    @Column({ nullable: false })
    company_id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ default: true })
    is_enabled: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
