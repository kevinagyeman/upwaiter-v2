"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250108005806 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250108005806 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "job_post" ("id" serial primary key, "title" text not null, "description" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    }
}
exports.Migration20250108005806 = Migration20250108005806;
//# sourceMappingURL=Migration20250108005806.js.map