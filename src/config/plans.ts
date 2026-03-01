export interface Plan {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  features: string[];
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'basico',
    name: 'Basico',
    price: 12000,
    priceFormatted: '$12.000',
    features: [
      'Retiro de reciclaje a domicilio',
      '1 retiro semanal',
      'Bolsa de reciclaje incluida',
    ],
  },
  {
    id: 'medio',
    name: 'Medio',
    price: 21000,
    priceFormatted: '$21.000',
    features: [
      'Todo lo del plan Basico',
      '1 contenedor de residuos organicos',
      'Retiro semanal de organicos',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 25000,
    priceFormatted: '$25.000',
    features: [
      'Todo lo del plan Medio',
      '2 contenedores de residuos organicos',
      'Retiro semanal de organicos',
      'Prioridad en rutas',
    ],
  },
];
