/**
 * Clase que representa un usuario en el sistema
 * Maneja la encriptación y verificación de contraseñas
 */
export class User {
    /** Contraseña encriptada del usuario */
    private encryptedPassword!: string;

    /**
     * Crea una nueva instancia de Usuario
     * @param name Nombre del usuario
     * @param email Email del usuario
     * @param password Contraseña sin encriptar (opcional)
     * @param encryptedPassword Contraseña ya encriptada (opcional)
     */
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

    /**
     * Encripta una contraseña usando un algoritmo hash
     * @param password Contraseña a encriptar
     * @returns Contraseña encriptada en formato hexadecimal
     * @private
     */
    private encryptPassword(password: string): string {
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }

    /**
     * Verifica si una contraseña coincide con la almacenada
     * @param password Contraseña a verificar
     * @returns true si la contraseña coincide, false en caso contrario
     */
    verifyPassword(password: string): boolean {
      if (!password) {
        return false;
      }
      const hashedInput = this.encryptPassword(password);
      return hashedInput === this.encryptedPassword;
    }

    /**
     * Obtiene la contraseña encriptada del usuario
     * @returns Contraseña encriptada
     */
    getEncryptedPassword(): string {
      return this.encryptedPassword;
    }
}