import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../components/sidebar/sidebar';

export interface ProductItem {
  id: number;
  name: string;
  qtyPill: string;
  unitPrice: string;
  price: number;
  checked: boolean;
}

export interface SavedListItem {
  id: number;
  name: string;
  tag: string;
  tagType: 'clonable' | 'borrador';
  budget: number;
}

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule, SidebarComponent],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists {
  // Pestañas principales
  activeTab: 'activa' | 'guardadas' = 'activa';

  // Control de presupuesto (US10)
  budgetLimit: number = 150.0;
  budgetInput: number = 150.0;
  isEditingBudget: boolean = false;

  // Estados visuales e interactivos
  isShoppingMode: boolean = false;
  showSubstituteCard: boolean = true;
  isAddingProduct: boolean = false;

  // Formulario agregar producto (US09)
  newProdName: string = '';
  newProdQty: number = 1;
  newProdPrice: number | null = null;

  // Lista base Canasta Quincenal (Figma LISTAS-ACTIVA)
  products: ProductItem[] = [
    {
      id: 1,
      name: 'Arroz Extra',
      qtyPill: '2 kg',
      unitPrice: 'S/ 3.90 c/u',
      price: 7.8,
      checked: false,
    },
    {
      id: 2,
      name: 'Aceite Vegetal 1L',
      qtyPill: '1 unid.',
      unitPrice: 'S/ 8.90 c/u',
      price: 8.9,
      checked: true,
    },
    {
      id: 3,
      name: 'Azúcar Rubia 1kg',
      qtyPill: '1 unid.',
      unitPrice: 'S/ 4.50 c/u',
      price: 4.5,
      checked: false,
    },
    {
      id: 4,
      name: 'Leche Evaporada',
      qtyPill: '3 latas',
      unitPrice: 'S/ 3.20 c/u',
      price: 9.6,
      checked: true,
    },
    {
      id: 5,
      name: 'Fideos Spaghetti',
      qtyPill: '2 paq.',
      unitPrice: 'S/ 2.80 c/u',
      price: 5.6,
      checked: false,
    },
    {
      id: 6,
      name: 'Detergente 500g',
      qtyPill: '1 unid.',
      unitPrice: 'S/ 6.90 c/u',
      price: 6.9,
      checked: false,
    },
    {
      id: 7,
      name: 'Pan de Molde',
      qtyPill: '1 unid.',
      unitPrice: 'S/ 7.50 c/u',
      price: 7.5,
      checked: false,
    },
  ];

  // Listas guardadas con tipado de badge (Figma LISTAS-GUARDADOS)
  savedLists: SavedListItem[] = [
    {
      id: 101,
      name: 'Desayuno Semanal',
      tag: 'Plantilla clonable',
      tagType: 'clonable',
      budget: 80.0,
    },
    { id: 102, name: 'Limpieza del Hogar', tag: 'Borrador', tagType: 'borrador', budget: 60.0 },
  ];

  // Cálculos dinámicos
  get totalAmount(): number {
    return Number(this.products.reduce((acc, p) => acc + p.price, 0).toFixed(2));
  }

  get cartTotal(): number {
    return Number(
      this.products
        .filter((p) => p.checked)
        .reduce((acc, p) => acc + p.price, 0)
        .toFixed(2),
    );
  }

  get spentAmount(): number {
    return this.cartTotal > 0 ? this.cartTotal : 18.5;
  }

  get reservedAmount(): number {
    const reserved = this.totalAmount - this.spentAmount;
    return reserved > 0 ? Number(reserved.toFixed(2)) : 0;
  }

  get spentPercentage(): number {
    return (this.spentAmount / this.budgetLimit) * 100;
  }

  get reservedPercentage(): number {
    return (this.reservedAmount / this.budgetLimit) * 100;
  }

  // Métodos de control de presupuesto (LISTAS-EDITAR-PRESUPUESTO)
  toggleEditBudget(): void {
    this.isEditingBudget = !this.isEditingBudget;
    if (this.isEditingBudget) {
      this.budgetInput = this.budgetLimit;
    }
  }

  saveBudget(): void {
    if (this.budgetInput && this.budgetInput > 0) {
      this.budgetLimit = Number(this.budgetInput);
      this.isEditingBudget = false;
    }
  }

  // Alternar Modo Compra con checkboxes y totalizador (LISTAS-MODO-COMPRA)
  toggleShoppingMode(): void {
    this.isShoppingMode = !this.isShoppingMode;
  }

  // Interacción de bienes sustitutos (US15)
  applySubstitute(): void {
    const itemIndex = this.products.findIndex((p) => p.name.includes('Detergente'));
    if (itemIndex !== -1) {
      this.products[itemIndex] = {
        id: this.products[itemIndex].id,
        name: 'Detergente Genérico 500g',
        qtyPill: '1 unid.',
        unitPrice: 'S/ 4.50 c/u',
        price: 4.5,
        checked: false,
      };
    }
    this.showSubstituteCard = false;
  }

  dismissSubstitute(): void {
    this.showSubstituteCard = false;
  }

  removeProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }

  // Guardar nuevo ítem (LISTAS-AGREGAR)
  saveNewProduct(): void {
    if (this.newProdName.trim() && this.newProdPrice !== null && this.newProdPrice > 0) {
      const calculatedPrice = Number((this.newProdPrice * (this.newProdQty || 1)).toFixed(2));
      this.products.push({
        id: Date.now(),
        name: this.newProdName.trim(),
        qtyPill: `${this.newProdQty} unid.`,
        unitPrice: `S/ ${this.newProdPrice.toFixed(2)} c/u`,
        price: calculatedPrice,
        checked: false,
      });
      this.newProdName = '';
      this.newProdQty = 1;
      this.newProdPrice = null;
      this.isAddingProduct = false;
    }
  }

  useSavedList(list: SavedListItem): void {
    this.activeTab = 'activa';
  }
}
