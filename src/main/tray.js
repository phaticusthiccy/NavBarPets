/**
 * @file tray.js
 * @description Windows Notification Area / System Tray Integration.
 * Provides quick actions, species switching, sleep toggle, multi-language localization, and dashboard access.
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
   * Rebuilds the context menu dynamically based on current pet state, species, and selected language.
   */
  updateContextMenu() {
    const currentSpecies = this.mainApp.settings.species;
    const isSleeping = this.mainApp.isPetSleeping;
    const isEnabled = this.mainApp.settings.enabled !== false;
    const lang = this.mainApp.settings.language || 'tr';
    const isTr = lang === 'tr';

    const labels = {
      dashboard: isTr ? '🖥️ Dashboard / Ayarlar' : '🖥️ Dashboard / Settings',
      toggleVisibility: isTr ? (isEnabled ? '👁️ Petleri Gizle' : '👁️ Petleri Göster') : (isEnabled ? '👁️ Hide Pets' : '👁️ Show Pets'),
      changePet: isTr ? '🐱 Pet Değiştir' : '🐱 Change Pet',
      wake: isTr ? '☀️ Peti Uyandır' : '☀️ Wake Up Pet',
      sleep: isTr ? '🌙 Peti Uyut' : '🌙 Put Pet to Sleep',
      testDance: isTr ? '🎵 Müzik Dansı Test Et' : '🎵 Test Music Dance',
      petLove: isTr ? '❤️ Peti Sev (Kalp Çıkar)' : '❤️ Pet Companion (Hearts)',
      exit: isTr ? '❌ Tamamen Kapat' : '❌ Exit Application',
      pets: {
        neko: isTr ? 'Neko Kedi' : 'Neko Cat',
        shiba: 'Shiba Inu',
        slime: 'Cyber Slime',
        dragon: 'Mini Dragon',
        duck: 'Pixel Duck',
        fox: 'Kitsune Fox',
        bunny: isTr ? 'Mochi Tavşan' : 'Mochi Bunny',
        penguin: isTr ? 'Kutup Pengueni' : 'Chilly Penguin',
        jett: 'Valorant Jett',
        mario: 'Super Mario',
        pikachu: 'Pikachu'
      }
    };

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '🐾 NavBarPets',
        enabled: false
      },
      { type: 'separator' },
      {
        label: labels.dashboard,
        click: () => this.mainApp.showDashboard()
      },
      {
        label: labels.toggleVisibility,
        click: () => {
          this.mainApp.settings.enabled = !isEnabled;
          this.mainApp.saveSettingsToFile();
          this.mainApp.broadcastSettings();
          this.mainApp.updateOverlayPosition();
          this.updateContextMenu();
        }
      },
      {
        label: labels.changePet,
        submenu: [
          {
            label: labels.pets.neko,
            type: 'radio',
            checked: currentSpecies === 'neko',
            click: () => this.mainApp.changeSpecies('neko')
          },
          {
            label: labels.pets.shiba,
            type: 'radio',
            checked: currentSpecies === 'shiba',
            click: () => this.mainApp.changeSpecies('shiba')
          },
          {
            label: labels.pets.slime,
            type: 'radio',
            checked: currentSpecies === 'slime',
            click: () => this.mainApp.changeSpecies('slime')
          },
          {
            label: labels.pets.dragon,
            type: 'radio',
            checked: currentSpecies === 'dragon',
            click: () => this.mainApp.changeSpecies('dragon')
          },
          {
            label: labels.pets.duck,
            type: 'radio',
            checked: currentSpecies === 'duck',
            click: () => this.mainApp.changeSpecies('duck')
          },
          {
            label: labels.pets.fox,
            type: 'radio',
            checked: currentSpecies === 'fox',
            click: () => this.mainApp.changeSpecies('fox')
          },
          {
            label: labels.pets.bunny,
            type: 'radio',
            checked: currentSpecies === 'bunny',
            click: () => this.mainApp.changeSpecies('bunny')
          },
          {
            label: labels.pets.penguin,
            type: 'radio',
            checked: currentSpecies === 'penguin',
            click: () => this.mainApp.changeSpecies('penguin')
          },
          {
            label: labels.pets.jett,
            type: 'radio',
            checked: currentSpecies === 'jett',
            click: () => this.mainApp.changeSpecies('jett')
          },
          {
            label: labels.pets.mario,
            type: 'radio',
            checked: currentSpecies === 'mario',
            click: () => this.mainApp.changeSpecies('mario')
          },
          {
            label: labels.pets.pikachu,
            type: 'radio',
            checked: currentSpecies === 'pikachu',
            click: () => this.mainApp.changeSpecies('pikachu')
          }
        ]
      },
      {
        label: isSleeping ? labels.wake : labels.sleep,
        click: () => {
          this.mainApp.togglePetSleep();
          this.updateContextMenu();
        }
      },
      {
        label: labels.testDance,
        click: () => this.mainApp.triggerAction('dance')
      },
      {
        label: labels.petLove,
        click: () => this.mainApp.triggerAction('pet')
      },
      { type: 'separator' },
      {
        label: labels.exit,
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
