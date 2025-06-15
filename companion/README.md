P20 PVW Layer Select - Companion Module
Bu modül, Pixelflow P20 LED işlemcisinin PVW (Preview) layerlarını Companion ile kontrol etmek için geliştirilmiştir.

Özellikler
Seçili screen'in PVW layerlarını dinamik olarak listeler
Layer isimlerini otomatik olarak günceller
Toggle seçim özelliği (aynı layer'a tekrar basınca seçimi kaldırır)
Visual feedback (seçili layer yeşil renkte görünür)
8 layer desteği (L1-L8)
Kurulum
Bu klasörü Companion'ın module dizinine kopyalayın
Companion'ı yeniden başlatın
Connections bölümünden modülü ekleyin
IP adresini ve portu yapılandırın
Yapılandırma
Target IP: P20 cihazının IP adresi (varsayılan: 192.168.1.100)
Target Port: API portu (varsayılan: 19998)
Kullanım
Actions (Eylemler)
Aktif Screen ID Ayarla: Hangi screen'in layerları ile çalışılacağını belirler
PVW Layerlarını Çek: Layer isimlerini yeniler
PVW Layerı Serial ile Seç: Belirtilen serial numaralı layer'ı seçer/deseçer
Variables (Değişkenler)
layer_name_1 - layer_name_8: Her layer'ın adını tutar
selected_screen_id: Aktif screen ID'si
selected_layer_id: Seçili layer ID'si
Presets (Hazır Tuşlar)
L1-L8 Layer tuşları: Her layer için ayrı tuş
PVW Layerları Yenile tuşu: Layer isimlerini günceller
API Endpoint
Modül aşağıdaki P20 API endpoint'ini kullanır:

GET http://{IP}:{PORT}/unico/v1/layers/list-detail
Sürüm
v1.0.0 - İlk sürüm

Lisans
MIT License

Not
Bu modül kişisel kullanım için geliştirilmiştir ve resmi Pixelflow desteği bulunmamaktadır.

