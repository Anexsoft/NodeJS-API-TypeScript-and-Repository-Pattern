import { createContainer, asClass } from "awilix";
import { TestService } from "./services/test.service";

const container = createContainer();

container.register({
    testService: asClass(TestService).scoped()
});

export {
    container
};