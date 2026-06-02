import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes {
  userRole: 'adm' | 'colaborador' = 'adm';
  isModalOpen = false;
  clients: any[] = [];
  
  newClient = { name: '', document: '', birthdate: '', phone: '', email: '', address: '' };

  constructor(private http: HttpClient) {}

  toggleRole() {
    this.userRole = this.userRole === 'adm' ? 'colaborador' : 'adm';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveClient() {
    this.http.post('http://localhost:3000/api/clients', this.newClient).subscribe({
      next: (res) => {
        alert('Cliente salvo com sucesso!');
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  importCsv(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // Simulando Token para a rota protegida
      this.http.post('http://localhost:3000/api/clients/upload-csv', formData, {
        headers: { 'Authorization': 'Bearer MOCK_TOKEN_PARA_TESTE' }
      }).subscribe({
        next: (res: any) => alert(res.message),
        error: (err) => alert('Erro no upload ou Token inválido: ' + (err.error?.error || err.message))
      });
    }
  }
}
