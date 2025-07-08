export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductColor {
  name: string;
  value: string;
  hex: string;
}

// Mock colors since API doesn't provide them
export const productColors: ProductColor[] = [
  { name: 'Light Blue', value: 'lightBlue', hex: '#B8D4E3' },
  { name: 'Teal', value: 'teal', hex: '#7EC8BD' },
  { name: 'Light Green', value: 'lightGreen', hex: '#C8E6C9' },
  { name: 'Blue', value: 'blue', hex: '#6BA6CD' },
];