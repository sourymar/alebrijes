package stepDefinitions;

import io.cucumber.java.en.*;
import org.junit.Assert;
import pages.CarritoPage;
import utils.DriverManager;

public class CarritoSteps {
    private CarritoPage carritoPage;

    @Given("el usuario está en la página del carrito")
    public void el_usuario_esta_en_la_pagina_del_carrito() {
        DriverManager.getDriver().get("file:///c:/alebrijesPage/alebrijes/carrito.html");
        carritoPage = new CarritoPage(DriverManager.getDriver());
    }

    @Given("el usuario está en el tab {string}")
    public void el_usuario_esta_en_el_tab(String tabName) {
        carritoPage.clickTab(tabName);
    }

    @When("el usuario hace clic en el tab {string}")
    public void el_usuario_hace_clic_en_el_tab(String tabName) {
        carritoPage.clickTab(tabName);
    }

    @Then("el tab {string} debe estar activo")
    public void el_tab_debe_estar_activo(String tabName) {
        Assert.assertEquals(tabName, carritoPage.getActiveTabText());
    }

    @When("el usuario selecciona {int} unidades de {string}")
    public void el_usuario_selecciona_unidades_de(Integer quantity, String productName) {
        try {
            Thread.sleep(1000);
            carritoPage.setProductQuantity(productName, quantity);
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Given("el usuario selecciona {int} unidad de {string}")
    public void el_usuario_selecciona_unidad_de(Integer quantity, String productName) {
        try {
            Thread.sleep(1000);
            carritoPage.setProductQuantity(productName, quantity);
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Then("el producto debe aparecer en el resumen del pedido")
    public void el_producto_debe_aparecer_en_el_resumen_del_pedido() {
        Assert.assertTrue(carritoPage.isProductInSummary("Mesa rectangular con 10 sillas"));
    }

    @Then("el total debe ser {string}")
    public void el_total_debe_ser(String expectedTotal) {
        String actualTotal = carritoPage.getTotalAmount();
        Assert.assertTrue(actualTotal.contains(expectedTotal));
    }

    @When("el usuario selecciona el municipio {string}")
    public void el_usuario_selecciona_el_municipio(String municipio) {
        carritoPage.selectMunicipio(municipio);
    }

    @When("el usuario selecciona la colonia {string}")
    public void el_usuario_selecciona_la_colonia(String colonia) {
        try {
            Thread.sleep(1000);
            carritoPage.selectColonia(colonia);
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Given("el usuario selecciona la colonia {string}")
    public void el_usuario_selecciona_la_colonia_given(String colonia) {
        try {
            Thread.sleep(1000);
            carritoPage.selectColonia(colonia);
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Given("el usuario selecciona el municipio {string}")
    public void el_usuario_selecciona_el_municipio_given(String municipio) {
        try {
            Thread.sleep(1000);
            carritoPage.selectMunicipio(municipio);
            Thread.sleep(1000);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    @Then("el flete debe mostrar {string}")
    public void el_flete_debe_mostrar(String expectedFlete) {
        String fleteInfo = carritoPage.getFleteInfo();
        Assert.assertTrue(fleteInfo.contains(expectedFlete));
    }

    @Given("el usuario tiene productos en el carrito")
    public void el_usuario_tiene_productos_en_el_carrito() {
        carritoPage.setProductQuantity("Mesa rectangular con 10 sillas", 1);
    }

    @When("el usuario hace clic en restablecer")
    public void el_usuario_hace_clic_en_restablecer() {
        carritoPage.clickReset();
    }

    @Then("el carrito debe estar vacío")
    public void el_carrito_debe_estar_vacio() {
        Assert.assertFalse(carritoPage.isProductInSummary("Mesa"));
    }

    @When("el usuario hace clic en WhatsApp")
    public void el_usuario_hace_clic_en_whatsapp() {
        carritoPage.clickWhatsApp();
    }

    @Then("debe abrir WhatsApp con el mensaje de cotización")
    public void debe_abrir_whatsapp_con_el_mensaje_de_cotizacion() {
        // Verificar que se abre una nueva ventana/tab
        Assert.assertTrue(DriverManager.getDriver().getWindowHandles().size() > 1);
    }
}