import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  categories = [
    { name: 'Canasta', icon: 'shopping_cart' },
    { name: 'Ofertas', icon: 'local_offer' },
    { name: 'Frescos', icon: 'eco' },
    { name: 'Lácteos', icon: 'local_drink' },
    { name: 'Limpieza', icon: 'cleaning_services' },
    { name: 'Bebidas', icon: 'liquor' },
  ];

  deals = [
    {
      store: 'Metro',
      name: 'Aceite Vegetal 1L',
      price: 8.9,
      oldPrice: 11.5,
      discount: '-23%',
      image:
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60',
    },
    {
      store: 'Wong',
      name: 'Leche Evaporada x6',
      price: 18.5,
      oldPrice: 22.0,
      discount: '-16%',
      image:
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60',
    },
    {
      store: 'Tottus',
      name: 'Arroz Extra x10kg',
      price: 34.9,
      oldPrice: 39.9,
      discount: '-13%',
      image:
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60',
    },
  ];

  nearbyStores = [
    {
      name: 'Metro',
      type: 'Supermercado',
      status: 'Abierto',
      distance: '0.3 km',
      rating: '4.5',
      productsCount: '8420 productos',
      address: 'Av. Benavides 1944, Miraflores',
      open: true,
      isLocal: false,
    },
    {
      name: 'Bodega Don Alberto', // <--- Representa al Segmento 2 (Comercio Minorista / Bodega)
      type: 'Bodega de Barrio',
      status: 'Abierto',
      distance: '0.5 km',
      rating: '4.8',
      productsCount: '620 productos',
      address: 'Calle San Martín 380, Miraflores',
      open: true,
      isLocal: true,
    },
    {
      name: 'Wong',
      type: 'Supermercado',
      status: 'Abierto',
      distance: '0.7 km',
      rating: '4.7',
      productsCount: '9100 productos',
      address: 'Av. República de Panamá 5900, Miraflores',
      open: true,
      isLocal: false,
    },
    {
      name: 'Tottus',
      type: 'Supermercado',
      status: 'Abierto',
      distance: '1.2 km',
      rating: '4.3',
      productsCount: '7800 productos',
      address: 'Av. Comandante Espinar 719, Miraflores',
      open: true,
      isLocal: false,
    },
  ];
}
