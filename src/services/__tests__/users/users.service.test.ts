import "reflect-metadata";
import UsersService from "../../../services/users/users.service";
import IUsersFromDBRepository, { IUserData, IUserDataLogin, IUserDataLoginCheck, IUserDataWithoutPassword, IUserDataWithoutUserId } from "../../../interfaces/repositories/users/users.interface";
import { generateToken } from "../../../config/jwtAuthentication";

jest.mock("../../../config/jwtAuthentication", () => ({
  generateToken: jest.fn().mockReturnValue("fake-jwt-token"),
}));

const mockRepository: jest.Mocked<IUsersFromDBRepository> = {
  addUserFromDB: jest.fn(),
  getUsersFromDB: jest.fn(),
  getUserByIdFromDB: jest.fn(),
  getUserCheckFromDB: jest.fn(),
};

const userData: IUserData = {
  userId: "id",
  userName: "userName",
  email: "email@email.com",
  password: "password"
};

const userDataWithoutUserId: IUserDataWithoutUserId = {
  userName: "userName",
  email: "email@email.com",
  password: "password"
}

const userDataWithoutPassword: IUserDataWithoutPassword = {
  userId: "id",
  userName: "userName",
  email: "email@email.com",
}

const userDataLogin: IUserDataLogin = {
  email: "email@email.com",
  password: "password"
}

const userDataLoginCheck: IUserDataLoginCheck = {
  userId: "id",
  email: "email@email.com",
  password: "password"
}


describe("UsersService", () => {
  let service: UsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(mockRepository);
  });

  describe("getUsers", () => {
    it("Must list all users", async () => {
      mockRepository.getUsersFromDB.mockResolvedValue([userDataWithoutPassword]);

      const result = await service.getUsers();

      expect(result).toEqual([userDataWithoutPassword]);
      expect(mockRepository.getUsersFromDB).toHaveBeenCalled();
    });

    it("Should throw error if user list is not returned", async () => {
      mockRepository.getUsersFromDB.mockResolvedValue(null as any);

      await expect(service.getUsers()).rejects.toThrow("Data not found!");
    });
  });

  describe("addUser", () => {
    it("Must add a user", async () => {
      mockRepository.addUserFromDB.mockResolvedValue(userData);

      const result = await service.addUser(userDataWithoutUserId);

      expect(result).toEqual(userData);
      expect(mockRepository.addUserFromDB).toHaveBeenCalled();
    });

    it("Should throw error if users list is not returned", async () => {
      mockRepository.addUserFromDB.mockResolvedValue(null as any);

      await expect(service.addUser(userDataWithoutUserId)).rejects.toThrow("Data not found!");
    });
  });

  describe("loginUser", () => {
    it("Should return token for valid credentials", async () => {
      mockRepository.getUserCheckFromDB.mockResolvedValue(userDataLoginCheck);

      const token = await service.loginUser(userDataLogin);

      expect(token).toBe("fake-jwt-token");
      expect(mockRepository.getUserCheckFromDB).toHaveBeenCalledWith(userDataLogin);
      expect(generateToken).toHaveBeenCalledWith({
        userId: "id",
        email: "email@email.com",
      });
    });

    it("Should throw error if user does not exist", async () => {
      mockRepository.getUserCheckFromDB.mockResolvedValue(null as any);

      await expect(service.loginUser(userDataLogin))
        .rejects.toThrow("User not exists!");
    });

    it("Should throw error if credentials are invalid", async () => {
       const invalidLogin: IUserDataLogin = {
        email: "test@email.com",
        password: "pass"
      };
      mockRepository.getUserCheckFromDB.mockResolvedValue(userDataLoginCheck);

      await expect(service.loginUser(invalidLogin))
        .rejects.toThrow("Invalid credentials!");
    });
  });

  describe("getUserById", () => {
    it("Should return user by id without password", async () => {
      mockRepository.getUserByIdFromDB.mockResolvedValue(userDataWithoutPassword);

      const result = await service.getUserById("id");

      expect(result).toEqual(userDataWithoutPassword);
      expect(mockRepository.getUserByIdFromDB).toHaveBeenCalledWith("id");
    });

    it("Should throw error if user not found", async () => {
      mockRepository.getUserByIdFromDB.mockResolvedValue(null as any);

      await expect(service.getUserById("123")).rejects.toThrow("Data not found!");
    });
  });
});