Asteria Bungalov Yapay Zekâ Sohbet Asistanı
Bu proje, Asteria Bungalov için özel olarak tasarlanmış, Türkçe konuşabilen bir yapay zekâ sohbet asistanıdır. Müşteri hizmetlerini otomatize etmek amacıyla, spesifik ve doğru cevaplar verebilen bir dil modeli üzerine inşa edilmiştir.

Projenin Temel Özellikleri
Veri Odaklı Eğitim: Gerçek müşteri verilerinden oluşturulan 700'den fazla soru-cevap çifti ile eğitildi.

Supervised Fine-Tuning (LoRA): Açık kaynak bir temel model olan ytu-ce-cosmos/Turkish-Gemma-9b-v0.1 üzerinde LoRA yöntemiyle ince ayar yapıldı.

Güvenilirlik ve Tutarlılık: Genelleme yeteneğinden ziyade, bağlama uygun, kısa ve net yanıtlar vermesi hedeflendi.

Tamamen Türkçe: Türkçe dilinde sorunsuz bir şekilde çalışacak şekilde optimize edildi.

Modelin Özel Yeteneği: Net Cevaplar
Bir işletme için geliştirilen özel bir yapay zekâ asistanında, genel amaçlı bir dil modelinin rastgele yaratıcı cevaplar vermesi yerine, güvenilir ve kesin bilgiler sunması esastır.

Bu projede, modelin Supervised Fine-Tuning ile özel bir veri seti üzerinde eğitilmesi sayesinde, genelleme yeteneği bilerek daraltılmıştır. Böylece model, kendisine sorulan soruları, eğitildiği özel verilerdeki kalıplara göre yanıtlamayı öğrenerek Asteria Bungalov'a özel konularda kesin ve güvenilir bilgiler sunacak şekilde özelleştirilmiştir.

Teknolojiler
Temel Model: ytu-ce-cosmos/Turkish-Gemma-9b-v0.1

İnce Ayar Yöntemi: LoRA

Kullanılan Kütüphaneler: bitsandbytes, transformers, peft

Eğitim Ortamı: Google Colab

Frontend: React, MUI


Base Model: ytu-ce-cosmos/Turkish-Gemma-9b-v0.1


Hugging Face: oguzkyilmaz/Asteria-Bungalov-Gemma-9B

