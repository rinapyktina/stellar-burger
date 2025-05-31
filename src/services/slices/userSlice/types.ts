import { TUser } from '@utils-types';

export interface UserState {
  isLoading: boolean;
  user: TUser | null;
  isAuthorized: boolean;
  error: string | null;
}
