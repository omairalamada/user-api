import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1656885913996 implements MigrationInterface {
    name = 'migrations1656885913996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`post_code\` varchar(255) NULL, \`contact_number\` varchar(255) NULL, \`email_address\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
    }

}
