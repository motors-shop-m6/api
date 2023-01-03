import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1672744712612 implements MigrationInterface {
    name = 'createTables1672744712612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "type_user" character varying NOT NULL DEFAULT 'anunciante'`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type_user"`);
    }

}
