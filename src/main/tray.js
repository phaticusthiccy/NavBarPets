/**
 * @file tray.js
 * @description Windows Notification Area / System Tray Integration.
 * Provides quick actions, species switching, sleep toggle, and dashboard access.
 */

const { Tray, Menu, nativeImage } = require('electron');

class AppTray {
  /**
   * @param {string} iconPath - Absolute path to tray icon (.ico or .png)
   * @param {Object} mainApp - Reference to MainApp instance
   */
  constructor(iconPath, mainApp) {
    this.mainApp = mainApp;
    this.tray = null;
    this.iconPath = iconPath;
    this.initTray();
  }

  /**
   * Initializes the tray instance, tooltip, and double-click handler.
   */
  initTray() {
    let icon = nativeImage.createFromPath(this.iconPath);
    this.tray = new Tray(icon);
    this.tray.setToolTip('NavBarPets - Desktop Companion Pets');

    this.tray.on('double-click', () => {
      this.mainApp.showDashboard();
    });

    this.updateContextMenu();
  }

  /**
   * Rebuilds the context menu dynamically based on current pet state and species.
   */
  updateContextMenu() {
    const currentSpecies = this.mainApp.settings.species;
    const isSleeping = this.mainApp.isPetSleeping;

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '🐾 NavBarPets',
        enabled: false
      },
      { type: 'separator' },
      {
        label: '🖥️ Dashboard / Settings',
        click: () => this.mainApp.showDashboard()
      },
      {
        label: '🐱 Change Pet',
        submenu: [
          {
            label: 'Neko Cat',
            type: 'radio',
            checked: currentSpecies === 'neko',
            click: () => this.mainApp.changeSpecies('neko')
          },
          {
            label: 'Shiba Inu',
            type: 'radio',
            checked: currentSpecies === 'shiba',
            click: () => this.mainApp.changeSpecies('shiba')
          },
          {
            label: 'Cyber Slime',
            type: 'radio',
            checked: currentSpecies === 'slime',
            click: () => this.mainApp.changeSpecies('slime')
          },
          {
            label: 'Mini Dragon',
            type: 'radio',
            checked: currentSpecies === 'dragon',
            click: () => this.mainApp.changeSpecies('dragon')
          },
          {
            label: 'Pixel Duck',
            type: 'radio',
            checked: currentSpecies === 'duck',
            click: () => this.mainApp.changeSpecies('duck')
          },
          {
            label: 'Kitsune Fox',
            type: 'radio',
            checked: currentSpecies === 'fox',
            click: () => this.mainApp.changeSpecies('fox')
          },
          {
            label: 'Mochi Bunny',
            type: 'radio',
            checked: currentSpecies === 'bunny',
            click: () => this.mainApp.changeSpecies('bunny')
          },
          {
            label: 'Chilly Penguin',
            type: 'radio',
            checked: currentSpecies === 'penguin',
            click: () => this.mainApp.changeSpecies('penguin')
          }
        ]
      },
      {
        label: isSleeping ? '☀️ Wake Up Pet' : '🌙 Put Pet to Sleep',
        click: () => {
          this.mainApp.togglePetSleep();
          this.updateContextMenu();
        }
      },
      {
        label: '🎵 Test Music Dance',
        click: () => this.mainApp.triggerAction('dance')
      },
      {
        label: '❤️ Pet / Give Love',
        click: () => this.mainApp.triggerAction('pet')
      },
      { type: 'separator' },
      {
        label: '❌ Exit App',
        click: () => this.mainApp.quitApp()
      }
    ]);

    this.tray.setContextMenu(contextMenu);
  }

  /**
   * Destroys tray icon on app termination.
   */
  destroy() {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
    }
  }
}

module.exports = AppTray;
