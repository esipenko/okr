import {MigrationInterface, QueryRunner} from "typeorm";

export class ProjectsUnique1602428872122 implements MigrationInterface {
    name = 'ProjectsUnique1602428872122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "UQ_815e4ee6925deebc9ff264cff1e"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "UQ_815e4ee6925deebc9ff264cff1e" UNIQUE ("company_id", "name", "is_enabled")`);
    }

}
