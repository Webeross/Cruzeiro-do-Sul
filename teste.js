// ********************************************************************
// UNIV CRUZEIRO DO SUL - CAMPUS SANTO AMARO - CURSO ADS
// Disciplina: Top. Avançados de Sistema de Informação - I
// Autor: Eduardo Weber Dias       -       18/03/2024
// --------------------------------------------------------------------
// O programa desenvolve um sistema de backend para processar informa-
// ções em rotas (end point) de serviços e recebe informações atraves
// do protocolo HTTP e retorna como resposta dados nos serviços. (http://localhost:4580/notas?a1=5.5&a2=7.0)
// --------------------------------------------------------------------


//Importar LIBS necessárias
const http = require('http');
const url = require('url');
const fs = require('fs')

//Definição de variável
const PORT = 4580;
const mediaMeta = 6.0;

//Criando servidor
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true); //endereço
    const path = reqUrl.pathname; //nome pathname
    const query = reqUrl.query; //pegar variáveis

    if(path === '/notas'){ //Se o caminho for igual a /notas http://localhost/notas

        // Recebo as notas como variáveis
        const notaA1 = parseFloat(query.a1);
        const notaA2 = parseFloat(query.a2);

        
        if(isNaN(notaA1) || isNaN(notaA2)){ // Se as notas forem vazias
            res.writeHead(400, {'Content-Type': "text/plain; charset=utf-8"});
            res.end(`ERRO 400 - Valor das notas invalidas.`);
        }else{ 
            //Caso as notas sejam preenchidas, calculo a média
            const media = (notaA1 + notaA2)/2;

            if(media >= mediaMeta){
                fs.readFile(`aprovado.html`, 'utf-8', (err,data) => {
                    if(err){ //Caso o servidor não consiga resolver
                        res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"})
                        res.end('500 - Erro interno do servidor')
                    }else{
                        data = data.replace(`{media}`, media.toFixed(2));
                        res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                        res.end(data);
                    }
                })

                /*res.writeHead(200, {'Content-Type': "text/plain; charset=utf-8"})
                res.end(`APROVADO - Media:${media.toFixed(2)}`); */
            }else{
                fs.readFile(`reprovado.html`, 'utf-8', (err,data) => {
                    if(err){ //Caso o servidor não consiga resolver
                        res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"})
                        res.end('500 - Erro interno do servidor')
                    }else{
                        data = data.replace(`{media}`, media.toFixed(2));
                        res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                        res.end(data);
                    }
                })
                /*res.writeHead(200, {'Content-Type': "text/plain; charset=utf-8"});
                res.end(`REPROVADO - Media:${media.toFixed(2)}`); */
            }

        }
    }else{
        fs.readFile(`error404.html`, 'utf-8', (err,data) => {
            if(err){ //Caso o servidor não consiga resolver
                res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"})
                res.end('500 - Erro interno do servidor')
            }else{
                data = data.replace(`{media}`, media.toFixed(2));
                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.end(data);
            }
        }) /* //ERRO 404 - Não entrou na rota "http://localhost/notas"
        res.writeHead(404, {'Content-Type': "text/plain; charset=utf-8"});
        res.end(`ERRO 404 - Não encontrado`) */
        
    }
})
    //Configuração do servidor
    server.listen(PORT, () => {
        console.log(`[OK] - Servidor iniciado em http://localhost:${PORT} ...`);
    });
    
    