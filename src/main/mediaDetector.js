/**
 * @file mediaDetector.js
 * @description Windows Native Active Media & Audio Playback Detector.
 * Inspects active media player processes and window titles (Spotify, YouTube,
 * Chrome, Edge, VLC, iTunes, etc.) to detect currently playing track information.
 * Uses Base64 stream encoding to preserve UTF-8 multi-byte Turkish character sets.
 */

const { exec } = require('child_process');

class MediaDetector {
  /**
   * @param {Function} onUpdate - Callback invoked when media playback status changes
   */
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.lastStatus = {
      isPlaying: false,
      title: 'Müzik Çalmıyor',
      artist: 'Sistem Sessiz',
      source: 'Yok'
    };
    this.intervalId = null;
    this.isQuerying = false;
  }

  /**
   * Starts periodic polling for active media playback.
   * @param {number} intervalMs - Polling interval in milliseconds
   */
  start(intervalMs = 1500) {
    this.checkActiveMedia();
    this.intervalId = setInterval(() => this.checkActiveMedia(), intervalMs);
  }

  /**
   * Stops background polling.
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Queries Windows process manager via PowerShell for active media player window titles.
   */
  checkActiveMedia() {
    if (this.isQuerying) return;
    if (process.platform !== 'win32') return;

    this.isQuerying = true;

    // PowerShell query with Base64 encoding to preserve UTF-8 characters (Turkish letters like ş, ç, ğ, ı, ö, ü)
    const psCommand = `
      $list = Get-Process | Where-Object { 
        $_.MainWindowTitle -ne '' -and 
        ($_.ProcessName -match 'Spotify|chrome|msedge|firefox|brave|vlc|iTunes|MusicBee|foobar2000|wmplayer|AIMP')
      } | Select-Object -Property ProcessName, MainWindowTitle;
      $json = $list | ConvertTo-Json -Compress;
      if ($json) {
        [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json))
      }
    `.replace(/\r?\n/g, ' ');

    exec(`powershell -NoProfile -NonInteractive -Command "${psCommand}"`, { timeout: 2000 }, (err, stdout) => {
      this.isQuerying = false;
      const raw = stdout ? stdout.trim() : '';
      if (err || !raw) {
        this.updateStatus({
          isPlaying: false,
          title: 'Müzik Çalmıyor',
          artist: 'Sistem Sessiz',
          source: 'Yok'
        });
        return;
      }

      try {
        let jsonString = '';
        try {
          jsonString = Buffer.from(raw, 'base64').toString('utf8');
        } catch {
          jsonString = raw;
        }

        let list = JSON.parse(jsonString);
        if (!Array.isArray(list)) list = [list];

        let foundMedia = null;

        for (const item of list) {
          const pName = (item.ProcessName || '').toLowerCase();
          const rawTitle = item.MainWindowTitle || '';

          // 1. Spotify Desktop Client
          if (pName.includes('spotify') && rawTitle && rawTitle !== 'Spotify' && rawTitle !== 'Spotify Free' && rawTitle !== 'Spotify Premium') {
            const parts = rawTitle.split(' - ');
            foundMedia = {
              isPlaying: true,
              title: parts.length > 1 ? parts.slice(1).join(' - ') : rawTitle,
              artist: parts.length > 1 ? parts[0] : 'Spotify',
              source: 'Spotify'
            };
            break;
          }

          // 2. Web Browsers (YouTube Music / YouTube / SoundCloud / Web Media)
          if ((pName.includes('chrome') || pName.includes('edge') || pName.includes('firefox') || pName.includes('brave')) && 
              (rawTitle.includes('YouTube') || rawTitle.includes('SoundCloud') || rawTitle.includes('Spotify') || rawTitle.includes('Music') || rawTitle.includes(' - '))) {
            
            let isYouTubeMusic = /YouTube Music/i.test(rawTitle);
            let isYouTube = /YouTube/i.test(rawTitle);
            let isSoundCloud = /SoundCloud/i.test(rawTitle);

            let cleanTitle = rawTitle
              .replace(/ - Google Chrome$/i, '')
              .replace(/ - Microsoft[\u200B\u200C\u200D]? Edge$/i, '')
              .replace(/ - Mozilla Firefox$/i, '')
              .replace(/ - Brave$/i, '')
              .replace(/ - YouTube Music$/i, '')
              .replace(/ - YouTube$/i, '')
              .replace(/ - SoundCloud$/i, '')
              .trim();

            if (cleanTitle.length > 1 && 
                !cleanTitle.toLowerCase().includes('yeni sekme') && 
                !cleanTitle.toLowerCase().includes('new tab') &&
                cleanTitle.toLowerCase() !== 'youtube music' &&
                cleanTitle.toLowerCase() !== 'youtube') {
              
              const parts = cleanTitle.split(' - ');
              let songTitle = cleanTitle;
              let artistName = isYouTubeMusic ? 'YouTube Music' : isYouTube ? 'YouTube' : isSoundCloud ? 'SoundCloud' : 'Web / Tarayıcı';

              if (parts.length >= 2) {
                // e.g. "Artist - Song Title" or "Song Title - Artist"
                songTitle = parts[0].trim();
                artistName = parts.slice(1).join(' - ').trim();
              }

              foundMedia = {
                isPlaying: true,
                title: songTitle,
                artist: artistName,
                source: isYouTubeMusic ? 'YouTube Music' : isYouTube ? 'YouTube' : pName.toUpperCase()
              };
              break;
            }
          }

          // 3. Local Media Players (VLC, MusicBee, AIMP, Windows Media Player)
          if ((pName.includes('vlc') || pName.includes('musicbee') || pName.includes('aimp') || pName.includes('wmplayer')) && 
              rawTitle && !rawTitle.toLowerCase().includes('vlc media player')) {
            const parts = rawTitle.split(' - ');
            foundMedia = {
              isPlaying: true,
              title: parts.length > 1 ? parts.slice(1).join(' - ') : rawTitle,
              artist: parts.length > 1 ? parts[0] : 'Medya Oynatıcı',
              source: 'Yerel Müzik'
            };
            break;
          }
        }

        if (foundMedia) {
          this.updateStatus(foundMedia);
        } else {
          this.updateStatus({
            isPlaying: false,
            title: 'Müzik Çalmıyor',
            artist: 'Sistem Sessiz',
            source: 'Yok'
          });
        }
      } catch (e) {
        this.updateStatus({
          isPlaying: false,
          title: 'Müzik Çalmıyor',
          artist: 'Sistem Sessiz',
          source: 'Yok'
        });
      }
    });
  }

  /**
   * Dispatches status updates only when state or metadata changes.
   * @param {Object} newStatus - New media state
   */
  updateStatus(newStatus) {
    if (
      this.lastStatus.isPlaying !== newStatus.isPlaying ||
      this.lastStatus.title !== newStatus.title ||
      this.lastStatus.artist !== newStatus.artist
    ) {
      this.lastStatus = newStatus;
      if (this.onUpdate) {
        this.onUpdate(newStatus);
      }
    }
  }

  /**
   * Retrieves the cached media playback status.
   * @returns {Object}
   */
  getStatus() {
    return this.lastStatus;
  }
}

module.exports = MediaDetector;
