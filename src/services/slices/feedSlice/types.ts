import { TOrder } from '@utils-types';

export interface feedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}
