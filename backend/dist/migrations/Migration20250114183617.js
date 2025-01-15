"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250114183617 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250114183617 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "email" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
}
exports.Migration20250114183617 = Migration20250114183617;
//# sourceMappingURL=Migration20250114183617.js.map