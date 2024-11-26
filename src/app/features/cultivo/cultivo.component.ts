import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BridgeService } from '../../services/bridge.service';
import { Cultivo } from '../../models/cultivo';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-cultivo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './cultivo.component.html',
  styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent implements OnInit {
  private idUsuario: string = '';
  public  cultivoForm: FormGroup;
  private listCultivos: Cultivo[] = [];

  constructor(
    private fb: FormBuilder,
    private bridgeService: BridgeService,
    private locationService: LocationsService
  ) {
    this.locationService.loadVisitorId()

    this.cultivoForm = this.fb.group({
      ubicacion: ['', Validators.required],
      altitud: ['', [Validators.required, Validators.min(0)]],
      variedad: ['', Validators.required],
      fechaSiembra: ['', Validators.required],
      fechaCosecha: ['', Validators.required],
      condicionesClimaticas: [''],
      practicaOrganica: [false],
      practicaSostenible: [false],
      certificacion: [false]
    });
    this.idUsuario = this.locationService.getVisitorId();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCultivo();
    }, 2000);
  }

  onSubmit() {
    if (this.cultivoForm.valid) {
      const cultivo: Cultivo = this.cultivoForm.value;
      cultivo.idUsuario = this.locationService.getVisitorId();
      
      this.bridgeService.guardarCultivo(cultivo).subscribe(
        res => {
          alert('Cultivo guardado correctamente');
        }, error => {
          alert('Error al guardar el cultivo');
        });
    }
  }

  getCultivo() {
    const idUsuario = this.locationService.getVisitorId();
    this.bridgeService.getCultivo(idUsuario).subscribe(res => {
      // this.listCultivos = res;
      console.log(res);
    });
  }
}