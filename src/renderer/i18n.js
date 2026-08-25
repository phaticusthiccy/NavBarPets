/**
 * @file i18n.js
 * @description Internationalization (i18n) Engine for NavBarPets.
 * Provides complete Turkish and English localized dictionaries, pet catalogs,
 * theme names, system tray labels, and dynamic DOM translation bindings.
 */

const I18N_DICTIONARY = {
  tr: {
    // Brand & Window
    brand_title: "NavBarPets",
    brand_tag: "Windows Companion",
    window_minimize: "Sistem Tepsisine Küçült",
    window_close: "Kapat",

    // Navigation Sidebar
    nav_sanctuary: "Pet Sığınağı",
    nav_position: "Boyut & Zemin",
    nav_scheduler: "Uyku Saatleri",
    nav_reactions: "Müzik & Tepkiler",
    nav_settings: "Ayarlar & Tema",

    // Sidebar Actions
    sidebar_check_update: "Güncelleme Kontrol Et",
    sidebar_developer: "Geliştirici",
    sidebar_developer_title: "Geliştirici GitHub Profilini Aç (phaticusthiccy)",
    sidebar_update_title: "GitHub üzerinden güncellemeleri denetle",

    // Updates
    update_checking: "Kontrol ediliyor...",
    update_up_to_date_title: "Uygulama Güncel! 🎉",
    update_up_to_date_desc: "NavBarPets en son sürümdesiniz",
    update_available_title: "Yeni Sürüm Mevcut! 🚀",
    update_available_desc: "yeni sürümü yayınlandı.",
    update_btn_download: "İndir / GitHub",
    update_btn_close: "Kapat",
    update_error_title: "Bağlantı Hatası",
    update_error_desc: "Güncellemeler denetlenirken bir sorun oluştu.",

    // Status Indicator
    status_active: "Görev Çubuğunda Aktif",
    status_unsupported: "⚠️ Görev Çubuğu Uygun Değil",

    // Taskbar Warning Banner
    warning_title: "Görev Çubuğu Alt Konumda Değil",
    warning_desc: "NavBarPets petlerinin görev çubuğunun üzerinde yürümesi için Windows Görev Çubuğunun ekranın ALT kısmında yer alması gerekir.",

    // TAB 1: Pet Sanctuary
    sanctuary_title: "Pet Sığınağı",
    sanctuary_subtitle: "Görev çubuğunda seninle yaşayacak sevimli yol arkadaşını seç",
    sanctuary_badge: "11 Özel Pet Türü",
    pet_visibility_label: "Petleri Göster",
    badge_active_pet: "AKTİF",
    btn_select_active: "Aktif Pet",
    btn_select_pick: "Bu Peti Seç",
    skin_selector_label: "Görünüm:",
    skin_legendary: "Efsanevi",
    skin_cool: "Efsanevi",
    skin_classic: "Klasik",
    skin_rarity_legendary: "✦ EFSANEVİ",
    skin_rarity_classic: "★ KLASİK",
    skin_tag_mythic: "MYTHIC CYBER",
    skin_tag_retro: "ORIGINAL RETRO",
    toast_skin_changed: "Görünüm değiştirildi: ",

    // TAB 2: Position & Ground
    position_title: "Boyut & Zemin Konumu",
    position_subtitle: "Pet'in boyutunu, görev çubuğundaki konumunu ve dikey hizasını özelleştir",
    scale_title: "📏 Pet Boyutu & Ölçek",
    scale_desc: "Pet'in ekranınızda kapladığı alanı zevkinize göre büyütün veya küçültün.",
    scale_label: "Ölçek Katsayısı",
    ground_title: "⚓ Zemin Hizalama & Yükseklik",
    ground_desc: "Pet'in görev çubuğunun tam üstünde mi yoksa ekranın tabanında mı duracağını belirleyin.",
    ground_mode_label: "Zemin Konum Modu",
    ground_bottom: "Görev Çubuğu Tabanı",
    ground_top: "Görev Çubuğu Üstü",
    offset_title: "📐 Yükseklik İnce Ayarı (Offset)",
    offset_desc: "Farklı Windows ölçekleme veya görev çubuğu temalarında ayakları tam oturtmak için dikey konumu pikselsel olarak kaydırın.",
    offset_label: "Yükseklik İnce Ayarı (Offset)",

    // TAB 3: Sleep Scheduler
    scheduler_title: "Uyku & Uyanma Planlayıcı",
    scheduler_subtitle: "Pet'lerinin biyolojik saatini düzenle; uyku saatlerinde Zzz moduna geçerler",
    sleep_schedule_title: "⏰ Biyolojik Zaman Çizelgesi",
    sleep_schedule_desc: "Otomatik uyku modu açıkken pet'ler belirlenen saatlerde gece şapkalarını takıp uykuya dalar.",
    sleep_time_label: "🌙 Uyku Başlangıç Saati",
    wake_time_label: "☀️ Sabah Uyanma Saati",
    manual_actions_title: "🎮 Manuel Kontroller",
    manual_actions_desc: "İstediğiniz an pet'inizi uyutabilir veya uyandırabilirsiniz.",
    btn_sleep: "Şimdi Uykuya Geçir",
    btn_wake: "Hemen Uyandır",
    btn_quick_sleep: "Uyut",
    btn_quick_wake: "Uyandır",

    // TAB 4: Music & Reactions
    reactions_title: "Müzik & Canlı Tepkiler",
    reactions_subtitle: "Pet'in bilgisayarında çalan şarkılara ve hareketlerine tepki versin",
    audio_dance_title: "🎵 Müzik & Ritim Dansı",
    audio_dance_desc: "Spotify, YouTube veya Medya Oynatıcılardan bir şarkı çaldığında pet otomatik olarak kulaklık takıp dans etmeye başlar.",
    media_live_playing: "Müzik Çalıyor",
    media_live_silent: "Müzik Yok (Sessiz)",
    media_live_searching: "Müzik Aranıyor",
    media_silent_title: "Şu Anda Müzik Çalmıyor",
    media_silent_desc: "Spotify veya YouTube'dan bir şarkı açın",
    media_source_system: "Sistem",
    media_source_silent: "Sessiz",
    audio_sens_title: "Ritim Algılama Hassasiyeti",
    audio_sens_low: "Düşük",
    audio_sens_med: "Orta",
    audio_sens_high: "Yüksek",
    btn_test_dance: "5 Saniyelik Müzik Dansı Test Et",
    love_title: "❤️ Sevgi & Etkileşim",
    love_desc: "Pet'inizi okşayarak veya aşağıdaki butona tıklayarak kalpler çıkarabilir ve mutlu edebilirsiniz.",
    btn_pet_love: "Pet'i Sev (Kalp Çıkar)",

    // TAB 5: Settings & Theme
    settings_title: "Uygulama & Görünüm Ayarları",
    settings_subtitle: "Uygulama dilini, temasını ve Windows başlatma tercihlerini yönet",
    language_title: "🌐 Dil / Language",
    language_desc: "Uygulama arayüzü ve sistem tepsisi dilini değiştirin.",
    lang_tr_sub: "Varsayılan",
    lang_en_sub: "Uluslararası",
    theme_title: "🎨 Arayüz Teması",
    theme_midnight: "Midnight Glass",
    theme_cyber: "Cyber Neon",
    theme_pastel: "Cozy Pastel",
    theme_oled: "Deep OLED",
    theme_sunset: "Sunset Aurora",
    theme_emerald: "Emerald Forest",
    theme_dracula: "Vampire Velvet",
    theme_nordic: "Nordic Frost",
    windows_title: "🚀 Windows Entegrasyonu",
    startup_name: "Windows ile Birlikte Başlat",
    startup_hint: "Bilgisayar açıldığında pet'in otomatik olarak görev çubuğuna gelsin",
    tray_name: "Kapatıldığında Tepsiye Küçül",
    tray_hint: "Pencereyi kapattığında gizli simgeler alanında çalışmaya devam eder",

    // Tray Context Menu
    tray_settings: "🖥️ Dashboard / Ayarlar",
    tray_change_pet: "🐱 Pet Değiştir",
    tray_wake: "☀️ Peti Uyandır",
    tray_sleep: "🌙 Peti Uyut",
    tray_test_dance: "🎵 Müzik Dansı Test Et",
    tray_pet: "❤️ Peti Sev (Kalp Çıkar)",
    tray_exit: "❌ Tamamen Kapat",

    // Pet Catalog Data
    pets: {
      neko: {
        name: "Neko Kedi",
        species: "Felis Catus",
        traits: ["🐱 Meraklı", "✨ Çevik", "💤 Ekmek Somunu"],
        desc: "Pati atar, gerinir, kelebek kovalar ve müzikte disko dansı yapar."
      },
      shiba: {
        name: "Shiba Inu",
        species: "Canis Familiaris",
        traits: ["🐕 Sadık", "⚡ Zoomies", "🍖 Kemik Avcısı"],
        desc: "Kuyruğunu sallar, yeri koklar, blep yapar ve neşeyle koşar."
      },
      slime: {
        name: "Cyber Slime",
        species: "Digitalis Amoeba",
        traits: ["🟢 Neon Jel", "✨ Parıldayan", "🔮 Yaylanan"],
        desc: "Holografik çekirdeğe sahiptir, jöle gibi esner ve parıldar."
      },
      dragon: {
        name: "Mini Dragon",
        species: "Draco Chibi",
        traits: ["🐉 Ateş Nefesi", "✨ Kanat Çırpma", "👑 Efsanevi"],
        desc: "Duman halkaları çıkarır, havada süzülür ve kuyruğuna sarılır."
      },
      duck: {
        name: "Pixel Duck",
        species: "Anas Platyrhynchos",
        traits: ["🦆 Paytak", "💧 Yüzücü", "🎵 360 Spin"],
        desc: "Paytak adımlarla yürür, suya dalar ve dönerek dans eder."
      },
      fox: {
        name: "Kitsune Fox",
        species: "Vulpes Vulpes",
        traits: ["🦊 Çevik", "🔥 Ateş Kuyruğu", "✨ Büyülü"],
        desc: "Büyük kabarık tilki kuyruğu sallar, büyülü parıltılar saçar ve merakla zıplar."
      },
      bunny: {
        name: "Mochi Bunny",
        species: "Oryctolagus Chibi",
        traits: ["🐰 Pofuduk", "🥕 Havuç Seven", "⚡ Zıp Zıp"],
        desc: "Uzun kulaklarını oynatır, minik burnunu seğirtir ve neşeyle zıp zıp zıplar."
      },
      penguin: {
        name: "Chilly Penguin",
        species: "Aptenodytes Micro",
        traits: ["🐧 Sevimli", "❄️ Kış Atkısı", "🐟 Paytak Yürüyüş"],
        desc: "Minik kanatlarını çırpar, kırmızı kış atkısını savurur ve neşeyle gezinir."
      },
      jett: {
        name: "Valorant Jett",
        species: "Radiant Windrunner",
        traits: ["💨 Rüzgar Çevikliği", "🗡️ Kunai Bıçağı", "✨ Rüzgar Süzülüşü"],
        desc: "Havada rüzgarla süzülür, parıldayan mavi kunai fırlatır ve fırtına gibi depar atar."
      },
      mario: {
        name: "Super Mario",
        species: "Mushroom Kingdom Hero",
        traits: ["🍄 Yıldız Gücü", "⭐ Süper Zıplayış", "🧢 Efsane Şapka"],
        desc: "İkonik kırmızı şapkasını ve bıyığını sallar, havaya zıplar ve neşeyle gezinir."
      },
      pikachu: {
        name: "Pikachu",
        species: "Electric Mouse Pokemon",
        traits: ["⚡ Yıldırım Kuyruk", "🔴 Elektrik Yanaklar", "✨ Pika Pika"],
        desc: "Zikzak şimşek kuyruğunu sallar, kırmızı yanaklarından kıvılcım saçar ve tatlı tatlı kulaklarını oynatır."
      }
    }
  },

  en: {
    // Brand & Window
    brand_title: "NavBarPets",
    brand_tag: "Windows Companion",
    window_minimize: "Minimize to System Tray",
    window_close: "Close",

    // Navigation Sidebar
    nav_sanctuary: "Pet Sanctuary",
    nav_position: "Size & Ground",
    nav_scheduler: "Sleep Schedule",
    nav_reactions: "Music & Reactions",
    nav_settings: "Settings & Theme",

    // Sidebar Actions
    sidebar_check_update: "Check for Updates",
    sidebar_developer: "Developer",
    sidebar_developer_title: "Open Developer GitHub Profile (phaticusthiccy)",
    sidebar_update_title: "Check for latest releases on GitHub",

    // Updates
    update_checking: "Checking...",
    update_up_to_date_title: "Up to Date! 🎉",
    update_up_to_date_desc: "You are running the latest version of NavBarPets",
    update_available_title: "New Update Available! 🚀",
    update_available_desc: "has been released.",
    update_btn_download: "Download / GitHub",
    update_btn_close: "Dismiss",
    update_error_title: "Connection Error",
    update_error_desc: "Could not check for updates. Please verify your connection.",

    // Status Indicator
    status_active: "Active on Taskbar",
    status_unsupported: "⚠️ Taskbar Position Unsupported",

    // Taskbar Warning Banner
    warning_title: "Taskbar Not at Screen Bottom",
    warning_desc: "NavBarPets requires the Windows Taskbar to be positioned at the BOTTOM of the screen to properly roam.",

    // TAB 1: Pet Sanctuary
    sanctuary_title: "Pet Sanctuary",
    sanctuary_subtitle: "Choose your adorable desktop companion to live on your Windows Taskbar",
    sanctuary_badge: "11 Unique Pets",
    pet_visibility_label: "Show Pets",
    badge_active_pet: "ACTIVE",
    btn_select_active: "Active Pet",
    btn_select_pick: "Choose Pet",
    skin_selector_label: "Skin:",
    skin_legendary: "Legendary",
    skin_cool: "Legendary",
    skin_classic: "Classic",
    skin_rarity_legendary: "✦ LEGENDARY",
    skin_rarity_classic: "★ CLASSIC",
    skin_tag_mythic: "MYTHIC CYBER",
    skin_tag_retro: "ORIGINAL RETRO",
    toast_skin_changed: "Skin changed to: ",

    // TAB 2: Position & Ground
    position_title: "Size & Ground Baseline",
    position_subtitle: "Customize pet dimensions, taskbar placement, and vertical alignment offsets",
    scale_title: "📏 Pet Scale & Dimensions",
    scale_desc: "Enlarge or shrink your pet according to your display resolution and preference.",
    scale_label: "Scale Multiplier",
    ground_title: "⚓ Ground Placement & Height",
    ground_desc: "Determine whether your pet walks along the taskbar bottom baseline or perches on top of the taskbar shelf.",
    ground_mode_label: "Ground Mode",
    ground_bottom: "Taskbar Bottom Base",
    ground_top: "Taskbar Top Shelf",
    offset_title: "📐 Height Offset Fine-Tuning",
    offset_desc: "Adjust pixel offsets to achieve pixel-perfect grounding across custom DPI scales or Windows themes.",
    offset_label: "Vertical Offset",

    // TAB 3: Sleep Scheduler
    scheduler_title: "Sleep & Circadian Scheduler",
    scheduler_subtitle: "Organize your companion's biological clock; they enter Zzz sleep mode during scheduled hours",
    sleep_schedule_title: "⏰ Circadian Schedule",
    sleep_schedule_desc: "When auto sleep is enabled, pets wear their nightcaps and sleep at scheduled bedtime hours.",
    sleep_time_label: "🌙 Bedtime Schedule",
    wake_time_label: "☀️ Morning Wake Up",
    manual_actions_title: "🎮 Manual Controls",
    manual_actions_desc: "Manually put your companion to sleep or wake them up whenever you desire.",
    btn_sleep: "Put Pet to Sleep Now",
    btn_wake: "Wake Up Immediately",
    btn_quick_sleep: "Sleep",
    btn_quick_wake: "Wake Up",

    // TAB 4: Music & Reactions
    reactions_title: "Music & Dynamic Reactions",
    reactions_subtitle: "Let your companion react and groove along with music playing on your PC",
    audio_dance_title: "🎵 Music & Rhythm Dance",
    audio_dance_desc: "When music plays on Spotify, YouTube, or media players, your pet automatically puts on headphones and dances to the beat.",
    media_live_playing: "Music Playing",
    media_live_silent: "Silent (No Music)",
    media_live_searching: "Searching Media",
    media_silent_title: "No Music Currently Playing",
    media_silent_desc: "Play a song on Spotify or YouTube to start the dance",
    media_source_system: "System",
    media_source_silent: "Silent",
    audio_sens_title: "Rhythm Detection Sensitivity",
    audio_sens_low: "Low",
    audio_sens_med: "Medium",
    audio_sens_high: "High",
    btn_test_dance: "Test 5-Second Music Dance",
    love_title: "❤️ Affection & Interaction",
    love_desc: "Hover with your mouse cursor or click the button below to shower your pet with hearts.",
    btn_pet_love: "Pet Companion (Spawn Hearts)",

    // TAB 5: Settings & Theme
    settings_title: "App & Appearance Settings",
    settings_subtitle: "Manage application language, themes, and Windows startup preferences",
    language_title: "🌐 Language / Dil",
    language_desc: "Switch the application dashboard and system tray language.",
    lang_tr_sub: "Default",
    lang_en_sub: "International",
    theme_title: "🎨 Interface Theme",
    theme_midnight: "Midnight Glass",
    theme_cyber: "Cyber Neon",
    theme_pastel: "Cozy Pastel",
    theme_oled: "Deep OLED",
    theme_sunset: "Sunset Aurora",
    theme_emerald: "Emerald Forest",
    theme_dracula: "Vampire Velvet",
    theme_nordic: "Nordic Frost",
    windows_title: "🚀 Windows Integration",
    startup_name: "Launch on Windows Startup",
    startup_hint: "Automatically launch and roam on the taskbar when Windows boots up",
    tray_name: "Minimize to Tray on Close",
    tray_hint: "Keep running in the background notification area when the dashboard is closed",

    // Tray Context Menu
    tray_settings: "🖥️ Dashboard / Settings",
    tray_change_pet: "🐱 Change Pet",
    tray_wake: "☀️ Wake Up Pet",
    tray_sleep: "🌙 Put Pet to Sleep",
    tray_test_dance: "🎵 Test Music Dance",
    tray_pet: "❤️ Pet Companion (Hearts)",
    tray_exit: "❌ Exit Application",

    // Pet Catalog Data
    pets: {
      neko: {
        name: "Neko Cat",
        species: "Felis Catus",
        traits: ["🐱 Curious", "✨ Agile", "💤 Loaf Pose"],
        desc: "Bats paws, stretches, chases butterflies, and grooves to disco music."
      },
      shiba: {
        name: "Shiba Inu",
        species: "Canis Familiaris",
        traits: ["🐕 Loyal", "⚡ Zoomies", "🍖 Bone Seeker"],
        desc: "Wags tail, sniffs the ground, does bleps, and joyfully dashes around."
      },
      slime: {
        name: "Cyber Slime",
        species: "Digitalis Amoeba",
        traits: ["🟢 Neon Gel", "✨ Glowing", "🔮 Bouncy"],
        desc: "Features a holographic core, stretches like jelly, and radiates cyber glow."
      },
      dragon: {
        name: "Mini Dragon",
        species: "Draco Chibi",
        traits: ["🐉 Fire Breath", "✨ Wing Flaps", "👑 Mythic"],
        desc: "Puffs cute smoke rings, glides in the air, and curls around its tail."
      },
      duck: {
        name: "Pixel Duck",
        species: "Anas Platyrhynchos",
        traits: ["🦆 Waddler", "💧 Swimmer", "🎵 360 Spin"],
        desc: "Waddles happily, dives into water ripples, and spins dynamically."
      },
      fox: {
        name: "Kitsune Fox",
        species: "Vulpes Vulpes",
        traits: ["🦊 Swift", "🔥 Flame Tail", "✨ Mystical"],
        desc: "Swishes a majestic flame-tipped bushy tail, emits embers, and leaps curiously."
      },
      bunny: {
        name: "Mochi Bunny",
        species: "Oryctolagus Chibi",
        traits: ["🐰 Fluffy", "🥕 Carrot Lover", "⚡ Hop Hop"],
        desc: "Wiggles tall floppy ears, twitches tiny nose, and hops enthusiastically."
      },
      penguin: {
        name: "Chilly Penguin",
        species: "Aptenodytes Micro",
        traits: ["🐧 Adorable", "❄️ Winter Scarf", "🐟 Pattering"],
        desc: "Flaps flipper wings, waves its red knitted scarf, and patters on the taskbar."
      },
      jett: {
        name: "Valorant Jett",
        species: "Radiant Windrunner",
        traits: ["💨 Wind Agility", "🗡️ Flying Kunai", "✨ Tail Wind Glide"],
        desc: "Glides on air currents, summons glowing cyan kunai daggers, and dashes at supersonic speeds."
      },
      mario: {
        name: "Super Mario",
        species: "Mushroom Kingdom Hero",
        traits: ["🍄 Star Power", "⭐ Super Jump", "🧢 Iconic Cap"],
        desc: "Wiggles his iconic mustache and red cap, jumps with heroic energy, and grooves joyfully."
      },
      pikachu: {
        name: "Pikachu",
        species: "Electric Mouse Pokemon",
        traits: ["⚡ Thunderbolt Tail", "🔴 Electric Cheeks", "✨ Pika Pika"],
        desc: "Swishes its zigzag lightning bolt tail, sparks cute electricity from red cheeks, and wiggles long ears."
      }
    }
  }
};

class I18nManager {
  constructor() {
    this.currentLanguage = 'tr';
  }

  /**
   * Translates a string key into current language.
   * @param {string} key
   * @param {string} [lang]
   * @returns {string}
   */
  t(key, lang = null) {
    const l = lang || this.currentLanguage;
    const dict = I18N_DICTIONARY[l] || I18N_DICTIONARY.tr;
    return dict[key] !== undefined ? dict[key] : key;
  }

  /**
   * Retrieves localized pet catalog object.
   * @param {string} petId
   * @param {string} [lang]
   * @returns {Object}
   */
  getPetData(petId, lang = null) {
    const l = lang || this.currentLanguage;
    const dict = I18N_DICTIONARY[l] || I18N_DICTIONARY.tr;
    return (dict.pets && dict.pets[petId]) ? dict.pets[petId] : null;
  }

  /**
   * Sets current language and updates all DOM elements containing [data-i18n] attributes.
   * @param {string} lang - 'tr' or 'en'
   */
  setLanguage(lang) {
    if (lang !== 'tr' && lang !== 'en') lang = 'tr';
    this.currentLanguage = lang;
    this.applyDOM();
  }

  /**
   * Scans and translates DOM elements with data-i18n, data-i18n-title, and data-i18n-placeholder attributes.
   */
  applyDOM() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('title', translation);
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const translation = this.t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });
  }
}

const i18n = new I18nManager();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { I18N_DICTIONARY, I18nManager, i18n };
}
