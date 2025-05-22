import { inject, injectable } from "tsyringe";
import { Body, Get, Path, Post, Route, Security, Tags } from "tsoa";
import { IUserData, IUserDataLogin, IUserDataWithoutPassword, IUserDataWithoutUserId } from "../../interfaces/repositories/users/users.interface";
import UsersService from "../../services/users/users.service";

@injectable()
@Route("user")
@Tags("Acesso de Usuário")
class UsersController {
  constructor(
    @inject("UsersService")
    private usersService: UsersService,
  ) {}

  @Post("/sign-up")
  async addUser(@Body() body: IUserDataWithoutUserId): Promise<IUserData> {
    try {
      if (!body.email || !body.password || !body.userName) {
        throw new Error("Email, password and userName are required.");
      }

      const response = await this.usersService.addUser(body);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error) {
      throw new Error(`Internal server error - ${error}`);
    }
  }

  @Post("/login")
  async loginUser(@Body() body: IUserDataLogin): Promise<string> {
    try {
      if (typeof body.email !== "string" || typeof body.password !== "string") {
        throw new Error("Email and password are required.");
      }

      const response = await this.usersService.loginUser(body);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error) {
      throw new Error(`Internal server error - ${error}`);
    }
  }

  @Security("jwt")
  @Get("/")
  async getUsers(): Promise<IUserDataWithoutPassword[]> {
    try {
      const response = await this.usersService.getUsers();

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error) {
      throw new Error(`Internal server error - ${error}`);
    }
  }

  @Security("jwt")
  @Get("/:userId")
  async getUserById(@Path() userId: string): Promise<IUserDataWithoutPassword> {
    try {
        if (!userId) {
          throw new Error("Resource is missing!");
        }

      const response = await this.usersService.getUserById(userId);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error) {
      throw new Error(`Internal server error - ${error}`);
    }
  }
}

export default UsersController;
