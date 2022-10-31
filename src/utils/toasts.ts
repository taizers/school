import { toast } from 'react-hot-toast';

export const createToast = {
  error: (message: string) => {
    toast.error(message);
  },
  success: (message: string) => {
    toast.success(message);
  },
};
