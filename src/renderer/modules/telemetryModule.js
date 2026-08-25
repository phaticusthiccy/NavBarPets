/**
 * @file telemetryModule.js
 * @description Taskbar Position Status & Now Playing Media Telemetry Module for Dashboard.
 */

const TelemetryModule = {
  /**
   * Updates real-time Now Playing media widget with track info and animations.
   * @param {Object} media - Media telemetry status
   */
  updateMediaStatus(media) {
    if (!media) return;
    this.lastMediaStatus = media;

    const box = document.getElementById('nowPlayingBox');
    const liveBadge = document.getElementById('mediaLiveBadge');
    const liveText = document.getElementById('mediaLiveStatusText');
    const titleEl = document.getElementById('nowPlayingTitle');
    const artistEl = document.getElementById('nowPlayingArtist');
    const sourceEl = document.getElementById('nowPlayingSource');
    const lang = this.settings.language || 'tr';

    const playingText = typeof i18n !== 'undefined' ? i18n.t('media_live_playing', lang) : 'Müzik Çalıyor';
    const silentText = typeof i18n !== 'undefined' ? i18n.t('media_live_silent', lang) : 'Müzik Yok (Sessiz)';
    const silentTitle = typeof i18n !== 'undefined' ? i18n.t('media_silent_title', lang) : 'Şu Anda Müzik Çalmıyor';
    const silentDesc = typeof i18n !== 'undefined' ? i18n.t('media_silent_desc', lang) : "Spotify veya YouTube'dan bir şarkı açın";
    const systemSource = typeof i18n !== 'undefined' ? i18n.t('media_source_system', lang) : 'Sistem';
    const silentSource = typeof i18n !== 'undefined' ? i18n.t('media_source_silent', lang) : 'Sessiz';

    if (media.isPlaying) {
      if (box) box.classList.add('playing');
      if (liveBadge) liveBadge.classList.add('playing');
      if (liveText) liveText.textContent = playingText;
      if (titleEl) titleEl.textContent = media.title || (lang === 'tr' ? 'Aktif Parça' : 'Active Track');
      if (artistEl) artistEl.textContent = media.artist || (lang === 'tr' ? 'Sanatçı Bilgisi Yok' : 'Unknown Artist');
      if (sourceEl) sourceEl.textContent = media.source || systemSource;
    } else {
      if (box) box.classList.remove('playing');
      if (liveBadge) liveBadge.classList.remove('playing');
      if (liveText) liveText.textContent = silentText;
      if (titleEl) titleEl.textContent = silentTitle;
      if (artistEl) artistEl.textContent = silentDesc;
      if (sourceEl) sourceEl.textContent = silentSource;
    }
  },

  /**
   * Evaluates taskbar position compatibility and displays warning banner if required.
   * @param {Object} taskbarInfo
   */
  updateTaskbarStatus(taskbarInfo) {
    if (!taskbarInfo) return;
    this.lastTaskbarInfo = taskbarInfo;

    const banner = document.getElementById('taskbarWarningBanner');
    const warningTitle = document.querySelector('.warning-title');
    const warningText = document.getElementById('taskbarWarningText');
    const moodEl = document.getElementById('petCurrentMood');
    const indicatorEl = document.querySelector('.status-indicator');
    const lang = this.settings.language || 'tr';

    if (!taskbarInfo.isValid) {
      if (banner) banner.style.display = 'flex';
      if (warningTitle) {
        warningTitle.textContent = typeof i18n !== 'undefined' ? i18n.t('warning_title', lang) : 'Görev Çubuğu Alt Konumda Değil';
      }
      if (warningText) {
        warningText.textContent = typeof i18n !== 'undefined' ? i18n.t('warning_desc', lang) : 'NavBarPets petlerinin görev çubuğunun üzerinde yürümesi için Windows Görev Çubuğunun ekranın ALT kısmında yer alması gerekir.';
      }
      if (moodEl) moodEl.textContent = typeof i18n !== 'undefined' ? i18n.t('status_unsupported', lang) : '⚠️ Görev Çubuğu Uygun Değil';
      if (indicatorEl) {
        indicatorEl.classList.remove('live');
        indicatorEl.classList.add('warning');
      }
    } else {
      if (banner) banner.style.display = 'none';
      if (moodEl) moodEl.textContent = typeof i18n !== 'undefined' ? i18n.t('status_active', lang) : 'Görev Çubuğunda Aktif';
      if (indicatorEl) {
        indicatorEl.classList.add('live');
        indicatorEl.classList.remove('warning');
      }
    }
  }
};

if (typeof window !== 'undefined') window.TelemetryModule = TelemetryModule;
if (typeof globalThis !== 'undefined') globalThis.TelemetryModule = TelemetryModule;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TelemetryModule;
}
