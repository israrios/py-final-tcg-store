import { z } from 'zod';

export const TIPOS_MENSAJE = ['sugerencia', 'error', 'consulta'] as const;
export type TipoMensaje = (typeof TIPOS_MENSAJE)[number];

export const contactoSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(3, 'Escribe tu nombre completo (mínimo 3 caracteres)')
      .max(80, 'Máximo 80 caracteres'),
    correo: z
      .string()
      .trim()
      .toLowerCase()
      .email('Ingresa un correo electrónico válido'),
    celular: z
      .string()
      .trim()
      .regex(/^9\d{8}$/, 'El celular debe tener 9 dígitos y empezar con 9'),
    tipo: z.enum(TIPOS_MENSAJE, { message: 'Elige el tipo de mensaje' }),
    calificacion: z
      .number({ message: 'Toca una estrella para calificar' })
      .int()
      .min(1, 'Toca una estrella para calificar (mínimo 1)')
      .max(5),
    mensaje: z
      .string()
      .trim()
      .min(10, 'Cuéntanos un poco más (mínimo 10 caracteres)')
      .max(500, 'Máximo 500 caracteres'),
    aceptaTerminos: z.boolean(),
  })
  .refine((datos) => datos.aceptaTerminos, {
    message: 'Debes aceptar el uso de tus datos para responderte',
    path: ['aceptaTerminos'],
  });

export type ContactoFormValues = z.infer<typeof contactoSchema>;

export const contactoVacio: ContactoFormValues = {
  nombre: '',
  correo: '',
  celular: '',
  tipo: '' as TipoMensaje,
  calificacion: 0,
  mensaje: '',
  aceptaTerminos: false,
};
