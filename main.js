// Inclure app, et browser de Electron
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;

// Création d'une fenêtre
function createWindows() {
  const win = new BrowserWindow({
    width: 1280, // largeur
    height: 720, // hauteur
    minWidth: 824, // largeur minimale
    minHeight: 640, // hauteur minimale
    closable: true, // fermeture autorisée
    darkTheme: true, // prise en charge du dark theme,
    frame: false, //activer, désactiver le menu initiale fenêtre
    icon: path.join(__dirname, "./img/oyassa.ico"), // Mettre un icone
    webPreferences: {
      nodeIntegration: true,
      // Empêche accès à l'appi de Electron par défaut à true (laisser à false si on utilise pas internet)
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // Chargement du contenu
  win.loadFile("index.html");
  // Permet ouverture des outils de dev
  win.webContents.openDevTools();

  // Gestion des demandes IPC
  ipc.on("reduceApp", () => {
    // console.log("reduceApp");
    win.minimize();
  });
  ipc.on("sizeApp", () => {
    // console.log("sizeApp");
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  ipc.on("closeApp", () => {
    // console.log("closeApp");
    win.close();
  });

  // MANIPULATION de la base de données data
  ipc.on("addCustomerToDb", (e, data) => {
    let Datastore = require("nedb"),
      // Création de la base
      db = new Datastore({ filename: "database/data.db", autoload: true });

    db.insert(data, function (error, newrec) {
      if (error != null) {
        console.log("*** Error = ", error);
      }
      console.log("*** created = ", newrec);
      // Recharge des données dans le tableau
      win.reload();
    });
  });
  // FIN BDD
}

// Accès à l'application quand elle est prête
app.whenReady().then(() => {
  createWindows();

  // on = lorsque (événement)
  app.on("activate", () => {
    //Si on a pas de fenêtre à l'écran
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindows();
    }
  });
});

// Gestion de la fermeture de toutes les fenêtres
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});
