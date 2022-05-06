interface UserCart {
  id: string;
  userId: string;
  cart: UserCart[];
  createdAt: Date;
}

interface UserCart {
  productId: number;
  productType: number;
  name: string;
  amount: number;
  unit: number;
  transactionType: number;
  cartType: number;
  isPin: boolean;
}