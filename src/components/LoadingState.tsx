import React from 'react';

export default function LoadingState() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '3rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#666'
    }}>
      Cargando personajes...
    </div>
  );
}
