console.log('Desenvolvido por Renan Ventura')

let frames = 0;
const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

//PlanoDeFundo
const PlanoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha () {
        contexto.fillStyle='#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites, //image
            PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,//source X e Soucer Y
            PlanoDeFundo.largura, PlanoDeFundo.altura,//Tamanho do Recorte da Sprite
            PlanoDeFundo.x,PlanoDeFundo.y, //aonde ele vai desenha
            PlanoDeFundo.largura, PlanoDeFundo.altura, //Desenhar o Sprite
        );
        contexto.drawImage(
            sprites, //image
            PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,//source X e Soucer Y
            PlanoDeFundo.largura, PlanoDeFundo.altura,//Tamanho do Recorte da Sprite
            (PlanoDeFundo.x+PlanoDeFundo.largura),PlanoDeFundo.y, //aonde ele vai desenha
            PlanoDeFundo.largura, PlanoDeFundo.altura, //Desenhar o Sprite
        );
    },
}

//Chao do Jogo
function CriaChao(){
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza(){
        const movimentoDoChao = 1;
        const repeteEm = chao.largura/2;
        const movimentacao = chao.x - movimentoDoChao;
         chao.x = movimentacao % repeteEm;
    },
    desenha () {
        contexto.drawImage(
            sprites, //image
            chao.spriteX, chao.spriteY,//source X e Soucer Y
            chao.largura, chao.altura,//Tamanho do Recorte da Sprite
            chao.x,chao.y, //aonde ele vai desenha
            chao.largura, chao.altura, //Desenhar o Sprite
        );
        contexto.drawImage(
            sprites, //image
            chao.spriteX, chao.spriteY,//source X e Soucer Y
            chao.largura, chao.altura,//Tamanho do Recorte da Sprite
            (chao.x + chao.largura),chao.y, //aonde ele vai desenha
            chao.largura, chao.altura, //Desenhar o Sprite
        );
    },
};
return chao;
}
function FazColisao(FlappyBird, chao){
    const FlappyBirdY = FlappyBird.y + FlappyBird.altura;
    const chaoY = chao.y 

    if(FlappyBirdY >= chaoY){
        return true;
    }
    return false;
}


function criaFlappyBird(){
    const FlappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        pula(){
            console.log('devo pular')
            FlappyBird.velocidade = - FlappyBird.pulo;
        },
        
        atualiza (){
            if(FazColisao(FlappyBird, globais.chao)){
                 setTimeout(() => {
                    MudaParaTela(Telas.inicio);
                 }, 500);
                
                return;
            }   
            FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade;
            FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
        },
        movimentos:[
            {spriteX: 0, spriteY: 0,}, //asa pra cima
            {spriteX: 0, spriteY: 26,},//asa no meio
            {spriteX: 0, spriteY: 52,},//asa pra baixo
            {spriteX: 0, spriteY: 26,},//asa no meio

        ],
        frameAtual:0,
        atualizaOFrameAtual(){
            const intervalodeFrames=10;
            const passouOIntevalo=frames % intervalodeFrames ==0;

            if(passouOIntevalo){
            const baseDoincremento = 1;
            const incremento = baseDoincremento + FlappyBird.frameAtual;
            const baseRepeticao = FlappyBird.movimentos.length;
            FlappyBird.frameAtual = incremento % baseRepeticao
             } 
        },
        desenha () {
            FlappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = FlappyBird.movimentos[FlappyBird.frameAtual];

            contexto.drawImage(
                sprites, //image
                spriteX, spriteY,//source X e Soucer Y
                FlappyBird.largura, FlappyBird.altura,//Tamanho do Recorte da Sprite
                FlappyBird.x,FlappyBird.y, //aonde ele vai desenha
                FlappyBird.largura, FlappyBird.altura, //Desenhar o Sprite
            );
        },
    }
    return FlappyBird;
}
//FlappyBird 


const GetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width/2) - 174/2,
    y: 50,

    desenha () {
        contexto.drawImage(
            sprites, //image
            GetReady.spriteX, GetReady.spriteY,//source X e Soucer Y
            GetReady.largura, GetReady.altura,//Tamanho do Recorte da Sprite
            GetReady.x, GetReady.y, //aonde ele vai desenha
            GetReady.largura, GetReady.altura, //Desenhar o Sprite
        );
    },
}

function CriaCanos(){
    const canos = {
        largura:52,
        altura:400,
        chao: {
            spriteX: 0,
            screenY: 169,
        },
        ceu:{
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha (){
            const canoCeuX = 220;
            const canoCeuY = 0;

            contexto.drawImage(
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura,
             )
        },
    } 
        return canos;
    }


// 
// [Telas] 
// 
const globais = {};
let telaAtiva = {};
function MudaParaTela(NovaTela) {
    telaAtiva = NovaTela;
   
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const Telas = {
    inicio:{
        inicializa(){
           globais.FlappyBird = criaFlappyBird();
           globais.chao = CriaChao();
        //    globais.canos = CriaCanos();
        },
        desenha(){
            PlanoDeFundo.desenha();
            globais.chao.desenha();
            globais.FlappyBird.desenha();
            GetReady.desenha();
            // globais.canos = desenha();
        },
        click(){
            MudaParaTela(Telas.Jogo)
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }
};

Telas.Jogo ={
    desenha(){
        PlanoDeFundo.desenha();
        globais.chao.desenha();
        globais.FlappyBird.desenha();
    }, click() {
        globais.FlappyBird.pula();
    },
    atualiza(){
        globais.FlappyBird.atualiza();
        globais.chao.atualiza();
    }
};

function loop (){

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

MudaParaTela(Telas.inicio)
loop();