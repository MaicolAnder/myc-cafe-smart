export interface Empaque {
    idEmpaque?: string | null;  // Puede ser nulo o una cadena
    idCultivo: string;           // ID del cultivo
    idUsuario?: string;           // ID del usuario
    material: string;            // Material del empaque
    capacidad: number;           // Capacidad del empaque (numérica)
    numeroLote: string;          // Número de lote del empaque
    fechaEmpaque: string;        // Fecha del empaque (formato ISO 8601)
    destino: string;             // Destino del envío
    metodoEnvio: string;         // Método de envío
  }
  