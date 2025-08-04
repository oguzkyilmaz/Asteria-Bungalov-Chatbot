# **Asteria Bungalov Yapay Zekâ Sohbet Asistanı**


Asteria Bungalov için özel olarak tasarlanmış, Türkçe konuşabilen bir yapay zekâ sohbet asistanıdır. Müşteri hizmetlerini otomatize etmek amacıyla, spesifik ve doğru cevaplar verebilen bir dil modeli üzerine inşa edilmiştir.

<img width="1901" height="888" alt="Ekran görüntüsü 2025-08-04 233029" src="https://github.com/user-attachments/assets/a57b86ba-fa4f-4302-ac13-5c50adb26b1c" />


# Temel Özellikleri
- Veri Odaklı Eğitim: Gerçek müşteri verilerinden oluşturulan 700'den fazla soru-cevap çifti ile eğitildi.

- Supervised Fine-Tuning (LoRA): Açık kaynak bir temel model olan ytu-ce-cosmos/Turkish-Gemma-9b-v0.1 üzerinde LoRA yöntemiyle ince ayar yapıldı.

- Güvenilirlik ve Tutarlılık: Genelleme yeteneğinden ziyade, bağlama uygun, kısa ve net yanıtlar vermesi hedeflendi.

- Tamamen Türkçe: Türkçe dilinde sorunsuz bir şekilde çalışacak şekilde optimize edildi.

# Modelin Cevap Stratejisi
- Bir işletme için geliştirilen özel bir yapay zekâ asistanında, genel amaçlı bir dil modelinin rastgele yaratıcı cevaplar vermesi yerine, güvenilir ve kesin bilgiler sunması esastır.

- Modelin Supervised Fine-Tuning ile özel bir veri seti üzerinde eğitilmesi sayesinde, genelleme yeteneği bilerek daraltılmıştır. Böylece model, kendisine sorulan soruları, eğitildiği özel verilerdeki kalıplara göre yanıtlamayı öğrenerek Asteria Bungalov'a özel konularda kesin ve güvenilir bilgiler sunacak şekilde özelleştirilmiştir.

# Teknolojiler
* Temel Model: `ytu-ce-cosmos/Turkish-Gemma-9b-v0.1`

* Model Reposu: `oguzkyilmaz/Asteria-Bungalov-Gemma-9B`

* İnce Ayar Yöntemi: LoRA

* Kullanılan Kütüphaneler: bitsandbytes, transformers, peft

* Eğitim Ortamı: Google Colab

* Frontend: React, MUI
  


# Model Repo: oguzkyilmaz/Asteria-Bungalov-Gemma-9B

