from werkzeug.datastructures import RequestCacheControl
from config import *
from modelo import Roupa

@app.route("/")
def inicio():
    return 'Sistema de cadastro de pessoas. '+\
        '<a href="/listar_moda">Operação listar</a>'

@app.route("/listar_roupa")
def listar_roupa():
    # obter as pessoas do cadastro
    roupas = db.session.query(Roupa).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    roupas_em_json = [ x.json() for x in roupas ]
    # fornecer a lista de pessoas em formato json
    resposta  = jsonify(roupas_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

# teste da rota: curl -d '{"nome":"James Kirk", "telefone":"92212-1212", "email":"jakirk@gmail.com"}' -X POST -H "Content-Type:application/json" localhost:5000/incluir_pessoa
@app.route("/incluir_roupa", methods=['post'])
def incluir_roupa():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Roupa(**dados) # criar a nova pessoa
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

# teste: curl -X DELETE http://localhost:5000/excluir_roupa/1
@app.route("/excluir_roupa/<int:moda_id>", methods=['DELETE'])
def excluir_roupa(moda_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a pessoa do ID informado
        Roupa.query.filter(Roupa.id == moda_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

app.run(debug=True)