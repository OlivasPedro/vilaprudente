let wasDragged = false;


const botao = document.getElementById("btnIniciarNavegacao");
const telaDescanso = document.getElementById("tela-descanso");
const novaTela = document.getElementById("menu");

botao.addEventListener("click", function () {
  entrarEmTelaCheia();

  // Aplica a animação de scale out na tela de descanso
  telaDescanso.style.animation = "shrinkScreen 0.6s forwards";

  // Após o término da animação, oculta a tela de descanso e exibe a nova tela com scale in
  setTimeout(function () {
    telaDescanso.style.display = "none";
    novaTela.classList.add("menu-ativo");
  }, 300);
});

function entrarEmTelaCheia() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari e Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
}


const btnGaleria = document.getElementById("btnGaleria");
const menuTela = document.getElementById("menu");
const galeriaTela = document.getElementById("galeria");

btnGaleria.addEventListener("click", function () {
  // Aplica a animação de slide out no menu (da direita para a esquerda)
  menuTela.style.animation = "slideOut 0.8s forwards";

  // Após o término da animação, oculta o menu e exibe a galeria com slide in
  setTimeout(function () {
    menuTela.style.display = "none";
    galeriaTela.style.display = "block";
    // Inicia a animação de slide in na galeria (de direita para a esquerda)
    galeriaTela.style.animation = "slideIn 0.8s forwards";
  }, 500);
});

const btnFecharGaleria = document.getElementById("btnFecharGaleria");

btnFecharGaleria.addEventListener("click", function () {
  // Garante que a galeria esteja na posição correta para animar
  galeriaTela.style.transform = "translateX(0)";

  // Aplica animação de saída da galeria para a esquerda
  galeriaTela.style.animation = "slideOutLeft 0.5s forwards";

  // Após a animação, oculta a galeria e mostra o menu com entrada da direita
  setTimeout(function () {
    galeriaTela.style.display = "none";
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 800);
});

const totalImagens = 31;
let indexAtual = 1;

// Rolagem de imagens da galeria
const nomesDasImagens = [
  "Academia.png",
  "Bicicletario.png",
  "Brinquedoteca.png",
  "Churrasqueira.png",
  "Cine-Open.png",
  "Coworking.png",
  "Entrada.png",
  "Fachada Diurna.png",
  "Fachada Noturna.png",
  "Fire Place.png",
  "Game Pub.png",
  "Garden 01.png",
  "Garden 02.png",
  "Gourmet.png",
  "Hall.png",
  "Lavanderia.png",
  "Living 01.png",
  "Living 02.png",
  "Living 03.png",
  "Living 04 Duplex 2.png",
  "Living 04 Duplex.png",
  "Living 05.png",
  "Living 06.png",
  "Living 08.png",
  "Mercadinho.png",
  "Pet Place.png",
  "Piscina.png",
  "Playground.png",
  "Quarto Casal.png",
  "Quarto Solteiro.png",
  "Sauna.png",
];

// Elementos principais
const imagemPrincipal = document.querySelector(".foto-principal");
const imagemZoom = document.querySelector(".imagem-zoom");
const btnPrev = document.getElementById("btnPrevFoto");
const btnNext = document.getElementById("btnNextFoto");

// Gera o caminho da imagem do popup a partir do nome base
function gerarNomePopup(nomeOriginal) {
  const base = nomeOriginal
    .replace('.png', '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return `Chaincorp_Vila_Prudente_${base}_HR.jpg`;
}
function trocarImagem(direcao) {
  // Aplica animação de saída
  imagemPrincipal.style.opacity = 0;
  imagemPrincipal.style.transition = 'opacity 0.2s ease';

  setTimeout(() => {
    // Atualiza índice
    if (direcao === 'next') {
      indexAtual = (indexAtual + 1) % nomesDasImagens.length;
    } else {
      indexAtual = (indexAtual - 1 + nomesDasImagens.length) % nomesDasImagens.length;
    }

    // Atualiza imagem
    const nome = nomesDasImagens[indexAtual];
    imagemPrincipal.src = `images/tela-galeria/FOTOS COM LUPA/${nome}`;
    imagemZoom.src = `images/tela-galeria/FOTOS/${gerarNomePopup(nome)}`;

    // Espera imagem carregar antes de mostrar
    imagemPrincipal.onload = () => {
      imagemPrincipal.style.opacity = 1;
    };
  }, 300);
}


// Eventos dos botões
btnNext.addEventListener("click", () => trocarImagem("next"));
btnPrev.addEventListener("click", () => trocarImagem("prev"));

// Define imagem inicial ao carregar
function carregarImagemInicial() {
  const nome = nomesDasImagens[indexAtual];
  const caminhoGaleria = `images/tela-galeria/FOTOS COM LUPA/${nome}`;
  const caminhoPopup = `images/tela-galeria/FOTOS/${gerarNomePopup(nome)}`;

  imagemPrincipal.src = caminhoGaleria;
  imagemZoom.src = caminhoPopup;
}
carregarImagemInicial();

// ========== POPUP ==========
const popupZoom = document.getElementById("popupZoom");
const popupOverlay = document.querySelector(".popup-overlay");
const popupContent = document.querySelector(".popup-content");

imagemPrincipal.addEventListener("click", () => {
  if (!wasDragged) {
    const nome = nomesDasImagens[indexAtual];
    const timestamp = Date.now();
    imagemZoom.src = `./images/tela-galeria/FOTOS/${gerarNomePopup(nome)}?v=${timestamp}`;

    popupZoom.style.display = "flex";
    setTimeout(() => {
      popupOverlay.style.opacity = 1;
    }, 10);
  }
});



// Fechar popup ao clicar fora da imagem
popupOverlay.addEventListener("click", (event) => {
  if (!popupContent.contains(event.target)) {
    fecharPopup();
  }
});

function fecharPopup() {
  popupOverlay.style.opacity = 0;
  setTimeout(() => {
    popupZoom.style.display = "none";
  }, 500);
}

// ========== VÍDEO ==========
document.addEventListener("DOMContentLoaded", () => {
  const btnFilme = document.getElementById("btnFilme");
  const popupVideo = document.getElementById("popupVideo");
  const fecharPopupVideo = document.getElementById("fecharPopupVideo");
  const youtubeFrame = document.getElementById("youtubeFrame");

  const youtubeLink = ""; //embed

  if (btnFilme && popupVideo && fecharPopupVideo && youtubeFrame) {
    btnFilme.addEventListener("click", () => {
      youtubeFrame.src = youtubeLink;
      popupVideo.style.display = "flex";
      setTimeout(() => {
        popupVideo.style.opacity = 1;
      }, 10);
    });

    fecharPopupVideo.addEventListener("click", () => {
      popupVideo.style.opacity = 0;
      youtubeFrame.src = "";
      setTimeout(() => {
        popupVideo.style.display = "none";
      }, 300);
    });
  } else {
    console.error("❌ Algum dos elementos do popup do vídeo não foi encontrado!");
  }
});


const btnFecharVideo = document.getElementById("btnFecharVideo");

btnFecharVideo?.addEventListener("click", () => {
  popupVideo.style.opacity = 0;
  youtubeFrame.src = "";
  setTimeout(() => {
    popupVideo.style.display = "none";
    popupVideo.classList.remove("ativo");
  }, 500);
});


const btnProjeto = document.getElementById("btnProjeto");
const projetoImplantacaoTela = document.getElementById("projeto-implantacao");

btnProjeto.addEventListener("click", () => {
  menuTela.style.animation = "slideOut 0.8s forwards";

  setTimeout(() => {
    menuTela.style.display = "none";

    // Reseta a posição para iniciar fora da tela à direita
    projetoImplantacaoTela.style.transform = "translateX(100%)";
    projetoImplantacaoTela.style.display = "block";

    // Aplica animações de entrada
    projetoImplantacaoTela.style.animation = "fadeIn 0.2s ease-out, slideIn 0.8s forwards";
    projetoImplantacaoTela.classList.add("ativo");

    // Ação para o fade do bloco branco
    const blocoBranco = document.getElementById("blocoBrancoImplantacao");
    if (blocoBranco) {
      blocoBranco.classList.remove("ativo");
      void blocoBranco.offsetWidth; // força reflow
      blocoBranco.classList.add("ativo");
    }
  }, 500);
});




// ========== SWIPE NA GALERIA ==========
let startX = 0;
let isDragging = false;

imagemPrincipal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

imagemPrincipal.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  // opcional: efeito visual enquanto arrasta (não muda a imagem ainda)
  imagemPrincipal.style.transform = `translateX(${diff}px)`;
  imagemPrincipal.style.transition = 'none';
});

imagemPrincipal.addEventListener("touchend", (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  imagemPrincipal.style.transition = 'transform 0.2s ease';
  imagemPrincipal.style.transform = 'translateX(0)';

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      trocarImagem("next"); // arrastou pra esquerda
    } else {
      trocarImagem("prev"); // arrastou pra direita
    }
  }
});



let currentX = 0;
function startDrag(x) {
  startX = x;
  currentX = x;
  isDragging = true;
  wasDragged = false;
  imagemPrincipal.style.transition = 'none';
}

function drag(x) {
  if (!isDragging) return;
  wasDragged = true;
  currentX = x;
  const diff = currentX - startX;
  imagemPrincipal.style.transform = `translateX(${diff}px)`;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  const diff = currentX - startX;
  imagemPrincipal.style.transition = 'transform 0.3s ease';
  imagemPrincipal.style.transform = 'translateX(0)';

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      trocarImagem("next");
    } else {
      trocarImagem("prev");
    }
  }

  // Reset
  startX = 0;
  currentX = 0;
}


// TOUCH EVENTS
imagemPrincipal.addEventListener("touchstart", (e) => {
  startDrag(e.touches[0].clientX);
});

imagemPrincipal.addEventListener("touchmove", (e) => {
  drag(e.touches[0].clientX);
});

imagemPrincipal.addEventListener("touchend", () => {
  endDrag();
});

// MOUSE EVENTS
imagemPrincipal.addEventListener("mousedown", (e) => {
  e.preventDefault(); // previne seleção de imagem ou texto
  startDrag(e.clientX);

  // Adiciona listeners apenas durante o drag
  const onMouseMove = (e) => drag(e.clientX);
  const onMouseUp = () => {
    endDrag();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

const btnFecharProjetoDiferenciais = document.getElementById("btnFecharProjetoDiferenciais");
const projetoDiferenciaisTela = document.getElementById("projeto-diferenciais");

btnFecharProjetoDiferenciais.addEventListener("click", function () {
  // Aplica animação de saída (slide para a esquerda)
  projetoDiferenciaisTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(function () {
    // Oculta a tela do projeto-diferenciais e reseta o estado
    projetoDiferenciaisTela.style.display = "none";
    projetoDiferenciaisTela.style.animation = "";
    projetoDiferenciaisTela.classList.remove("ativo");

    // Retorna ao menu com animação de entrada da direita
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const iconeButtons = document.querySelectorAll('.icone-btn');

iconeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.querySelector("img").alt;

    let caminhoPopup;

    switch (nome) {
      case "pe-direito":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Living_04_Duplex_2_HR.jpg";
        break;
      case "cinema":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Cine_Open_HR.jpg";
        break;
      case "game-pub":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Game_Pub_HR.jpg";
        break;
      case "coworking":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Coworking_HR.jpg";
        break;
      case "sauna":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Sauna_HR.jpg";
        break;
      case "torre-unica":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Fachada_Noturna_HR.jpg";
        break;
      case "gourmet":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Gourmet_HR.jpg";
        break;
      case "design-e-personalidade":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Living_02_HR.jpg";
        break;
      case "lavanderia":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Lavanderia_HR.jpg";
        break;
      case "churrasqueira":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Churrasqueira_HR.jpg";
        break;
      case "bicicletario":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Bicicletario_HR.jpg";
        break;
      case "mercadinho":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Mercadinho_HR.jpg";
        break;

      default:
        caminhoPopup = "";
    }

    if (caminhoPopup) {
      imagemZoom.src = caminhoPopup;
      popupZoom.style.display = "flex";
      setTimeout(() => {
        popupOverlay.style.opacity = 1;
      }, 10);
    }
  });
});


const botoes = document.querySelectorAll('.botao-projeto');
const todasAsTelas = document.querySelectorAll('section[id^="projeto-"]');
const fadeDuration = 1000;

let viewerPanorama = null;

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const idBotao = botao.id;
    if (!idBotao) return;

    const nomeTela = idBotao
      .replace(/^btn/, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();

    const idTela = `projeto-${nomeTela}`;
    const novaTela = document.getElementById(idTela);

    if (!novaTela) {
      console.error(`Tela com ID "${idTela}" não encontrada.`);
      return;
    }

    // Oculta todas as telas
    todasAsTelas.forEach(tela => {
      tela.style.display = 'none';
      tela.classList.remove('ativo');
      if (tela.id === 'projeto-implantacao') {
        const blocoBranco = document.getElementById("blocoBrancoImplantacao");
        if (blocoBranco) {
          blocoBranco.classList.remove("ativo");
        }
      }
    });

    // Exibe a nova tela
    novaTela.style.display = 'block';
    novaTela.style.transform = 'none';
    novaTela.style.animation = 'none';
    novaTela.classList.add('ativo');

    const informacoes = novaTela.querySelector('.informacoes-container');

    if (informacoes) {
      informacoes.classList.remove('visivel'); // remove caso esteja vindo de outra tela
      void informacoes.offsetWidth; // força reflow para reiniciar a transição
      informacoes.classList.add('visivel');
    }

    const vistas = novaTela.querySelector('.projeto-vistas'); // ou novaTela diretamente, se ela for a tela

    if (idTela === 'projeto-vistas') {
      novaTela.classList.remove('ativo');
      void novaTela.offsetWidth;
      novaTela.classList.add('ativo');
    }

    // Atualiza o botão ativo
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // Se a tela for a de vistas, inicializa o panorama com leve atraso
    if (idTela === 'projeto-vistas') {
      setTimeout(() => {
        if (!viewerPanorama) {
          viewerPanorama = pannellum.viewer('panorama360', {
            type: 'equirectangular',
            panorama: 'images/tela-projeto/vistas/vistas/1.jpg',
            autoLoad: true,
            showControls: false,
            compass: false,
            hfov: 120,
            yaw: 90
          });
        } else {
          viewerPanorama.resize(); // caso a div mude de tamanho ou reabra
        }
      }, 50); // pequeno delay para garantir que o layout foi renderizado
    }

    if (idTela === 'projeto-implantacao') {
      novaTela.classList.remove('ativo');
      void novaTela.offsetWidth;
      novaTela.classList.add('ativo');

      const blocoBranco = document.getElementById("blocoBrancoImplantacao");
      if (blocoBranco) {
        blocoBranco.classList.remove("ativo");
        void blocoBranco.offsetWidth; // força reflow
        blocoBranco.classList.add("ativo");
      }
    }
  });
});


const btnFecharProjetoFichaTecnica = document.getElementById("btnFecharProjetoFichaTecnica");
const projetoFichaTecnicaTela = document.getElementById("projeto-ficha-tecnica");

btnFecharProjetoFichaTecnica.addEventListener("click", function () {
  // Aplica animação de saída (slide para a esquerda)
  projetoFichaTecnicaTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(function () {
    // Oculta a tela do projeto-diferenciais e reseta o estado
    projetoFichaTecnicaTela.style.display = "none";
    projetoFichaTecnicaTela.style.animation = "";
    projetoFichaTecnicaTela.classList.remove("ativo");

    // Retorna ao menu com animação de entrada da direita
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});


const btnFecharProjetoImplantacao = document.getElementById("btnFecharProjetoImplantacao");

btnFecharProjetoImplantacao.addEventListener("click", function () {
  // Aplica animação de saída (slide para a esquerda)
  projetoImplantacaoTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(function () {
    // Oculta a tela do projeto-diferenciais e reseta o estado
    projetoImplantacaoTela.style.display = "none";
    projetoImplantacaoTela.style.animation = "";
    projetoImplantacaoTela.classList.remove("ativo");

    // Retorna ao menu com animação de entrada da direita
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const cabecalhoImagem = document.getElementById('cabecalhoImagem');
const textoImagem = document.getElementById('textoImagem');
const botoesCabecalho = document.querySelectorAll('.cabecalho-area');

botoesCabecalho.forEach(botao => {
  botao.addEventListener('click', () => {
    const tipo = botao.dataset.cabecalho;

    cabecalhoImagem.src = `images/tela-projeto/ficha-tecnica/${tipo}/cabecalho.png`;
    textoImagem.src = `images/tela-projeto/ficha-tecnica/${tipo}/texto.png`;
  });
});


const btnFecharVistas = document.getElementById("btnFecharVistas");
const projetoVistasTela = document.getElementById("projeto-vistas");

btnFecharVistas.addEventListener("click", () => {
  // Aplica a animação de saída (slide para a esquerda)
  projetoVistasTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(() => {
    // Oculta a tela de Vistas e reseta o estado
    projetoVistasTela.style.display = "none";
    projetoVistasTela.style.animation = "";
    projetoVistasTela.classList.remove("ativo");

    // Exibe o menu com animação de entrada
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const botoesVistas = document.querySelectorAll('.botao-vistas');
botoesVistas.forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.getAttribute('data-id');
    const novaImagem = `images/tela-projeto/vistas/vistas/${id}.jpg`;

    if (viewerPanorama && typeof viewerPanorama.setPanorama === 'function') {
      viewerPanorama.setPanorama(novaImagem);
    } else {
      // Caso o viewer ainda não exista (fallback)
      viewerPanorama = pannellum.viewer('panorama360', {
        type: 'equirectangular',
        panorama: novaImagem,
        autoLoad: true,
        showControls: false,
        compass: false,
        hfov: 120,
        yaw: 90
      });
    }
  });
});

botoesVistas.forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.getAttribute('data-id');

    // Resetar todos os botões
    botoesVistas.forEach(b => {
      const bid = b.getAttribute('data-id');
      b.src = `images/tela-projeto/vistas/botoes/normais/${String(bid).padStart(2, '0')}.png`;
      b.classList.remove('botao-vistas-selecionado');
    });

    // Atualizar botão selecionado
    botao.src = `images/tela-projeto/vistas/botoes/selecionados/${String(id).padStart(2, '0')}.png`;
    botao.classList.add('botao-vistas-selecionado');
  });
});

// Seleciona o botão 1 como padrão ao carregar
window.addEventListener('DOMContentLoaded', () => {
  const botaoInicial = document.querySelector('.botao-vistas[data-id="1"]');
  if (botaoInicial) {
    botaoInicial.click(); // Simula o clique no botão 1
  }
});

function atualizarDirecaoMapa() {
  if (!viewerPanorama) return;

  const yaw = viewerPanorama.getYaw();
  const angulo = (yaw + 360) % 360;

  let direcao = "";

  if (angulo >= 45 && angulo < 135) {
    direcao = "norte";
  } else if (angulo >= 135 && angulo < 225) {
    direcao = "leste";
  } else if (angulo >= 225 && angulo < 315) {
    direcao = "sul";
  } else {
    direcao = "oeste";
  }


  const imgMapa = document.getElementById("mapaDirecoes");
  imgMapa.src = `images/tela-projeto/vistas/lados/${direcao}.png`;
}

// Atualiza constantemente a direção (a cada 500ms)
setInterval(atualizarDirecaoMapa, 500);

const btnLocalizacao = document.getElementById("btnLocalizacao");
const localizacaoTela = document.getElementById("localizacao-panoramica");
const localizacaoMapaTela = document.getElementById("localizacao-mapa");
const localizacaoGuiaTela = document.getElementById("localizacao-guia");
const btnFecharLocalizacao = document.getElementById("btnFecharLocalizacao");
const btnFecharLocalizacaoMapa = document.getElementById("btnFecharLocalizacaoMapa");
const btnFecharLocalizacaoGuia = document.getElementById("btnFecharLocalizacaoGuia");

let viewerLocalizacao = null;

btnLocalizacao.addEventListener("click", () => {
  menuTela.style.animation = "slideOut 0.8s forwards";

  setTimeout(() => {
    menuTela.style.display = "none";
    localizacaoTela.style.display = "block";
    localizacaoTela.style.animation = "slideIn 0.8s forwards";
    localizacaoTela.classList.add("ativo");

    // Inicializa panorâmica
    if (!viewerLocalizacao) {
      viewerLocalizacao = pannellum.viewer('panoramaLocalizacao', {
        type: "equirectangular",
        panorama: "panoramica-lixo.jpg",
        autoLoad: true,
        showControls: false,
        compass: false,
        yaw: 90,
        hfov: 110
      });
    } else {
      viewerLocalizacao.resize();
    }
  }, 500);
});

btnFecharLocalizacao.addEventListener("click", () => {
  localizacaoTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(() => {
    localizacaoTela.style.display = "none";
    localizacaoTela.classList.remove("ativo");
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

btnFecharLocalizacaoMapa.addEventListener("click", () => {
  localizacaoMapaTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(() => {
    localizacaoMapaTela.style.display = "none";
    localizacaoMapaTela.classList.remove("ativo");
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

btnFecharLocalizacaoGuia.addEventListener("click", () => {
  localizacaoGuiaTela.style.animation = "slideOutLeft 0.5s forwards";

  setTimeout(() => {
    localizacaoGuiaTela.style.display = "none";
    localizacaoGuiaTela.classList.remove("ativo");
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const botoesLocalizacao = document.querySelectorAll('.botao-localizacao');

botoesLocalizacao.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove a seleção de todos os botões
    botoesLocalizacao.forEach(b => {
      b.classList.remove('botao-localizacao-selecionado');
    });

    // Adiciona a classe apenas no botão clicado
    botao.classList.add('botao-localizacao-selecionado');
  });
});

const todasAsTelasLocalizacao = document.querySelectorAll('section[id^="localizacao-"]');
let timeoutsGuia = []; // armazena os timeouts para cancelamento posterior

botoesLocalizacao.forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.id;

    let idTela = "";

    switch (id) {
      case "btnPanoramicaLocalizacao":
      case "btnPanoramicaLocalizacaoMapa":
        idTela = "localizacao-panoramica";
        break;
      case "btnMapaLocalizacao":
      case "btnMapaLocalizacaoMapa":
        idTela = "localizacao-mapa";
        break;
      case "btnGuiaLocalizacao":
      case "btnGuiaLocalizacaoMapa":
        idTela = "localizacao-guia";
        break;
      default:
        console.error("❌ ID de botão não reconhecido:", id);
        return;
    }

    const novaTela = document.getElementById(idTela);
    if (!novaTela) {
      console.error(`❌ Tela com ID "${idTela}" não encontrada.`);
      return;
    }

    // Oculta todas as telas
    todasAsTelasLocalizacao.forEach(tela => {
      tela.style.display = "none";
      tela.classList.remove("ativo");
    });

    // Exibe a nova
    novaTela.style.display = "block";
    novaTela.style.transform = "none";
    novaTela.style.animation = "none";
    novaTela.classList.add("ativo");

    // === Animação dos cards do GUIA ===
    if (idTela == "localizacao-guia") {
      // Cancela animações anteriores
      timeoutsGuia.forEach(timeout => clearTimeout(timeout));
      timeoutsGuia = [];

      const cardsGuia = document.querySelectorAll('#localizacao-guia .card-arrastavel');

      cardsGuia.forEach(card => {
        card.style.bottom = '-25vh'; // posição inicial
        card.classList.remove('visivel');
        card.classList.remove('aberto');
      });

      cardsGuia.forEach((card, index) => {
        const timeout = setTimeout(() => {
          card.classList.add('visivel');
        }, 600 * index); // controle da velocidade entre cards
        timeoutsGuia.push(timeout);
      });
    }

    if (idTela == "localizacao-mapa") {

      const mapaBase = document.getElementById("mapaBase");

      // Configurações
      const zoomInicial = 1; // quanto você quer dar de zoom
      const offsetX = 0; // ajuste horizontal (px)
      const offsetY = 0; // ajuste vertical (px)

      mapaBase.style.transform = `scale(${zoomInicial}) translate(${offsetX}px, ${offsetY}px)`;

      centralizarImagem();
    }
    // Atualiza botões
    botoesLocalizacao.forEach(b => b.classList.remove("botao-localizacao-selecionado"));
    botao.classList.add("botao-localizacao-selecionado");
  });
});


/////////////

const cards = document.querySelectorAll(".card-arrastavel");

cards.forEach(card => {
  const closedPos = -25;  // posição fechada (enterrado)
  const openPos = -1;     // posição aberta
  const threshold = 5;    // limiar para abrir/fechar
  let initialBottom = closedPos;

  let startY = 0;
  let isDragging = false;

  // Atualiza o bottom em vh
  function setCardBottom(vh) {
    card.style.bottom = `${vh}vh`;
  }

  // Converte px para vh
  function pxToVH(px) {
    return (px / window.innerHeight) * 100;
  }

  // --------- Mouse ---------
  card.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    startY = e.clientY;
    card.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaPx = startY - e.clientY;
    const deltaVH = pxToVH(deltaPx);
    let newBottom = initialBottom + deltaVH;
    newBottom = Math.min(openPos, Math.max(closedPos, newBottom));
    setCardBottom(newBottom);
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = "bottom 0.3s ease";
    const currentBottom = parseFloat(card.style.bottom);
    if (currentBottom > closedPos + threshold) {
      setCardBottom(openPos);
      initialBottom = openPos;
    } else {
      setCardBottom(closedPos);
      initialBottom = closedPos;
    }
  });

  // --------- Touch ---------
  card.addEventListener("touchstart", (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    card.style.transition = "none";
  });

  card.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaPx = startY - e.touches[0].clientY;
    const deltaVH = pxToVH(deltaPx);
    let newBottom = initialBottom + deltaVH;
    newBottom = Math.min(openPos, Math.max(closedPos, newBottom));
    setCardBottom(newBottom);
  });

  card.addEventListener("touchend", () => {
    isDragging = false;
    card.style.transition = "bottom 0.3s ease";
    const currentBottom = parseFloat(card.style.bottom);
    if (currentBottom > closedPos + threshold) {
      setCardBottom(openPos);
      initialBottom = openPos;
    } else {
      setCardBottom(closedPos);
      initialBottom = closedPos;
    }
  });

  // Define estado inicial do card
  setCardBottom(closedPos);
});


//

//

//


const mapaContainer = document.getElementById("mapaZoomContainer");
const mapaBase = document.getElementById("mapaBase");

let scale = 1;
let translateX = 0;
let translateY = 0;
let startY = 0;
let isDraggingMap = false;

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

function updateTransform() {
  // Aplicamos primeiro o translate e depois o scale.
  mapaContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function limitPan() {
  const wrapper = document.querySelector(".localizacao-mapa-wrapper");
  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;

  // tamanho base da imagem (sem scale), já que ela tem width 100%
  const baseWidth = mapaBase.offsetWidth;
  const baseHeight = mapaBase.offsetHeight;

  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  const minTranslateX = Math.min(0, wrapperWidth - scaledWidth);
  const maxTranslateX = 0;

  const minTranslateY = Math.min(0, wrapperHeight - scaledHeight);
  const maxTranslateY = 0;

  translateX = clamp(translateX, minTranslateX, maxTranslateX);
  translateY = clamp(translateY, minTranslateY, maxTranslateY);
}


function centralizarImagem() {
  const wrapper = document.querySelector(".localizacao-mapa-wrapper");

  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;

  const baseWidth = mapaBase.offsetWidth;
  const baseHeight = mapaBase.offsetHeight;

  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  translateX = (wrapperWidth - scaledWidth) / 2;
  translateY = (wrapperHeight - scaledHeight) / 2;

  limitPan();
  updateTransform();
}




// ZOOM COM RODA DO MOUSE (baseado no ponteiro)
mapaContainer.addEventListener("wheel", function (e) {
  e.preventDefault();

  const rect = mapaContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const prevScale = scale;
  // Ajuste a sensibilidade do zoom conforme necessário
  scale += e.deltaY * -0.0015;
  scale = clamp(scale, 1, 3);

  // Ajusta o translate para que o ponto do mouse permaneça fixo durante o zoom.
  const zoomFactor = scale / prevScale;
  translateX = (translateX - offsetX) * zoomFactor + offsetX;
  translateY = (translateY - offsetY) * zoomFactor + offsetY;

  limitPan();
  updateTransform();
}, { passive: false });

// ARRASTE COM MOUSE
mapaContainer.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDraggingMap = true;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDraggingMap) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  startX = e.clientX;
  startY = e.clientY;

  translateX += dx;
  translateY += dy;
  limitPan();
  updateTransform();
});

document.addEventListener("mouseup", () => {
  isDraggingMap = false;
});

// TOUCH / PINCH ZOOM
let pinchStartDistance = 0;
let lastScale = scale;

mapaContainer.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    pinchStartDistance = getDistance(e.touches[0], e.touches[1]);
    lastScale = scale;
  } else if (e.touches.length === 1) {
    isDraggingMap = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
});

mapaContainer.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const newDist = getDistance(e.touches[0], e.touches[1]);
    scale = clamp(lastScale * (newDist / pinchStartDistance), 1, 3);
    limitPan();
    updateTransform();
  } else if (e.touches.length === 1 && isDraggingMap) {
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    translateX += dx;
    translateY += dy;
    limitPan();
    updateTransform();
  }
});

mapaContainer.addEventListener("touchend", () => {
  isDraggingMap = false;
});

function getDistance(touch1, touch2) {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

const btnRealizacao = document.getElementById("btnRealizacao");
const telaVilaPrudente = document.getElementById("tela-vip-vila-prudente");
const telaChaincorp = document.getElementById("tela-chaincorp");
const btnFecharChaincorp = document.getElementById("btnFecharChaincorp");

btnRealizacao.addEventListener("click", () => {
  menuTela.style.animation = "slideOut 0.8s forwards";
  setTimeout(() => {
    menuTela.style.display = "none";
    telaVilaPrudente.style.display = "block";
    telaVilaPrudente.style.animation = "fadeIn 0.3s ease-out, slideIn 0.8s forwards";
    telaVilaPrudente.classList.add("ativo");
  }, 500);
});

btnFecharChaincorp.addEventListener("click", () => {
  telaChaincorp.style.animation = "slideOutLeft 0.5s forwards";
  setTimeout(() => {
    telaChaincorp.style.display = "none";
    telaChaincorp.classList.remove("ativo");

    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});


const telaVip = document.getElementById("tela-vip-vila-prudente");

const btnChaincorpToVip = document.getElementById("btnChaincorp2");
const btnVipToChaincorp = document.getElementById("btnVipChaincorp");

const btnFecharVip = document.getElementById("btnFecharVip");


// Vai da Chaincorp para a tela VIP
btnChaincorpToVip.addEventListener("click", () => {
  // Esconde a VIP
  telaChaincorp.style.display = "none";
  telaChaincorp.classList.remove("ativo");

  // Mostra a Chaincorp
  telaVip.style.display = "block";
  telaVip.classList.add("ativo");

  // Zera qualquer animação/resquício
  telaVip.style.animation = "none";
  telaVip.style.opacity = "1";

  const conteudoVip = document.querySelector(".conteudo-vip");
  conteudoVip.style.animation = "none";
  conteudoVip.style.opacity = "1";
});

// Volta da VIP para a tela Chaincorp
btnVipToChaincorp.addEventListener("click", () => {
  // Esconde a VIP
  telaVip.style.display = "none";
  telaVip.classList.remove("ativo");

  // Mostra a Chaincorp
  telaChaincorp.style.display = "block";
  telaChaincorp.classList.add("ativo");

  // Zera qualquer animação/resquício
  telaChaincorp.style.animation = "none";
  telaChaincorp.style.opacity = "1";

  const conteudoChaincorp = document.querySelector(".conteudo-chaincorp");
  conteudoChaincorp.style.animation = "none";
  conteudoChaincorp.style.opacity = "1";
});

// Fechar tela VIP e voltar para o menu
btnFecharVip.addEventListener("click", () => {
  telaVip.style.animation = "slideOutLeft 0.5s forwards";
  setTimeout(() => {
    telaVip.style.display = "none";
    telaVip.classList.remove("ativo");

    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

// Fechar tela Chaincorp e voltar para o menu
btnFecharChaincorp.addEventListener("click", () => {
  telaChaincorp.style.animation = "slideOutLeft 0.5s forwards";
  setTimeout(() => {
    telaChaincorp.style.display = "none";
    telaChaincorp.classList.remove("ativo");

    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const plantas = [
  "images/tela-projeto/implantacao/rooftop/com-lupa.png",
  "images/tela-projeto/implantacao/15/com-lupa.png",
  "images/tela-projeto/implantacao/14/com-lupa.png",
  "images/tela-projeto/implantacao/terreo/com-lupa.png"
];

const textos = [
  "images/tela-projeto/implantacao/rooftop/rooftop.png",
  "images/tela-projeto/implantacao/15/pavimento-15.png",
  "images/tela-projeto/implantacao/14/pavimento-14.png",
  "images/tela-projeto/implantacao/terreo/terreo.png"
];

let index = 0;

const imagemPlanta = document.getElementById("imagemPlanta");
const imagemTexto = document.getElementById("imagemTexto");
// Seleciona a imagem do bloco branco dentro do container
const blocoBrancoImg = document.querySelector("#blocoBrancoImplantacao .bloco-branco-img");

function atualizarImagens() {
  // Aplica fade-out nas imagens da planta e do texto
  imagemPlanta.classList.add("fade-out");
  imagemTexto.classList.add("fade-out");

  setTimeout(() => {
    // Atualiza as imagens de planta e texto
    imagemPlanta.src = plantas[index];
    imagemTexto.src = textos[index];

    // Atualiza a imagem do bloco branco conforme o índice:
    // Índices 0 e 2 (rooftop e pavimento 14) → imagem A;
    // Índices 1 e 3 (pavimento 15 e térreo) → imagem B.
    if (blocoBrancoImg) {
      if (index === 0 || index === 2) {
        blocoBrancoImg.src = "images/tela-projeto/implantacao/retangulo-branco-1.png";
      } else {
        blocoBrancoImg.src = "images/tela-projeto/implantacao/retangulo-branco-2.png";
      }
    }

    // Ao carregar a nova imagem, remove a classe de fade para disparar o efeito de fade-in
    imagemPlanta.onload = () => imagemPlanta.classList.remove("fade-out");
    imagemTexto.onload = () => imagemTexto.classList.remove("fade-out");
  }, 300); // tempo do fade-out
}

document.getElementById("setaDireita").addEventListener("click", () => {
  index = (index + 1) % plantas.length;
  atualizarImagens();
});

document.getElementById("setaEsquerda").addEventListener("click", () => {
  index = (index - 1 + plantas.length) % plantas.length;
  atualizarImagens();
});

let indexPopUp = 0;

// Array de imagens para cada índice
const popups = [
  "images/tela-projeto/implantacao/rooftop/sem-lupa.png",
  "images/tela-projeto/implantacao/15/sem-lupa.png",
  "images/tela-projeto/implantacao/14/sem-lupa.png",
  "images/tela-projeto/implantacao/terreo/sem-lupa.png"
];

const popupPlanta = document.getElementById("popupPlanta");
const popupPlantaImg = document.getElementById("popupPlantaImg");
const popupPlantaOverlay = document.getElementById("popupPlantaOverlay");

// Abre o popup com base no índice atual da planta
imagemPlanta.addEventListener("click", () => {
  popupPlantaImg.src = popups[index]; // usa o mesmo índice da planta atual
  popupPlanta.classList.add("mostrar");
});

popupPlantaOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    popupPlanta.classList.remove("mostrar");

    // Aguarda o tempo da animação para limpar a imagem (evita piscar)
    setTimeout(() => {
      popupPlantaImg.src = "";
    }, 400); // mesmo tempo da sua transição CSS
  }
});


