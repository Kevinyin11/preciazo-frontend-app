import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  status: 'Disponible' | 'Agotado';
  price: number;
  unitText: string;
  isEditingPrice?: boolean;
}

export interface PromotionItem {
  id: number;
  productName: string;
  promoPrice: number;
  originalPrice: number;
  discountBadge: string;
  expiredText: string;
  consultsText: string;
}

@Component({
  selector: 'app-merchant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  templateUrl: './merchant.html',
  styleUrl: './merchant.css',
})
export class Merchant {
  // Pestaña activa: 'metrics' | 'inventory' | 'promotions' | 'data'
  activeTab: 'metrics' | 'inventory' | 'promotions' | 'data' = 'metrics';

  // Datos de la tienda (DATOS)
  storeData = {
    businessName: 'Supermercados Peruanos S.A.',
    address: 'Av. Benavides 1944, Miraflores',
    phone: '+51 1 610-8888',
    ruc: '20100070970',
    scheduleWeek: '08:00 – 22:00',
    scheduleSat: '08:00 – 21:00',
    scheduleSun: '09:00 – 19:00',
  };

  // Catálogo de Inventario (INVENTARIO)
  inventory: InventoryItem[] = [
    {
      id: 1,
      name: 'Leche Evaporada',
      category: 'Lácteos',
      status: 'Disponible',
      price: 3.2,
      unitText: 'S/ 3.20 / unid.',
    },
    {
      id: 2,
      name: 'Arroz Extra',
      category: 'Granos',
      status: 'Disponible',
      price: 7.8,
      unitText: 'S/ 7.80 / unid.',
    },
    {
      id: 3,
      name: 'Aceite Vegetal 1L',
      category: 'Abarrotes',
      status: 'Disponible',
      price: 8.9,
      unitText: 'S/ 8.90 / unid.',
    },
    {
      id: 4,
      name: 'Azúcar Rubia 1kg',
      category: 'Abarrotes',
      status: 'Disponible',
      price: 4.5,
      unitText: 'S/ 4.50 / unid.',
    },
    {
      id: 5,
      name: 'Detergente 500g',
      category: 'Limpieza',
      status: 'Agotado',
      price: 6.9,
      unitText: 'S/ 6.90 / unid.',
    },
  ];

  // Promociones (PROMOCIONES)
  promotions: PromotionItem[] = [
    {
      id: 1,
      productName: 'Aceite Vegetal 1L',
      promoPrice: 7.5,
      originalPrice: 8.9,
      discountBadge: '-16%',
      expiredText: 'Expirada',
      consultsText: '124 consultas',
    },
    {
      id: 2,
      productName: 'Arroz Extra 2kg',
      promoPrice: 6.9,
      originalPrice: 7.8,
      discountBadge: '-12%',
      expiredText: 'Expirada',
      consultsText: '89 consultas',
    },
  ];

  // Control formulario nueva promoción (PROMOCIONES-NUEVA)
  showNewPromoModal: boolean = false;
  newPromoProduct: string = 'Leche Evaporada';
  newPromoPrice: number | null = null;
  newPromoStartDate: string = '';
  newPromoEndDate: string = '';

  // Métodos de navegación
  setTab(tab: 'metrics' | 'inventory' | 'promotions' | 'data'): void {
    this.activeTab = tab;
  }

  // Toggle status de producto en inventario
  toggleStatus(item: InventoryItem): void {
    item.status = item.status === 'Disponible' ? 'Agotado' : 'Disponible';
  }

  // Guardar nueva promoción
  savePromotion(): void {
    if (this.newPromoPrice && this.newPromoPrice > 0) {
      this.promotions.unshift({
        id: Date.now(),
        productName: this.newPromoProduct,
        promoPrice: Number(this.newPromoPrice.toFixed(2)),
        originalPrice: Number((this.newPromoPrice * 1.2).toFixed(2)),
        discountBadge: '-20%',
        expiredText: 'Activa',
        consultsText: '0 consultas',
      });
      this.newPromoPrice = null;
      this.showNewPromoModal = false;
    }
  }

  removePromotion(id: number): void {
    this.promotions = this.promotions.filter((p) => p.id !== id);
  }
}
