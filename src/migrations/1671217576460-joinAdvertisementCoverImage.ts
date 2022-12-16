import { MigrationInterface, QueryRunner } from "typeorm";

export class joinAdvertisementCoverImage1671217576460 implements MigrationInterface {
    name = 'joinAdvertisementCoverImage1671217576460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

}
