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

    beforeEach(() => {
      ministerioE =new Ministerio(0.55);
    });
    it("el dinero disponible del ministerioCyT es igual a 4000", () => {
    ministerioCyT.dineroDisponible = 4000;
    expect(ministerioCyT.dineroDisponible).to.eq(4000);
  });
     it("ministerioCyT reparte la mitad de su dineroDisponible y queda en cero", () => {
     ministerioCyT.fusionar(ministerioE,estadoArgentino);
     expect(ministerioE.dineroDisponible).to.eq(0);
  });
     it("estado abre ministerio ", () => {
     estadoArgentino.abrirMinisterio(ministerioE);
     estadoArgentino.ejecutarPartida(ministerioE,50);
     expect(ministerioE.presupuestoSubejecutado).to.be.true;
});




});
});
