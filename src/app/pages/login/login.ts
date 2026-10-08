import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Rol seleccionado: 'buyer' | 'merchant'
  userRole: 'buyer' | 'merchant' = 'buyer';

  email: string = 'juan.ramos@perutech.pe';
  password: string = '••••••••';
  hidePassword: boolean = true;

  constructor(private router: Router) {}

  selectRole(role: 'buyer' | 'merchant'): void {
    this.userRole = role;
    if (role === 'merchant') {
      this.email = 'contacto@metromiraflores.pe';
    } else {
      this.email = 'juan.ramos@perutech.pe';
    }
  }

  async onLogin(): Promise<void> {
    if (this.userRole === 'merchant') {
      await this.router.navigate(['/merchant']);
    } else {
      await this.router.navigate(['/home']);
    }
  }
}
