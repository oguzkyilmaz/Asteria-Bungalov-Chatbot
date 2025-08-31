# **Asteria Bungalow AI Chatbot**

An AI chatbot specifically designed for Asteria Bungalow, capable of speaking Turkish. It is built on a language model that provides specific and accurate answers, aiming to automate customer service.


<img width="1901" height="888" alt="Ekran görüntüsü 2025-08-04 233029" src="https://github.com/user-attachments/assets/a57b86ba-fa4f-4302-ac13-5c50adb26b1c" />


---

# **Key Features**
- **Data-Driven Training:** Trained with over 750+ question-answer pairs that I developed using real customer data.

- **Supervised Fine-Tuning (LoRA):** Fine-tuned using the LoRA method on an open-source base model, ytu-ce-cosmos/Turkish-Gemma-9b-v0.1.

- **Reliability and Consistency:** The goal was to provide short, clear, and context-appropriate answers rather than focusing on generalization ability.

- **Fully Turkish:** Optimized to work seamlessly in the Turkish language.

---

# **Model's Answering Strategy**
- For a custom-developed AI assistant for a business, it is essential to provide reliable and definitive information rather than random, creative answers from a general-purpose language model.

- By training the model with Supervised Fine-Tuning on a specific dataset, its generalization ability was deliberately narrowed. This allows the model to learn to answer questions according to the patterns in its specialized training data, thereby providing accurate and reliable information on topics specific to Asteria Bungalow.

---

# **Technologies**
* Base Model: `ytu-ce-cosmos/Turkish-Gemma-9b-v0.1`

* Model Repo: `oguzkyilmaz/Asteria-Bungalov-Gemma-9B`

* Fine-Tuning Method: LoRA

* Libraries Used: bitsandbytes, transformers, peft

* Training Environment: Google Colab

* Frontend: React, MUI

`huggingface.co/oguzkyilmaz/Asteria-Bungalov-Gemma-9B`
