import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  historialLotes = [
    {
      numeroLote: 'LOT-2024-001',
      estado: 'Enviado',
      cultivo: {
        ubicacion: 'Valle Central, Costa Rica',
        variedad: 'Arábica',
        fechaSiembra: '2023-05-15'
      },
      proceso: {
        tipoBeneficiado: 'Húmedo',
        nivelTostado: 'Medio',
        calidad: 'Premium'
      },
      empaque: {
        material: 'Yute',
        destino: 'Berlín, Alemania',
        fechaEnvio: '2024-02-01'
      }
    },
    {
      numeroLote: 'LOT-2024-002',
      estado: 'En Proceso',
      cultivo: {
        ubicacion: 'Tarrazú, Costa Rica',
        variedad: 'Bourbon',
        fechaSiembra: '2023-06-20'
      },
      proceso: {
        tipoBeneficiado: 'Seco',
        nivelTostado: 'Ligero',
        calidad: 'Especial'
      },
      empaque: {
        material: 'Válvula',
        destino: 'Tokyo, Japón',
        fechaEnvio: '2024-02-15'
      }
    }
  ];

  verDetalles(numeroLote: string) {
    console.log(`Ver detalles del lote ${numeroLote}`);
    // Aquí iría la lógica para mostrar detalles completos
  }
}