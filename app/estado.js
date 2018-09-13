module.exports =

class Estado {
  constructor() {
    this.presupuestoEjecutado = 0;
  }

  abrirMinisterio(ministerio) {
    ministerio.abierto = true;
    ministerio.presupuestoAnual = this.presupuestoAnual * ministerio.porcentajePresupuesto / 100;
  }

  ejecutarPartida(ministerio, partida) {
    ministerio.recibirPartida(partida);
    this.presupuestoEjecutado += partida;
  }

  cerrarMinisterio(ministerio){
    if (ministerio.abierto){
      this.deudaFmi = ministerio.dineroDisponible;
      ministerio.dineroDisponible = 0;
      ministerio.abierto = false;
    }else{
      throw "El ministerio está cerrado"
    }
  }

}
