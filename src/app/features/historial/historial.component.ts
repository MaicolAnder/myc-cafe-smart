import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BridgeService } from '../../services/bridge.service';
import { LocationsService } from '../../services/locations.service';
import { Cultivo } from '../../models/cultivo';
import { Proceso } from '../../models/proceso';
import { Empaque } from '../../models/empaque';

export interface Historial {
  numeroLote: string;
  estado?: string;
  cultivo: {
    ubicacion: string;
    variedad: string;
    fechaSiembra: string;
  };
  proceso: {
    tipoBeneficiado?: string;
    nivelTostado: string;
    calidad: string;
  };
  empaque: {
    material?: string;
    destino?: string;
    fechaEnvio?: string;
  };
}

export interface HistorialData {
  cultivo: Cultivo[];
  proceso: Proceso[];
  empaque: Empaque[];
}
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  private cultivos: any[] = [];
  private procesos: any[] = [];
  private empaques: any[] = [];
  public historialLotes: Historial[] = [];

  constructor(
    private bridgeService: BridgeService,
    private locationService: LocationsService
  ) { 
    this.locationService.loadVisitorId()
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getHistorial();
    }, 2000);
  }

  getHistorial() {
    const idUsuario = this.locationService.getVisitorId();
    this.bridgeService.getHistorial(idUsuario).subscribe(
      res => {
        const historico: HistorialData = res.data;
        this.setHistorial(historico);
        console.log(historico);
    });
  }

  setHistorial(historico: HistorialData) {
    const cultivos: Cultivo[] = historico.cultivo;
    const procesos = historico.proceso;
    const empaques = historico.empaque;

    cultivos.forEach(c => {
      this.historialLotes.push(
        {
          numeroLote: 'LOT-' + c.fechaSiembra,
          estado: empaques.find(e => e.idCultivo === ''+c.idCultivo)?.metodoEnvio,
          cultivo: {
            ubicacion: c.ubicacion,
            variedad: c.variedad,
            fechaSiembra: c.fechaSiembra+''
          },
          proceso: {
            tipoBeneficiado: procesos.find(p => p.idCultivo === c.idCultivo)?.tipoBeneficiado,
            nivelTostado: procesos.find(p => p.idCultivo === c.idCultivo)?.controlHumedad ? 'Humedo' : 'Medio',
            calidad: procesos.find(p => p.idCultivo === c.idCultivo)?.controlDefectos ? 'Premium' : 'Especial'
          },
          empaque: {
            material: empaques.find(e => e.idCultivo === ''+c.idCultivo)?.material,
            destino: empaques.find(e => e.idCultivo === ''+c.idCultivo)?.destino,
            fechaEnvio: empaques.find(e => e.idCultivo === ''+c.idCultivo)?.fechaEmpaque
          }
        }
      )
      // console.log(c.fechaSiembra)
    })
  }
/*
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
  ];*/

  verDetalles(numeroLote: string) {
    console.log(`Ver detalles del lote ${numeroLote}`);
    // Aquí iría la lógica para mostrar detalles completos
  }
}