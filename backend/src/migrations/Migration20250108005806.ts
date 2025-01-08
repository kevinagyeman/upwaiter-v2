import { Migration } from '@mikro-orm/migrations';

export class Migration20250108005806 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "job_post" ("id" serial primary key, "title" text not null, "description" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
