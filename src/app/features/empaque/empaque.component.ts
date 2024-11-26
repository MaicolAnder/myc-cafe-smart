import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-empaque',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QRCodeModule],
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css']
})
export class EmpaqueComponent {
  empaqueForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.empaqueForm = this.fb.group({
      material: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(0)]],
      numeroLote: ['', Validators.required],
      fechaEmpaque: ['', Validators.required],
      destino: ['', Validators.required],
      metodoEnvio: ['', Validators.required],
    });
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
      console.log(this.empaqueForm.value);
      // Aquí iría la lógica para guardar los datos
    }
  }
}