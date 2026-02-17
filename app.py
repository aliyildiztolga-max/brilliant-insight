from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(_name_)
# Bu satır, Elementor'dan gelen 'Ali Yıldız' bağlantısına izin verir
CORS(app) 

@app.route('/mermi-api')
def get_signal():
    # Burası senin 3 borsa onaylı hibrit motorundan gelen veriyi temsil eder
    return jsonify({
        "user": "Ali Yıldız Max",
        "symbol": "BTC/USDT",
        "signal": "MERMİ AKTİF",
        "score": "%94 Başarı",
        "status": "Canlı Veri Akıyor"
    })

if _name_ == "_main_":
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
