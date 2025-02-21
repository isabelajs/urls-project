import { User } from '../../domain/User';
import { UserRepository } from '../../domain/repositories/User.repository';

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.checkUserbyEmail(email);
    
    if(!user){
      throw new Error('User not found');
    }
    const newUser = new User(user.name, email, password);
    
    if (!user || !newUser.verifyPassword(password)) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    const user = new User(name, email, password);
    await this.userRepository.save(user).catch((error) => {
      throw new Error(error.message);
    });
  }
}