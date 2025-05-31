import { TOrder } from '@utils-types';

export interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
}
