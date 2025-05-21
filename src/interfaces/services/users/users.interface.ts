import { IUserData } from "../../repositories/users/users.interface";

interface IUsersService {
  addUser(
    userFirstName: string,
    userLastName: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<IUserData>;
  getUsers(): Promise<IUserData[]>;
  getUserById(userId: string): Promise<Omit<IUserData, "password">>;
  loginUser(email: string, password: string): Promise<string>;
}

export default IUsersService;
