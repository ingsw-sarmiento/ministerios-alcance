module.exports =

class Ministerio {
  constructor(porcentajePresupuesto) {
    this.porcentajePresupuesto = porcentajePresupuesto;
    this.dineroDisponible = 0;
    this.presupuestoAnual=0;
  }

  recibirPartida(partida) {
    this.dineroDisponible += partida;
  }

  get presupuestoSubejecutado() {
    return this.dineroDisponible < this.presupuestoAnual;
  }

  fusionar(ministerio2, estado) {
    if (ministerio2.tieneDineroDisponible) {
      this.dineroDisponible += ministerio2.dineroDisponible / 2;
      ministerio2.pagarACuentaEspecialEstado(ministerio2.dineroDisponible / 2, estado);
      ministerio2.dineroDisponible = 0;
    }
  }

  pagarACuentaEspecialEstado(importe, estado) {
    estado.recibirPago(importe);
  }


}
