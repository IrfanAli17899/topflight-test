export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const orderStatuses = [
  'pending',
  'processing', 
  'shipped',
  'delivered',
  'cancelled'
] as const;

// Mock orders data
export const orders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1-555-0123",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    items: [
      {
        productId: "1",
        productName: "Whey Protein Isolate",
        quantity: 1,
        price: 49.99
      },
      {
        productId: "4",
        productName: "Creatine Monohydrate",
        quantity: 1,
        price: 19.99
      }
    ],
    total: 69.98,
    status: "delivered",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-18T14:20:00Z"
  },
  {
    id: "ORD-002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "+1-555-0456",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    items: [
      {
        productId: "2",
        productName: "Pre-Workout Extreme",
        quantity: 1,
        price: 34.99
      }
    ],
    total: 34.99,
    status: "shipped",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-17T11:45:00Z"
  },
  {
    id: "ORD-003",
    customerName: "Mike Davis",
    customerEmail: "mike.davis@email.com",
    customerPhone: "+1-555-0789",
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    items: [
      {
        productId: "3",
        productName: "Multivitamin Complex",
        quantity: 2,
        price: 24.99
      },
      {
        productId: "8",
        productName: "Vitamin D3",
        quantity: 1,
        price: 14.99
      }
    ],
    total: 64.97,
    status: "processing",
    createdAt: "2024-01-17T14:22:00Z",
    updatedAt: "2024-01-17T16:30:00Z"
  },
  {
    id: "ORD-004",
    customerName: "Emily Wilson",
    customerEmail: "emily.w@email.com",
    customerPhone: "+1-555-0321",
    shippingAddress: {
      street: "321 Elm St",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    items: [
      {
        productId: "5",
        productName: "Thermogenic Fat Burner",
        quantity: 1,
        price: 39.99
      },
      {
        productId: "6",
        productName: "BCAA Recovery",
        quantity: 1,
        price: 29.99
      }
    ],
    total: 69.98,
    status: "pending",
    createdAt: "2024-01-18T08:45:00Z",
    updatedAt: "2024-01-18T08:45:00Z"
  },
  {
    id: "ORD-005",
    customerName: "David Brown",
    customerEmail: "david.brown@email.com",
    customerPhone: "+1-555-0654",
    shippingAddress: {
      street: "654 Maple Dr",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    items: [
      {
        productId: "1",
        productName: "Whey Protein Isolate",
        quantity: 2,
        price: 49.99
      }
    ],
    total: 99.98,
    status: "delivered",
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-19T10:15:00Z"
  }
];

// Generate more mock orders for pagination testing
for (let i = 6; i <= 50; i++) {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  orders.push({
    id: `ORD-${i.toString().padStart(3, '0')}`,
    customerName: `Customer ${i}`,
    customerEmail: `customer${i}@email.com`,
    customerPhone: `+1-555-${i.toString().padStart(4, '0')}`,
    shippingAddress: {
      street: `${i} Test St`,
      city: "Test City",
      state: "TS",
      zipCode: "12345",
      country: "USA"
    },
    items: [
      {
        productId: "1",
        productName: "Whey Protein Isolate",
        quantity: 1,
        price: 49.99
      }
    ],
    total: 49.99,
    status: randomStatus,
    createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
    updatedAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString()
  });
}