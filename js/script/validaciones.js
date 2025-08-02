function esTelefonoValido(telefono) {
  const regex = /^\+?\d{6,15}$/;
  return regex.test(telefono.replace(/[\s\-]/g, ""));
}

function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function esHoraValida(horaStr) {
    // Validar formato HH:MM (24h) con minutos solo 00 o 30
    const regex = /^([01]\d|2[0-3]):(00|30)$/;
    if (!regex.test(horaStr)) return false;

    const [horas, minutos] = horaStr.split(":").map(Number);
    const totalMinutos = horas * 60 + minutos;

    const min = 9 * 60;    // 09:00 en minutos
    const max = 17 * 60 + 30; // 17:30 en minutos

    return totalMinutos >= min && totalMinutos <= max;
}

function esFechaValida(fechaStr) {
  const hoy = new Date();
  hoy.setHours(0,0,0,0); // quitar hora para comparar solo fecha

  const fecha = new Date(fechaStr);
  fecha.setHours(0,0,0,0);

  // No debe ser antes de hoy
  if (fecha < hoy) {
    return false;
  }

  // No debe ser sábado ni domingo
  const diaSemana = fecha.getDay();
  if (diaSemana === 0 || diaSemana === 6) {
    return false;
  }

  return true;
}

module.exports = {
  esTelefonoValido,
  esEmailValido,
  esHoraValida,
  esFechaValida
};