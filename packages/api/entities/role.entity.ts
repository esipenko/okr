import { ACLRule } from 'src/roles/acl.rules';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn('increment', { name: 'role_id' })
    roleId: number;

    @Column({ name: 'company_id', nullable: true })
    companyId: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'rules', type: 'varchar', array: true })
    rules: ACLRule[];

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
