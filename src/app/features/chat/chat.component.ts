import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { finalize } from 'rxjs';
import { LocationsService } from '../../services/locations.service';
import { BridgeService } from '../../services/bridge.service';
import { OpenAiChatService } from '../../services/open-ai-chat.service';

@Component({
    selector: 'app-chat-ia',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatIaComponent implements OnInit {
  isOpen = false;
  userMessage: string = '';
  chatHistory: { role: string, content: string }[] = [];
  chat_message: string = 'Soy el asistente IA de Smart Coffee. ¿En qué puedo ayudarte?';
  private visitorId: string;

  constructor(
    private bridgeService: BridgeService,
    private locationService: LocationsService,
    private chatService: OpenAiChatService,

  ) {
    this.visitorId = locationService.getVisitorId();

  }

  ngOnInit(): void {
    this.visitorId = this.locationService.getVisitorId();
    console.log(this.visitorId);
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Agregar el mensaje del usuario al historial
    this.chatHistory.push({ role: 'user', content: this.userMessage });
    this.setChatMessage('El asistente IA está respondiendo...');

    // Llamar al servicio
    this.chatService.sendMessageStream(this.locationService.getVisitorId(), this.userMessage)
      .pipe(finalize(() => {
        this.userMessage = '';
        this.setChatMessage('¿Cuál es tu siguiente pregunta?');
      }))
      .subscribe(
        response => {
          try {
            console.log(response);
            const message = response.reply.choices[0].message.content;
            this.chatHistory.push({ role: 'assistant', content: message });
          } catch (error) {
            console.log(error);
            this.chatHistory.push({ role: 'assistant', content: response.reply.error.message })
          }
        },
        error => {
          this.chatHistory.push({ role: 'assistant', content: error.error.error.message })
        }

      );
  }

  setChatMessage(message: string) {
    if(this.chatHistory.length > 0) {
      this.chat_message = message;
    }
  }

  // Función para abrir el drawer
  openDrawer() {
    this.isOpen = true;
    document.getElementById('chatDrawer')?.classList.remove('translate-x-full');
  }

  // Función para cerrar el drawer
  closeDrawer() {
    this.isOpen = false;
    document.getElementById('chatDrawer')?.classList.add('translate-x-full');
  }
}
