/**
  * @jest-environment jsdom
*/
const Administrador = require('../clases/administrador.js');
const { Sistema } = require('../system/sistema.js');


describe('login() del sistema', () => {
  let sistema;

  beforeEach(() => {
    sistema = Sistema.getInstance();
    sistema.administradores = [];

    sistema.administradores.push(new Administrador('admin', 'admin123'));
    sistema.administradores.push(new Administrador('victor', 'victor123'));
  });

  test('Login exitoso con credenciales correctas', () => {
    const resultado = sistema.login('admin', 'admin123');
    expect(resultado).not.toBeNull();
    expect(resultado.userName).toBe('admin');
  });

  test('Login falla con contraseña incorrecta', () => {
    const resultado = sistema.login('admin', 'wrongpass');
    expect(resultado).toBeNull();
  });

  test('Login falla con usuario no existente', () => {
    const resultado = sistema.login('otro', 'admin123');
    expect(resultado).toBeNull();
  });

  test('Login falla si se pasan campos vacíos', () => {
    const resultado = sistema.login('', '');
    expect(resultado).toBeNull();
  });

  test('Login es insensible a mayúsculas en el nombre de usuario', () => {
    const resultado = sistema.login('AdMiN', 'admin123');
    expect(resultado).not.toBeNull();
    expect(resultado.userName).toBe('admin');
  });
});