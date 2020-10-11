import { MigrationInterface, QueryRunner } from 'typeorm';

export class Projects1602409407190 implements MigrationInterface {
    name = 'Projects1602409407190';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "project" ("project_id" SERIAL NOT NULL, "company_id" integer NOT NULL, "name" character varying NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a8834dc912b3c8d8e4e17fcc061" UNIQUE ("name", "company_id"), CONSTRAINT "PK_1a480c5734c5aacb9cef7b1499d" PRIMARY KEY ("project_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "user_project" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_72a40468c3924e43b934542e8e4" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_project"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }
}
