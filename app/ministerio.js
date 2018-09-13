module.exports =

class Ministerio {
  constructor(porcentajePresupuesto) {
    this.porcentajePresupuesto = porcentajePresupuesto;
    this.dineroDisponible = 0;
    this.abierto = false;
  }

  recibirPartida(partida) {
    this.dineroDisponible += partida;
  }

  get presupuestoSubejecutado() {
    return this.dineroDisponible < this.presupuestoAnual;
  }
}
