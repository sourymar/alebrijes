# Automatización de Pruebas - Carrito Alebrijes

## Configuración del Proyecto

### Requisitos
- Java 11+
- Maven 3.6+
- Chrome Browser
- IntelliJ IDEA

### Instalación
1. Abrir IntelliJ IDEA
2. File → Open → Seleccionar carpeta `automation-tests`
3. Esperar a que Maven descargue dependencias
4. Ejecutar `mvn clean compile`

## Estructura del Proyecto

```
automation-tests/
├── src/
│   ├── main/java/
│   │   ├── pages/
│   │   │   ├── BasePage.java
│   │   │   └── CarritoPage.java
│   │   └── utils/
│   │       └── DriverManager.java
│   └── test/
│       ├── java/
│       │   ├── runners/
│       │   │   └── TestRunner.java
│       │   └── stepDefinitions/
│       │       ├── CarritoSteps.java
│       │       └── Hooks.java
│       └── resources/features/
│           └── carrito.feature
├── pom.xml
└── README.md
```

## Ejecutar Pruebas

### Todas las pruebas
1. Click derecho en `TestRunner.java` → Run
2. O desde terminal: `mvn test`

### Escenarios individuales (Botón Play)
1. **Navegación**: Click derecho en `NavegacionRunner.java` → Run
2. **Agregar Producto**: Click derecho en `AgregarProductoRunner.java` → Run
3. **Flete**: Click derecho en `FleteRunner.java` → Run
4. **Cálculo Total**: Click derecho en `CalculoTotalRunner.java` → Run
5. **Reset**: Click derecho en `ResetRunner.java` → Run
6. **WhatsApp**: Click derecho en `WhatsAppRunner.java` → Run

### Por tags desde terminal
```bash
mvn test -Dcucumber.filter.tags="@navegacion"
mvn test -Dcucumber.filter.tags="@agregar-producto"
mvn test -Dcucumber.filter.tags="@flete"
```

## Reportes
Los reportes se generan en:
- **ExtentReports**: `target/extent-reports/ExtentReport.html` (Reporte principal)
- **Cucumber HTML**: `target/cucumber-reports/index.html`
- **JSON**: `target/cucumber-reports/Cucumber.json`
- **Screenshots**: `target/extent-reports/screenshots/` (En caso de fallos)

## Escenarios de Prueba
- ✅ Navegación entre tabs
- ✅ Agregar productos al carrito
- ✅ Selección de flete
- ✅ Cálculo total con flete
- ✅ Restablecer carrito
- ✅ Validar mensaje WhatsApp