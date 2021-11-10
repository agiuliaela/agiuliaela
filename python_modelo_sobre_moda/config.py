# importações
from flask import Flask, jsonify, request # preparar resposta HTTP no formato json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# configurações
app = Flask(__name__)
CORS(app)
# caminho do arquivo de banco de dados
path = os.path.dirname(os.path.abspath(__file__)) # sugestao do Kaue
arquivobd = os.path.join(path, 'roupa.db')
# sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remover warnings
db = SQLAlchemy(app)