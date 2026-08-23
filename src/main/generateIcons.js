/**
 * @file generateIcons.js
 * @description Bundled Asset Generator & Icon Resolver.
 * Uses custom user icon.png if present in assets/icons, or generates default assets.
 */

const fs = require('fs');
const path = require('path');

// 32x32 Cute Paw Print PNG encoded in Base64 (Crisp rendering on Windows Taskbar / System Tray)
const PAW_ICON_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AgXEQEwUv8kKQAAAvNJREFUWIXtl01IVFEYhp9z586M5g9laZpmkUUUURZRtGjZoiJaRFq0iKRFq1YtWoRFK1q0iBYRtGjRIkIRtGiRQUQU/WEWZhSlaVqaOXfvOTYzhs40Z+50Bheeez7uPd/7vuc857xv4L+FwZzN8301lUphGAbGmH/WlFLo0dHRPqWUWn5tFqA6nU7hOA6e5+G6LkEQzIq9vQ5c18XzPLxeL3fv3sXtdmNZ1oztfQA8z8PtdvP161eSyaTneV7K+1UBvF4vxph5m3P337hxI2OM+VsA3/eJxWIAvHjxgng8zuXLl9m5cycul2tm3kqlQqFQwHVdDMOgVCrNgA0NDbG2tvblB+Ddu3fkcjkGBgawLAvTNGlra2NoaAjLspBSzp1YlsXAwACDg4Mkk0n6+vqwLIuXL19y9OhRgsHgjACapuF5Hu3t7ezbt4+WlhYikQiGYeD1egkGg7S0tDA0NITP56OnpwfXdTFNE8uyZgCwLItoNEpvby+ZTIZsNkvv58/4/X7cbjfJZJLR0VEMw2DNmjVERES9Xi8ej+cbQErJnTt36OrqIhwOMzo6ytmzZ2ltbUUphZSSy5cvMzw8jN/v5+LFi7S0tAAzAFRVWVZZLNZ4vE4oih4fX2k02ls20ZKyYEDB/B6vVRXV2NZFrW1tQB/3wJor2EYRCIRBgYGqK2tJRKJkM1mSSQS9PX1IYoiu3fvpmvXLkTk/wDU1dURCoW4e/cu69ato6qqinQ6TSqVwrKsOUWcBcDu3bvZu3cvLpcrf/fu3ZRS+ZkAlmUhhGDr1q00Nzen/H5/XkTCcwHE43GklMRisZQxJm6MiQOYpjl7T2zbzv7rF8dxdF1d3eD+/ftd586dC505c0YkFoudBNDpdDqUUoOllIOlAFLKgb/tM5fLZUqphFJKzFkAURTj8Xgc4L2UMiqEcAkhHAChlPJLKV0hRD2Az+fzAYh/1aOUQggBoJSypp/f6fV6/51j1j5989n1L/0F951qLkW0G+oAAAAASUVORK5CYII=';

/**
 * Ensures tray and application icon files exist in the assets directory.
 * @returns {{ trayIconPath: string, appIconPath: string }}
 */
function ensureIcons() {
  const iconsDir = path.join(__dirname, '..', 'assets', 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const appIconPath = path.join(iconsDir, 'icon.png');
  const trayIconPath = path.join(iconsDir, 'tray.png');

  if (!fs.existsSync(appIconPath)) {
    const buf = Buffer.from(PAW_ICON_PNG_BASE64, 'base64');
    fs.writeFileSync(appIconPath, buf);
  }
  if (!fs.existsSync(trayIconPath)) {
    const buf = Buffer.from(PAW_ICON_PNG_BASE64, 'base64');
    fs.writeFileSync(trayIconPath, buf);
  }

  return {
    trayIconPath: trayIconPath,
    appIconPath: appIconPath
  };
}

module.exports = { ensureIcons };
