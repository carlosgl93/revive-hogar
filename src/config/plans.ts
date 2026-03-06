export interface Plan {
  id: string;
  paykuPlanId: string;
  name: string;
  price: number;
  priceFormatted: string;
  features: string[];
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'basico',
    paykuPlanId: 'pl416c17c4ba001aeca188',
    name: 'Plan Basico',
    price: 12000,
    priceFormatted: '$12.000',
    features: [
      'Retiro de reciclaje a domicilio',
      '1 retiro semanal',
      'Bolsa de reciclaje incluida',
    ],
  },
  {
    id: 'pro-s',
    paykuPlanId: 'pl7c9a9495620a5d6d6491',
    name: 'Plan Pro S',
    price: 21000,
    priceFormatted: '$21.000',
    features: ['Todo lo del plan Basico', 'Retiro de residuos reciclables y compostables'],
    highlighted: true,
  },
  {
    id: 'pro-l',
    paykuPlanId: 'pl32ce962c8dfb5dd62b00',
    name: 'Plan Pro L',
    price: 25000,
    priceFormatted: '$25.000',
    features: ['Todo lo del plan Pro S', 'Mayor capacidad de retiro'],
  },
  {
    id: 'organico-s',
    paykuPlanId: 'pl31af7be2ee28fdbb7790',
    name: 'Plan Organico S',
    price: 15000,
    priceFormatted: '$15.000',
    features: ['Retiro de residuos organicos'],
  },
  {
    id: 'organico-l',
    paykuPlanId: 'plea1ba75a0910bccfff97',
    name: 'Plan Organico L',
    price: 20000,
    priceFormatted: '$20.000',
    features: ['Retiro de residuos organicos', 'Mayor capacidad de retiro'],
  },
  {
    id: 'curico',
    paykuPlanId: 'pl16131e9f0254cca9c6da',
    name: 'Plan Curico',
    price: 12000,
    priceFormatted: '$12.000',
    features: ['Retiro de residuos reciclables y compostables'],
  },
];
