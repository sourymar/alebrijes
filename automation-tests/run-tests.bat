@echo off
echo Ejecutando pruebas automatizadas...
mvn clean test
echo.
echo Reportes generados:
echo - ExtentReports: target\extent-reports\ExtentReport.html
echo - Cucumber HTML: target\cucumber-reports\index.html
echo.
pause