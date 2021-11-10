$(function () { // quando o documento estiver pronto/carregado

    // função para exibir pessoas na tabela
    function exibir_roupa() {
        $.ajax({
            url: 'http://localhost:5000/listar_roupa',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function () {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar(roupa) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaRoupa').empty();
            // tornar a tabela visível
            mostrar_conteudo("tabelaRoupa");
            // percorrer a lista de pessoas retornadas; 
            for (var i in roupa) { //i vale a posição no vetor
                lin = '<tr id="linha_'+roupa[i].id+'">' + // elabora linha com os dados da pessoa
                    '<td>' + roupa[i].nome + '</td>' +
                    '<td>' + roupa[i].cor + '</td>' +
                    '<td>' + roupa[i].telefone + '</td>' +
                '<td><a href=# id="excluir_' + roupa[i].id + '" ' +
                    'class="excluir_roupa"><img src="img/excluir.png" ' +
                    'alt="Excluir roupa" title="Excluir roupa"></a>' +
                    '</td>' +
                    '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaRoupa').append(lin);
            }
        }
    }

    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#tabelaRoupa").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        // torna o conteúdo escolhido visível
        $("#" + identificador).removeClass('invisible');
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarRoupa", function () {
        exibir_roupa();
    });

    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function () {
        mostrar_conteudo("conteudoInicial");
    });

    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btIncluirModa", function () {
        //pegar dados da tela
        nome = $("#campoNome").val();
        cor = $("#campoCor").val();
        tel = $("#campoTelefone").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, cor: cor, telefone: tel });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_roupa',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: roupaIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function roupaIncluida(retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Roupa incluída com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoCor").val("");
                $("#campoTelefone").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoIncluir(retorno) {
            // informar mensagem de erro
            alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
        }
    });

    // código a ser executado quando a janela de inclusão de pessoas for fechada
    $('#modalIncluirRoupa').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (!$("#tabelaRoupa").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_roupa();
        }
    });
    function roupaExcluida(retorno) {
        if (retorno.resultado == "ok") { // a operação deu certo?
            // remover da tela a linha cuja pessoa foi excluída
            $("#linha_" + id_roupa).fadeOut(1000, function () {
                // informar resultado de sucesso
                alert("Roupa removida com sucesso!");
            });
        } else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }
    function erroAoExcluir(retorno) {
        // informar mensagem de erro
        alert("erro ao excluir dados, verifique o backend: ");
    }

// a função abaixo é executada quando a página abre
mostrar_conteudo("conteudoInicial");
// código para os ícones de excluir pessoas (classe css)
$(document).on("click", ".excluir_roupa", function () {
    // obter o ID do ícone que foi clicado
    var componente_clicado = $(this).attr('id');
    // no id do ícone, obter o ID da pessoa
    var nome_icone = "excluir_";
    var id_roupa = componente_clicado.substring(nome_icone.length);
    // solicitar a exclusão da pessoa
    $.ajax({
        url: 'http://localhost:5000/excluir_roupa/' + id_roupa,
        type: 'DELETE', // método da requisição
        dataType: 'json', // os dados são recebidos no formato json
        success: roupaExcluida, // chama a função listar para processar o resultado
        error: erroAoExcluir
    });

    function roupaExcluida(retorno) {
        if (retorno.resultado == "ok") { // a operação deu certo?
            // remover da tela a linha cuja pessoa foi excluída
            $("#linha_" + id_roupa).fadeOut(1000, function(){
                // informar resultado de sucesso
                alert("Roupa removida com sucesso!");
            });
        } else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }
    function erroAoExcluir(retorno) {
        // informar mensagem de erro
        alert("erro ao excluir dados, verifique o backend: ");
    }

    });
});
