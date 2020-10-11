import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_project')
export class UserProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_id: number;

    @Column({ nullable: false })
    project_id: number;
}
