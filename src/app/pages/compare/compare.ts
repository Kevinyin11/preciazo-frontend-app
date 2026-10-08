import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../components/sidebar/sidebar';

export interface ComparisonRow {
  name: string;
  unit: string;
  metro: {
    price: number;
    unitPrice: string;
    status: 'Disponible' | 'Stock Bajo' | 'Agotado';
    isBest?: boolean;
  };
  tottus: {
    price: number;
    unitPrice: string;
    status: 'Disponible' | 'Stock Bajo' | 'Agotado';
    isBest?: boolean;
  };
  wong: {
    price: number;
    unitPrice: string;
    status: 'Disponible' | 'Stock Bajo' | 'Agotado';
    isBest?: boolean;
  };
}

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule, SidebarComponent],
  templateUrl: './compare.html',
  styleUrl: './compare.css',
})
export class Compare {
  // Control de filtros (COMPRAS-FILTROS)
  showFilters: boolean = false;
  showUnitPrice: boolean = false;
  maxRadius: number = 2;

  // Tiendas activas en el filtro
  stores = [
    { name: 'Metro', active: true },
    { name: 'Tottus', active: true },
    { name: 'Wong', active: true },
    { name: 'Plaza Vea', active: false },
  ];

  // Control de modal de reporte (COMPRAS-REPORTE)
  showReportModal: boolean = false;
  reportStore: string = 'Metro';
  reportProduct: string = 'Arroz Extra 2kg';
  reportPrice: number | null = null;
  reportSuccessMessage: string = '';

  // Resumen de cabecera
  storeSummaries = [
    { rank: '#1 · 0.3 km', name: 'Metro', total: 47.8, available: '7/7 disp.', isBest: true },
    { rank: '#2 · 1.2 km', name: 'Tottus', total: 51.2, available: '7/7 disp.', isBest: false },
    { rank: '#3 · 0.7 km', name: 'Wong', total: 54.9, available: '6/7 disp.', isBest: false },
  ];

  // Filas comparativas detalladas
  comparisonData: ComparisonRow[] = [
    {
      name: 'Arroz Extra 2kg',
      unit: 'kg',
      metro: { price: 7.8, unitPrice: 'S/ 3.90/kg', status: 'Disponible', isBest: true },
      tottus: { price: 8.2, unitPrice: 'S/ 4.10/kg', status: 'Disponible' },
      wong: { price: 8.6, unitPrice: 'S/ 4.30/kg', status: 'Disponible' },
    },
    {
      name: 'Aceite Vegetal 1L',
      unit: 'L',
      metro: { price: 8.9, unitPrice: 'S/ 8.90/L', status: 'Disponible', isBest: true },
      tottus: { price: 9.1, unitPrice: 'S/ 9.10/L', status: 'Disponible' },
      wong: { price: 9.5, unitPrice: 'S/ 9.50/L', status: 'Stock Bajo' },
    },
    {
      name: 'Azúcar Rubia 1kg',
      unit: 'kg',
      metro: { price: 4.5, unitPrice: 'S/ 4.50/kg', status: 'Disponible', isBest: true },
      tottus: { price: 4.8, unitPrice: 'S/ 4.80/kg', status: 'Stock Bajo' },
      wong: { price: 5.1, unitPrice: 'S/ 5.10/kg', status: 'Disponible' },
    },
    {
      name: 'Leche Evap. x3',
      unit: 'lata',
      metro: { price: 9.6, unitPrice: 'S/ 24.00/lata', status: 'Stock Bajo', isBest: true },
      tottus: { price: 10.2, unitPrice: 'S/ 25.50/lata', status: 'Disponible' },
      wong: { price: 10.8, unitPrice: 'S/ 27.00/lata', status: 'Disponible' },
    },
    {
      name: 'Fideos x2',
      unit: 'paq.',
      metro: { price: 5.6, unitPrice: 'S/ 5.60/paq.', status: 'Disponible' },
      tottus: { price: 5.2, unitPrice: 'S/ 5.20/paq.', status: 'Disponible', isBest: true },
      wong: { price: 5.8, unitPrice: 'S/ 5.80/paq.', status: 'Disponible' },
    },
    {
      name: 'Detergente 500g',
      unit: 'g',
      metro: { price: 6.9, unitPrice: 'S/ 13.80/g', status: 'Disponible', isBest: true },
      tottus: { price: 7.5, unitPrice: 'S/ 15.00/g', status: 'Disponible' },
      wong: { price: 7.9, unitPrice: 'S/ 15.80/g', status: 'Disponible' },
    },
    {
      name: 'Pan de Molde',
      unit: 'unid.',
      metro: { price: 4.5, unitPrice: 'S/ 4.50/unid.', status: 'Disponible', isBest: true },
      tottus: { price: 6.2, unitPrice: 'S/ 6.20/unid.', status: 'Disponible' },
      wong: { price: 0.0, unitPrice: '—', status: 'Agotado' },
    },
  ];

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleStore(store: { name: string; active: boolean }): void {
    store.active = !store.active;
  }

  openReportModal(): void {
    this.showReportModal = true;
    this.reportSuccessMessage = '';
  }

  closeReportModal(): void {
    this.showReportModal = false;
  }

  submitReport(): void {
    if (this.reportPrice && this.reportPrice > 0) {
      this.reportSuccessMessage = 'Reporte enviado a la comunidad con éxito.';
      setTimeout(() => {
        this.showReportModal = false;
        this.reportPrice = null;
        this.reportSuccessMessage = '';
      }, 1200);
    }
  }

  // Genera la impresión o guardado directo en PDF del resumen comparativo
  downloadPDFSummary(): void {
    window.print();
  }
}
