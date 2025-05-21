import { injectable } from "tsyringe";
import IUserFromDBRepository, {
  IUserData,
} from "../../interfaces/repositories/users/users.interface";
import databaseConfig from "../../config/databaseConfig";

@injectable()
class UsersFromDBRepository implements IUserFromDBRepository {
  private db;

  constructor() {
    this.db = databaseConfig.firestore().collection("users");
  }

  async addUserFromDB(userName: string, email: string, password: string): Promise<IUserData> {
    const refDB = this.db;

    const docRef = await refDB.add({
      userName: userName,
      email: email,
      password: password,
    });

    docRef.update({ userId: docRef.id });

    return {
      userId: docRef.id,
      userName: userName,
      email: email,
      password: password,
    };
  }

  async getUsersFromDB(): Promise<IUserData[]> {
    const refDB = await this.db.get();

    const usersList = refDB.docs.map((doc) => {
      const docData = doc.data() as IUserData;

      if (docData) {
        return docData;
      } else {
        throw new Error("Document not found!");
      }
    });

    return usersList;
  }

  async getUserByIdFromDB(userId: string): Promise<Omit<IUserData, "password">> {
    const refDB = await this.db.doc(userId).get();

    if (refDB.exists) {
      const data = refDB.data() as IUserData;

      if (data) {
        return data;
      } else {
        throw new Error("User not found!");
      }
    } else {
      throw new Error("Document not found!");
    }
  }

  async getUserCheckFromDB(
    email: string,
    password: string,
  ): Promise<Partial<IUserData>> {
    const refDB = this.db
      .where('email', '==', email)
      .where('password', '==', password);
    
    const snapshot = await refDB.get();
    const doc = snapshot.docs[0];
    const data = doc.data() as IUserData;

    if (data) {
      return {
        userId: data.userId,
        email: data.email,
        password: data.password,
      };
    } else {
      throw new Error('User not found!');
    }
  }
}

export default UsersFromDBRepository;
