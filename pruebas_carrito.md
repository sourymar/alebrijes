# PRUEBAS MANUALES - CARRITO DE COMPRAS ALEBRIJES

## 1. PRUEBAS DE INTERFAZ Y NAVEGACIÓN

### 1.1 Carga inicial de la página
- **Acción**: Abrir carrito.html en el navegador
- **Resultado esperado**: 
  - Logo y título "Alebrijes Diversión Total" visible
  - Fondo degradado animado
  - Tab "PAQUETES" activo por defecto
  - Productos de paquetes visibles

### 1.2 Navegación entre tabs
- **Acción**: Hacer clic en cada tab (PAQUETES, MOBILIARIO, TOLDOS, INFANTILES)
- **Resultado esperado**:
  - Tab seleccionado cambia de color a azul
  - Contenido cambia según la categoría
  - Solo una sección visible a la vez

## 2. PRUEBAS DE PRODUCTOS

### 2.1 Visualización de productos
- **Acción**: Revisar cada categoría
- **Resultado esperado**:
  - **PAQUETES**: 4 productos (Mesa rectangular con 10 sillas, Mesa redonda con 10 sillas, Toldo 6x3 con 2 mesas, Toldo 6x3 con 3 mesas)
  - **MOBILIARIO**: 12 productos (Silla cromada, Mesas, Manteles, Bocina JBL, etc.)
  - **TOLDOS**: 3 productos (Toldo 6x3, 3x3, 2x2)
  - **INFANTILES**: 5 productos (Mesitas, Sillas, Caballete, Hockey)

### 2.2 Imágenes de productos
- **Acción**: Verificar que las imágenes se muestren correctamente
- **Resultado esperado**:
  - Productos con imagen específica la muestran
  - Productos sin imagen muestran placeholder "📦 Imagen"

### 2.3 Cálculo de importes individuales
- **Acción**: Cambiar cantidad en cualquier producto
- **Resultado esperado**:
  - Importe se actualiza: cantidad × precio
  - Ejemplo: Silla cromada (2 unidades × $15 = $30)

## 3. PRUEBAS DE CARRITO

### 3.1 Agregar productos al carrito
- **Acción**: Seleccionar cantidades en diferentes productos
- **Resultado esperado**:
  - Productos aparecen en tabla "Datos del Pedido"
  - Subtotal se calcula correctamente

### 3.2 Modificar cantidades
- **Acción**: Cambiar cantidad de producto ya agregado
- **Resultado esperado**:
  - Tabla se actualiza automáticamente
  - Total recalcula correctamente

### 3.3 Eliminar productos
- **Acción**: Poner cantidad en 0
- **Resultado esperado**:
  - Producto desaparece de la tabla
  - Total se recalcula

## 4. PRUEBAS DE FLETE

### 4.1 Selección de municipio
- **Acción**: Seleccionar cada municipio del dropdown
- **Resultado esperado**:
  - Campo colonia se habilita
  - Placeholder cambia a "Escribe o selecciona una colonia"

### 4.2 Filtrado de colonias
- **Acción**: Escribir texto en campo colonia
- **Resultado esperado**:
  - Lista se filtra mostrando solo coincidencias
  - Ejemplo: escribir "centro" muestra colonias con esa palabra

### 4.3 Selección de colonia
- **Acción**: Seleccionar colonia del dropdown
- **Resultado esperado**:
  - Flete se actualiza según precio de colonia
  - Total incluye flete
  - Ejemplo: "Centro" en Guadalajara = $100

### 4.4 Precios de flete por municipio
- **Verificar precios**:
  - **Guadalajara**: $50, $100, $150 según colonia
  - **Zapopan**: $50, $100, $150 según colonia
  - **Tlaquepaque**: $50, $100, $150 según colonia
  - **Tlajomulco**: $100, $150 según colonia

## 5. PRUEBAS DE CÁLCULOS

### 5.1 Cálculo total
- **Acción**: Agregar productos y seleccionar flete
- **Resultado esperado**:
  - Total = Suma de productos + Flete
  - Ejemplo: Productos $500 + Flete $100 = Total $600

### 5.2 Casos extremos
- **Pruebas**:
  - Cantidad máxima (100): debe calcular correctamente
  - Sin productos: total debe ser solo flete
  - Sin flete: total debe ser solo productos

## 6. PRUEBAS DE BOTONES

### 6.1 Botón Restablecer
- **Acción**: Hacer clic en "🔄 Restablecer Campos"
- **Resultado esperado**:
  - Todas las cantidades vuelven a 0
  - Municipio y colonia se resetean
  - Tabla de pedido se vacía
  - Total vuelve a $0

### 6.2 Botón WhatsApp
- **Acción**: Hacer clic en "📱 Solicitar Cotización"
- **Casos de prueba**:
  - **Sin productos**: Debe mostrar alerta "Por favor selecciona al menos un producto"
  - **Con productos**: Debe abrir WhatsApp con mensaje formateado

### 6.3 Formato mensaje WhatsApp
- **Verificar que incluya**:
  - Título "COTIZACIÓN ALEBRIJES DIVERSIÓN TOTAL"
  - Lista de productos con cantidades y precios
  - Información de flete y colonia
  - Total final
  - Mensaje de agradecimiento

## 7. PRUEBAS RESPONSIVE

### 7.1 Vista móvil
- **Acción**: Reducir ancho de ventana < 768px
- **Resultado esperado**:
  - Tabs se apilan verticalmente
  - Productos en una sola columna
  - Botones se apilan verticalmente

### 7.2 Vista tablet
- **Acción**: Ancho medio (768px - 1200px)
- **Resultado esperado**:
  - Layout se adapta manteniendo funcionalidad

## 8. PRUEBAS DE VALIDACIÓN

### 8.1 Campos numéricos
- **Acción**: Intentar ingresar valores inválidos
- **Resultado esperado**:
  - Solo acepta números 0-100
  - Valores negativos no permitidos

### 8.2 Selección de colonia sin municipio
- **Acción**: Intentar seleccionar colonia sin municipio
- **Resultado esperado**:
  - Campo colonia permanece deshabilitado

## 9. CASOS DE PRUEBA ESPECÍFICOS

### Caso 1: Pedido completo
1. Seleccionar "Mesa rectangular con 10 sillas" (2 unidades)
2. Seleccionar "Silla cromada acojinada" (5 unidades)
3. Seleccionar municipio "Guadalajara"
4. Seleccionar colonia "Centro"
5. Verificar total: (2×$200) + (5×$15) + $100 = $575

### Caso 2: Solo flete
1. No seleccionar productos
2. Seleccionar municipio y colonia
3. Verificar que total = precio flete

### Caso 3: Cambio de municipio
1. Seleccionar municipio "Guadalajara"
2. Seleccionar colonia
3. Cambiar a municipio "Zapopan"
4. Verificar que colonia se resetea

## 10. CRITERIOS DE ACEPTACIÓN

✅ **PASA** si:
- Todos los cálculos son correctos
- Navegación funciona sin errores
- WhatsApp se abre con mensaje correcto
- Responsive funciona en móvil
- Filtrado de colonias funciona
- Botón restablecer limpia todo

❌ **FALLA** si:
- Cálculos incorrectos
- Errores de JavaScript en consola
- WhatsApp no se abre
- Layout roto en móvil
- Colonias no se filtran
- Datos no se resetean