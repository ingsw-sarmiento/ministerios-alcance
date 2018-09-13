const expect = require('chai').expect;
const Estado = require('../app/estado');
const Ministerio = require('../app/ministerio');

let estadoArgentino;
let ministerioCyT;

describe("Un estado", () => {
  beforeEach(() => {
    estadoArgentino = new Estado();
    estadoArgentino.presupuestoAnual = 1000000;
    ministerioCyT = new Ministerio(0.66);
  });

  it("cierra un ministerio", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.ejecutarPartida(ministerioCyT, 1000)
    estadoArgentino.cerrarMinisterio(ministerioCyT);
    expect(estadoArgentino.deudaFmi).to.eq(1000);
  });

  it("no puede cerrar un ministerio ya cerrado", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.cerrarMinisterio(ministerioCyT);
    expect(()=>estadoArgentino.cerrarMinisterio(ministerioCyT)).to.throw();
  });

  it("puede abrir un ministerio, asignando el porcentaje de presupuesto anual que le corresponde", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    expect(ministerioCyT.presupuestoAnual).to.eq(6600);
  });

  it("puede ejecutar una partida presupuestaria, poniendo el dinero a disponibilidad del ministerio", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.ejecutarPartida(ministerioCyT, 1000);

    expect(ministerioCyT.dineroDisponible).to.eq(1000);
    expect(estadoArgentino.presupuestoEjecutado).to.eq(1000);
  })

  describe("puede saber si subejecutó el presupuesto de un ministerio", () => {
    beforeEach(() => {
      estadoArgentino.abrirMinisterio(ministerioCyT);
    });

    it("cuando no hubo partidas", () => {
      expect(ministerioCyT.presupuestoSubejecutado).to.be.true;
    });

    it("cuando las partidas suman lo prometido", () => {
      estadoArgentino.ejecutarPartida(ministerioCyT, 3600);
      estadoArgentino.ejecutarPartida(ministerioCyT, 3000);
      expect(ministerioCyT.presupuestoSubejecutado).to.be.false;
    });
  })
});
