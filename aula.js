// *****************
// UNICSUL - Universidade Cruzeiro do Sul - Santo Amaro
// Curso: CTS Analise Desenvolvimento de Sistemas
// Disciplina: Topicos Avançados de SI - I
// Autor: Eduardo Weber Dias  -   Data: 25/03/2024
// Descrição: ProjAula
// *****************

// Importando os modulos:
const http = require('http');       
const url  = require('url');        

// Definição de variaveis 
const PORT = 4800;

// Criação do Servidor:
const server = http.createServer((req, res) => { 
    // Utilização do modulo URL 
    const reqUrl = url.parse(req.url, true);  
    const path   = reqUrl.pathname;           
    const query  = reqUrl.query;              

    if(path === '/'){
        res.writeHead(200, {'Context-Type':'text/plain; charset=utf-8'});
        res.end("End-Point: INDEX ('/')");
    }else if(path === '/imc'){
        const valorPeso   = parseFloat(query.peso);
        const valorAltura = parseFloat(query.altura);
        
        if(isNaN(valorAltura) || isNaN(valorPeso)){
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido");
        }else{
            // Calculo do IMC:
            const imc = valorPeso / (valorAltura*valorAltura);

            // Analisar o resultado:
            if(imc <= 19.5){
                // Abaixo do Peso:
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Abaixo do Peso`);
            }else if(imc <= 25){
                // Peso normal:
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Peso Normal`);
            }else if(imc <= 30){
                // Sobre Peso
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Sobre Peso`);
            }else if(imc <= 35){
                // Obesidade I
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Obesidade I`);
            }else if(imc <= 40){
                // Obesidade II
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Obesidade II`);
            }else{
                // Obesidade III
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Peso:${valorPeso.toFixed(2)}Kg \nAltura:${valorAltura.toFixed(2)} \nIMC = ${imc.toFixed(2)} - Obesidade III`);
            }
        }

    }else if(path === '/notas'){
        // Receber as variaveis pela URL:
        const notaA1 = parseFloat(query.a1);
        const notaA2 = parseFloat(query.a2);
        const media  = parseFloat(query.med);

        // Validar se as variaveis são validas:
        if (isNaN(notaA1) || isNaN(notaA2) || isNaN(media)){
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido");
        }else{
            // Calcular a media:
            calculo = (notaA1 + notaA2)/2;

            // Analisar se esta aprovado ou não
            if(calculo >= media){
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Considerando notas: \nA1:${notaA1.toFixed(2)} \nA2:${notaA2.toFixed(2)} \nMedia = ${calculo.toFixed(2)} - Aprovado`);
            }else{
                res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(`Considerando notas:\nA1:${notaA1.toFixed(2)} \nA2:${notaA2.toFixed(2)} \nMedia = ${calculo.toFixed(2)} - Reprovado`);
            }
        }

    }else if(path === '/dolar'){
        // Receber as variaveis digitadas na URL:
        const valorDolar = parseFloat(query.dolar);  // Recebe a variavel dolar da URL
        const valorReais = parseFloat(query.reais);  // Recebe a variavel reais da URL

        if(isNaN(valorDolar) || isNaN(valorReais)){
            res.writeHead(400, {'Context-Type':'text/plain; charset=utf-8'});
            res.end("400 - Entre com um valor valido ...")
        }else{
            // Calcula a conversão de Reais para Dolar
            const convertido = valorReais / valorDolar;

            // Mostra o resultado no navegador:
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(`R$${valorReais.toFixed(2)} por U$${valorDolar.toFixed(2)} 
                    é igual U$${convertido.toFixed(2)} convertidos`);
        }
    }else{
        res.writeHead(404, {'Context-Type':'text/plain; charset=utf-8'});
        res.end("404 - Pagina não encontrada ...")
    }
});

// Configuração do Servidor:
server.listen(PORT, () => {          
    console.log(`[OK] - Servidor iniciado em porta: ${PORT}`);  // Sucesso mostra essa msg.
});