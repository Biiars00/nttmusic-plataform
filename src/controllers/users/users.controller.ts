import { inject, injectable } from "tsyringe";
import { Body, Get, Path, Post, Route, Security, Tags } from "tsoa";
import { IUserData } from "../../interfaces/repositories/users/users.interface";
import UsersService from "../../services/users/users.service";
import { generateToken } from "../../config/jwtAuthentication";

@injectable()
@Route("user")
@Tags("Acesso de Usuário")
class UsersController {
  constructor(
    @inject("UsersService")
    private usersService: UsersService,
  ) {}

  @Post("/sign-up")
  async addUser(@Body() body: Omit<IUserData, "userId">): Promise<IUserData> {
    const { userName, email, password } = body;

    try {
      const response = await this.usersService.addUser(userName, email, password);

      if (!response) {
        throw new Error("Resource not found!");
      }

      return response;
    } catch (error) {
      throw new Error(`Internal server error - ${error}`);
    }
  }

  @Post("/login")
  async loginUser(@Body() body: Omit<IUserData, "userName">): Promise<string> {
    const { userId, email, password } = body;

    if (typeof userId !== "string" || typeof email !== "string" || typeof password !== "string") {
      throw new Error("Email and password are required.");
    }

    try {
      const response = await this.usersService.loginUser(userId, email, password);

      if (!response) {
        throw new Error("Resource not found!");
      }

      const accessToken = generateToken({
        userId: userId,
        email: email,
      });

      return accessToken;
    } catch (error) {
      throw new Error(`Internal server error - ${error}`);
    }
  }

  @Security("jwt")
  @Get("/")
  async getUsers(): Promise<IUserData[]> {
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
  async getUserById(@Path() userId: string): Promise<Omit<IUserData, "password">> {
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
