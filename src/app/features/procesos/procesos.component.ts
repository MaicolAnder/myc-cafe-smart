import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BridgeService } from '../../services/bridge.service';
import { LocationsService } from '../../services/locations.service';
import { Cultivo } from '../../models/cultivo';
import { Proceso } from '../../models/proceso';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
  procesosForm: FormGroup;
  listCultivos: Cultivo[] = [];
  idUsuario: string = '';

  constructor(
    private fb: FormBuilder,
    private bridgeService: BridgeService,
    private locationService: LocationsService
  ) {
    this.locationService.loadVisitorId()
    this.procesosForm = this.fb.group({
      tipoBeneficiado: ['', Validators.required],
      fermentacion: this.fb.group({
        tiempo: ['', Validators.required],
        temperatura: ['', Validators.required]
      }),
      secado: this.fb.group({
        metodo: ['', Validators.required],
        tiempo: ['', Validators.required]
      }),
      tostado: this.fb.group({
        nivel: ['', Validators.required],
        temperatura: ['', Validators.required]
      }),
      controlHumedad: [false],
      controlDefectos: [false],
      catacion: [false],
      idCultivo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCultivo();
    }, 2000);
  }

  onSubmit() {
    if (this.procesosForm.valid) {
      const proceso: Proceso = this.procesosForm.value;
      proceso.idUsuario = this.locationService.getVisitorId();
      console.log(proceso);
      this.bridgeService.guardarProceso(this.procesosForm.value).subscribe(
        res => {
          alert('Proceso guardado correctamente');
        },
        err => {
          alert('Error al guardar el proceso');
        }
      );
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