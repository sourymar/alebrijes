package pages;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;

public class CarritoPage extends BasePage {

    @FindBy(css = ".tab.active")
    private WebElement activeTab;

    @FindBy(xpath = "//button[text()='PAQUETES']")
    private WebElement paquetesTab;

    @FindBy(xpath = "//button[text()='MOBILIARIO']")
    private WebElement mobiliarioTab;

    @FindBy(xpath = "//button[text()='TOLDOS']")
    private WebElement toldosTab;

    @FindBy(xpath = "//button[text()='INFANTILES']")
    private WebElement infantilesTab;

    @FindBy(id = "municipio")
    private WebElement municipioSelect;

    @FindBy(id = "colonia")
    private WebElement coloniaInput;

    @FindBy(id = "total-amount")
    private WebElement totalAmount;

    @FindBy(id = "flete-info")
    private WebElement fleteInfo;

    @FindBy(css = ".btn-reset")
    private WebElement resetButton;

    @FindBy(css = ".btn-whatsapp")
    private WebElement whatsappButton;

    @FindBy(id = "order-summary")
    private WebElement orderSummary;

    public CarritoPage(WebDriver driver) {
        super(driver);
    }

    public void clickTab(String tabName) {
        switch (tabName.toUpperCase()) {
            case "PAQUETES":
                clickElement(paquetesTab);
                break;
            case "MOBILIARIO":
                clickElement(mobiliarioTab);
                break;
            case "TOLDOS":
                clickElement(toldosTab);
                break;
            case "INFANTILES":
                clickElement(infantilesTab);
                break;
        }
    }

    public void selectMunicipio(String municipio) {
        Select select = new Select(municipioSelect);
        select.selectByValue(municipio.toLowerCase());
    }

    public void selectColonia(String colonia) {
        try {
            Thread.sleep(500);
            sendKeys(coloniaInput, colonia);
            Thread.sleep(500);
            // Trigger change event
            coloniaInput.sendKeys(org.openqa.selenium.Keys.TAB);
        } catch (Exception e) {
            System.out.println("Error selecting colonia: " + colonia);
        }
    }

    public void setProductQuantity(String productName, int quantity) {
        try {
            Thread.sleep(1000); // Wait for page to load
            String productId = generateProductId(productName);
            WebElement quantityInput = driver.findElement(org.openqa.selenium.By.id(productId));
            sendKeys(quantityInput, String.valueOf(quantity));
        } catch (Exception e) {
            System.out.println("Error setting quantity for: " + productName);
            e.printStackTrace();
        }
    }

    private String generateProductId(String productName) {
        return "paquetes-" + productName.toLowerCase()
                .replace(" ", "-")
                .replace(".", "")
                .replace("ñ", "n")
                .replaceAll("[^a-z0-9-]", "");
    }

    public String getTotalAmount() {
        return totalAmount.getText();
    }

    public String getFleteInfo() {
        return fleteInfo.getText();
    }

    public void clickReset() {
        clickElement(resetButton);
    }

    public void clickWhatsApp() {
        clickElement(whatsappButton);
    }

    public boolean isProductInSummary(String productName) {
        return orderSummary.getText().contains(productName);
    }

    public String getActiveTabText() {
        return activeTab.getText();
    }
}