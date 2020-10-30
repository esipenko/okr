import { ACLRule, defaultRules } from '../../api/src/roles/acl.rules';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultRoles1603903430415 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into('role')
            .values([
                { name: 'Administrator', rules: Object.values(ACLRule) },
                { name: 'User', rules: defaultRules },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM role');
    }
}
