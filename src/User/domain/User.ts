export class User {
    private encryptedPassword!: string;

    constructor(
      public readonly name: string,
      public readonly email: string,
      password?: string,
      encryptedPassword?: string
    ) {
      if (password) {
        this.encryptedPassword = this.encryptPassword(password);
      } else if (encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
      }
    }

    private encryptPassword(password: string): string {
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }

    verifyPassword(password: string): boolean {
      const hashedInput = this.encryptPassword(password);
      return hashedInput === this.encryptedPassword;
    }

    getEncryptedPassword(): string {
      return this.encryptedPassword;
    }
}