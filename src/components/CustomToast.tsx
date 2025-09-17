import { Toaster } from 'react-hot-toast';

export default function CustomToast() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 2000
        },
        error: {
          duration: 3000
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: '#1db954',
          color: '#000'
        }
      }}
    />
  );
}
