import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-whatsapp-connection',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './whatsapp-connection.html',
  styleUrls: ['./whatsapp-connection.css']
})
export class WhatsappConnection implements OnInit, OnDestroy {
  private socket!: Socket;
  qrCode: string = '';
  status: 'disconnected' | 'authenticated' | 'ready' = 'disconnected';

  ngOnInit() {
    this.socket = io('http://localhost:3000');

    this.socket.on('whatsapp:qr', (qr: string) => {
      this.qrCode = qr;
      this.status = 'disconnected';
    });

    this.socket.on('whatsapp:authenticated', () => {
      this.status = 'authenticated';
    });

    this.socket.on('whatsapp:ready', () => {
      this.status = 'ready';
    });

    this.socket.on('whatsapp:disconnected', () => {
      this.status = 'disconnected';
      this.qrCode = ''; // Will wait for a new QR
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
