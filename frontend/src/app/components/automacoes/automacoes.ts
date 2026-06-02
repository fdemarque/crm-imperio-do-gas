import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WhatsappConnection } from '../whatsapp-connection/whatsapp-connection';

@Component({
  selector: 'app-automacoes',
  standalone: true,
  imports: [CommonModule, RouterLink, WhatsappConnection],
  templateUrl: './automacoes.html',
  styleUrls: ['./automacoes.css']
})
export class Automacoes {
  isStarting = false;
  startupMessage = '';

  startWhatsapp() {
    this.isStarting = true;
    this.startupMessage = 'Iniciando serviço no servidor...';
    
    fetch('http://localhost:3000/api/automations/start-whatsapp', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      this.startupMessage = data.message || 'Comando enviado!';
      setTimeout(() => this.isStarting = false, 3000);
    })
    .catch(err => {
      console.error(err);
      this.startupMessage = 'Erro ao iniciar serviço.';
      this.isStarting = false;
    });
  }
}
