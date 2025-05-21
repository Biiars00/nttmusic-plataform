import { generateToken } from "../../config/jwtAuthentication";
import IUsersFromDBRepository, {
  IUserData,
} from "../../interfaces/repositories/users/users.interface";
import IUsersService from "../../interfaces/services/users/users.interface";
import { inject, injectable } from "tsyringe";

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject("UsersFromDBRepository")
    private usersFromDBRepository: IUsersFromDBRepository,
  ) {}

  async addUser(userName: string, email: string, password: string): Promise<IUserData> {
    const responseDB = await this.usersFromDBRepository.addUserFromDB(userName, email, password);

    if (!responseDB) {
      throw new Error("Data not found!");
    }

    return responseDB;
  }

  async loginUser(userId: string, email: string, password: string): Promise<string> {
    let accessToken = "";

    const responseDB = await this.usersFromDBRepository.getUserCheckFromDB(userId, email, password);

    if (!responseDB) {
      throw new Error("User not exists!");
    }

    if (
      responseDB.userId === userId &&
      responseDB.email === email &&
      responseDB.password === password
    ) {
      accessToken = generateToken({
        userId: responseDB.userId,
        email: responseDB.email,
      });
    }

    if (!accessToken) {
      throw new Error("Invalid credentials!");
    }

    return accessToken;
  }

  async getUsers(): Promise<IUserData[]> {
    const responseDB = await this.usersFromDBRepository.getUsersFromDB();

    return responseDB;
  }

  async getUserById(userId: string): Promise<Omit<IUserData, "password">> {
    const responseDB = await this.usersFromDBRepository.getUserByIdFromDB(userId);

    if (!responseDB) {
      throw new Error("Data not found!");
    }

    return responseDB;
  }
}

export default UsersService;
