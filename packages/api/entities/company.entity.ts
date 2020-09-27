import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    company_id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ default: true })
    is_enabled: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
