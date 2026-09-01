export type User = {
  username: string;
  password: string;
};

export function createTestUser(): User {
  return {
    username: `pw_user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    password: 'DemoBlaze123!',
  };
}

export const testData = {
  product: {
    name: 'Samsung galaxy s6',
    price: 360,
  },
  invalidUser: {
    username: `invalid_${Date.now()}`,
    password: 'incorrect-password',
  },
  order: {
    name: 'Test User',
    country: 'Pakistan',
    city: 'Lahore',
    creditCard: '4111111111111111',
    month: '12',
    year: '2030',
  },
};
