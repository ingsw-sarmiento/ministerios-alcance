const expect = require('chai').expect;
const Estado = require('../app/estado');
const Ministerio = require('../app/ministerio');

let estadoArgentino;

describe("Un estado", () => {
  beforeEach(() => {
    estadoArgentino = new Estado();
    estadoArgentino.presupuestoAnual = 1000;
  });

  it("puede abrir un ministerio, asignando el porcentaje de presupuesto anual que le corresponde", () => {
    const ministerioCyT = new Ministerio();
    estadoArgentino.abrirMinisterio(ministerioCyT, 0.66);

    expect(ministerioCyT.presupuestoAnual).to.eq(6.6);
  });
});
