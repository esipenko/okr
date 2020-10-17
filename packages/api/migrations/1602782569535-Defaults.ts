import { MigrationInterface, QueryRunner } from 'typeorm';

export class Defaults1602782569535 implements MigrationInterface {
    name = 'Defaults1602782569535';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "salt" character varying NOT NULL, "password" character varying NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyCompanyId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "project" ("project_id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyCompanyId" integer, CONSTRAINT "PK_1a480c5734c5aacb9cef7b1499d" PRIMARY KEY ("project_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "company" ("company_id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "PK_b7f9888ba8bd654c4860ddfcb3a" PRIMARY KEY ("company_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "projects_to_users" ("user_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_8d852f711402afc39a249082451" PRIMARY KEY ("user_id", "project_id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_29a15edbfd395668f3989ecde2" ON "projects_to_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_225c55414a26cffab6a568c329" ON "projects_to_users" ("project_id") `);
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_c3e3e6609bad128c26d64b9af06" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "project" ADD CONSTRAINT "FK_9153b55392365de4d24d1c013a6" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "projects_to_users" ADD CONSTRAINT "FK_29a15edbfd395668f3989ecde2a" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "projects_to_users" ADD CONSTRAINT "FK_225c55414a26cffab6a568c3293" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_to_users" DROP CONSTRAINT "FK_225c55414a26cffab6a568c3293"`);
        await queryRunner.query(`ALTER TABLE "projects_to_users" DROP CONSTRAINT "FK_29a15edbfd395668f3989ecde2a"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9153b55392365de4d24d1c013a6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c3e3e6609bad128c26d64b9af06"`);
        await queryRunner.query(`DROP INDEX "IDX_225c55414a26cffab6a568c329"`);
        await queryRunner.query(`DROP INDEX "IDX_29a15edbfd395668f3989ecde2"`);
        await queryRunner.query(`DROP TABLE "projects_to_users"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
