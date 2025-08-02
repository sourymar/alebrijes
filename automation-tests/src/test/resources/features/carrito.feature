Feature: Carrito de Compras Alebrijes

  Background:
    Given el usuario está en la página del carrito

  @navegacion
  Scenario: Navegación entre tabs
    When el usuario hace clic en el tab "MOBILIARIO"
    Then el tab "MOBILIARIO" debe estar activo

  @agregar-producto
  Scenario: Agregar producto al carrito
    Given el usuario está en el tab "PAQUETES"
    When el usuario selecciona 2 unidades de "Mesa rectangular con 10 sillas"
    Then el producto debe aparecer en el resumen del pedido
    And el total debe ser "$400"

  @flete
  Scenario: Seleccionar flete
    When el usuario selecciona el municipio "guadalajara"
    And el usuario selecciona la colonia "Centro - $100"
    Then el flete debe mostrar "$100"

  @calculo-total
  Scenario: Cálculo total con flete
    Given el usuario selecciona 1 unidad de "Mesa rectangular con 10 sillas"
    And el usuario selecciona el municipio "guadalajara"
    And el usuario selecciona la colonia "Centro - $100"
    Then el total debe ser "$300"

  @reset
  Scenario: Restablecer carrito
    Given el usuario tiene productos en el carrito
    When el usuario hace clic en restablecer
    Then el carrito debe estar vacío
    And el total debe ser "$0"

  @whatsapp
  Scenario: Validar mensaje WhatsApp
    Given el usuario selecciona 1 unidad de "Mesa rectangular con 10 sillas"
    When el usuario hace clic en WhatsApp
    Then debe abrir WhatsApp con el mensaje de cotización