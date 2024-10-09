# Ejecuta el backend en una nueva ventana
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\juanp\Documents\repos\twitter_clone\backend;
dotnet-dev-local"

# Ejecuta el frontend en una nueva ventana
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\juanp\Documents\repos\twitter_clone\frontend;
npm run dev"

Start-Process "C:\Users\juanp\AppData\Local\Google\Chrome\Application\chrome.exe" "http://localhost:4000"
