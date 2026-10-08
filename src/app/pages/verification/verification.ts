import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../components/sidebar/sidebar';

export interface VerificationCardItem {
  id: number;
  store: string;
  timeAgo: string;
  productName: string;
  publishedPrice: number;
  reportedPrice: number;
  confirmedByText: string;
  // Estados de validación del ítem
  status: 'pending' | 'confirmed' | 'rejected';
}

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, SidebarComponent],
  templateUrl: './verification.html',
  styleUrl: './verification.css',
})
export class Verification {
  // Reportes por verificar (Figma)
  reports: VerificationCardItem[] = [
    {
      id: 1,
      store: 'Metro Miraflores',
      timeAgo: 'Hace 15 min',
      productName: 'Aceite Vegetal 1L',
      publishedPrice: 8.9,
      reportedPrice: 8.5,
      confirmedByText: '8 personas ya lo confirmaron',
      status: 'pending',
    },
    {
      id: 2,
      store: 'Tottus San Borja',
      timeAgo: 'Hace 42 min',
      productName: 'Arroz Extra 2kg',
      publishedPrice: 8.2,
      reportedPrice: 7.6,
      confirmedByText: '5 personas ya lo confirmaron',
      status: 'pending',
    },
    {
      id: 3,
      store: 'Wong Surco',
      timeAgo: 'Hace 1 h',
      productName: 'Leche Evaporada x3',
      publishedPrice: 10.8,
      reportedPrice: 10.5,
      confirmedByText: '3 personas ya lo confirmaron',
      status: 'pending',
    },
  ];

  get pendingCount(): number {
    return this.reports.filter((r) => r.status === 'pending').length;
  }

  // Acción Confirmar precio (VERIFICACION-CONFIRMADO)
  confirmReport(report: VerificationCardItem): void {
    report.status = 'confirmed';
  }

  // Acción No coincide (VERIFICACION-DENEGADO)
  rejectReport(report: VerificationCardItem): void {
    report.status = 'rejected';
  }
}
