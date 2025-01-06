export interface Promo {
  id: number;
  title: string;
  description: string;
  caraP?: string;
  syaratK?: string;
  menuB?: string;
  date: string;
  datetime: string;
  minTrans?: number;
  category: {
    title: string;
    href: string;
  };
}
