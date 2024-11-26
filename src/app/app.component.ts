import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatIaComponent } from './features/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ChatIaComponent],
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
            <button
              alt="Icono de Chat"
              class="flex items-center justify-center px-3 py-4 border border-gray-200 text-orange-500 rounded-md bg-transparent hover:bg-gray-100 transition duration-300 absolute top-4 right-4 h-8"
              (click)="chatDrawer.openDrawer()"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
    <app-chat-ia #chatDrawer></app-chat-ia>
  `
})
export class AppComponent {
  title = 'Coffee Trace';
}