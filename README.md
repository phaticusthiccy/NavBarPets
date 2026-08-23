# 🐾 Windows Nav Bar Pets

Windows görev çubuğunda (Taskbar) yaşayan, müzik ritmine ve çevreye tepki veren, uyku-uyanma saatlerine sahip, onlarca doğal animasyona ve kesintisiz durum geçişlerine sahip interaktif masaüstü evcil hayvan uygulaması.

---

## ✨ Özellikler

### 1. 🐱 5 Benzersiz Pet Türü & Zengin Animasyon Kütüphanesi
- **Neko (Kedi)**: Kulak seğirmesi, kuyruk sallama, pati temizleme, ekmek somunu (loaf) pozisyonu, kelebek izleme, disko dansı, esneme, kutuya girme.
- **Shiba Inu (Köpek)**: Kıvrık kuyruk sallama, yeri koklama, blep (dil çıkarma), zoomies koşusu, kemik avlama, sevinç zıplaması.
- **Cyber Slime (Neon Slime)**: Holografik parıldama, jöle yaylanması, elektrik kıvılcımları saçma, yumuşak gövde deformasyonu.
- **Mini Dragon (Ejderha)**: Minik ateş ve duman halkaları püskürtme, kanat çırparak süzülme, kuyruğuna sarılma.
- **Pixel Duck (Ördek)**: Paytak adımlama, suya dalar gibi başını eğme, tüylerini kabartma, 360 spin dansı.

### 2. 🌊 Kesintisiz Durum Geçişleri (State Blending & Interruption Matrix)
- **Uykuda Yakalanma**: Pet uyurken fareyle kaldırıldığında animasyon aniden kesilmez; önce gözlerini mahmurca aralar (`Startled Wake`), havada bacaklarını tembelce sallar (`Groggy Hang`), bırakıldığında yerçekimi ile düşüp görev çubuğunda yaylanır (`Impact Squish`) ve üstünü silkeleyip esner.
- **Okşama & Sevgi**: Fare pet'in üzerinde gezdirildiğinde kalpler ve mutluluk mırıltıları saçar.
- **Yerçekimi & Fizik**: Görev çubuğu üzerinde yürür, kenarlara çarpınca yön değiştirir, havaya kaldırılıp bırakıldığında yerçekimiyle görev çubuğuna iner.

### 3. 🎵 Müzik & Ses Tepkisi (Audio Reactive)
- Bilgisayarınızda çalan şarkıların (Spotify, YouTube, oyunlar vb.) ritmini yakalar.
- Kulaklıklarını takar, nota parçacıkları saçar ve ritme uygun dans figürlerine geçer.

### 4. ⏰ Biyolojik Uyku & Uyanma Planlayıcı (Sleep Scheduler)
- Kullanıcı tarafından belirlenen saatlerde (Örn: `23:00 - 08:00`) otomatik olarak gece şapkasını takar, Zzz parçacıklarıyla derin uykuya dalar.
- Uykudayken dış etkenlerden rahatsız edilmez. Uyanma vaktinde esneyerek neşeyle uyanır.

### 5. 🚀 Masaüstü Entegrasyonu & Sistem Tepsisi (Tray)
- Pencere kapatıldığında arka planda görev çubuğunun sağ altındaki **Gizli Simgeler (System Tray)** alanında yaşamaya devam eder.
- Tepsi menüsünden anında pet değiştirme, uykuya geçirme veya dashboard'u açma imkanı.
- Windows başlangıcında otomatik başlatma seçeneği.
- 4 Farklı Arayüz Teması: *Midnight Glass, Cyber Neon, Cozy Pastel, Deep OLED*.

---

## 🛠️ Kurulum ve Çalıştırma

### Geliştirme Modunda Çalıştırma:
```bash
# Bağımlılıkları yükleyin (ilk sefer için)
npm install

# Uygulamayı başlatın
npm start
```

### Windows `.exe` Derleme (Build):
```bash
# Taşınabilir (portable) ve NSIS kurulumlu .exe oluşturur
npm run dist
```
Oluşturulan kurulum dosyaları `dist/` klasörüne kaydedilir.
