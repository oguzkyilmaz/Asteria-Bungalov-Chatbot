import json
import os

def fix_notebook_metadata(notebook_path):
    """Notebook dosyasındaki metadata.widgets sorununu çözer"""
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            notebook = json.load(f)
        
        # Her cell'i kontrol et ve metadata.widgets sorununu çöz
        for cell in notebook.get('cells', []):
            if 'metadata' in cell and 'widgets' in cell['metadata']:
                widgets = cell['metadata']['widgets']
                if isinstance(widgets, list):
                    for widget in widgets:
                        if isinstance(widget, dict) and 'state' not in widget:
                            widget['state'] = {}
                elif isinstance(widgets, dict) and 'state' not in widgets:
                    widgets['state'] = {}
        
        # Notebook metadata'sını da kontrol et
        if 'metadata' in notebook and 'widgets' in notebook['metadata']:
            widgets = notebook['metadata']['widgets']
            if isinstance(widgets, list):
                for widget in widgets:
                    if isinstance(widget, dict) and 'state' not in widget:
                        widget['state'] = {}
            elif isinstance(widgets, dict) and 'state' not in widgets:
                widgets['state'] = {}
        
        # Dosyayı yeniden yaz
        with open(notebook_path, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=2, ensure_ascii=False)
        
        print(f"✅ {notebook_path} metadata sorunu çözüldü")
        return True
    except Exception as e:
        print(f"❌ {notebook_path} düzeltilemedi: {e}")
        return False

# Tüm notebook dosyalarını düzelt
notebook_files = [
    "BungalovChat/run.ipynb",
    "BungalovChat/model/gemma-main.ipynb", 
    "BungalovChat/model/response.ipynb"
]

for notebook_file in notebook_files:
    if os.path.exists(notebook_file):
        fix_notebook_metadata(notebook_file)
    else:
        print(f"⚠️ {notebook_file} bulunamadı")

print("\n🎉 Tüm notebook dosyaları düzeltildi!") 