export interface IUserData {
  userId: string;
  userName: string;
  email: string;
  password: string;
}

interface IUsersFromDBRepository {
  addUserFromDB(userName: string, email: string, password: string): Promise<IUserData>;
  getUsersFromDB(): Promise<IUserData[]>;
  getUserByIdFromDB(userId: string): Promise<Omit<IUserData, "password">>;
  getUserCheckFromDB(email: string, password: string): Promise<Partial<IUserData>>;
}

export default IUsersFromDBRepository;
