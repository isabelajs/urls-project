import { IUserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';

interface StoredUser {
    name: string;
    email: string;
    password: string;
}

export class LocalStorageUserRepository implements IUserRepository {
  private readonly STORAGE_KEY = 'users';

  async findByEmail(email: string): Promise<User | null> {
    const usersData = localStorage.getItem(this.STORAGE_KEY);
    if (!usersData) return null;

    const users = JSON.parse(usersData) as StoredUser[];
    const userData = users.find((u) => u.email === email);
    if (!userData) return null;

    return new User(userData.name, userData.email, undefined, userData.password);
  }

  async save(user: User): Promise<void> {
    const existingUser = await this.findByEmail(user.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const usersData = localStorage.getItem(this.STORAGE_KEY);
    const users: StoredUser[] = usersData ? JSON.parse(usersData) : [];

    const newUser = {
        name: user.name,
        email: user.email,
        password: user.getEncryptedPassword(),
    }

    console.log('newUser', newUser);
    users.push(newUser);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}