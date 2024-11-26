export interface Proceso {
    idProceso?: number;
    tipoBeneficiado: string;
    fermentacion: {
        tiempo: number;
        temperatura: number;
    };
    secado: {
        metodo: string;
        tiempo: number;
    };
    tostado: {
        nivel: string;
        temperatura: number;
    };
    controlHumedad?: boolean;
    controlDefectos?: boolean;
    catacion?: boolean;
    idCultivo: string;
    idUsuario?: string;
}
  