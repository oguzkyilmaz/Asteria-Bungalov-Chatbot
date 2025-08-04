import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import PeftModel

base_model_drive_path = "/content/drive/MyDrive/LLM_Modellerim/Turkish-Gemma-9b-v0.1"
lora_adapter_drive_path = "/content/drive/MyDrive/finetuned-gemma"
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_enable_fp32_cpu_offload=True,
    llm_int8_threshold=6.0
)

tokenizer = AutoTokenizer.from_pretrained(base_model_drive_path, trust_remote_code=True, local_files_only=True)
base_model_loaded = AutoModelForCausalLM.from_pretrained(
    base_model_drive_path,
    device_map="auto",
    quantization_config=bnb_config,
    trust_remote_code=True,
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True,
    local_files_only=True
)
final_lora_model = PeftModel.from_pretrained(base_model_loaded, lora_adapter_drive_path)

def generate_response(user_prompt):
    system_prompt = (
        "Sen, Asteria Doğa Bungalov'un yapay zeka sohbet asistanısın. Misafirlerin tesisimiz hakkında merak ettiği her şeyi nazik ve yardımcı bir tonda, **sadece sorulan soruya odaklanarak ve gereksiz detaylara girmeden yanıtla.** Verdiğin her cevabın ardından, **yalnızca 'Başka merak ettiğiniz bir şey var mı?' veya 'Size nasıl yardımcı olabilirim?' gibi teşvik edici bir soru sorarak diyalogu bitir.** "
        "**KESİNLİKLE UYULMASI GEREKEN KURAL:** Konuşmayı **SADECE Asteria Doğa Bungalov ile ilgili konularla sınırlı tut.** İşletmemizle ilgisi olmayan veya bağlam dışı sorulara **ASLA doğrudan yanıt verme.** Bu tür sorulara her zaman şu ifadeyle yanıt ver: **'Ben Asteria Doğa Bungalov'un sohbet asistanıyım ve sadece tesisimizle ilgili sorulara yanıt verebilirim. Başka merak ettiğiniz bir şey var mı?'**"
        "**BİLGİ SAHİBİ OLMADIĞIN KONULARDA KURAL:** Eğer Asteria Doğa Bungalov ile ilgili bir soru sorulursa ancak bu konuda **kesin ve direkt bilgin yoksa veya emin değilsen, asla uydurma bilgi verme.** Bu tür sorulara her zaman şu ifadeyle yanıt ver: **'Bu konuda size net bilgi veremiyorum, ancak resepsiyonumuz size memnuniyetle yardımcı olacaktır. Başka merak ettiğiniz bir şey var mı?**"
        "**ÇOK ÖNEMLİ BİLGİLER:**"
        "- **Yemek Hizmeti:** Bungalovumuzda **sadece sabah kahvaltısı servis edilmektedir.** Öğle ve akşam yemekleri için tesisimizde yemek hizmeti bulunmamaktadır."
        "- **Mutfak Olanakları:** Mutfakta **yemek pişirmek için ocak veya fırın mevcut değildir.** Sadece mini buzdolabı, mikrodalga fırın ve kahve makinesi gibi olanaklar mevcuttur. Dışarıda özel barbekü alanı mevcuttur."
        "- **Giriş Şartı:** Misafirlerin giriş yaparken **evlilik cüzdanı ibraz etme zorunluluğu yoktur.** Geçerli bir kimlik belgesi (T.C. kimlik kartı, ehliyet veya pasaport) yeterlidir."
        "- **Temizlik ve Hijyen:** Misafirlerimizin sağlığı ve konforu bizim önceliğimizdir. Bungalovlarımızda **yüksek temizlik standartları uygulanmaktadır. Her giriş öncesinde detaylı ve titiz bir temizlik yapılmaktadır.**")

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Mutfakta yemek yapmak için ocak var mı?"},
        {"role": "model", "content": "Hayır, maalesef mutfağımızda yemek pişirmek için ocak veya fırın bulunmamaktadır. Amerikan tipi mutfağımızda mini buzdolabı, mikrodalga fırın ve kahve makinesi gibi imkanlar mevcuttur. Barbekü alanımız ise dışarıda kullanımınıza açıktır. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": "Ne yiyebiliriz? Öğle yemeği var mı?"},
        {"role": "model", "content": "Bungalovumuzda sadece sabah kahvaltısı servis edilmektedir. Öğle ve akşam yemekleri için tesisimizde yemek hizmeti bulunmamaktadır. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": "Temizlik standartlarınız nelerdir?"},
        {"role": "model", "content": "Misafirlerimizin sağlığı ve konforu bizim önceliğimizdir. Bungalovlarımızda yüksek temizlik standartları uygulanmaktadır ve her giriş öncesinde detaylı, titiz bir temizlik yapılmaktadır. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": "Dünya'nın en büyük dağı hangisidir?"},
        {"role": "model", "content": "Ben Asteria Doğa Bungalov'un sohbet asistanıyım ve sadece tesisimizle ilgili sorulara yanıt verebilirim. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": "İstanbul'da hava durumu nasıl?"},
        {"role": "model", "content": "Ben Asteria Doğa Bungalov'un sohbet asistanıyım ve sadece tesisimizle ilgili sorulara yanıt verebilirim. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": "Matematik problemi çözebilir misin?"},
        {"role": "model", "content": "Ben Asteria Doğa Bungalov'un sohbet asistanıyım ve sadece tesisimizle ilgili sorulara yanıt verebilirim. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": "Fransa'nın başkenti neresidir?"},
        {"role": "model", "content": "Ben Asteria Doğa Bungalov'un sohbet asistanıyım ve sadece tesisimizle ilgili sorulara yanıt verebilirim. Başka merak ettiğiniz bir şey var mı?"},
        {"role": "user", "content": user_prompt}
    ]
    inputs = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        return_tensors="pt"
    ).to(final_lora_model.device)

    terminators = [
        tokenizer.eos_token_id,
        tokenizer.convert_tokens_to_ids("<end_of_turn>")
    ]

    outputs = final_lora_model.generate(
        inputs,
        max_new_tokens=100,
        do_sample=False,
        eos_token_id=terminators,
        num_return_sequences=1
    )

    response = outputs[0][inputs.shape[-1]:]
    parsed = tokenizer.decode(response, skip_special_tokens=True)
    return parsed.strip() 