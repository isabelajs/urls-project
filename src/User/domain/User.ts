/**
 * Clase que representa un usuario en el sistema
 * Maneja la encriptación y verificación de contraseñas
 */
export class User {

  /**
   * Crea una nueva instancia de Usuario
   * @param name Nombre del usuario
   * @param email Email del usuario
   * @param password Contraseña sin encriptar (opcional)
   */
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  /**
   * Encripta una contraseña usando un algoritmo hash
   * @param password Contraseña a encriptar
   * @returns Contraseña encriptada en formato hexadecimal
   * @private
   */
  public encryptPassword(password: string): string {
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
    return hashedInput === this.password;
  }

}