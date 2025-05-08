import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Export the Toaster component for use in App.jsx
export const ToastContainer = () => (
  <Toaster 
    position="top-center"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
      duration: 3000,
      style: {
        background: '#363636',
        color: '#fff',
      },
      success: {
        duration: 3000,
        style: {
          background: 'rgba(48, 151, 71, 0.9)',
        },
      },
      error: {
        duration: 4000,
        style: {
          background: 'rgba(205, 50, 50, 0.9)',
        },
      },
      loading: {
        duration: Infinity,
      },
    }}
  />
);

// Helper functions for consistent toast styling
export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showLoadingToast = (message) => {
  return toast.loading(message);
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export const showPromiseToast = (promise, { loading, success, error }) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
  });
};

