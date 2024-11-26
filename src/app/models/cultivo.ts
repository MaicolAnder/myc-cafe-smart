export interface Cultivo {
ubicacion: string;
altitud: number;
variedad: string;
fechaSiembra: Date;
fechaCosecha: Date;
condicionesClimaticas?: string;
practicaOrganica: boolean;
practicaSostenible: boolean;
certificacion: boolean;
idUsuario?: string;
idCultivo?: string;
}
  