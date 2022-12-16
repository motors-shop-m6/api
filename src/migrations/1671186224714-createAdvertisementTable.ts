import { MigrationInterface, QueryRunner } from "typeorm";

export class createAdvertisementTable1671186224714 implements MigrationInterface {
    name = 'createAdvertisementTable1671186224714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(127) NOT NULL, "year" character varying(4) NOT NULL, "km" character varying(6) NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "description" text NOT NULL, "type_of_vehicle" boolean NOT NULL, "is_active" boolean NOT NULL DEFAULT 'true', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "advertisements"`);
    }

}
