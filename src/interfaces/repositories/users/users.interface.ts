export interface IUserData {
  userId: string;
  userName: string;
  email: string;
  password: string;
}

export interface IUserDataWithoutUserId {
  userName: string;
  email: string;
  password: string;
}

export interface IUserDataWithoutPassword {
  userId: string;
  userName: string;
  email: string;
}

export interface IUserDataLogin {
  email: string;
  password: string;
}

export interface IUserDataLoginCheck {
  userId: string;
  email: string;
  password: string;
}

interface IUsersFromDBRepository {
  addUserFromDB(data: IUserDataWithoutUserId): Promise<IUserData>;
  getUsersFromDB(): Promise<IUserDataWithoutPassword[]>;
  getUserByIdFromDB(userId: string): Promise<IUserDataWithoutPassword>;
  getUserCheckFromDB(data: IUserDataLogin): Promise<IUserDataLoginCheck>;
}

export default IUsersFromDBRepository;
