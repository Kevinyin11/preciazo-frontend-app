import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../components/sidebar/sidebar';

export interface RouteStopItem {
  id: number;
  number: number;
  colorClass: string;
  name: string;
  address: string;
  distance: string;
  itemsCount: number;
  savings: number;
  travelTime: string;
  isClosed?: boolean;
  products: string[];
  expanded?: boolean;
  confirmed?: boolean;
}

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, SidebarComponent],
  templateUrl: './route.html',
  styleUrl: './route.css',
})
export class Route {
  // Modo de transporte seleccionado: 'walk' | 'bus' | 'car'
  transportMode: 'walk' | 'bus' | 'car' = 'bus';

  // Métricas globales de la ruta
  totalDistance: string = '5.8 km';
  totalTime: string = '34 min';
  totalSavings: number = 6.0;

  // Paradas de la ruta según el diseño de Figma
  stops: RouteStopItem[] = [
    {
      id: 1,
      number: 1,
      colorClass: 'stop-red',
      name: 'Metro Miraflores',
      address: 'Av. Benavides 1944',
      distance: '0.3 km',
      itemsCount: 2,
      savings: 0.6,
      travelTime: '4 min',
      isClosed: false,
      products: ['Aceite Vegetal', 'Detergente'],
      expanded: true, // Inicia expandida como en RUTA-SELECCIONADA
      confirmed: false,
    },
    {
      id: 2,
      number: 2,
      colorClass: 'stop-orange',
      name: 'Tottus San Borja',
      address: 'Av. Angamos Este 2650',
      distance: '2.1 km',
      itemsCount: 4,
      savings: 4.2,
      travelTime: '12 min',
      isClosed: false,
      products: ['Arroz Extra 2kg', 'Azúcar Rubia 1kg', 'Fideos x2', 'Leche Evap. x3'],
      expanded: false,
      confirmed: false,
    },
    {
      id: 3,
      number: 3,
      colorClass: 'stop-blue',
      name: 'Wong Surco',
      address: 'Av. Primavera 1190',
      distance: '3.4 km',
      itemsCount: 1,
      savings: 1.8,
      travelTime: '18 min',
      isClosed: true,
      products: ['Pan de Molde'],
      expanded: false,
      confirmed: false,
    },
  ];

  setTransportMode(mode: 'walk' | 'bus' | 'car'): void {
    this.transportMode = mode;
    if (mode === 'walk') {
      this.totalTime = '58 min';
    } else if (mode === 'bus') {
      this.totalTime = '34 min';
    } else {
      this.totalTime = '22 min';
    }
  }

  toggleStop(stop: RouteStopItem): void {
    stop.expanded = !stop.expanded;
  }

  confirmStop(stop: RouteStopItem, event: Event): void {
    event.stopPropagation();
    stop.confirmed = true;
    stop.expanded = false;
  }

  skipStop(stopId: number, event: Event): void {
    event.stopPropagation();
    // Omite la parada recalculando la ruta dinámicamente (US20)
    this.stops = this.stops.filter((s) => s.id !== stopId);
    this.recalculateRoute();
  }

  private recalculateRoute(): void {
    if (this.stops.length === 2) {
      this.totalDistance = '3.9 km';
      this.totalTime = '24 min';
      this.totalSavings = 4.8;
    } else if (this.stops.length === 1) {
      this.totalDistance = '1.8 km';
      this.totalTime = '12 min';
      this.totalSavings = 2.4;
    }
  }
}
