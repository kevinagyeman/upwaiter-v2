"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250115115743 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250115115743 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "verified" bool not null default false;');
    }
}
exports.Migration20250115115743 = Migration20250115115743;
//# sourceMappingURL=Migration20250115115743.js.map