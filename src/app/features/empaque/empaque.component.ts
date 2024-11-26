import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { LocationsService } from '../../services/locations.service';
import { BridgeService } from '../../services/bridge.service';
import { Cultivo } from '../../models/cultivo';
import { Empaque } from '../../models/empaque';

@Component({
  selector: 'app-empaque',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QRCodeModule],
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css']
})
export class EmpaqueComponent implements OnInit {
  empaqueForm: FormGroup;
  listCultivos: Cultivo[] = [];
  idUsuario: string = '';

  constructor(private fb: FormBuilder,
    private bridgeService: BridgeService,
    private locationService: LocationsService
  ) {
    this.locationService.loadVisitorId()
    this.empaqueForm = this.fb.group({
      idCultivo: ['', Validators.required],
      material: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(0)]],
      numeroLote: ['', Validators.required],
      fechaEmpaque: ['', Validators.required],
      destino: ['', Validators.required],
      metodoEnvio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCultivo();
    }, 2000);
  }

  generateQRData(): string {
    return JSON.stringify({
      lote: this.empaqueForm.get('numeroLote')?.value,
      fecha: this.empaqueForm.get('fechaEmpaque')?.value,
      destino: this.empaqueForm.get('destino')?.value,
    });
  }

  onSubmit() {
    if (this.empaqueForm.valid) {
      const empaque: Empaque = this.empaqueForm.value;
      empaque.idUsuario = this.locationService.getVisitorId();
      
      this.bridgeService.guardarEmpaque(empaque).subscribe(
        res => {
          console.log(res);
          alert('Empaque guardado correctamente');
        }, error => {
          alert('Error al guardar el empaque');
        });
    }
  }

  getCultivo() {
    const idUsuario = this.locationService.getVisitorId();
    this.bridgeService.getCultivo(idUsuario).subscribe(
      res => {
        this.listCultivos = res.data;
    });
  }
}