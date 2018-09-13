module.exports =

class Estado {
  abrirMinisterio(ministerio) {
    ministerio.presupuestoAnual = this.presupuestoAnual * ministerio.porcentajePresupuesto / 100;
  }
}
