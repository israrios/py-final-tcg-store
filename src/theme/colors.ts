export const colors = {
  // Primarios
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    500: '#2E7D32',   // Principal
    600: '#1B5E20',
    700: '#145214',
  },

  // Neutros
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    1000: '#000000',
  },

  // Semánticos
  semantic: {
    success: '#2E7D32',
    warning: '#F57F17',
    error: '#C62828',
    info: '#1565C0',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    onSurface: '#212121',
    onPrimary: '#FFFFFF',
    divider: '#E0E0E0',
  },

  // Estado
  state: {
    pressed: 'rgba(0,0,0,0.08)',
    hovered: 'rgba(0,0,0,0.04)',
    focused: 'rgba(46, 125, 50, 0.16)',
    disabled: 'rgba(0,0,0,0.26)',
  },
} as const;
