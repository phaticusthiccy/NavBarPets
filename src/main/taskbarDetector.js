/**
 * @file taskbarDetector.js
 * @description Windows Taskbar Geometry & Orientation Detector.
 * Compares full screen bounds with display work area to detect taskbar position,
 * height, and validates compatibility (bottom alignment restriction).
 */

const { screen } = require('electron');

class TaskbarDetector {
  /**
   * Evaluates current taskbar placement and returns geometric metrics.
   * @returns {Object} Taskbar positioning metrics and compatibility status
   */
  static getTaskbarInfo() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { bounds, workArea } = primaryDisplay;

    const diffBottom = bounds.height - workArea.height;
    const diffTop = workArea.y;
    const diffLeft = workArea.x;
    const diffRight = bounds.width - workArea.width;

    let position = 'bottom';
    let height = diffBottom;
    let isValid = true;
    let warningMessage = '';

    if (diffTop > 0) {
      position = 'top';
      height = diffTop;
      isValid = false;
      warningMessage = 'Görev çubuğu ekranın ÜST kısmında algılandı. NavBarPets sadece görev çubuğu ALT konumdayken çalışır.';
    } else if (diffLeft > 0) {
      position = 'left';
      height = diffLeft;
      isValid = false;
      warningMessage = 'Görev çubuğu ekranın SOL kısmında algılandı. NavBarPets sadece görev çubuğu ALT konumdayken çalışır.';
    } else if (diffRight > 0 && workArea.x === 0 && workArea.y === 0 && diffBottom === 0) {
      position = 'right';
      height = diffRight;
      isValid = false;
      warningMessage = 'Görev çubuğu ekranın SAĞ kısmında algılandı. NavBarPets sadece görev çubuğu ALT konumdayken çalışır.';
    } else if (diffBottom > 0) {
      position = 'bottom';
      height = diffBottom;
      isValid = true;
      warningMessage = '';
    } else {
      // Auto-hidden taskbar or fullscreen mode fallback
      position = 'bottom_hidden';
      height = 48;
      isValid = true;
      warningMessage = '';
    }

    return {
      position,
      height: height > 0 ? height : 48,
      taskbarTop: workArea.height > 0 ? workArea.height : bounds.height - 48,
      bounds,
      workArea,
      isValid,
      warningMessage
    };
  }
}

module.exports = TaskbarDetector;
