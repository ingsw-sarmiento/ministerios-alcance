
module.exports =

class Estado {
  constructor() {
    this.presupuestoEjecutado = 0;
    this.cuentaEspecialEstado;
  }

  abrirMinisterio(ministerio) {
    ministerio.presupuestoAnual = this.presupuestoAnual * ministerio.porcentajePresupuesto / 100;
  }

  ejecutarPartida(ministerio, partida) {
    ministerio.recibirPartida(partida);
    this.presupuestoEjecutado += partida;
  }

  recibirPago(importe) {
    this.cuentaEspecialEstado += importe;
  }

}
