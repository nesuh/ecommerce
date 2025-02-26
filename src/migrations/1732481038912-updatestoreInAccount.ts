import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatestoreInAccount1732481038912 implements MigrationInterface {
    name = 'UpdatestoreInAccount1732481038912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "permissions" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "permissions"`);
    }

}
