import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTable1671444232153 implements MigrationInterface {
    name = 'createUserTable1671444232153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

}
