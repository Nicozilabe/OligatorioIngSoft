const reserva = require('../script/validaciones.js');

describe('Validaciones de teléfono', function() {
  test('Teléfono válido con +', () => {
    expect(reserva.esTelefonoValido('+59891234567')).toBe(true);
  });

  test('Teléfono válido sin +', () => {
    expect(reserva.esTelefonoValido('091234567')).toBe(true);
  });

  test('Teléfono inválido (muy corto)', () => {
    expect(reserva.esTelefonoValido('123')).toBe(false);
  });
});

describe('Validaciones de email', () => {
  test('Email válido', () => {
    expect(reserva.esEmailValido('correo@ejemplo.com')).toBe(true);
  });

  test('Email inválido sin @', () => {
    expect(reserva.esEmailValido('correo.com')).toBe(false);
  });

  test('Email inválido sin dominio', () => {
    expect(reserva.esEmailValido('correo@')).toBe(false);
  });
});

describe('Validaciones de hora', () => {
  test('Hora válida exacta', () => {
    expect(reserva.esHoraValida('09:00')).toBe(true);
  });

  test('Hora válida con 30 minutos', () => {
    expect(reserva.esHoraValida('13:30')).toBe(true);
  });

  test('Hora fuera del rango', () => {
    expect(reserva.esHoraValida('18:00')).toBe(false);
  });

  test('Hora con minutos inválidos', () => {
    expect(reserva.esHoraValida('10:45')).toBe(false);
  });
});

describe('Validaciones de fecha', () => {
  test('Fecha futura válida (día de semana)', () => {
    expect(reserva.esFechaValida('2025-08-05')).toBe(true); // martes
  });

  test('Fecha pasada inválida', () => {
    expect(reserva.esFechaValida('2025-07-30')).toBe(false);
  });

  test('Fecha en sábado inválida', () => {
    expect(reserva.esFechaValida('2025-08-02')).toBe(false); // sábado
  });

  test('Fecha en domingo inválida', () => {
    expect(reserva.esFechaValida('2025-08-03')).toBe(false);
  });
});
