import json
import os

def clean_notebook_completely(notebook_path):
    """Notebook dosyasını tamamen temizler ve geçerli formata dönüştürür"""
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            notebook = json.load(f)
        
        # Her cell'i temizle
        for cell in notebook.get('cells', []):
            # metadata.widgets'ı tamamen kaldır
            if 'metadata' in cell and 'widgets' in cell['metadata']:
                del cell['metadata']['widgets']
            
            # Boş metadata'yı kaldır
            if 'metadata' in cell and not cell['metadata']:
                del cell['metadata']
        
        # Notebook metadata'sını temizle
        if 'metadata' in notebook:
            # widgets'ı kaldır
            if 'widgets' in notebook['metadata']:
                del notebook['metadata']['widgets']
            
            # Diğer sorunlu alanları temizle
            if 'execution' in notebook['metadata']:
                del notebook['metadata']['execution']
            
            # Boş metadata'yı kaldır
            if not notebook['metadata']:
                del notebook['metadata']
        
        # Geçerli nbformat versiyonunu ayarla
        notebook['nbformat'] = 4
        notebook['nbformat_minor'] = 4
        
        # Dosyayı yeniden yaz
        with open(notebook_path, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=2, ensure_ascii=False)
        
        print(f"✅ {notebook_path} tamamen temizlendi")
        return True
    except Exception as e:
        print(f"❌ {notebook_path} temizlenemedi: {e}")
        return False

# Tüm notebook dosyalarını temizle
notebook_files = [
    "BungalovChat/run.ipynb",
    "BungalovChat/model/gemma-main.ipynb", 
    "BungalovChat/model/response.ipynb"
]

for notebook_file in notebook_files:
    if os.path.exists(notebook_file):
        clean_notebook_completely(notebook_file)
    else:
        print(f"⚠️ {notebook_file} bulunamadı")

print("\n🎉 Tüm notebook dosyaları tamamen temizlendi!") 