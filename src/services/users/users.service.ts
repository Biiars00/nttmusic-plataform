import { generateToken } from "../../config/jwtAuthentication";
import IUsersFromDBRepository, {
  IUserData,
  IUserDataLogin,
  IUserDataWithoutPassword,
  IUserDataWithoutUserId,
} from "../../interfaces/repositories/users/users.interface";
import IUsersService from "../../interfaces/services/users/users.interface";
import { inject, injectable } from "tsyringe";

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject("UsersFromDBRepository")
    private usersFromDBRepository: IUsersFromDBRepository,
  ) {}

  async addUser(data: IUserDataWithoutUserId): Promise<IUserData> {
    const responseDB = await this.usersFromDBRepository.addUserFromDB(data);

    if (!responseDB) {
      throw new Error("Data not found!");
    }

    return responseDB;
  }

  async loginUser(data: IUserDataLogin): Promise<string> {
    let accessToken = "";

    const responseDB = await this.usersFromDBRepository.getUserCheckFromDB(data);

    if (!responseDB) {
      throw new Error("User not exists!");
    }

    if (
      responseDB.userId && responseDB.email === data.email &&
      responseDB.password === data.password
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

  async getUsers(): Promise<IUserDataWithoutPassword[]> {
    const responseDB = await this.usersFromDBRepository.getUsersFromDB();

    if(!responseDB) {
      throw new Error("Data not found!");
    }

    return responseDB;
  }

  async getUserById(userId: string): Promise<IUserDataWithoutPassword> {
    const responseDB = await this.usersFromDBRepository.getUserByIdFromDB(userId);

    if (!responseDB) {
      throw new Error("Data not found!");
    }

    return responseDB;
  }
}

export default UsersService;
