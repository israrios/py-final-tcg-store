# Mapa de estado - TCG Store App

## Clasificación

| Dato | Tipo | Dónde vive | Quién lo lee | Quién lo modifica |
|------|------|------------|--------------|-------------------|
| Texto del buscador y categoría | Local | `useState` en `HomeScreen` / `SearchScreen` | `HomeScreen`, `SearchScreen` | `HomeScreen`, `SearchScreen` |
| Usuario logueado y estado de sesión | Context | `SesionContext` | `RootNavigator`, `ProfileScreen`, `ContactoScreen` | `LoginScreen`, `ProfileScreen` (cerrar sesión) |
| Catálogo de cartas | Store (Redux) | slice `cards` (`cards/v1` en AsyncStorage) | `HomeScreen`, `CardDetailScreen`, `SearchScreen` | `CrearCartaScreen`, `CardDetailScreen` |

## Forma del estado del Store

```ts
{
  cards: {
    items: CardData[]; // { id, name, image, rarity, setName, avgPrice, game, condition, description }
    hydrated: boolean;
  }
}
```

## Acciones del slice `cards`

- `agregarCarta(payload)`: crea una nueva carta con `id` generado, `image` por defecto según nombre y la agrega al inicio de `items`.
- `actualizarCarta({ id, changes })`: actualiza campos de una carta existente (ej. `condition` o `avgPrice`).
- `eliminarCarta(id)`: elimina una carta por su `id`.
- `hidratarCartas(items)`: restaura la lista desde `AsyncStorage` al iniciar la app.
