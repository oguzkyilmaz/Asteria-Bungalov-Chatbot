import json
import os

def fix_notebook(notebook_path):
    """Notebook dosyasını temizler ve geçerli JSON formatına dönüştürür"""
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # JSON olarak parse et
        notebook = json.loads(content)
        
        # Notebook'u temizle ve yeniden yaz
        with open(notebook_path, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=2, ensure_ascii=False)
        
        print(f"✅ {notebook_path} temizlendi")
        return True
    except Exception as e:
        print(f"❌ {notebook_path} temizlenemedi: {e}")
        return False

# Model klasöründeki tüm notebook dosyalarını temizle
model_dir = "BungalovChat/model"
notebook_files = [
    "response-gemma.ipynb",
    "main-gemma.ipynb", 
    "gemma-main.ipynb",
    "response.ipynb"
]

for notebook_file in notebook_files:
    notebook_path = os.path.join(model_dir, notebook_file)
    if os.path.exists(notebook_path):
        fix_notebook(notebook_path)
    else:
        print(f"⚠️ {notebook_path} bulunamadı")

print("\n🎉 Tüm notebook dosyaları temizlendi!") 