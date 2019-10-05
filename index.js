const { app, BrowserWindow, Menu, shell } = require('electron')
var template = [{
  label: "Gmail",
  submenu: [
    { label: "Quit", accelerator: "Ctrl+Q", click: function () { app.quit(); } }
  ]
}, {
  label: "Edit",
  submenu: [
    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
    { type: "separator" },
    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
    { label: "Reload", accelerator: "CmdOrCtrl+R",selector: "reload:"}
  ]
}
];


function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    tabbingIdentifier: 'gmail',
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false
    },
    icon: __dirname + "assets/icons/gmail.png"
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
      label: 'Open in browser',
      visible: true,
      click() {
	console.log(JSON.stringify(params)+JSON.stringify(browserWindow));
        shell.openExternal(browserWindow.linkURL)
      }
    }]
  });

  //win.toggleTabBar();
  //loadInTabs(win);
  win.loadURL('https://mail.google.com', {userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0"})
  //var chatWindow = new BrowserWindow({ tabbingIdentifier: 'gsuite', webPreferences: {nodeIntegration: false,nodeIntegrationInWorker: false} });
  //loadInBrowser(chatWindow);
  //chatWindow.loadURL('https://chat.google.com', {userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0"});
  //win.addTabbedWindow(chatWindow);
  // and load the index.html of the app.
}

function loadInTabs(win) {
  win.webContents.on('new-window', (event, url) => {
    debugger;
    //event.preventDefault();
    newWindow = new BrowserWindow({ tabbingIdentifier: 'gsuite', webPreferences: {nodeIntegration: false,nodeIntegrationInWorker: false},icon: __dirname + "assets/icons/gmail.png" });
    //win.addTabbedWindow(newWindow);
    newWindow.loadURL(url);
  });
}

function loadInBrowser(win) {
  win.webContents.on('new-window', (event, url) => {
    shell.openExternal(url);
    event.preventDefault();
  });

}

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', createWindow);



