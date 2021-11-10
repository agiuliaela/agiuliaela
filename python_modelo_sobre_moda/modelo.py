from config import *

class Roupa(db.Model):
    # atributos da Roupa
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    telefone = db.Column(db.String(254))


    # método para expressar a pessoa em forma de texto
    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.cor + ", " + self.telefone
    # expressao da classe no formato json
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cor": self.cor,
            "telefone": self.telefone,
        }

# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

    # teste da classe Pessoa
    p1 = Roupa(nome = "Dilvar Moreira", cor = "dilmor@gmail.com", 
        telefone = "47 99012 3232")
    p2 = Roupa(nome = "Giuliette da Silva Moreira", cor = "giu_lette@gmail.com", 
        telefone = "47 98822 2531")        
    
    # persistir
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    
    # exibir a pessoa
    print(p1)

    # exibir a pessoa no format json
    print(p2.json())