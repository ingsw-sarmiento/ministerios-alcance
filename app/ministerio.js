module.exports =

class Ministerio {
  constructor(porcentajePresupuesto) {
    this.porcentajePresupuesto = porcentajePresupuesto;
    this.dineroDisponible = 0;
  }

  recibirPartida(partida) {
    this.dineroDisponible += partida;
  }
}
