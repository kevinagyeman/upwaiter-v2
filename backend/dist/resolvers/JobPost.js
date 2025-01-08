"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostResolver = void 0;
const JobPost_1 = require("src/entities/JobPost");
const type_graphql_1 = require("type-graphql");
let JobPostResolver = class JobPostResolver {
    jobPosts({ em }) {
        return em.find(JobPost_1.JobPost, {});
    }
};
__decorate([
    type_graphql_1.Query(() => [JobPost_1.JobPost]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobPostResolver.prototype, "jobPosts", null);
JobPostResolver = __decorate([
    type_graphql_1.Resolver()
], JobPostResolver);
exports.JobPostResolver = JobPostResolver;
//# sourceMappingURL=JobPost.js.map