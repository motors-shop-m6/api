import { MigrationInterface, QueryRunner } from "typeorm";

export class createCoverImageTable1671204700116 implements MigrationInterface {
    name = 'createCoverImageTable1671204700116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "added_at" TIMESTAMP NOT NULL DEFAULT now(), "removed_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
