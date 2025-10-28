# **Asteria Bungalow AI Chatbot**

An AI chatbot specifically designed for Asteria Bungalow, capable of speaking Turkish. It is built on a language model that provides specific and accurate answers, aiming to automate customer service.


**Paraphrase Test, Typo / Misspelled Text Test, Long & Complex Sentence Test, Multiple Questions Prompt Test, Logical Consistency Test:**

https://github.com/user-attachments/assets/2d4ce48d-c638-44e1-a055-a7d7ff183375




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
