import { container } from "tsyringe";
import UsersController from "../../controllers/users/users.controller";
import UsersFromDBRepository from "../../repositories/users/users.repository";
import UsersService from "../../services/users/users.service";

container.register("UsersController", {
  useClass: UsersController,
});
container.register("UsersFromDBRepository", {
  useClass: UsersFromDBRepository,
});
container.register("UsersService", {
  useClass: UsersService,
});

export { container as users };
