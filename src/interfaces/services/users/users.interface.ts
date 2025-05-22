import { IUserData, IUserDataLogin, IUserDataWithoutPassword, IUserDataWithoutUserId } from "../../repositories/users/users.interface";

interface IUsersService {
  addUser(data: IUserDataWithoutUserId): Promise<IUserData>;
  getUsers(): Promise<IUserDataWithoutPassword[]>;
  getUserById(userId: string): Promise<IUserDataWithoutPassword>;
  loginUser(data: IUserDataLogin): Promise<string>;
}

export default IUsersService;
