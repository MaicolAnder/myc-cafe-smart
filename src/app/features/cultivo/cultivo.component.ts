import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cultivo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cultivo.component.html',
  styleUrls: ['./cultivo.component.css']
})
export class CultivoComponent {
  cultivoForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

  onSubmit() {
    if (this.cultivoForm.valid) {
      console.log(this.cultivoForm.value);
      // Aquí iría la lógica para guardar los datos
    }
  }
}