module.exports =

class Estado {
  constructor() {
    this.presupuestoEjecutado = 0;
    this.dineroDisponible = 100000;
  }

  abrirMinisterio(ministerio) {
    ministerio.abierto = true;
    ministerio.presupuestoAnual = this.presupuestoAnual * ministerio.porcentajePresupuesto / 100;
  }

  ejecutarPartida(ministerio, partida) {
    ministerio.recibirPartida(partida);
    this.presupuestoEjecutado += partida;
    this.dineroDisponible -= partida;
  }

  cerrarMinisterio(ministerio){
    if(ministerio.abierto){
      this.deudaFmi = ministerio.dineroDisponible
      ministerio.dineroDisponible= 0
      ministerio.abierto=false
    }
  else {
    throw "El ministerio esta cerrado"
    }
  }

pedirPrestamoAlFmi(ministerio, dinero){
  this.cerrarMinisterio(ministerio);
  this.aPagarAFmi += dinero
  this.dineroDisponible += dinero / 3
  }

get totalDeuda(){
  return this.aPagarAFmi;
  }
}
