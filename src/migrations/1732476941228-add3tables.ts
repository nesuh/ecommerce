import { MigrationInterface, QueryRunner } from "typeorm";

export class Add3tables1732476941228 implements MigrationInterface {
    name = 'Add3tables1732476941228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_verifications_status_enum" AS ENUM('NEW', 'USED', 'EXPIRED')`);
        await queryRunner.query(`CREATE TYPE "public"."account_verifications_otptype_enum" AS ENUM('EMAIL_VERIFICATION', 'RESET_PASSWORD', 'PHONE_VERIFICATION', 'INVITATION', 'CONFIRM_OLD_EMAIL', 'CONFIRM_NEW_EMAIL')`);
        await queryRunner.query(`CREATE TABLE "account_verifications" ("tenantId" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "otp" text NOT NULL, "status" "public"."account_verifications_status_enum" NOT NULL DEFAULT 'NEW', "otpType" "public"."account_verifications_otptype_enum" NOT NULL DEFAULT 'EMAIL_VERIFICATION', "accountId" uuid NOT NULL, "userId" text, CONSTRAINT "PK_2ba8bd9b1ff53fb582130c4c50c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" text, "passwordLastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "accountId" uuid NOT NULL, CONSTRAINT "UQ_e864d70a3409c020cd5de386aab" UNIQUE ("accountId"), CONSTRAINT "REL_e864d70a3409c020cd5de386aa" UNIQUE ("accountId"), CONSTRAINT "PK_6ec9ecef3e1cfd2fa106e0e2f0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."account_status_enum" AS ENUM('PENDING', 'ACTIVE', 'INACTIVE', 'DISABLED', 'INVITED')`);
        await queryRunner.query(`CREATE TYPE "public"."account_role_enum" AS ENUM('admin', 'manager', 'employees')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text, "firstName" text NOT NULL, "lastName" text NOT NULL, "phone" character varying, "status" "public"."account_status_enum" NOT NULL DEFAULT 'PENDING', "isPhoneVerified" boolean NOT NULL DEFAULT true, "role" "public"."account_role_enum" NOT NULL DEFAULT 'employees', CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "UQ_a13e2234cf22b150ea2e72fba6b" UNIQUE ("phone"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('NEW', 'USED', 'EXPIRED')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'NEW'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "accountId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_c8622e1e24c6d054d36e8824490"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1e2f844c52faf3aa4e3008976ae"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_5ed96e04da0c7fec6205d485dca"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "PK_82aa5da437c5bbfb80703b08309"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "storeId" uuid`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1a79b2f719ecd9f307d62b81093"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_e0b91b88a0ec9cdf815e28ba1d1"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_a83068090fe4511e5047484b09a"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "PK_f3172007d4de5ae8e7692759d79"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "storeId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "storeId" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "account_verifications" ADD CONSTRAINT "FK_f6a7880564a7ddaecb217fd0a2d" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_credentials" ADD CONSTRAINT "FK_e864d70a3409c020cd5de386aab" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_5ed96e04da0c7fec6205d485dca" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_c8622e1e24c6d054d36e8824490" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_a83068090fe4511e5047484b09a" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1a79b2f719ecd9f307d62b81093" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_e0b91b88a0ec9cdf815e28ba1d1" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1e2f844c52faf3aa4e3008976ae" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1e2f844c52faf3aa4e3008976ae"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_e0b91b88a0ec9cdf815e28ba1d1"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1a79b2f719ecd9f307d62b81093"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_a83068090fe4511e5047484b09a"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_c8622e1e24c6d054d36e8824490"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_5ed96e04da0c7fec6205d485dca"`);
        await queryRunner.query(`ALTER TABLE "account_credentials" DROP CONSTRAINT "FK_e864d70a3409c020cd5de386aab"`);
        await queryRunner.query(`ALTER TABLE "account_verifications" DROP CONSTRAINT "FK_f6a7880564a7ddaecb217fd0a2d"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "PK_f3172007d4de5ae8e7692759d79"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_a83068090fe4511e5047484b09a" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_e0b91b88a0ec9cdf815e28ba1d1" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1a79b2f719ecd9f307d62b81093" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "PK_82aa5da437c5bbfb80703b08309"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_5ed96e04da0c7fec6205d485dca" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1e2f844c52faf3aa4e3008976ae" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_c8622e1e24c6d054d36e8824490" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tenantId" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_status_enum"`);
        await queryRunner.query(`DROP TABLE "account_credentials"`);
        await queryRunner.query(`DROP TABLE "account_verifications"`);
        await queryRunner.query(`DROP TYPE "public"."account_verifications_otptype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_verifications_status_enum"`);
    }

}
