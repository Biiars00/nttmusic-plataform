import "reflect-metadata";
import UsersService from "../../../services/users/users.service";
import IUsersFromDBRepository from "../../../interfaces/repositories/users/users.interface";
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

const userData = {
    userId: "id",
    userName: "userName",
    email: "email@email.com",
    password: "password"
};

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(mockRepository);
  });

  describe("getUsers", () => {
    it("Must list all users", async () => {
      mockRepository.getUsersFromDB.mockResolvedValue([userData]);

      const result = await service.getUsers();

      expect(result).toEqual([userData]);
      expect(mockRepository.getUsersFromDB).toHaveBeenCalled();
    });
  });

  describe("addUser", () => {
    it("Must add a user", async () => {
      mockRepository.addUserFromDB.mockResolvedValue(userData);

      const result = await service.addUser("userName", "email@email.com", "password");

      expect(result).toEqual(userData);
      expect(mockRepository.addUserFromDB).toHaveBeenCalled();
    });

    it("Should throw error if tracks list is not returned", async () => {
      mockRepository.addUserFromDB.mockResolvedValue(null as any);

      await expect(service.addUser("userName", "email@email.com", "password")).rejects.toThrow("Data not found!");
    });
  });

  describe("loginUser", () => {
    it("Should return token for valid credentials", async () => {
      mockRepository.getUserCheckFromDB.mockResolvedValue({
        userId: "1",
        email: "email@email.com",
        password: "password",
      });

      const token = await service.loginUser("email@email.com", "password");

      expect(token).toBe("fake-jwt-token");
      expect(mockRepository.getUserCheckFromDB).toHaveBeenCalledWith("email@email.com", "password");
      expect(generateToken).toHaveBeenCalledWith({
        userId: "1",
        email: "email@email.com",
      });
    });

    it("Should throw error if user does not exist", async () => {
      mockRepository.getUserCheckFromDB.mockResolvedValue(null as any);

      await expect(service.loginUser("1", "bia@email.com"))
        .rejects.toThrow("User not exists!");
    });

    it("Should throw error if credentials are invalid", async () => {
      mockRepository.getUserCheckFromDB.mockResolvedValue({
        ...userData,
        email: "b@email.com",
        password: "321"
      });

      await expect(service.loginUser("1", "bia@email.com"))
        .rejects.toThrow("Invalid credentials!");
    });
  });

  describe("getUserById", () => {
    it("Should return user by id without password", async () => {
      const { password, ...userWithoutPassword } = userData;
      mockRepository.getUserByIdFromDB.mockResolvedValue(userWithoutPassword);

      const result = await service.getUserById("123");

      expect(result).toEqual(userWithoutPassword);
      expect(mockRepository.getUserByIdFromDB).toHaveBeenCalledWith("123");
    });

    it("Should throw error if user not found", async () => {
      mockRepository.getUserByIdFromDB.mockResolvedValue(null as any);

      await expect(service.getUserById("123")).rejects.toThrow("Data not found!");
    });
  });
});