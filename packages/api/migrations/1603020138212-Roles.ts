import { MigrationInterface, QueryRunner } from 'typeorm';

export class Roles1603020138212 implements MigrationInterface {
    name = 'Roles1603020138212';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "role" ("role_id" SERIAL NOT NULL PRIMARY KEY, "company_id" character varying, "name" character varying NOT NULL, "rules" character varying array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now())`,
        );
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "is_enabled"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleRoleId" integer`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleRoleId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "is_enabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP TABLE "role"`);
    }
}
