"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const email_module_1 = require("./email.module");
const email_service_1 = require("./email.service");
describe('EmailModule', () => {
    it('should be creatable with fromRoot()', async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                email_module_1.EmailModule.forRoot({
                    from: 'unknown@email.com',
                }),
            ],
        }).compile();
        const app = module.createNestApplication();
        await app.init();
        await app.close();
    });
    it('should be creatable with fromRootAsync()', async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                email_module_1.EmailModule.forRootAsync({
                    useFactory: () => ({
                        from: 'unknown@email.com',
                    }),
                }),
            ],
        }).compile();
        const app = module.createNestApplication();
        await app.init();
        app.get(email_service_1.EmailService);
        await app.close();
    });
});
//# sourceMappingURL=email.module.spec.js.map