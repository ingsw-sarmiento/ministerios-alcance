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
    estadoArgentino.aPagarAFmi = 0;

  });

  it("tiene 100.000 pesos de dinero disponible", () => {
    expect(estadoArgentino.dineroDisponible).to.eq(100000);
  });

  it("Ejecuta una partida de 1000 pesos y disminuye el dinero disponible", () => {
    estadoArgentino.ejecutarPartida(ministerioCyT, 1000);
    expect(estadoArgentino.dineroDisponible).to.eq(99000);
  });

  it("Pide 30.000 prestamo y aumenta el dinero disponible a 110.000", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT)
    estadoArgentino.pedirPrestamoAlFmi(ministerioCyT, 30000)
    expect(estadoArgentino.dineroDisponible).to.eq(110000);
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

  it("cierra un ministerio", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.ejecutarPartida(ministerioCyT, 1000);
    estadoArgentino.cerrarMinisterio(ministerioCyT);
    expect(estadoArgentino.deudaFmi).to.eq(1000) ;
  });

  it("dinero pedido al fondo", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.pedirPrestamoAlFmi(ministerioCyT, 30000);
    expect(estadoArgentino.dineroDisponible).to.eq(110000) ;
  });

  it("incremento su deuda ",() => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
      estadoArgentino.pedirPrestamoAlFmi(ministerioCyT, 30000);
      expect(estadoArgentino.totalDeuda).to.eq(30000)
  });

  it("no puede cerrar un ministerio", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.cerrarMinisterio(ministerioCyT);
    expect(()=>estadoArgentino.cerrarMinisterio(ministerioCyT)).to.throw();
  });

  it("puede ejecutar una partida presupuestaria, poniendo el dinero a disponibilidad del ministerio", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.ejecutarPartida(ministerioCyT, 1000);

    expect(ministerioCyT.dineroDisponible).to.eq(1000);
    expect(estadoArgentino.presupuestoEjecutado).to.eq(1000);
  })

  it("puede ejecutar una partida en momento de crisis, poniendo una parte del dinero a disponibilidad del ministerio", () => {
    estadoArgentino.abrirMinisterio(ministerioCyT);
    estadoArgentino.momentoDeCrisis = true;
    estadoArgentino.ejecutarPartida(ministerioCyT, 3000);

    expect(ministerioCyT.dineroDisponible).to.eq(2000);
    expect(estadoArgentino.deudaFmi).to.eq(1000);
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
  });
});
