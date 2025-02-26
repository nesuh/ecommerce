import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatestoreInAccount1732478392036 implements MigrationInterface {
    name = 'UpdatestoreInAccount1732478392036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_a83068090fe4511e5047484b09a"`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_a83068090fe4511e5047484b09a" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_a83068090fe4511e5047484b09a"`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_a83068090fe4511e5047484b09a" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
