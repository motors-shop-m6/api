import { MigrationInterface, QueryRunner } from "typeorm";

export class createReviewTable1672748814925 implements MigrationInterface {
    name = 'createReviewTable1672748814925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comments" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" uuid, "userId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_71782ee6bd6449d100b221357cd" FOREIGN KEY ("vehicleId") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_71782ee6bd6449d100b221357cd"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
