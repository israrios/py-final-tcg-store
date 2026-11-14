# Inventario de formularios - TCG Store App

| Formulario | Pantalla | Campo | Regla | Mensaje de error | Destino |
|------------|----------|-------|-------|------------------|---------|
| Crear carta | `CrearCartaScreen` | `name` | texto, 3 a 60 caracteres | "El nombre debe tener entre 3 y 60 caracteres" | slice `cards` |
| Crear carta | `CrearCartaScreen` | `setName` | texto, 3 a 60 caracteres | "Indica la expansión o colección" | slice `cards` |
| Crear carta | `CrearCartaScreen` | `game` | enum: `pokemon`, `yugioh`, `magic` | "Elige el juego de cartas" | slice `cards` |
| Crear carta | `CrearCartaScreen` | `rarity` | enum: `Common`, `Uncommon`, `Rare`, `Ultra Rare`, `Secret Rare`, `Legendary` | "Selecciona una rareza" | slice `cards` |
| Crear carta | `CrearCartaScreen` | `condition` | enum: `Mint`, `Near Mint`, `Excellent`, `Good`, `Light Played`, `Played` | "Indica el estado de la carta" | slice `cards` |
| Crear carta | `CrearCartaScreen` | `avgPrice` | número positivo (> 0 y <= 100000) | "Ingresa un precio válido mayor a 0" | slice `cards` |
| Crear carta | `CrearCartaScreen` | `description` | texto, 10 a 300 caracteres | "La descripción debe tener entre 10 y 300 caracteres" | slice `cards` |
| Contacto y feedback | `ContactoScreen` | `nombre` | texto, mínimo 3 caracteres | "Escribe tu nombre completo" | `Alert` (API en S11) |
| Contacto y feedback | `ContactoScreen` | `correo` | correo electrónico válido | "Ingresa un correo válido" | `Alert` (API en S11) |
| Contacto y feedback | `ContactoScreen` | `celular` | regex `/^9\d{8}$/` (9 dígitos empezando en 9) | "El celular debe tener 9 dígitos y empezar con 9" | `Alert` (API en S11) |
| Contacto y feedback | `ContactoScreen` | `tipo` | enum: `sugerencia`, `error`, `consulta` | "Elige el tipo de mensaje" | `Alert` (API en S11) |
| Contacto y feedback | `ContactoScreen` | `calificacion` | número entero entre 1 y 5 | "Toca una estrella para calificar" | `Alert` (API en S11) |
| Contacto y feedback | `ContactoScreen` | `mensaje` | texto, 10 a 500 caracteres | "Cuéntanos un poco más (mínimo 10 caracteres)" | `Alert` (API en S11) |
| Contacto y feedback | `ContactoScreen` | `aceptaTerminos` | booleano `true` (`refine`) | "Debes aceptar el uso de tus datos para responderte" | `Alert` (API en S11) |
| Login | `LoginScreen` | `email` | correo electrónico válido | "Ingresa un correo válido" | `SesionContext` |
| Login | `LoginScreen` | `password` | texto, mínimo 6 caracteres | "La contraseña debe tener al menos 6 caracteres" | `SesionContext` |

## Formularios implementados en este lab (LAB-05)

1. **Crear carta (`CrearCartaScreen`)** — Requisito 5 (entidad principal conectada al store de Redux).
2. **Contacto y feedback (`ContactoScreen`)** — Requisito 6 (7 campos, múltiples reglas incluyendo `regex`, `enum`, `number`, `boolean` y `refine`).
3. **Login (`LoginForm` en `LoginScreen`)** — Migrado a React Hook Form + Zod para eliminar `useState` por campo.
