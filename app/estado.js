module.exports =

class Estado {
  abrirMinisterio(ministerio, porcentajePresupuesto) {
    ministerio.presupuestoAnual = this.presupuestoAnual * porcentajePresupuesto / 100;
  }
}
