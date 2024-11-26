import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-coffee-dark text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <div class="logo"></div>
          <h1 class="text-xl font-bold">Coffee Smart</h1>
          <div class="space-x-4">
            <a routerLink="/historial" class="hover:text-green-300">Seguimiento</a>
            <a routerLink="/cultivo" class="hover:text-green-300">
              Registro de Cultivo</a>
            <a routerLink="/procesos" class="hover:text-green-300">Procesos</a>
            <a routerLink="/empaque" class="hover:text-green-300">Empaque</a>
          </div>
        </div>
      </nav>
      
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  title = 'Coffee Trace';
}