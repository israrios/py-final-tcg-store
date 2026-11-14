import React, { createContext, useContext, useMemo, useState } from 'react';

export interface UsuarioSesion {
  nombre: string;
  correo: string;
}

interface SesionContextValue {
  usuario: UsuarioSesion | null;
  estaLogueado: boolean;
  iniciarSesion: (correo: string) => void;
  cerrarSesion: () => void;
}

const SesionContext = createContext<SesionContextValue | undefined>(undefined);

export const SesionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

  const iniciarSesion = (correo: string) => {
    const nombreBase = correo.split('@')[0] || 'Usuario';
    const nombreFormateado = nombreBase
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    setUsuario({
      nombre: nombreFormateado || 'Usuario Demo',
      correo: correo.trim().toLowerCase(),
    });
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  const value = useMemo(
    () => ({
      usuario,
      estaLogueado: usuario !== null,
      iniciarSesion,
      cerrarSesion,
    }),
    [usuario]
  );

  return <SesionContext.Provider value={value}>{children}</SesionContext.Provider>;
};

export const useSesion = (): SesionContextValue => {
  const ctx = useContext(SesionContext);
  if (!ctx) {
    throw new Error('useSesion debe usarse dentro de un SesionProvider');
  }
  return ctx;
};
