import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent {
  procesosForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      catacion: [false]
    });
  }

  onSubmit() {
    if (this.procesosForm.valid) {
      console.log(this.procesosForm.value);
      // Aquí iría la lógica para guardar los datos
    }
  }
}