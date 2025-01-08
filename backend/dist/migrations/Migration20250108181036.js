"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250108181036 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250108181036 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
}
exports.Migration20250108181036 = Migration20250108181036;
//# sourceMappingURL=Migration20250108181036.js.map