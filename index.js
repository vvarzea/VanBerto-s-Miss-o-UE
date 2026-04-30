/*************************************************
 * VanBerto's — A Missão Europa
 * Professora: Vanda Várzea
 *
 * Jogo educativo sobre a União Europeia
 * — do Tratado de Roma até aos nossos dias.
 *
 * Baseado na estrutura do VanBerto's Drummond.
 * 10 níveis · 3 opções por pergunta · Segunda tentativa
 *************************************************/

window.addEventListener("DOMContentLoaded", () => {

  // ===== DOM =====
  const startOverlay   = document.getElementById("startOverlay");
  const howOverlay     = document.getElementById("howOverlay");
  const quizOverlay    = document.getElementById("quizOverlay");
  const historyOverlay = document.getElementById("historyOverlay");
  const historyText    = document.getElementById("historyText");
  const btnHistory     = document.getElementById("btnHistory");
  const quizQuestion   = document.getElementById("quizQuestion");
  const quizAnswers    = document.getElementById("quizAnswers");
  const quizFeedback   = document.getElementById("quizFeedback");
  const quizExplanation= document.getElementById("quizExplanation");
  const btnCloseQuiz   = document.getElementById("btnCloseQuiz");
  const btnStart       = document.getElementById("btnStart");
  const btnHow         = document.getElementById("btnHow");
  const btnCloseHow    = document.getElementById("btnCloseHow");
  const btnMute        = document.getElementById("btnMute");
  const btnPause       = document.getElementById("btnPause");
  const btnRestart     = document.getElementById("btnRestartLevel");
  const btnRestartGame = document.getElementById("btnRestartGame");
  const btnPresent     = document.getElementById("btnPresent");
  const playerNameInput= document.getElementById("playerName");
  const gameOverOverlay= document.getElementById("gameOverOverlay");
  const winOverlay     = document.getElementById("winOverlay");

  const hitFlash   = document.createElement("div"); hitFlash.id = "hitFlash";   document.body.appendChild(hitFlash);
  const bonusStars = document.createElement("div"); bonusStars.id = "bonusStars"; document.body.appendChild(bonusStars);

  let playerName = "";
  let presentationMode = false;

  // ===== Áudio =====
  let audioCtx = null, muted = false, highContrast = false;

  function ensureAudio() {
    if (muted) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  function beep({ freq=440, dur=0.08, type="square", vol=0.06, slideTo=null }) {
    if (muted || !audioCtx) return;
    const t0 = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }

  const SFX = {
    jump()    { beep({ freq:520, dur:0.08, type:"square",   vol:0.06,  slideTo:660  }); },
    coin()    { beep({ freq:900, dur:0.06, type:"square",   vol:0.055, slideTo:1400 }); },
    hit()     { beep({ freq:220, dur:0.10, type:"sawtooth", vol:0.055, slideTo:160  }); setTimeout(() => beep({ freq:140, dur:0.14, type:"square", vol:0.05, slideTo:110 }), 120); },
    door()    { beep({ freq:660, dur:0.10, type:"triangle", vol:0.055, slideTo:990  }); },
    doorOpen() {
      // Trinco a destrancar
      beep({ freq:280, dur:0.07, type:"square",   vol:0.05,  slideTo:320 });
      setTimeout(() => beep({ freq:440, dur:0.09, type:"triangle", vol:0.055, slideTo:660  }), 90);
      // Porta a abrir — glissando suave a subir
      setTimeout(() => beep({ freq:523, dur:0.12, type:"triangle", vol:0.055, slideTo:784  }), 200);
      setTimeout(() => beep({ freq:784, dur:0.14, type:"triangle", vol:0.055, slideTo:1046 }), 340);
      setTimeout(() => beep({ freq:1046,dur:0.18, type:"triangle", vol:0.055, slideTo:1318 }), 490);
    },
    power()   { beep({ freq:330, dur:0.10, type:"square",   vol:0.055, slideTo:880  }); },
    life()    { beep({ freq:740, dur:0.07, type:"triangle", vol:0.055, slideTo:1040 }); },
    win() {
      beep({ freq:523, dur:0.07, type:"square", vol:0.055, slideTo:659 });
      setTimeout(() => beep({ freq:659, dur:0.07, type:"square", vol:0.055, slideTo:784  }), 90);
      setTimeout(() => beep({ freq:784, dur:0.10, type:"square", vol:0.055, slideTo:1046 }), 180);
    },
    gameOver() {
      [330,262,196].forEach((n,i) => setTimeout(() => beep({ freq:n, dur:0.18, type:"square", vol:0.055, slideTo:n*0.75 }), i*220));
    },
    finalWin() {
      [523,659,784,1046,988,784,1046,1318].forEach((n,i) => setTimeout(() =>
        beep({ freq:n, dur:i<3?0.08:0.10, type:"square", vol:0.055, slideTo:n*1.12 }), i*95));
      setTimeout(() => beep({ freq:1568, dur:0.14, type:"triangle", vol:0.055, slideTo:1760 }), 8*95+80);
    }
  };

  // ===== Guardar =====
  const SAVE_KEY = "vanbertos_missao_eu_v1";
  function saveGame() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ muted, highContrast, currentLevel, score, lives })); } catch {}
  }
  function loadGame() {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
      if (typeof d.muted === "boolean") muted = d.muted;
      if (typeof d.highContrast === "boolean") { highContrast = d.highContrast; document.body.classList.toggle("high-contrast", highContrast); }
    } catch {}
  }

  // ===== Elogios =====
  const PRAISE = ["🇪🇺 Excelente!", "⭐ Muito bem!", "📜 Boa resposta!", "🏛️ Fantástico!", "✨ Brilhante!", "🌍 Continua assim!"];
  function pickPraise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

  function showFloat(scene, x, y, msg, color="#5c3a1e") {
    const t = scene.add.text(x, y, msg, { fontSize:"24px", fontStyle:"900", color, stroke:"#fdf6e3", strokeThickness:5 }).setOrigin(0.5).setDepth(999);
    scene.tweens.add({ targets:t, y:y-44, alpha:0, duration:640, ease:"Sine.easeOut", onComplete:()=>t.destroy() });
  }

  // ===== Quiz stats =====
  const quizStats = { total:0, correct:0, everWrong:false, errors:[] };
  const usedQuizByLevel = {};
  let lastQuizTheme = "origens";

  function resetQuizStats() { quizStats.total=0; quizStats.correct=0; quizStats.everWrong=false; quizStats.errors=[]; }

  function pickQuizForLevel(levelIdx, theme) {
    const pool = QUIZ_BY_THEME[theme] || QUIZ_BY_THEME["nascimento"];
    if (!usedQuizByLevel[levelIdx]) usedQuizByLevel[levelIdx] = new Set();
    const used = usedQuizByLevel[levelIdx];
    if (used.size >= pool.length) used.clear();
    let pick = Math.floor(Math.random() * pool.length), g = 0;
    while (used.has(pick) && g < 50) { pick = Math.floor(Math.random() * pool.length); g++; }
    used.add(pick);
    return pool[pick];
  }

  // ===== "Sabias que…?" — 10 curiosidades sobre a União Europeia =====
  const HISTORY = [
    {
      title: "🕊️ As Origens — Nunca Mais a Guerra",
      text: "Após a Segunda Guerra Mundial (1939-1945), que matou milhões de europeus, os líderes do continente decidiram que era preciso unir a Europa para garantir a paz. Em 1950, o francês Robert Schuman propôs juntar a produção de carvão e aço da França e da Alemanha — matérias-primas essenciais para a guerra. Sem elas, fazer guerra seria muito mais difícil."
    },
    {
      title: "📜 O Tratado de Roma — 1957",
      text: "Em 25 de março de 1957, seis países — França, Alemanha Ocidental, Itália, Bélgica, Países Baixos e Luxemburgo — assinaram em Roma os Tratados que criaram a Comunidade Económica Europeia (CEE). O objetivo era criar um mercado comum, eliminando fronteiras económicas entre os países membros. Este é considerado o momento fundador da União Europeia."
    },
    {
      title: "🌍 O Alargamento — A Europa Cresce",
      text: "Em 1973, o Reino Unido, a Irlanda e a Dinamarca juntaram-se à CEE. Portugal e Espanha aderiram em 1986, após as suas transições para a democracia. A Grécia já tinha aderido em 1981. Com a queda do Muro de Berlim em 1989, abriu-se caminho para os países do Leste Europeu. Em 2004, dez novos países aderiram de uma vez — o maior alargamento da história da UE."
    },
    {
      title: "🏛️ As Instituições — Como Funciona a UE?",
      text: "A UE tem várias instituições principais: o Parlamento Europeu (eleito pelos cidadãos), o Conselho da UE (ministros dos governos nacionais), a Comissão Europeia (propõe as leis), o Tribunal de Justiça da UE e o Banco Central Europeu. O Parlamento Europeu reúne-se em Estrasburgo e em Bruxelas. Os cidadãos europeus votam de 5 em 5 anos para eleger os seus eurodeputados."
    },
    {
      title: "💶 O Euro — Uma Moeda Única",
      text: "Em 1 de janeiro de 1999, o euro nasceu como moeda eletrónica. Em 2002, as notas e moedas de euro entraram em circulação em 12 países, substituindo moedas nacionais como o escudo português, o franco francês e o marco alemão. Hoje, 20 dos 27 países da UE usam o euro. O Banco Central Europeu, sediado em Frankfurt, gere a política monetária da zona euro."
    },
    {
      title: "✈️ Schengen — Sem Fronteiras",
      text: "O Acordo de Schengen, assinado em 1985 na pequena cidade de Schengen, no Luxemburgo, criou um espaço de livre circulação de pessoas. Hoje, na zona Schengen, podes viajar entre 29 países europeus sem passaporte — apenas com o bilhete de identidade! Portugal faz parte deste espaço desde 1995. É uma das conquistas mais visíveis da integração europeia."
    },
    {
      title: "📋 O Tratado de Maastricht — 1992",
      text: "Em 7 de fevereiro de 1992, foi assinado o Tratado de Maastricht (Países Baixos), que transformou a CEE na União Europeia. Este tratado criou a cidadania europeia — o direito de qualquer cidadão da UE viver, trabalhar e votar em qualquer Estado-membro. Estabeleceu também os critérios para a criação do euro e reforçou a cooperação em política externa e segurança."
    },
    {
      title: "🏅 O Prémio Nobel da Paz — 2012",
      text: "Em outubro de 2012, a União Europeia recebeu o Prémio Nobel da Paz, atribuído pelo Comité Nobel Norueguês. A distinção reconheceu mais de seis décadas de contribuição da UE para a paz, a reconciliação, a democracia e os direitos humanos na Europa. O presidente do Parlamento Europeu, o presidente do Conselho e o presidente da Comissão receberam o prémio em Oslo."
    },
    {
      title: "🇬🇧 O Brexit — O Reino Unido Sai",
      text: "Em junho de 2016, o Reino Unido realizou um referendo sobre a permanência na UE. Com 51,9% dos votos, os britânicos decidiram sair — o chamado 'Brexit'. Após anos de negociações, o Reino Unido saiu formalmente da UE em 31 de janeiro de 2020, e do mercado único em 31 de dezembro de 2020. Foi a primeira vez na história que um país saiu da União Europeia."
    },
    {
      title: "🌟 O Futuro — Uma Europa Unida",
      text: "Hoje, a UE tem 27 países membros e mais de 440 milhões de cidadãos. Enfrenta desafios como as alterações climáticas, a segurança energética, a digitalização e a guerra na Ucrânia. O Pacto Ecológico Europeu (Green Deal) visa tornar a Europa neutra em carbono até 2050. Países como a Ucrânia, a Moldávia e vários países dos Balcãs candidatam-se a aderir à UE no futuro."
    },
    {
      title: "🌟 Os Símbolos da União Europeia",
      text: "A União Europeia tem símbolos que a representam em todo o mundo. A sua bandeira tem 12 estrelas douradas dispostas em círculo sobre fundo azul — o número 12 simboliza perfeição e unidade, e não representa o número de países membros. O hino europeu é a «Ode à Alegria», retirado da 9.ª Sinfonia de Beethoven e adaptado pelo maestro Herbert von Karajan; não tem letra para ser universal. O lema da UE é «Unida na Diversidade», escolhido por jovens europeus num concurso escolar em 2000."
    },
    {
      title: "🎓 O Programa Erasmus — Estudar na Europa",
      text: "Em 1987, a União Europeia lançou o programa Erasmus, que permite a estudantes universitários estudarem noutros países europeus. O nome homenageia o filósofo e humanista Erasmo de Roterdão (c. 1469–1536), natural dos Países Baixos. Desde a sua criação, mais de 12 milhões de jovens europeus participaram no programa. Hoje chama-se Erasmus+ e inclui também estágios profissionais, formação de professores e projetos de juventude."
    },
    {
      title: "📜 A Carta dos Direitos Fundamentais da UE",
      text: "Em dezembro de 2000, durante o Conselho Europeu de Nice (França), foi proclamada a Carta dos Direitos Fundamentais da União Europeia. Com 54 artigos organizados em 7 títulos — Dignidade, Liberdades, Igualdade, Solidariedade, Cidadania, Justiça e Disposições Gerais —, garantiu em texto único os direitos de todos os cidadãos europeus. Tornou-se juridicamente vinculativa (de cumprimento obrigatório) com o Tratado de Lisboa, em 2009."
    },
    {
      title: "💰 Os Fundos Europeus — Construir o Futuro",
      text: "Para reduzir as desigualdades entre regiões, a UE criou fundos estruturais que financiam projetos em toda a Europa. Os principais são o FEDER (Fundo Europeu de Desenvolvimento Regional), o FSE+ (Fundo Social Europeu) e o Fundo de Coesão. Portugal tem sido um dos maiores beneficiários: financiaram-se autoestradas, universidades, hospitais e redes de saneamento. O atual quadro de fundos em Portugal chama-se Portugal 2030 (PT2030)."
    },
    {
      title: "🏛️ O Tratado de Lisboa — 2007",
      text: "Em 13 de dezembro de 2007, os líderes europeus assinaram no histórico Mosteiro dos Jerónimos, em Lisboa, o tratado que reformou o funcionamento da União Europeia. Entrou em vigor a 1 de dezembro de 2009. Criou o cargo de Presidente permanente do Conselho Europeu — o primeiro foi o belga Herman Van Rompuy — e o de Alto Representante para os Negócios Estrangeiros. Tornou a Carta dos Direitos Fundamentais juridicamente vinculativa. Um orgulho para Portugal!"
    }
  ];

  let pausedByTeacher = false;

  function showHistory(levelIndex, onDone) {
    const entry = HISTORY[levelIndex] || null;
    if (!entry) { onDone?.(); return; }
    awaitingStory = true;
    historyText.innerHTML = `<strong class="history-title">${entry.title}</strong>\n${entry.text}`;
    historyOverlay.classList.remove("hidden");
    if (sceneRef) sceneRef.physics.pause();
    btnHistory.onclick = () => {
      historyOverlay.classList.add("hidden");
      awaitingStory = false;
      if (sceneRef && !pausedByTeacher && !awaitingQuiz && startOverlay.classList.contains("hidden"))
        sceneRef.physics.resume();
      onDone?.();
    };
  }

  // ===== Dicas =====
  const QUIZ_TIPS = {
    origens:      "A CEE foi criada em 1957 pelo Tratado de Roma, assinado por 6 países fundadores.",
    roma:         "O Tratado de Roma foi assinado a 25 de março de 1957 por França, Alemanha, Itália, Bélgica, Países Baixos e Luxemburgo.",
    alargamento:  "Portugal e Espanha aderiram à CEE em 1986. O maior alargamento foi em 2004, com 10 novos países.",
    instituicoes: "O Parlamento Europeu é eleito pelos cidadãos de 5 em 5 anos. A Comissão Europeia propõe as leis.",
    euro:         "O euro entrou em circulação em 2002 em 12 países. Hoje 20 dos 27 países da UE usam o euro.",
    schengen:     "O Acordo de Schengen foi assinado em 1985. Portugal faz parte do espaço Schengen desde 1995.",
    maastricht:   "O Tratado de Maastricht (1992) criou a cidadania europeia e deu o nome de 'União Europeia'.",
    nobel:        "A UE recebeu o Prémio Nobel da Paz em 2012 pelos seus 60 anos de promoção da paz na Europa.",
    brexit:       "Em junho de 2016, o Reino Unido votou 51,9% a favor de sair da UE. Saiu formalmente em 2020.",
    futuro:       "A UE tem hoje 27 membros e mais de 440 milhões de cidadãos. O Green Deal visa neutralidade carbónica até 2050.",
    simbolos:     "A bandeira da UE tem 12 estrelas douradas em círculo azul. O hino é a «Ode à Alegria» de Beethoven. O lema é «Unida na Diversidade».",
    erasmus:      "O programa Erasmus foi criado em 1987. Mais de 12 milhões de estudantes já participaram. O nome homenageia Erasmo de Roterdão, filósofo dos Países Baixos.",
    carta:        "A Carta dos Direitos Fundamentais foi proclamada em Nice em 2000 e tornou-se juridicamente vinculativa com o Tratado de Lisboa em 2009. Tem 54 artigos e 7 títulos.",
    fundos:       "Os principais fundos europeus são o FEDER, o FSE+ e o Fundo de Coesão. Portugal beneficia do PT2030 para financiar projetos de desenvolvimento até 2030.",
    lisboa:       "O Tratado de Lisboa foi assinado nos Jerónimos em 2007 e entrou em vigor em 2009. Criou o Presidente permanente do Conselho Europeu e tornou a Carta vinculativa."
  };

  // ===== Perguntas — 3 opções, 1 certa + explicação =====
  const QUIZ_BY_THEME = {
    origens: [
      { q:"Quem propôs em 1950 juntar o carvão e o aço europeus para garantir a paz?", a:[{t:"Robert Schuman",ok:true},{t:"Winston Churchill",ok:false},{t:"Konrad Adenauer",ok:false}], exp:"Robert Schuman, ministro dos Negócios Estrangeiros francês, fez a sua histórica declaração a 9 de maio de 1950 — dia que hoje celebramos como Dia da Europa." },
      { q:"Qual foi o principal objetivo da criação da CEE em 1957?", a:[{t:"Garantir a paz e a prosperidade na Europa",ok:true},{t:"Criar um exército europeu único",ok:false},{t:"Estabelecer uma língua europeia comum",ok:false}], exp:"Depois da Segunda Guerra Mundial, os fundadores queriam tornar outra grande guerra impossível, integrando as economias europeias." },
      { q:"Em que data se celebra o Dia da Europa?", a:[{t:"9 de maio",ok:true},{t:"25 de março",ok:false},{t:"1 de janeiro",ok:false}], exp:"O 9 de maio é o Dia da Europa, em memória da Declaração Schuman de 1950 que propôs a criação da CECA." },
      { q:"O que significam as letras CECA?", a:[{t:"Comunidade Europeia do Carvão e do Aço",ok:true},{t:"Comissão Europeia de Cooperação Agrícola",ok:false},{t:"Conselho Europeu de Comércio Avançado",ok:false}], exp:"A CECA foi criada em 1951 pelo Tratado de Paris e foi a primeira organização supranacional europeia." },
      { q:"Quais eram os 6 países fundadores da CEE em 1957?", a:[{t:"França, Alemanha, Itália, Bélgica, Países Baixos e Luxemburgo",ok:true},{t:"França, Reino Unido, Itália, Espanha, Portugal e Grécia",ok:false},{t:"França, Alemanha, Polónia, Áustria, Suíça e Dinamarca",ok:false}], exp:"Os seis países fundadores ficaram conhecidos como 'Os Seis'. O Reino Unido foi convidado mas recusou participar inicialmente." },
    ],
    roma: [
      { q:"Em que data foi assinado o Tratado de Roma?", a:[{t:"25 de março de 1957",ok:true},{t:"9 de maio de 1950",ok:false},{t:"1 de janeiro de 1958",ok:false}], exp:"O Tratado de Roma foi assinado a 25 de março de 1957, mas entrou em vigor a 1 de janeiro de 1958." },
      { q:"O que criou o Tratado de Roma em 1957?", a:[{t:"A Comunidade Económica Europeia (CEE)",ok:true},{t:"A União Europeia (UE)",ok:false},{t:"A zona euro",ok:false}], exp:"O Tratado de Roma criou a CEE (Mercado Comum) e a CEEA (energia atómica). Só em 1992 a CEE passou a chamar-se UE." },
      { q:"Em que cidade italiana foi assinado o famoso Tratado de 1957?", a:[{t:"Roma",ok:true},{t:"Milão",ok:false},{t:"Florença",ok:false}], exp:"O tratado foi assinado no Capitólio, em Roma, e por isso ficou conhecido como o 'Tratado de Roma'." },
      { q:"O que é o mercado comum criado pelo Tratado de Roma?", a:[{t:"Um espaço sem barreiras alfandegárias para bens, serviços, pessoas e capitais",ok:true},{t:"Uma moeda única para todos os países",ok:false},{t:"Um banco central europeu partilhado",ok:false}], exp:"O mercado comum (hoje chamado mercado único) é o coração da integração europeia — permite a livre circulação de tudo." },
    ],
    alargamento: [
      { q:"Em que ano Portugal aderiu à Comunidade Económica Europeia?", a:[{t:"1986",ok:true},{t:"1973",ok:false},{t:"1995",ok:false}], exp:"Portugal assinou o Tratado de Adesão a 12 de junho de 1985 e entrou na CEE a 1 de janeiro de 1986, juntamente com a Espanha." },
      { q:"Qual foi o maior alargamento da história da União Europeia?", a:[{t:"2004, com a adesão de 10 novos países",ok:true},{t:"1973, com a adesão de 3 países",ok:false},{t:"1995, com a adesão de 3 países",ok:false}], exp:"Em 2004 aderiram de uma vez: Polónia, República Checa, Hungria, Eslováquia, Eslovénia, Estónia, Letónia, Lituânia, Chipre e Malta." },
      { q:"Quantos países tem a União Europeia em 2026?", a:[{t:"27 países",ok:true},{t:"28 países",ok:false},{t:"25 países",ok:false}], exp:"Depois do Brexit (saída do Reino Unido em 2020), a UE ficou com 27 Estados-membros." },
      { q:"Qual foi o primeiro alargamento da CEE, em 1973?", a:[{t:"Reino Unido, Irlanda e Dinamarca",ok:true},{t:"Espanha, Portugal e Grécia",ok:false},{t:"Suécia, Finlândia e Áustria",ok:false}], exp:"Em 1973, o Reino Unido, a Irlanda e a Dinamarca tornaram-se membros da CEE, passando de 6 para 9 países." },
      { q:"Em que ano a Grécia aderiu à CEE?", a:[{t:"1981",ok:true},{t:"1986",ok:false},{t:"1973",ok:false}], exp:"A Grécia aderiu à CEE em 1981, após a queda da ditadura dos coronéis e a restauração da democracia em 1974." },
    ],
    instituicoes: [
      { q:"Qual é a instituição da UE eleita diretamente pelos cidadãos europeus?", a:[{t:"O Parlamento Europeu",ok:true},{t:"A Comissão Europeia",ok:false},{t:"O Conselho da UE",ok:false}], exp:"Os cidadãos da UE elegem os eurodeputados de 5 em 5 anos por sufrágio direto. Após as eleições de junho de 2024, o Parlamento tem 720 deputados." },
      { q:"Qual é a instituição da UE que propõe novas leis europeias?", a:[{t:"A Comissão Europeia",ok:true},{t:"O Tribunal de Justiça da UE",ok:false},{t:"O Parlamento Europeu",ok:false}], exp:"A Comissão Europeia tem o 'direito de iniciativa legislativa' — só ela pode propor formalmente novas leis europeias." },
      { q:"Onde se reúne habitualmente o Parlamento Europeu?", a:[{t:"Em Estrasburgo e em Bruxelas",ok:true},{t:"Apenas em Bruxelas",ok:false},{t:"Em Luxemburgo",ok:false}], exp:"O Parlamento tem sessões plenárias em Estrasburgo e comissões parlamentares em Bruxelas. O secretariado fica em Luxemburgo." },
      { q:"De quantos em quantos anos os cidadãos da UE elegem o Parlamento Europeu?", a:[{t:"De 5 em 5 anos",ok:true},{t:"De 4 em 4 anos",ok:false},{t:"De 2 em 2 anos",ok:false}], exp:"As eleições europeias realizam-se de 5 em 5 anos. As últimas foram em junho de 2024." },
    ],
    euro: [
      { q:"Em que ano entraram em circulação as notas e moedas de euro?", a:[{t:"2002",ok:true},{t:"1999",ok:false},{t:"2004",ok:false}], exp:"O euro como moeda eletrónica surgiu em 1999. As notas e moedas físicas entraram em circulação a 1 de janeiro de 2002." },
      { q:"Quantos países da UE usam o euro em 2026?", a:[{t:"20 países",ok:true},{t:"27 países",ok:false},{t:"15 países",ok:false}], exp:"Dos 27 membros da UE, 20 fazem parte da zona euro. Países como a Polónia, a Hungria e a Suécia mantêm as suas moedas nacionais." },
      { q:"Qual é o banco que gere o euro?", a:[{t:"Banco Central Europeu (BCE)",ok:true},{t:"Banco Europeu de Investimento",ok:false},{t:"Banco Mundial",ok:false}], exp:"O Banco Central Europeu, sediado em Frankfurt (Alemanha), define a política monetária da zona euro." },
      { q:"Que moeda portuguesa foi substituída pelo euro em 2002?", a:[{t:"O escudo",ok:true},{t:"A libra",ok:false},{t:"O real",ok:false}], exp:"O escudo foi a moeda de Portugal desde 1911. Em 2002 foi substituído pelo euro à taxa de 200,482 escudos por 1 euro." },
      { q:"Em que ano surgiu o euro como moeda eletrónica (sem notas nem moedas)?", a:[{t:"1999",ok:true},{t:"2002",ok:false},{t:"1997",ok:false}], exp:"A 1 de janeiro de 1999, o euro nasceu como moeda eletrónica. Durante 3 anos, as moedas nacionais coexistiram com o euro." },
    ],
    schengen: [
      { q:"Em que país foi assinado o Acordo de Schengen em 1985?", a:[{t:"Luxemburgo",ok:true},{t:"Bélgica",ok:false},{t:"França",ok:false}], exp:"Schengen é uma pequena cidade do Luxemburgo, junto à fronteira com a França e a Alemanha, onde o acordo foi assinado num barco." },
      { q:"O que permite o Espaço Schengen aos cidadãos europeus?", a:[{t:"Viajar entre países sem controlo nas fronteiras",ok:true},{t:"Trabalhar em qualquer país sem autorização",ok:false},{t:"Votar em qualquer eleição da UE",ok:false}], exp:"No espaço Schengen, podes atravessar as fronteiras entre países sem paragens — apenas com o bilhete de identidade." },
      { q:"Em que ano Portugal aderiu ao espaço Schengen?", a:[{t:"1995",ok:true},{t:"1986",ok:false},{t:"2002",ok:false}], exp:"Portugal faz parte do espaço Schengen desde 26 de março de 1995, quando as fronteiras físicas com Espanha foram eliminadas." },
      { q:"Quantos países fazem parte do espaço Schengen em 2026?", a:[{t:"29 países",ok:true},{t:"20 países",ok:false},{t:"15 países",ok:false}], exp:"O espaço Schengen tem 29 países: 25 membros da UE e 4 fora da UE (Noruega, Islândia, Suíça e Liechtenstein). A Croácia aderiu em 2023; a Bulgária e a Roménia juntaram-se em 2024/2025." },
    ],
    maastricht: [
      { q:"Em que ano foi assinado o Tratado de Maastricht?", a:[{t:"1992",ok:true},{t:"1986",ok:false},{t:"1999",ok:false}], exp:"O Tratado de Maastricht foi assinado a 7 de fevereiro de 1992 e entrou em vigor a 1 de novembro de 1993." },
      { q:"O que criou o Tratado de Maastricht além da União Europeia?", a:[{t:"A cidadania europeia",ok:true},{t:"O euro",ok:false},{t:"O espaço Schengen",ok:false}], exp:"Maastricht criou a cidadania da UE: qualquer cidadão de um Estado-membro é automaticamente cidadão europeu." },
      { q:"Em que país dos Países Baixos foi assinado o Tratado de Maastricht?", a:[{t:"Na cidade de Maastricht",ok:true},{t:"Em Amesterdão",ok:false},{t:"Em Roterdão",ok:false}], exp:"Maastricht é uma cidade histórica do sul dos Países Baixos, perto da fronteira com a Bélgica e a Alemanha." },
      { q:"O que permite a cidadania europeia criada em Maastricht?", a:[{t:"Viver, trabalhar e votar em qualquer Estado-membro da UE",ok:true},{t:"Ter passaporte europeu único",ok:false},{t:"Não pagar impostos noutros países da UE",ok:false}], exp:"A cidadania europeia dá o direito de circular, residir, trabalhar e votar nas eleições locais e europeias em qualquer país da UE." },
    ],
    nobel: [
      { q:"Em que ano recebeu a União Europeia o Prémio Nobel da Paz?", a:[{t:"2012",ok:true},{t:"2004",ok:false},{t:"2018",ok:false}], exp:"O Comité Nobel Norueguês atribuiu o Prémio Nobel da Paz à UE em outubro de 2012, reconhecendo décadas de promoção da paz." },
      { q:"Qual foi a razão dada para a UE receber o Nobel da Paz?", a:[{t:"Mais de 60 anos de paz, democracia e direitos humanos na Europa",ok:true},{t:"A criação do euro como moeda única",ok:false},{t:"O alargamento aos países do Leste Europeu",ok:false}], exp:"O Comité Nobel destacou a contribuição histórica da UE para transformar a Europa de um continente de guerras num continente de paz." },
      { q:"Onde se entrega o Prémio Nobel da Paz?", a:[{t:"Em Oslo, Noruega",ok:true},{t:"Em Estocolmo, Suécia",ok:false},{t:"Em Bruxelas, Bélgica",ok:false}], exp:"O Nobel da Paz é o único dos prémios Nobel entregue em Oslo — os restantes são entregues em Estocolmo." },
      { q:"Quem recebeu o Prémio Nobel em nome da UE em 2012?", a:[{t:"Os presidentes do Parlamento, do Conselho e da Comissão Europeia",ok:true},{t:"O Secretário-Geral da NATO",ok:false},{t:"O Presidente do Banco Central Europeu",ok:false}], exp:"Os três líderes das principais instituições da UE foram a Oslo receber o prémio em nome dos 500 milhões de cidadãos europeus." },
    ],
    brexit: [
      { q:"Em que ano o Reino Unido saiu formalmente da União Europeia?", a:[{t:"2020",ok:true},{t:"2016",ok:false},{t:"2019",ok:false}], exp:"O referendo foi em 2016, mas o Reino Unido só saiu formalmente da UE a 31 de janeiro de 2020, após anos de negociações." },
      { q:"Qual foi o resultado do referendo britânico sobre a saída da UE em 2016?", a:[{t:"51,9% a favor de sair",ok:true},{t:"60% a favor de sair",ok:false},{t:"48% a favor de sair",ok:false}], exp:"O resultado foi muito próximo: 51,9% votaram 'Leave' (sair) e 48,1% votaram 'Remain' (ficar)." },
      { q:"Como se chama a saída do Reino Unido da União Europeia?", a:[{t:"Brexit",ok:true},{t:"Britex",ok:false},{t:"Uexit",ok:false}], exp:"'Brexit' é uma junção de 'Britain' e 'exit' — a saída britânica. Tornou-se a palavra mais conhecida do vocabulário político europeu." },
      { q:"O Reino Unido foi o primeiro país a sair da União Europeia?", a:[{t:"Sim, foi o primeiro e único até hoje",ok:true},{t:"Não, a Noruega saiu antes",ok:false},{t:"Não, a Gronelândia saiu antes (mas não era país independente)",ok:false}], exp:"O Reino Unido é o primeiro Estado-membro soberano a sair da UE. A Gronelândia saiu em 1985, mas era território dinamarquês." },
    ],
    futuro: [
      { q:"Quantos países têm estatuto de candidato à UE em 2026?", a:[{t:"9 países candidatos",ok:true},{t:"3 países candidatos",ok:false},{t:"15 países candidatos",ok:false}], exp:"Em 2026, são candidatos: Ucrânia, Moldávia, Geórgia, Albânia, Macedónia do Norte, Montenegro, Sérvia, Bósnia-Herzegovina e Turquia (negociações suspensas)." },
      { q:"O que é o 'Green Deal' europeu?", a:[{t:"O plano da UE para ser neutra em carbono até 2050",ok:true},{t:"Um acordo comercial com países verdes",ok:false},{t:"Um fundo para plantar árvores na Europa",ok:false}], exp:"O Pacto Ecológico Europeu (Green Deal) é o plano mais ambicioso da história da UE para combater as alterações climáticas." },
      { q:"Qual é a população aproximada da União Europeia hoje?", a:[{t:"Mais de 440 milhões de pessoas",ok:true},{t:"Cerca de 200 milhões de pessoas",ok:false},{t:"Mais de 700 milhões de pessoas",ok:false}], exp:"A UE tem mais de 440 milhões de cidadãos nos seus 27 Estados-membros, tornando-a um dos maiores blocos económicos do mundo." },
      { q:"Em que ano a Ucrânia apresentou candidatura oficial à União Europeia?", a:[{t:"2022",ok:true},{t:"2014",ok:false},{t:"2019",ok:false}], exp:"A Ucrânia apresentou o seu pedido de adesão em fevereiro de 2022, poucos dias após a invasão russa. A candidatura foi aceite em junho de 2022." },
    ],
    simbolos: [
      { q:"Quantas estrelas tem a bandeira da União Europeia?", a:[{t:"12",ok:true},{t:"27",ok:false},{t:"15",ok:false}], exp:"O círculo de 12 estrelas douradas em fundo azul representa perfeição, unidade e solidariedade — o número nunca muda, independentemente do número de países membros." },
      { q:"Qual é o hino da União Europeia?", a:[{t:"A «Ode à Alegria», de Beethoven",ok:true},{t:"A «Marselhesa»",ok:false},{t:"O «Hino Europeu» de Mozart",ok:false}], exp:"A «Ode à Alegria», quarto andamento da 9.ª Sinfonia de Beethoven, foi adaptada pelo maestro Herbert von Karajan. Não tem letra — para ser universal e respeitar a diversidade linguística." },
      { q:"Qual é o lema da União Europeia?", a:[{t:"«Unida na Diversidade»",ok:true},{t:"«Liberdade, Igualdade, Fraternidade»",ok:false},{t:"«Uma Europa para Todos»",ok:false}], exp:"«Unida na Diversidade» foi escolhido por jovens europeus num concurso escolar em 2000. Celebra as diferentes culturas, línguas e tradições que coexistem na União Europeia." },
      { q:"O que representa o círculo de 12 estrelas na bandeira europeia?", a:[{t:"Unidade, solidariedade e harmonia entre os povos da Europa",ok:true},{t:"Os 12 países fundadores da UE",ok:false},{t:"Os 12 países que usam o euro",ok:false}], exp:"As estrelas representam os povos da Europa. O número 12 foi escolhido por simbolizar perfeição e completude — não representa o número de países membros." },
      { q:"Qual o compositor cuja obra é a base do hino europeu?", a:[{t:"Ludwig van Beethoven",ok:true},{t:"Wolfgang Amadeus Mozart",ok:false},{t:"Johann Sebastian Bach",ok:false}], exp:"A «Ode à Alegria» faz parte da 9.ª Sinfonia de Beethoven, composta em 1824. A UE usa apenas a versão instrumental — sem letra — para que todos os europeus se possam identificar com ela." },
    ],
    erasmus: [
      { q:"Em que ano foi lançado o programa Erasmus?", a:[{t:"1987",ok:true},{t:"1992",ok:false},{t:"1999",ok:false}], exp:"O Erasmus foi lançado em 1987. No primeiro ano, apenas 3.244 estudantes de 11 países participaram — um número muito pequeno comparado com os milhões de hoje." },
      { q:"Que filósofo e humanista dá nome ao programa Erasmus?", a:[{t:"Erasmo de Roterdão",ok:true},{t:"Aristóteles",ok:false},{t:"Thomas More",ok:false}], exp:"Erasmo de Roterdão (c.1469–1536) foi um filósofo e humanista dos Países Baixos, símbolo do pensamento crítico europeu e da importância da educação para a construção de uma sociedade melhor." },
      { q:"Quantos estudantes já participaram no Erasmus desde a sua criação?", a:[{t:"Mais de 12 milhões",ok:true},{t:"Cerca de 1 milhão",ok:false},{t:"Mais de 50 milhões",ok:false}], exp:"Desde 1987, mais de 12 milhões de jovens europeus estudaram ou fizeram estágios noutros países graças ao Erasmus, que se tornou o maior programa de mobilidade académica do mundo." },
      { q:"Além do intercâmbio universitário, o que mais inclui o Erasmus+?", a:[{t:"Formação profissional, projetos de juventude e formação de professores",ok:true},{t:"É exclusivo para estudantes universitários",ok:false},{t:"Financiamento de pesquisas militares",ok:false}], exp:"O Erasmus+ (lançado em 2014) é muito mais amplo: cobre o ensino superior, formação profissional, educação de adultos, desporto e projetos de juventude em toda a Europa." },
      { q:"De que país era natural Erasmo de Roterdão?", a:[{t:"Países Baixos (atual Holanda)",ok:true},{t:"Alemanha",ok:false},{t:"Bélgica",ok:false}], exp:"Erasmo nasceu em Roterdão, nos atuais Países Baixos, por volta de 1469. O seu nome completo era Desiderius Erasmus Roterodamus — «de Roterdão» —, sendo um símbolo do humanismo europeu." },
    ],
    carta: [
      { q:"Em que ano foi proclamada a Carta dos Direitos Fundamentais da UE?", a:[{t:"2000",ok:true},{t:"1992",ok:false},{t:"2009",ok:false}], exp:"A Carta foi solenemente proclamada em dezembro de 2000, durante o Conselho Europeu de Nice, em França, pelos presidentes do Parlamento, do Conselho e da Comissão Europeia." },
      { q:"Quando se tornou a Carta dos Direitos Fundamentais juridicamente vinculativa?", a:[{t:"Com o Tratado de Lisboa, em 2009",ok:true},{t:"Na sua proclamação, em 2000",ok:false},{t:"Com o Tratado de Maastricht, em 1992",ok:false}], exp:"Antes de 2009, a Carta era apenas uma declaração política. Com o Tratado de Lisboa, tornou-se lei de cumprimento obrigatório para as instituições da UE e os Estados-membros." },
      { q:"Quantos artigos tem a Carta dos Direitos Fundamentais da UE?", a:[{t:"54 artigos",ok:true},{t:"27 artigos",ok:false},{t:"100 artigos",ok:false}], exp:"A Carta tem 54 artigos organizados em 7 títulos: Dignidade, Liberdades, Igualdade, Solidariedade, Cidadania, Justiça e Disposições Gerais." },
      { q:"Onde foi proclamada a Carta dos Direitos Fundamentais em 2000?", a:[{t:"Em Nice, França",ok:true},{t:"Em Lisboa, Portugal",ok:false},{t:"Em Bruxelas, Bélgica",ok:false}], exp:"A Carta foi proclamada durante o Conselho Europeu de Nice, em dezembro de 2000. Nice é uma cidade histórica no sul de França, conhecida pela sua arquitetura e pela sua Baía dos Anjos." },
      { q:"Qual é o primeiro direito consagrado na Carta dos Direitos Fundamentais da UE?", a:[{t:"A dignidade humana",ok:true},{t:"A liberdade de expressão",ok:false},{t:"O direito ao voto",ok:false}], exp:"O artigo 1.º é claro: «A dignidade do ser humano é inviolável. Deve ser respeitada e protegida.» É o alicerce de todos os outros direitos fundamentais da União Europeia." },
    ],
    fundos: [
      { q:"O que significa a sigla FEDER?", a:[{t:"Fundo Europeu de Desenvolvimento Regional",ok:true},{t:"Fundo Especial de Desenvolvimento Económico Rural",ok:false},{t:"Federação Europeia de Desenvolvimento e Reconversão",ok:false}], exp:"O FEDER financia infraestruturas, investigação e inovação nas regiões europeias menos desenvolvidas, contribuindo para reduzir as disparidades económicas entre regiões." },
      { q:"Qual é o principal objetivo dos fundos de coesão da UE?", a:[{t:"Reduzir as desigualdades entre as regiões europeias",ok:true},{t:"Financiar o exército europeu",ok:false},{t:"Pagar as pensões dos cidadãos europeus",ok:false}], exp:"A política de coesão quer aproximar os níveis de desenvolvimento das diferentes regiões da UE, para que todos os cidadãos tenham oportunidades semelhantes de crescimento e bem-estar." },
      { q:"Como se chama o atual quadro de fundos europeus em Portugal?", a:[{t:"Portugal 2030 (PT2030)",ok:true},{t:"Portugal 2020",ok:false},{t:"Europa 2030",ok:false}], exp:"O PT2030 é o quadro de referência de Portugal para os fundos europeus até 2030. Sucedeu ao Portugal 2020, que terminou em 2023 e investiu mais de 25 mil milhões de euros em Portugal." },
      { q:"Qual dos fundos europeus é destinado principalmente ao emprego e à formação profissional?", a:[{t:"O Fundo Social Europeu (FSE+)",ok:true},{t:"O Fundo de Coesão",ok:false},{t:"O FEDER",ok:false}], exp:"O FSE+ (Fundo Social Europeu Reforçado) financia formação profissional, apoio ao emprego, inclusão social e modernização dos sistemas de educação em toda a União Europeia." },
      { q:"Que tipo de projetos os fundos europeus ajudaram a construir em Portugal desde 1986?", a:[{t:"Autoestradas, universidades, hospitais e redes de saneamento, entre muito mais",ok:true},{t:"Apenas instalações militares",ok:false},{t:"Somente apoios a grandes empresas",ok:false}], exp:"Os fundos europeus transformaram Portugal: modernizaram infraestruturas, apoiaram pequenas e médias empresas, melhoraram a educação e a qualidade de vida dos portugueses ao longo de quatro décadas." },
    ],
    lisboa: [
      { q:"Em que ano foi assinado o Tratado de Lisboa?", a:[{t:"2007",ok:true},{t:"2009",ok:false},{t:"2004",ok:false}], exp:"O Tratado de Lisboa foi assinado a 13 de dezembro de 2007, no histórico Mosteiro dos Jerónimos, em Lisboa — um dos monumentos mais icónicos de Portugal e da arquitetura manuelina." },
      { q:"Quando entrou em vigor o Tratado de Lisboa?", a:[{t:"1 de dezembro de 2009",ok:true},{t:"1 de janeiro de 2008",ok:false},{t:"25 de março de 2007",ok:false}], exp:"Apesar de assinado em 2007, o Tratado só entrou em vigor a 1 de dezembro de 2009, depois de ratificado por todos os 27 Estados-membros — incluindo a Irlanda, que precisou de um segundo referendo." },
      { q:"O que criou o Tratado de Lisboa que não existia antes?", a:[{t:"O cargo de Presidente permanente do Conselho Europeu",ok:true},{t:"O euro",ok:false},{t:"O espaço Schengen",ok:false}], exp:"Antes de Lisboa, a presidência do Conselho Europeu rodava entre os países de 6 em 6 meses. O Tratado criou um presidente eleito por 2,5 anos, renovável uma vez, para dar maior estabilidade à UE." },
      { q:"Qual foi o primeiro Presidente permanente do Conselho Europeu?", a:[{t:"Herman Van Rompuy",ok:true},{t:"José Manuel Barroso",ok:false},{t:"Tony Blair",ok:false}], exp:"Herman Van Rompuy, antigo Primeiro-Ministro da Bélgica, foi o primeiro Presidente permanente do Conselho Europeu, cargo que exerceu de dezembro de 2009 a novembro de 2014." },
      { q:"O que fez o Tratado de Lisboa em relação à Carta dos Direitos Fundamentais?", a:[{t:"Tornou-a juridicamente vinculativa (lei obrigatória)",ok:true},{t:"Criou a Carta dos Direitos Fundamentais",ok:false},{t:"Aboliu a Carta dos Direitos Fundamentais",ok:false}], exp:"Com o Tratado de Lisboa, a Carta dos Direitos Fundamentais — proclamada em 2000 mas sem força legal — passou a ser lei de cumprimento obrigatório para todos os Estados-membros da UE." },
    ],
  };


    // ===== TEMAS visuais (10 níveis — cores azul/dourado europeu) =====
  const THEMES = [
    { skyTop:0x87ceeb, skyBot:0xc8e6f0, ground:0x1a3070, accent:0xd4af37, doorTint:0x0d2050, hillColor:0x2a4a8a, grassTop:0x3a5a9a },
    { skyTop:0xfde68a, skyBot:0xfff3d0, ground:0x1a3070, accent:0xf0c040, doorTint:0x0d2050, hillColor:0x2a5a40, grassTop:0x3a6a50 },
    { skyTop:0xa8d8ea, skyBot:0xd4edf7, ground:0x0d2050, accent:0x5ab4d4, doorTint:0x1a3070, hillColor:0x1a4060, grassTop:0x2a5070 },
    { skyTop:0xfed7aa, skyBot:0xfff0e0, ground:0x1a3070, accent:0xd4af37, doorTint:0x0d2050, hillColor:0x3a5a30, grassTop:0x4a6a40 },
    { skyTop:0xb8e0ff, skyBot:0xdcf0ff, ground:0x0d1848, accent:0xd4af37, doorTint:0x1a3070, hillColor:0x1a3a6a, grassTop:0x2a4a7a },
    { skyTop:0xe8d5f5, skyBot:0xf3e8fa, ground:0x1a0a3a, accent:0xd4af37, doorTint:0x0d0828, hillColor:0x2a2a6a, grassTop:0x3a3a7a },
    { skyTop:0xfce4d6, skyBot:0xfff0e8, ground:0x1a3070, accent:0xd4af37, doorTint:0x0d2050, hillColor:0x4a3a20, grassTop:0x5a4a30 },
    { skyTop:0xc8e8ff, skyBot:0xe8f4ff, ground:0x0a1830, accent:0xd4af37, doorTint:0x1a3060, hillColor:0x1a3a5a, grassTop:0x2a4a6a },
    { skyTop:0xfdf0c0, skyBot:0xfdf8e0, ground:0x1a3070, accent:0xf5d060, doorTint:0x0d2050, hillColor:0x3a4a20, grassTop:0x4a5a30 },
    { skyTop:0x03103a, skyBot:0x0a1a4a, ground:0x010820, accent:0xd4af37, doorTint:0xd4af37, hillColor:0x0a1a3a, grassTop:0x1a2a4a },
    { skyTop:0x003399, skyBot:0x1a5fbf, ground:0x002266, accent:0xffcc00, doorTint:0xffcc00, hillColor:0x0a2a5a, grassTop:0x1a3a7a },
    { skyTop:0xff8c42, skyBot:0xffc068, ground:0x8b3500, accent:0xffd700, doorTint:0xff6500, hillColor:0x7a2a00, grassTop:0x9a4a10 },
    { skyTop:0x8b1a2a, skyBot:0xc0394b, ground:0x5a0a14, accent:0xffd700, doorTint:0x7a0a1a, hillColor:0x6a0a20, grassTop:0x8a1a30 },
    { skyTop:0x2d6a4f, skyBot:0x52b788, ground:0x1b4332, accent:0xd4af37, doorTint:0x1a5a2a, hillColor:0x1a4030, grassTop:0x2a5040 },
    { skyTop:0x0d1b4a, skyBot:0x1a2d6a, ground:0x050c1e, accent:0xd4af37, doorTint:0xd4af37, hillColor:0x0a1530, grassTop:0x1a2540 },
  ];

  // ===== Níveis (10) =====
  const LEVELS = [
    {
      name: "Nível 1 — As Origens da UE",
      theme:0, quizTheme:"origens", worldW:2600,
      spawn:{x:120,y:460}, doorX:2100,
      platforms:[
        {x:450,y:520,w:900,h:28},{x:1040,y:450,w:300,h:22},{x:1380,y:380,w:270,h:22},
        {x:1700,y:310,w:240,h:22},{x:2050,y:520,w:900,h:28}
      ],
      items:[{x:1040,y:400,kind:"tratado"},{x:1380,y:330,kind:"bandeira"},{x:1700,y:260,kind:"moeda"}],
      malwares:[{x:1240,y:480,vx:130},{x:1960,y:480,vx:-150}]
    },
    {
      name: "Nível 2 — O Tratado de Roma",
      theme:1, quizTheme:"roma", worldW:2800,
      spawn:{x:120,y:460}, doorX:2350,
      platforms:[
        {x:520,y:520,w:980,h:28},{x:900,y:450,w:240,h:22},{x:1180,y:380,w:240,h:22},
        {x:1460,y:310,w:240,h:22},{x:1740,y:380,w:240,h:22},{x:2020,y:450,w:240,h:22},
        {x:2380,y:520,w:980,h:28}
      ],
      items:[{x:900,y:400,kind:"bandeira"},{x:1460,y:260,kind:"medalha"},{x:2020,y:400,kind:"tratado"}],
      malwares:[{x:1320,y:480,vx:145},{x:2140,y:480,vx:-155}]
    },
    {
      name: "Nível 3 — O Alargamento",
      theme:2, quizTheme:"alargamento", worldW:2900,
      spawn:{x:120,y:460}, doorX:2500,
      platforms:[
        {x:520,y:520,w:1040,h:28},{x:840,y:460,w:240,h:22},{x:1180,y:390,w:240,h:22},
        {x:1520,y:320,w:240,h:22},{x:1860,y:390,w:240,h:22},{x:2200,y:460,w:240,h:22},
        {x:2480,y:520,w:1040,h:28}
      ],
      items:[{x:840,y:410,kind:"moeda"},{x:1520,y:270,kind:"bandeira"},{x:2200,y:410,kind:"tratado"}],
      malwares:[{x:1000,y:480,vx:150},{x:1700,y:480,vx:-160},{x:2350,y:480,vx:155}]
    },
    {
      name: "Nível 4 — As Instituições",
      theme:3, quizTheme:"instituicoes", worldW:3000,
      spawn:{x:120,y:460}, doorX:2600,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:860,y:455,w:230,h:22},{x:1160,y:385,w:230,h:22},
        {x:1460,y:315,w:230,h:22},{x:1760,y:385,w:230,h:22},{x:2060,y:455,w:230,h:22},
        {x:2360,y:385,w:230,h:22},{x:2640,y:520,w:1000,h:28}
      ],
      items:[{x:860,y:405,kind:"tratado"},{x:1460,y:265,kind:"medalha"},{x:2060,y:405,kind:"moeda"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1010,y:480,vx:160},{x:1610,y:480,vx:-165},{x:2210,y:480,vx:160}]
    },
    {
      name: "Nível 5 — O Euro",
      theme:4, quizTheme:"euro", worldW:3100,
      spawn:{x:120,y:460}, doorX:2700,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:880,y:450,w:220,h:22},{x:1160,y:380,w:220,h:22},
        {x:1460,y:310,w:220,h:22},{x:1760,y:380,w:220,h:22},{x:2060,y:450,w:220,h:22},
        {x:2360,y:380,w:220,h:22},{x:2660,y:520,w:1000,h:28}
      ],
      items:[{x:880,y:400,kind:"moeda"},{x:1460,y:260,kind:"tratado"},{x:2060,y:400,kind:"bandeira"},{x:2360,y:330,kind:"medalha"}],
      malwares:[{x:1020,y:480,vx:165},{x:1620,y:480,vx:-170},{x:2220,y:480,vx:165},{x:2820,y:480,vx:-160}]
    },
    {
      name: "Nível 6 — Schengen",
      theme:5, quizTheme:"schengen", worldW:3100,
      spawn:{x:120,y:460}, doorX:2700,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:860,y:450,w:210,h:22},{x:1140,y:375,w:210,h:22},
        {x:1420,y:305,w:210,h:22},{x:1700,y:375,w:210,h:22},{x:1980,y:450,w:210,h:22},
        {x:2260,y:375,w:210,h:22},{x:2680,y:520,w:1000,h:28}
      ],
      items:[{x:860,y:400,kind:"tratado"},{x:1420,y:255,kind:"moeda"},{x:1980,y:400,kind:"bandeira"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1010,y:480,vx:170},{x:1610,y:480,vx:-175},{x:2210,y:480,vx:170},{x:2760,y:480,vx:-165}]
    },
    {
      name: "Nível 7 — Maastricht",
      theme:6, quizTheme:"maastricht", worldW:3200,
      spawn:{x:120,y:460}, doorX:2800,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:880,y:448,w:200,h:22},{x:1160,y:374,w:200,h:22},
        {x:1440,y:304,w:200,h:22},{x:1720,y:374,w:200,h:22},{x:2000,y:448,w:200,h:22},
        {x:2280,y:374,w:200,h:22},{x:2560,y:448,w:200,h:22},{x:2840,y:520,w:1000,h:28}
      ],
      items:[{x:880,y:398,kind:"bandeira"},{x:1440,y:254,kind:"medalha"},{x:2000,y:398,kind:"moeda"},{x:2560,y:398,kind:"tratado"}],
      malwares:[{x:1020,y:480,vx:175},{x:1620,y:480,vx:-180},{x:2220,y:480,vx:175},{x:2820,y:480,vx:-170}]
    },
    {
      name: "Nível 8 — O Nobel da Paz",
      theme:7, quizTheme:"nobel", worldW:3300,
      spawn:{x:120,y:460}, doorX:2900,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:880,y:446,w:195,h:22},{x:1160,y:372,w:195,h:22},
        {x:1440,y:302,w:195,h:22},{x:1720,y:372,w:195,h:22},{x:2000,y:446,w:195,h:22},
        {x:2280,y:372,w:195,h:22},{x:2560,y:446,w:195,h:22},{x:2900,y:520,w:1000,h:28}
      ],
      items:[{x:880,y:396,kind:"tratado"},{x:1440,y:252,kind:"moeda"},{x:2000,y:396,kind:"bandeira"},{x:560,y:470,kind:"heart"},{x:2560,y:396,kind:"medalha"}],
      malwares:[{x:1020,y:480,vx:180},{x:1620,y:480,vx:-185},{x:2220,y:480,vx:180},{x:2820,y:480,vx:-175}]
    },
    {
      name: "Nível 9 — O Brexit",
      theme:8, quizTheme:"brexit", worldW:3400,
      spawn:{x:120,y:460}, doorX:3000,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:900,y:444,w:190,h:22},{x:1180,y:370,w:190,h:22},
        {x:1460,y:300,w:190,h:22},{x:1740,y:370,w:190,h:22},{x:2020,y:444,w:190,h:22},
        {x:2300,y:370,w:190,h:22},{x:2580,y:444,w:190,h:22},{x:2860,y:370,w:190,h:22},
        {x:3000,y:520,w:1100,h:28}
      ],
      items:[{x:900,y:394,kind:"tratado"},{x:1460,y:250,kind:"moeda"},{x:2020,y:394,kind:"bandeira"},{x:2580,y:394,kind:"medalha"}],
      malwares:[{x:1050,y:480,vx:185},{x:1650,y:480,vx:-190},{x:2250,y:480,vx:185},{x:2850,y:480,vx:-180}]
    },
    {
      name: "Nível 10 — O Futuro da Europa",
      theme:9, quizTheme:"futuro", worldW:3500,
      spawn:{x:120,y:460}, doorX:3100,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:920,y:442,w:185,h:22},{x:1200,y:368,w:185,h:22},
        {x:1480,y:298,w:185,h:22},{x:1760,y:368,w:185,h:22},{x:2040,y:442,w:185,h:22},
        {x:2320,y:368,w:185,h:22},{x:2600,y:442,w:185,h:22},{x:2880,y:368,w:185,h:22},
        {x:3150,y:520,w:1100,h:28}
      ],
      items:[{x:920,y:392,kind:"moeda"},{x:1480,y:248,kind:"medalha"},{x:2040,y:392,kind:"bandeira"},{x:2600,y:392,kind:"tratado"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1060,y:480,vx:190},{x:1660,y:480,vx:-195},{x:2260,y:480,vx:190},{x:2860,y:480,vx:-185},{x:3200,y:480,vx:188}]
    },
    {
      name: "Nível 11 — Os Símbolos da UE",
      theme:10, quizTheme:"simbolos", worldW:3600,
      spawn:{x:120,y:460}, doorX:3200,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:940,y:440,w:180,h:22},{x:1220,y:366,w:180,h:22},
        {x:1500,y:296,w:180,h:22},{x:1780,y:366,w:180,h:22},{x:2060,y:440,w:180,h:22},
        {x:2340,y:366,w:180,h:22},{x:2620,y:440,w:180,h:22},{x:2900,y:366,w:180,h:22},
        {x:3200,y:520,w:1100,h:28}
      ],
      items:[{x:940,y:390,kind:"bandeira"},{x:1500,y:246,kind:"medalha"},{x:2060,y:390,kind:"tratado"},{x:2620,y:390,kind:"moeda"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1080,y:480,vx:195},{x:1680,y:480,vx:-200},{x:2280,y:480,vx:195},{x:2880,y:480,vx:-190},{x:3300,y:480,vx:193}]
    },
    {
      name: "Nível 12 — O Programa Erasmus",
      theme:11, quizTheme:"erasmus", worldW:3700,
      spawn:{x:120,y:460}, doorX:3300,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:960,y:438,w:175,h:22},{x:1240,y:364,w:175,h:22},
        {x:1520,y:294,w:175,h:22},{x:1800,y:364,w:175,h:22},{x:2080,y:438,w:175,h:22},
        {x:2360,y:364,w:175,h:22},{x:2640,y:438,w:175,h:22},{x:2920,y:364,w:175,h:22},
        {x:3300,y:520,w:1100,h:28}
      ],
      items:[{x:960,y:388,kind:"moeda"},{x:1520,y:244,kind:"bandeira"},{x:2080,y:388,kind:"tratado"},{x:2640,y:388,kind:"medalha"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1100,y:480,vx:200},{x:1700,y:480,vx:-205},{x:2300,y:480,vx:200},{x:2900,y:480,vx:-195},{x:3400,y:480,vx:198}]
    },
    {
      name: "Nível 13 — A Carta dos Direitos",
      theme:12, quizTheme:"carta", worldW:3800,
      spawn:{x:120,y:460}, doorX:3400,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:980,y:436,w:170,h:22},{x:1260,y:362,w:170,h:22},
        {x:1540,y:292,w:170,h:22},{x:1820,y:362,w:170,h:22},{x:2100,y:436,w:170,h:22},
        {x:2380,y:362,w:170,h:22},{x:2660,y:436,w:170,h:22},{x:2940,y:362,w:170,h:22},
        {x:3400,y:520,w:1100,h:28}
      ],
      items:[{x:980,y:386,kind:"tratado"},{x:1540,y:242,kind:"moeda"},{x:2100,y:386,kind:"bandeira"},{x:2660,y:386,kind:"medalha"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1120,y:480,vx:205},{x:1720,y:480,vx:-210},{x:2320,y:480,vx:205},{x:2920,y:480,vx:-200},{x:3500,y:480,vx:203}]
    },
    {
      name: "Nível 14 — Os Fundos Europeus",
      theme:13, quizTheme:"fundos", worldW:3900,
      spawn:{x:120,y:460}, doorX:3500,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:1000,y:434,w:165,h:22},{x:1280,y:360,w:165,h:22},
        {x:1560,y:290,w:165,h:22},{x:1840,y:360,w:165,h:22},{x:2120,y:434,w:165,h:22},
        {x:2400,y:360,w:165,h:22},{x:2680,y:434,w:165,h:22},{x:2960,y:360,w:165,h:22},
        {x:3500,y:520,w:1100,h:28}
      ],
      items:[{x:1000,y:384,kind:"moeda"},{x:1560,y:240,kind:"medalha"},{x:2120,y:384,kind:"bandeira"},{x:2680,y:384,kind:"tratado"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1140,y:480,vx:210},{x:1740,y:480,vx:-215},{x:2340,y:480,vx:210},{x:2940,y:480,vx:-205},{x:3600,y:480,vx:208}]
    },
    {
      name: "Nível 15 — O Tratado de Lisboa",
      theme:14, quizTheme:"lisboa", worldW:4000,
      spawn:{x:120,y:460}, doorX:3600,
      platforms:[
        {x:520,y:520,w:1000,h:28},{x:1020,y:432,w:160,h:22},{x:1300,y:358,w:160,h:22},
        {x:1580,y:288,w:160,h:22},{x:1860,y:358,w:160,h:22},{x:2140,y:432,w:160,h:22},
        {x:2420,y:358,w:160,h:22},{x:2700,y:432,w:160,h:22},{x:2980,y:358,w:160,h:22},
        {x:3600,y:520,w:1100,h:28}
      ],
      items:[{x:1020,y:382,kind:"bandeira"},{x:1580,y:238,kind:"medalha"},{x:2140,y:382,kind:"moeda"},{x:2700,y:382,kind:"tratado"},{x:560,y:470,kind:"heart"}],
      malwares:[{x:1160,y:480,vx:215},{x:1760,y:480,vx:-220},{x:2360,y:480,vx:215},{x:2960,y:480,vx:-210},{x:3700,y:480,vx:213}]
    },
  ];

  // ===== Phaser =====
  let sceneRef=null, currentLevel=0;
  let bgGraphics, starsGraphics, hillsGraphics, groundGraphics, decorGraphics, shadowGfx;
  let clouds=[], starData=[], butterflies=[], petalEmitter=null;
  let player, platforms, itemsGroup, malwareGroup, door;
  let cursors, keySpace;
  let hudText, scoreText, heartsGfx, tipText, itemCountText;
  let progressBg, progressFill, powerIndicator;
  let pauseOverlayGfx, pauseVanImg, pauseLabel;
  let transitionGfx, transitionLabel;
  let score=0, lives=3, livesLostThisLevel=0;
  const MAX_LIVES=5;
  let itemsCollected=0, itemsTotal=0;
  let touch={left:false,right:false,jump:false};
  let awaitingQuiz=false, awaitingStory=false;
  let powered=false, poweredTimer=null, powerCountdown=null, invuln=false;
  let currentLevelTip = "⭐ Apanha estrelas e chega à porta 🇪🇺!";
  const GRAVITY=1100;

  const config = {
    type: Phaser.AUTO,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    width: 960, height: 540,
    parent: "game",
    backgroundColor: "#87ceeb",
    physics: { default:"arcade", arcade:{ gravity:{y:GRAVITY}, debug:false, overlapBias:12, tileBias:32 } },
    scale: { mode:Phaser.Scale.ENVELOP, autoCenter:Phaser.Scale.CENTER_BOTH },
    scene: { create, update }
  };

  const game = new Phaser.Game(config);
  window.__eu_game = game;

  function create() {
    sceneRef = this;
    cursors  = this.input.keyboard.createCursorKeys();
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.world.setBounds(0, 0, 2600, 514);
    this.cameras.main.setBounds(0, 0, 2600, 540);

    makeTextures(this);
    initBackground(this);

    shadowGfx = this.add.graphics().setDepth(1);

    // HUD
    hudText      = this.add.text(14, 10, "", { fontSize:"16px", fontStyle:"900", color:"#3b1f08", stroke:"#fdf6e3", strokeThickness:4 }).setScrollFactor(0).setDepth(100);
    scoreText    = this.add.text(14, 32, "", { fontSize:"14px", fontStyle:"900", color:"#3b1f08", stroke:"#fdf6e3", strokeThickness:3 }).setScrollFactor(0).setDepth(100);
    heartsGfx    = this.add.graphics().setScrollFactor(0).setDepth(100);
    tipText      = this.add.text(14, 74, "", { fontSize:"13px", fontStyle:"800", color:"#5c3a1e", stroke:"#fdf6e3", strokeThickness:3 }).setScrollFactor(0).setDepth(100);
    itemCountText= this.add.text(14, 92, "", { fontSize:"12px", fontStyle:"800", color:"#3b2008", stroke:"#fdf6e3", strokeThickness:2 }).setScrollFactor(0).setDepth(100);

    // Barra de progresso
    progressBg   = this.add.graphics().setScrollFactor(0).setDepth(100);
    progressFill = this.add.graphics().setScrollFactor(0).setDepth(100);
    progressBg.fillStyle(0x000000, 0.20);
    progressBg.fillRoundedRect(8, 110, 230, 10, 5);

    // Indicador de poder
    powerIndicator = this.add.text(960-14, 10, "", { fontSize:"14px", fontStyle:"900", color:"#c8a46e", stroke:"#1a0e05", strokeThickness:4 }).setScrollFactor(0).setDepth(102).setOrigin(1,0);

    // Pausa
    pauseOverlayGfx = this.add.graphics().setScrollFactor(0).setDepth(500);
    pauseVanImg  = this.add.image(480, 240, "vanberto_open").setScrollFactor(0).setDepth(501).setScale(3).setAlpha(0);
    pauseLabel   = this.add.text(480, 370, "⏸ PAUSA", { fontSize:"44px", fontStyle:"900", color:"#c8a46e", stroke:"#1a0e05", strokeThickness:7 }).setOrigin(0.5).setScrollFactor(0).setDepth(501).setAlpha(0);

    // Transição
    transitionGfx   = this.add.graphics().setScrollFactor(0).setDepth(800).setAlpha(0);
    transitionLabel = this.add.text(480, 270, "", { fontSize:"32px", fontStyle:"900", color:"#e8c87a", stroke:"#1a0e05", strokeThickness:8, align:"center" }).setOrigin(0.5).setScrollFactor(0).setDepth(801).setAlpha(0);

    platforms    = this.physics.add.staticGroup();
    itemsGroup   = this.physics.add.group({ allowGravity:false });
    malwareGroup = this.physics.add.group();

    player = this.physics.add.sprite(120, 460, "vanberto_open");
    player.setCollideWorldBounds(true);
    player.body.setSize(44, 48);
    player.body.setOffset(26, 40);

    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, itemsGroup, onCollectItem, null, this);
    this.physics.add.collider(malwareGroup, platforms);
    this.physics.add.collider(player, malwareGroup, onHitMalware, null, this);

    this.cameras.main.startFollow(player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(140, 90);

    createTouchInput(this);
    loadGame();
    btnMute.textContent = muted ? "🔇 Som: OFF" : "🔊 Som: ON";
    loadLevel(this, currentLevel || 0);
    scheduleBlink(this);

    // Controlos professor
    if (btnPause && btnRestart) {
      btnPause.onclick = () => {
        if (!sceneRef) return;
        pausedByTeacher = !pausedByTeacher;
        if (pausedByTeacher) {
          sceneRef.physics.pause(); btnPause.textContent = "▶ Continuar"; showPauseScreen(true);
        } else {
          if (!awaitingQuiz && startOverlay.classList.contains("hidden") && historyOverlay.classList.contains("hidden"))
            sceneRef.physics.resume();
          btnPause.textContent = "⏸ Pausa"; showPauseScreen(false);
        }
      };
      btnRestart.onclick = () => {
        if (!sceneRef) return;
        const lvlName = LEVELS[currentLevel]?.name || `Nível ${currentLevel+1}`;
        if (!confirm(`⚠️ Reiniciar o ${lvlName}?\nO progresso neste nível perde-se.`)) return;
        pausedByTeacher=false; btnPause.textContent="⏸ Pausa"; showPauseScreen(false);
        quizOverlay.classList.add("hidden"); btnCloseQuiz.classList.add("hidden");
        awaitingQuiz=false; historyOverlay.classList.add("hidden");
        touch.left=touch.right=touch.jump=false;
        sceneRef.physics.resume(); loadLevel(sceneRef,currentLevel); saveGame();
      };
    }

    if (btnRestartGame) {
      btnRestartGame.onclick = () => {
        if (!sceneRef) return;
        pausedByTeacher=false; btnPause.textContent="⏸ Pausa"; showPauseScreen(false);
        quizOverlay.classList.add("hidden"); btnCloseQuiz.classList.add("hidden");
        historyOverlay.classList.add("hidden"); awaitingQuiz=false;
        touch.left=touch.right=touch.jump=false;
        score=0; lives=3; livesLostThisLevel=0;
        resetQuizStats(); Object.keys(usedQuizByLevel).forEach(k=>usedQuizByLevel[k].clear());
        scoreText.setText(`⭐ Pontos: ${score}`); updateHearts();
        sceneRef.physics.resume(); loadLevel(sceneRef,0); saveGame();
      };
    }

    function toggleHighContrast() {
      highContrast=!highContrast;
      document.body.classList.toggle("high-contrast",highContrast);
      const btnC=document.getElementById("btnContrast");
      if (btnC) { btnC.textContent=highContrast?"🌗 Contraste: ON":"🌗 Contraste"; btnC.setAttribute("aria-pressed",highContrast?"true":"false"); }
      if (tipText) tipText.setText(highContrast?"🌗 Alto contraste: ON":"🌗 Alto contraste: OFF");
      saveGame();
    }
    const btnContrastEl=document.getElementById("btnContrast");
    if (btnContrastEl) btnContrastEl.onclick=toggleHighContrast;
    window.addEventListener("keydown",e=>{ if(e.key?.toLowerCase()==="h") toggleHighContrast(); });

    if (btnPresent) {
      btnPresent.onclick=()=>{
        presentationMode=!presentationMode;
        document.body.classList.toggle("presentation-mode",presentationMode);
        btnPresent.textContent=presentationMode?"📽️ Normal":"📽️ Apresentação";
      };
    }
  }

  function showPauseScreen(on) {
    if (!pauseOverlayGfx) return;
    if (on) {
      pauseOverlayGfx.clear(); pauseOverlayGfx.fillStyle(0x000000,0.6); pauseOverlayGfx.fillRect(0,0,960,540);
      pauseVanImg.setAlpha(1);
      sceneRef.tweens.add({targets:pauseVanImg,angle:{from:-6,to:6},duration:900,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      pauseLabel.setAlpha(1);
    } else {
      pauseOverlayGfx.clear(); pauseVanImg.setAlpha(0); pauseLabel.setAlpha(0);
      sceneRef.tweens.killTweensOf(pauseVanImg); pauseVanImg.setAngle(0);
    }
  }

  // ===== UPDATE =====
  function update() {
    if (awaitingQuiz||!startOverlay.classList.contains("hidden")||!historyOverlay.classList.contains("hidden")) {
      player.setVelocityX(0); applyVanBertoTexture(sceneRef); updateShadow(); return;
    }
    const speed=powered?320:280;
    const leftDown=cursors.left.isDown||touch.left;
    const rightDown=cursors.right.isDown||touch.right;
    const jumpDown=cursors.up.isDown||keySpace.isDown||touch.jump;

    if (leftDown&&!rightDown) { player.setVelocityX(-speed); player.setFlipX(true);  player.setAngle(-2); }
    else if (rightDown&&!leftDown) { player.setVelocityX(speed); player.setFlipX(false); player.setAngle(2); }
    else { player.setVelocityX(0); player.setAngle(0); }
    player.setScale(powered?1.18:1.0);

    if (jumpDown&&player.body.blocked.down) {
      player.setVelocityY(powered?-680:-650); ensureAudio(); SFX.jump(); touch.jump=false;
      sceneRef.tweens.add({targets:player,scaleY:powered?1.26:1.11,scaleX:powered?1.11:0.95,duration:120,yoyo:true});
    }

    applyVanBertoTexture(sceneRef); updateShadow();

    if (starsGraphics&&starData.length) {
      starsGraphics.clear();
      const t=sceneRef.time.now*0.001;
      starData.forEach(s=>{
        const alpha=0.25+0.65*(0.5+0.5*Math.sin(t*s.speed+s.phase));
        starsGraphics.fillStyle(0xffffff,alpha); starsGraphics.fillCircle(s.x,s.y,s.r);
      });
    }

    if (progressFill&&LEVELS[currentLevel]) updateHUD(LEVELS[currentLevel]);

    butterflies.forEach(b=>{
      b.x+=b.vx; b.y+=Math.sin(b.x*0.012+b.phase)*0.65; b.t+=0.1;
      drawButterfly(b.gfx,b.x,b.y,b.c1,b.c2,b.t);
      const L=LEVELS[currentLevel];
      if(b.x>L.worldW+80)b.x=-60; if(b.x<-80)b.x=L.worldW+60;
    });

    malwareGroup.getChildren().forEach(m=>{
      if(m.body.blocked.left)  m.setVelocityX( Math.abs(m.body.velocity.x));
      if(m.body.blocked.right) m.setVelocityX(-Math.abs(m.body.velocity.x));
      // Impedir acumulação junto à porta: se o mau se aproximar a menos de 220px e vier na direção da porta, inverte
      if(door && m.x > door.x - 220 && m.body.velocity.x > 0)
        m.setVelocityX(-Math.abs(m.body.velocity.x));
      m.rotation+=0.022;
    });
  }

  function updateShadow() {
    if (!shadowGfx||!player) return;
    shadowGfx.clear();
    const px=player.x,py=player.y; let groundY=520;
    platforms.getChildren().forEach(p=>{
      if(!p.body) return;
      if(px>=p.body.left&&px<=p.body.right&&p.body.top>py&&p.body.top<groundY) groundY=p.body.top;
    });
    const dist=Math.max(0,groundY-py), alpha=Math.max(0,0.28-dist*0.001), sc=Math.max(0.3,1-dist*0.003);
    shadowGfx.fillStyle(0x000000,alpha); shadowGfx.fillEllipse(player.x,groundY+2,44*sc,10*sc);
  }

  // ===== Borboletas =====
  function spawnButterflies(scene,worldW) {
    butterflies.forEach(b=>b.gfx.destroy()); butterflies=[];
    const cols=[0xe8c87a,0xc8a46e,0xf5deb3,0xd4a56a,0xffe8a1];
    const count=3+(currentLevel%3);
    for(let i=0;i<count;i++){
      const gfx=scene.add.graphics().setDepth(-5);
      butterflies.push({gfx,x:Math.random()*worldW,y:80+Math.random()*280,vx:(Math.random()<0.5?1:-1)*(0.4+Math.random()*0.5),c1:cols[i%cols.length],c2:cols[(i+2)%cols.length],phase:Math.random()*Math.PI*2,t:0});
    }
  }
  function drawButterfly(gfx,x,y,c1,c2,t) {
    gfx.clear(); const f=Math.abs(Math.sin(t*3));
    gfx.fillStyle(c1,0.68); gfx.fillEllipse(x-9*f,y-3,16*f+2,11); gfx.fillEllipse(x-7*f,y+4,11*f+2,8);
    gfx.fillStyle(c2,0.68); gfx.fillEllipse(x+9*f,y-3,16*f+2,11); gfx.fillEllipse(x+7*f,y+4,11*f+2,8);
    gfx.fillStyle(0x3b1f08,0.7); gfx.fillEllipse(x,y,3,14);
  }

  // ===== Pétalas (flores açorianas) =====
  function startPetals(scene,worldW) {
    if(petalEmitter){petalEmitter.stop();petalEmitter.destroy();}
    petalEmitter=scene.add.particles(0,0,"petal",{
      x:{min:0,max:worldW},y:-10,
      speedX:{min:-10,max:10},speedY:{min:15,max:35},
      rotate:{min:0,max:360},lifespan:{min:5000,max:9000},
      frequency:400,quantity:1,alpha:{start:0.65,end:0},
      scale:{min:0.5,max:1.1},gravityY:0
    }).setDepth(-3);
  }

  // ===== Dificuldade =====
  function difficultyFactor(idx) {
    // Fator suave: começa em 1.0, sobe gradualmente até ~1.35 no nível 10
    let f = 1 + idx * 0.025;
    if (idx >= 6) f += (idx - 6) * 0.015;
    return Math.min(1.35, f);
  }

  // ===== Carregar nível =====
  function loadLevel(scene,idx) {
    currentLevel=idx;
    const L=LEVELS[currentLevel];
    const T=THEMES[L.theme%THEMES.length];

    scene.physics.world.setBounds(0,0,L.worldW,514);
    scene.cameras.main.setBounds(0,0,L.worldW,540);

    platforms.clear(true,true); itemsGroup.clear(true,true); malwareGroup.clear(true,true);
    if(door) door.destroy();

    awaitingQuiz=false; invuln=false; clearPower(scene); livesLostThisLevel=0;
    itemsCollected=0; itemsTotal=L.items.filter(it=>it.kind!=="heart").length;
    updateHUD(L); applyBackground(scene,L.theme%THEMES.length,L.worldW);

    // Plataformas
    L.platforms.forEach(p=>{
      const plat=platforms.create(p.x,p.y,"platform_stone");
      plat.displayWidth=p.w; plat.displayHeight=p.h; plat.refreshBody();
      if(plat.body){plat.body.checkCollision.left=false;plat.body.checkCollision.right=false;}
    });

    // Porta (livro antigo)
    door=scene.physics.add.staticSprite(L.doorX,425,"door_book").setDisplaySize(80,100);
    door.clearTint();
    scene.physics.add.overlap(player,door,()=>tryOpenDoor(scene),null,scene);
    scene.tweens.add({targets:door,alpha:{from:1,to:0.8},duration:800,yoyo:true,repeat:-1});

    // Itens
    const keyMap={tratado:"item_tratado",bandeira:"item_bandeira",moeda:"item_moeda",medalha:"item_medalha",heart:"item_heart"};
    L.items.forEach(it=>{
      const shadow=scene.add.ellipse(it.x,it.y+22,32,8,0x000000,0.15).setDepth(1);
      scene.tweens.add({targets:shadow,scaleX:{from:1,to:0.7},alpha:{from:0.15,to:0.06},duration:940,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      const obj=itemsGroup.create(it.x,it.y,keyMap[it.kind]||"item_tratado");
      obj.setDepth(2);
      scene.tweens.add({targets:obj,y:obj.y-8,duration:940,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
      obj.setData("kind",it.kind); obj.setData("shadow",shadow);
    });

    // Vírus
    const df=difficultyFactor(currentLevel);
    L.malwares.forEach(m=>spawnVirus(scene,m.x,480,m.vx,df));
    if(L.platforms.length>=5) {
      const mid=L.platforms[Math.floor(L.platforms.length/2)];
      spawnVirus(scene,mid.x,480,(currentLevel%2===0)?170:-170,df);
      if(currentLevel>=6){const q=L.platforms[Math.floor(L.platforms.length/4)];spawnVirus(scene,q.x,480,(currentLevel%2===0)?-185:185,df);}
    }

    spawnButterflies(scene,L.worldW); startPetals(scene,L.worldW);

    // Animação de entrada — repor sempre alpha, scale e ângulo
    player.setAlpha(1); player.setScale(1); player.setAngle(0); player.setFlipX(false); player.setOrigin(0.5,0.5); player.setDepth(3);
    player.setPosition(-60,L.spawn.y); player.setVelocity(400,0);
    touch.left=touch.right=touch.jump=false;
    scene.time.delayedCall(580,()=>{
      player.setAlpha(1); player.setScale(1);
      player.setPosition(L.spawn.x,L.spawn.y); player.setVelocity(0,0); snapPlayerToGround();
      player.setVelocityY(-300);
      scene.tweens.add({targets:player,scaleX:{from:0.85,to:1},scaleY:{from:1.15,to:1},duration:220,ease:"Bounce.easeOut"});
    });

    const TIPS = [
      "⭐ Apanha tratados e chega à porta 🇪🇺!",
      "📜 Apanha itens e responde à pergunta para avançar!",
      "🌍 A Europa cresce — apanha bandeiras e moedas!",
      "🏛️ Conheces as instituições? Chega à porta!",
      "💶 Apanha moedas de euro e evita os eurocépticos!",
      "✈️ Schengen — viaja sem fronteiras pelo nível!",
      "📋 Apanha tratados e chega a Maastricht!",
      "🏅 Mereces o Nobel — apanha tudo e responde bem!",
      "🇬🇧 O Brexit chegou — mantém-te firme na missão!",
      "🌟 O futuro da Europa está nas tuas mãos!",
      "⭐ Conheces os símbolos da UE? Mostra o que sabes!",
      "🎓 Erasmus — estuda, apanha itens e avança!",
      "📜 Os direitos fundamentais protegem-te — e tu proteges a Europa!",
      "💰 Os fundos europeus constroem o futuro — apanha-os!",
      "🏛️ Lisboa — a missão final! Dá tudo o que tens!"
    ];
    currentLevelTip = (TIPS[currentLevel] || TIPS[0]) + (currentLevel >= 6 ? " ⚠️ Cuidado!" : "");
    tipText.setText(currentLevelTip);
    ensureAudio(); SFX.door(); saveGame();
  }

  function spawnVirus(scene,x,y,vx,df){
    const keys=["virus_round","virus_spike","virus_bug"];
    const v=malwareGroup.create(x,y,keys[Math.floor(Math.random()*keys.length)]);
    v.setCollideWorldBounds(true);
    v.setBounce(0); // sem bounce fisico - evita o bug de velocidade acumulada
    v.setVelocityX(Math.round(vx*df));
    v.body.setSize(52,52,true); v.setDepth(2);
    // Salto controlado por timer: so salta quando esta no chao, com intervalos aleatorios
    const baseDelay = 1800 + Math.random()*1400;
    scene.time.addEvent({
      delay: 400 + Math.random()*1200,
      callback: () => {
        scene.time.addEvent({
          delay: baseDelay,
          loop: true,
          callback: () => {
            if (!v.active || !v.body) return;
            if (v.body.blocked.down) v.setVelocityY(-420 - Math.random()*80);
          }
        });
      }
    });
    scene.tweens.add({targets:v,scaleX:{from:1.05,to:1.22},scaleY:{from:1.0,to:1.14},duration:430,yoyo:true,repeat:-1});
  }

  function updateHUD(L) {
    hudText.setText(`${L.name}  (${currentLevel+1}/${LEVELS.length})`);
    scoreText.setText(`⭐ Pontos: ${score}`);
    updateHearts();
    itemCountText.setText(`⭐ Itens: ${itemsCollected}/${itemsTotal}`);
    if(powerIndicator&&!powered) powerIndicator.setText("");

    if(progressFill){
      progressFill.clear();
      const BAR_X=8,BAR_Y=110,BAR_W=230,BAR_H=10;
      const levelPct=currentLevel/LEVELS.length;
      const levelNextPct=(currentLevel+1)/LEVELS.length;
      progressFill.fillStyle(0x5c3a1e,0.55);
      progressFill.fillRoundedRect(BAR_X,BAR_Y,Math.max(4,Math.round(BAR_W*levelPct)),BAR_H,5);
      if(player&&L){
        const worldW=L.worldW||2600,doorX=L.doorX||worldW-200,spawnX=L.spawn?.x||120;
        const px=Math.max(spawnX,Math.min(player.x,doorX));
        const inLevelPct=(px-spawnX)/Math.max(1,doorX-spawnX);
        const segStart=BAR_X+Math.round(BAR_W*levelPct);
        const segEnd=BAR_X+Math.round(BAR_W*levelNextPct);
        const segW=segEnd-segStart;
        progressFill.fillStyle(0xc8a46e,0.9);
        progressFill.fillRoundedRect(segStart,BAR_Y,Math.max(3,Math.round(segW*inLevelPct)),BAR_H,5);
        const markerX=segStart+Math.round(segW*inLevelPct);
        progressFill.fillStyle(0x3b1f08,1); progressFill.fillCircle(markerX,BAR_Y+BAR_H/2,6);
        progressFill.fillStyle(0xfdf6e3,1); progressFill.fillCircle(markerX,BAR_Y+BAR_H/2,3);
        progressFill.fillStyle(0xe8c87a,1); progressFill.fillRect(segEnd-5,BAR_Y+1,8,BAR_H-2);
      }
    }
  }

  function updateHearts(){
    if(!heartsGfx) return;
    heartsGfx.clear();
    const startX=14,y=56,size=12,gap=17;
    for(let i=0;i<MAX_LIVES;i++){
      const x=startX+i*gap, full=i<lives;
      const r=size*0.52;
      heartsGfx.fillStyle(full?0xc0392b:0xfca5a5,full?1:0.4);
      heartsGfx.fillCircle(x-r*0.55,y-r*0.18,r); heartsGfx.fillCircle(x+r*0.55,y-r*0.18,r);
      heartsGfx.fillTriangle(x-size,y-r*0.1,x+size,y-r*0.1,x,y+size*1.05);
      if(full){heartsGfx.fillStyle(0xffffff,0.3);heartsGfx.fillCircle(x-r*0.3,y-r*0.5,r*0.3);}
    }
  }

  function snapPlayerToGround(){
    if(!player?.body||!platforms) return;
    player.body.updateFromGameObject();
    const pb=player.body; let best=null,bestTop=Infinity;
    platforms.getChildren().forEach(p=>{
      if(!p.body) return;
      if(pb.right>p.body.left&&pb.left<p.body.right){
        const top=p.body.top;
        if(top>=pb.bottom-2&&top<bestTop){bestTop=top;best=p;}
      }
    });
    if(best){const dy=pb.bottom-(best.body.top-1);player.setVelocity(0,0);player.y-=dy;player.body.updateFromGameObject();}
  }

  // ===== Porta + Quiz =====
  function tryOpenDoor(scene){
    if(awaitingQuiz) return;
    awaitingQuiz=true;

    // Parar movimento horizontal mas deixar a gravidade agir
    // para o robot pousar antes de iniciar a animação
    player.setVelocityX(0);
    player.setFlipX(false);

    // Aguardar até o robot estar no chão (máx 400ms) antes de pausar
    const doorOrigX = door.x;
    let waited = 0;
    const landingCheck = scene.time.addEvent({
      delay: 16,
      loop: true,
      callback: () => {
        waited += 16;
        const onGround = player.body && player.body.blocked.down;
        if (onGround || waited >= 400) {
          landingCheck.remove();
          player.setVelocity(0, 0);
          snapPlayerToGround();
          scene.physics.pause();
          ensureAudio(); SFX.doorOpen();
          startDoorAnimation(scene, doorOrigX);
        }
      }
    });
  }

  function startDoorAnimation(scene, doorOrigX){
    // --- 1. Jogador já está no chão, vira-se para a porta ---

    // --- 2. Porta treme (trinco a destrancar) ---
    door.setOrigin(0.5, 0.5);
    door.x = doorOrigX;
    scene.tweens.add({
      targets: door,
      x: { from: doorOrigX - 3, to: doorOrigX + 3 },
      duration: 60, yoyo: true, repeat: 3,
      ease: "Sine.easeInOut",
      onComplete: () => {
        door.x = doorOrigX;

        // --- 3. Luz dourada a sair por baixo da porta ---
        const glow = scene.add.graphics().setDepth(10);
        glow.fillStyle(0xfde68a, 0.7);
        glow.fillEllipse(door.x, door.y + 36, 80, 18);
        scene.tweens.add({ targets: glow, alpha: { from: 0.7, to: 0 }, duration: 500,
          onComplete: () => glow.destroy() });

        // --- 4. Porta abre para o lado (dobradiça na esquerda) ---
        door.setOrigin(0, 0.5);
        door.x = doorOrigX - 32; // ajusta para a dobradiça ficar no lugar
        scene.tweens.add({
          targets: door,
          scaleX: { from: 1, to: 0 },
          duration: 340,
          ease: "Sine.easeIn",
          onComplete: () => {

            // --- 5. Partículas douradas a sair do vão da porta ---
            const burst = scene.add.particles(0, 0, "spark_item", {
              x: doorOrigX, y: door.y,
              speed: { min: 40, max: 160 },
              lifespan: 480, quantity: 18,
              scale: { start: 1.0, end: 0 },
              gravityY: 280,
              angle: { min: 210, max: 330 },
              tint: [0xfde68a, 0xfbbf24, 0xfdf6e3]
            });
            scene.time.delayedCall(380, () => burst.destroy());

            // --- 6. Robot caminha para dentro da porta ---
            // Fica atrás da porta visualmente
            player.setDepth(1);
            scene.tweens.add({
              targets: player,
              x: doorOrigX,
              duration: 280,
              ease: "Sine.easeIn",
              onComplete: () => {
                // Robot encolhe de baixo para cima (origem no topo) e desaparece
                player.setOrigin(0.5, 0);
                scene.tweens.add({
                  targets: player,
                  scaleY: { from: 1, to: 0 },
                  scaleX: { from: 1, to: 0.6 },
                  alpha: { from: 1, to: 0 },
                  duration: 260,
                  ease: "Sine.easeIn",
                  onComplete: () => {
                    player.setOrigin(0.5, 0.5);
                    player.setDepth(3);
                  }
                });

                // --- 7. Texto "📖 Responde!" ---
                const label = scene.add.text(doorOrigX, door.y - 55, "🇪🇺 Responde!", {
                  fontSize: "20px", fontStyle: "900",
                  color: "#fde68a", stroke: "#3b1f08", strokeThickness: 5
                }).setOrigin(0.5).setDepth(20).setAlpha(0);
                scene.tweens.add({
                  targets: label, alpha: 1, y: door.y - 82,
                  duration: 260, ease: "Back.easeOut",
                  onComplete: () => scene.time.delayedCall(300, () => {
                    scene.tweens.add({ targets: label, alpha: 0, duration: 180,
                      onComplete: () => label.destroy() });
                  })
                });

                // --- 8. Abre o quiz ---
                scene.time.delayedCall(620, () => {
                  lastQuizTheme = LEVELS[currentLevel].quizTheme;
                  showQuiz(pickQuizForLevel(currentLevel, LEVELS[currentLevel].quizTheme), (ok) => {
                    if(ok){
                      ensureAudio();
                      if(currentLevel===LEVELS.length-1) SFX.finalWin(); else SFX.win();
                      nextLevel(scene);
                    } else {
                      // Fecha a porta e repõe o robot no spawn
                      door.setOrigin(0.5, 0.5);
                      door.x = doorOrigX;
                      door.setScale(1);
                      door.setAlpha(1);
                      player.setAlpha(1); player.setScale(1);
                      const L = LEVELS[currentLevel];
                      player.setPosition(L.spawn.x, L.spawn.y);
                      snapPlayerToGround();
                      scene.physics.resume();
                      awaitingQuiz = false;
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  }

  function playLevelTransition(scene,nextIdx,onMidpoint){
    if(!transitionGfx||!transitionLabel){onMidpoint?.();return;}
    const nextL=LEVELS[nextIdx];
    const label=nextL?`📜 ${nextIdx+1}/${LEVELS.length}\n${nextL.name.replace(/^Nível \d+ — /,"")}` : "🏆 Missão Concluída!";
    transitionGfx.clear(); transitionGfx.fillStyle(0x0a0500,1); transitionGfx.fillRect(0,0,960,540);
    transitionLabel.setText(label);
    scene.tweens.add({targets:[transitionGfx,transitionLabel],alpha:1,duration:320,ease:"Sine.easeIn",onComplete:()=>{
      onMidpoint?.();
      scene.time.delayedCall(520,()=>{
        scene.tweens.add({targets:[transitionGfx,transitionLabel],alpha:0,duration:380,ease:"Sine.easeOut"});
      });
    }});
  }

  function nextLevel(scene){
    const next=currentLevel+1;
    quizOverlay.classList.add("hidden"); btnCloseQuiz.classList.add("hidden"); awaitingQuiz=false;
    scene.physics.pause(); player.setVelocity(0,0);
    // Robot e porta já desapareceram na animação de abertura — esconder silenciosamente
    player.setAlpha(0);
    if(door) door.setAlpha(0);
    const doorX=LEVELS[currentLevel].doorX;

    if(livesLostThisLevel===0){
      score+=50; bonusStars.textContent="⭐⭐⭐\n+50 Nível Perfeito!";
      bonusStars.classList.add("show"); setTimeout(()=>bonusStars.classList.remove("show"),2000);
    }
    livesLostThisLevel=0;

    setTimeout(()=>{
      if(next>=LEVELS.length){scene.physics.resume();showVictoryScreen(scene);return;}
      score+=100; scoreText.setText(`⭐ Pontos: ${score}`);
      showFloat(scene,player.x,player.y-80,"+100 🇪🇺","#d4af37");
      playLevelTransition(scene,next,()=>{
        loadLevel(scene,next);
        showHistory(next,()=>{
          if(!pausedByTeacher) scene.physics.resume();
        });
      });
      saveGame();
    },750);
  }

  function showGameOver(){
    try{sceneRef.physics.pause();}catch{}
    awaitingQuiz=true; touch.left=touch.right=touch.jump=false;
    try{player.setVelocity(0,0);}catch{}
    ensureAudio(); SFX.gameOver();
    document.getElementById("gameOverOverlay").classList.remove("hidden");
  }

  function robotDance(scene,done){
    if(!player||!scene){done?.();return;}
    // Coloca o robot numa posição visível no centro do ecrã da câmara
    const camX=scene.cameras.main.scrollX;
    player.setPosition(camX + scene.scale.width / 2, 455);
    player.setVelocity(0,0);
    player.setFlipX(false); player.setAngle(0); player.setScale(1);
    const t1=scene.tweens.add({targets:player,angle:{from:-14,to:14},duration:120,yoyo:true,repeat:24});
    const t2=scene.tweens.add({targets:player,y:{from:455,to:435},duration:200,yoyo:true,repeat:12});
    scene.time.delayedCall(4400,()=>{try{t1.stop();t2.stop();}catch{}player.setAngle(0);player.y=455;done?.();});
  }

  function startConfetti(durationMs=5000){
    const el=document.getElementById("confetti"); if(!el) return;
    el.classList.remove("hidden"); el.innerHTML="";
    const emojis=["🇪🇺","✨","⭐","📜","🏛️","💶","🎉"];
    const vw=Math.max(320,window.innerWidth||800);
    const confettiCount=window.matchMedia("(max-width:768px)").matches?45:90;
    for(let i=0;i<confettiCount;i++){
      const s=document.createElement("span");
      s.textContent=emojis[i%emojis.length];
      s.style.left=(Math.random()*vw)+"px";
      s.style.animationDuration=(3.2+Math.random()*2.2)+"s";
      s.style.animationDelay=(Math.random()*1.0)+"s";
      s.style.opacity=(0.75+Math.random()*0.25).toFixed(2);
      el.appendChild(s);
    }
    setTimeout(()=>{el.classList.add("hidden");el.innerHTML="";},durationMs);
  }

  function showVictoryScreen(scene){
    try{scene.physics.pause();}catch{}
    awaitingQuiz=true; // bloqueia qualquer interação de jogo
    touch.left=touch.right=touch.jump=false;
    ensureAudio(); SFX.finalWin(); startConfetti(8000);
    robotDance(scene,()=>{
      const pct=quizStats.total?Math.round((quizStats.correct/quizStats.total)*100):0;
      let medal="🥉 Bronze — missão concluída!";
      if(pct>=70) medal="🥈 Prata — muito bem!";
      if(pct>=90) medal="🥇 Ouro — excelente!";
      const master=(!quizStats.everWrong&&quizStats.total>0)?" 🏛️ Cidadão Europeu Perfeito!":"";
      document.getElementById("winPlayerName").textContent=playerName||"Herói da Europa";
      document.getElementById("winScore").textContent=score;
      document.getElementById("winPct").textContent=`${quizStats.correct}/${quizStats.total} (${pct}%)`;
      document.getElementById("winMedal").textContent=medal+master;

      const winErrors=document.getElementById("winErrors");
      const winErrorList=document.getElementById("winErrorList");
      if(winErrors&&winErrorList){
        if(quizStats.errors&&quizStats.errors.length>0){
          winErrors.style.display="block"; winErrorList.innerHTML="";
          quizStats.errors.forEach(e=>{
            const li=document.createElement("li");
            li.innerHTML=`<strong>${e.level}:</strong> ${e.q} <span style="color:#ef4444">→ "${e.wrong}"</span>`;
            winErrorList.appendChild(li);
          });
        } else { winErrors.style.display="none"; }
      }
      document.getElementById("winOverlay").classList.remove("hidden");
    });
  }

  function showQuiz(quiz,done,isRetry){
    quizOverlay.classList.remove("hidden");
    quizQuestion.textContent=(isRetry?"🔄 Segunda tentativa! ":"")+quiz.q;
    quizAnswers.innerHTML=""; quizFeedback.textContent=""; quizFeedback.style.color="#3b1f08";
    quizExplanation.textContent=""; quizExplanation.classList.add("hidden");
    btnCloseQuiz.classList.add("hidden");

    const correct=quiz.a.filter(x=>x.ok), wrong=quiz.a.filter(x=>!x.ok);
    for(let i=wrong.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[wrong[i],wrong[j]]=[wrong[j],wrong[i]];}
    const opts=[...correct.slice(0,1),...wrong.slice(0,2)];
    for(let i=opts.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[opts[i],opts[j]]=[opts[j],opts[i]];}

    let answered=false;
    opts.forEach(ans=>{
      const b=document.createElement("button");
      b.className="btn"; b.textContent=ans.t;
      b.setAttribute("aria-label",`Resposta: ${ans.t}`);
      b.onclick=()=>{
        if(answered) return; answered=true;
        ensureAudio(); quizStats.total+=1;

        quizAnswers.querySelectorAll(".btn").forEach(btn=>{
          btn.disabled=true;
          if(btn.textContent===correct[0].t){
            btn.style.background="rgba(20,80,20,0.75)";
            btn.style.borderColor="#4caf50";
            btn.style.color="#b8ffb8";
          } else if(btn===b&&!ans.ok){
            btn.style.background="rgba(100,20,20,0.75)";
            btn.style.borderColor="#c0392b";
            btn.style.color="#ffb8b8";
          } else { btn.style.opacity="0.35"; }
        });

        if(ans.ok){
          quizStats.correct+=1;
          quizFeedback.textContent=isRetry?"✅ Conseguiste na segunda tentativa! 💪":"✅ Muito bem!";
          quizFeedback.style.color="#2d5a1e";
          if(quiz.exp){quizExplanation.textContent="💡 "+quiz.exp;quizExplanation.classList.remove("hidden");}
          if(sceneRef&&player) showFloat(sceneRef,player.x,player.y-90,pickPraise(),"#8b4513");
          SFX.coin();
          setTimeout(()=>{quizOverlay.classList.add("hidden");done(true);},quiz.exp?1800:900);
        } else {
          quizStats.everWrong=true; SFX.hit();
          if(sceneRef&&player){sceneRef.tweens.add({targets:player,angle:{from:-10,to:10},duration:80,yoyo:true,repeat:4,ease:"Sine.easeInOut",onComplete:()=>{if(player)player.setAngle(0);}});}

          // Errar não perde vidas — nova pergunta até acertar
          quizStats.errors=quizStats.errors||[];
          if(!isRetry) quizStats.errors.push({level:LEVELS[currentLevel]?.name||`Nível ${currentLevel+1}`,q:quiz.q,wrong:ans.t,correct:correct[0].t});
          if(quiz.exp){quizExplanation.textContent="💡 "+quiz.exp;quizExplanation.classList.remove("hidden");}
          const tip=QUIZ_TIPS[LEVELS[currentLevel]?.quizTheme]||"";
          quizFeedback.textContent="❌ Quase! A resposta certa era: "+correct[0].t+"\nTenta outra pergunta!";
          if(tip) quizFeedback.textContent+=`\n📜 Lembra-te: ${tip}`;
          quizFeedback.style.color="#8b2a1e";
          btnCloseQuiz.classList.remove("hidden"); btnCloseQuiz.textContent="🔄 Tentar outra pergunta";
          btnCloseQuiz.onclick=()=>{
            btnCloseQuiz.classList.add("hidden");
            showQuiz(pickQuizForLevel(currentLevel,LEVELS[currentLevel].quizTheme),done,true);
          };
        }
      };
      quizAnswers.appendChild(b);
    });
  }

  // ===== Itens =====
  const ITEM_LABELS={
    tratado:  {label:"📜 Tratado +10",   color:"#d4af37"},
    bandeira: {label:"🇪🇺 Bandeira +10", color:"#1a5fb4"},
    moeda:    {label:"💶 Euro +10",      color:"#c8a800"},
    medalha:  {label:"🏅 Medalha! SUPER",color:"#d4af37"},
    heart:    {label:"❤️ +1 Vida!",      color:"#c0392b"}
  };

  function onCollectItem(playerObj,itemObj){
    const kind=itemObj.getData("kind"), shadow=itemObj.getData("shadow");
    if(shadow) shadow.destroy(); itemObj.destroy();
    score+=10; scoreText.setText(`⭐ Pontos: ${score}`);
    if(kind!=="heart"&&kind!=="medalha"){ itemsCollected=Math.min(itemsCollected+1,itemsTotal); itemCountText.setText(`⭐ Itens: ${itemsCollected}/${itemsTotal}`); }
    const lbl=ITEM_LABELS[kind]||{label:"+10 ⭐",color:"#1a3070"};
    showFloat(sceneRef,playerObj.x,playerObj.y-68,lbl.label,lbl.color);
    if(Math.random()<0.35) showFloat(sceneRef,playerObj.x,playerObj.y-100,pickPraise(),"#8b4513");
    ensureAudio(); SFX.coin();
    const p=sceneRef.add.particles(0,0,"spark_item",{x:playerObj.x,y:playerObj.y,speed:{min:50,max:170},lifespan:370,quantity:14,scale:{start:0.9,end:0},gravityY:400});
    sceneRef.time.delayedCall(260,()=>p.destroy());
    if(kind==="medalha"){givePower(sceneRef);tipText.setText("⭐ 🏅 SUPER MODO: VanBerto's está protegido e aumentado!");}
    if(kind==="heart"){
      if(lives<MAX_LIVES){
        lives+=1; updateHearts(); ensureAudio(); SFX.life();
        tipText.setText("❤️ Ganhaste uma vida extra!");
        if(heartsGfx&&sceneRef) sceneRef.tweens.add({targets:heartsGfx,scaleX:{from:1,to:1.25},scaleY:{from:1,to:1.25},duration:140,yoyo:true,repeat:1,ease:"Back.easeOut"});
      } else { showFloat(sceneRef,playerObj.x,playerObj.y-100,"❤️ MÁXIMO!","#c0392b"); }
    }
    saveGame();
  }

  function onHitMalware(){
    if(invuln) return;
    ensureAudio(); SFX.hit();
    hitFlash.classList.add("active"); setTimeout(()=>hitFlash.classList.remove("active"),200);
    if(powered){clearPower(sceneRef);setInvuln(sceneRef,800);tipText.setText("🛡️ Super modo usado! Cuidado.");return;}
    lives-=1; updateHearts(); livesLostThisLevel++;
    sceneRef.cameras.main.shake(120,0.006);
    if(heartsGfx&&sceneRef) sceneRef.tweens.add({targets:heartsGfx,x:{from:-4,to:4},duration:60,yoyo:true,repeat:3,ease:"Sine.easeInOut",onComplete:()=>{if(heartsGfx)heartsGfx.x=0;}});
    setInvuln(sceneRef,1200);
    const L=LEVELS[currentLevel];
    touch.left=touch.right=touch.jump=false;
    player.setVelocity(0,0); player.setPosition(L.spawn.x,L.spawn.y); snapPlayerToGround();
    if(lives<=0) showGameOver();
    saveGame();
  }

  function setInvuln(scene,ms){
    invuln=true;
    const tw=scene.tweens.add({targets:player,alpha:{from:1,to:0.35},duration:80,yoyo:true,repeat:Math.floor(ms/160)});
    scene.time.delayedCall(ms,()=>{invuln=false;player.setAlpha(1);tw.stop();});
  }

  function givePower(scene){
    powered=true; ensureAudio(); SFX.power();
    scene.tweens.add({targets:player,scaleX:1.35,scaleY:1.35,duration:140,yoyo:true,repeat:1});
    if(poweredTimer) poweredTimer.remove(false);
    if(powerCountdown) powerCountdown.remove(false);
    const base=currentLevel>=6?5200:7000;
    let remaining=Math.ceil(base/1000);
    if(powerIndicator) powerIndicator.setText(`⭐ SUPER: ${remaining}s`);
    // Countdown a atualizar a cada segundo
    powerCountdown=scene.time.addEvent({
      delay:1000, repeat:remaining-1,
      callback:()=>{
        remaining--;
        if(powerIndicator&&powered) powerIndicator.setText(remaining>0?`⭐ SUPER: ${remaining}s`:"");
      }
    });
    poweredTimer=scene.time.delayedCall(base,()=>{ clearPower(scene); });
  }
  function clearPower(scene){
    powered=false;
    if(poweredTimer){poweredTimer.remove(false);poweredTimer=null;}
    if(powerCountdown){powerCountdown.remove(false);powerCountdown=null;}
    if(player) player.clearTint();
    if(powerIndicator) powerIndicator.setText("");
    // Restaura a dica do nível atual
    if(tipText) tipText.setText(currentLevelTip);
  }

  // ===== Touch =====
  function createTouchInput(scene){
    let downAt=0, anyTouchBtnActive=false; const TAP_MS=190;
    scene.input.on("pointerdown",(p)=>{ensureAudio();if(anyTouchBtnActive)return;downAt=scene.time.now;touch.left=p.x<scene.scale.width/2;touch.right=!touch.left;});
    scene.input.on("pointerup",()=>{if(anyTouchBtnActive)return;const held=scene.time.now-downAt;touch.left=false;touch.right=false;if(held<=TAP_MS)touch.jump=true;});
    scene.input.on("pointerout",()=>{touch.left=false;touch.right=false;touch.jump=false;});
    const btnL=document.getElementById("btnLeft"),btnR=document.getElementById("btnRight"),btnJ=document.getElementById("btnJump");
    if(btnL&&btnR&&btnJ){
      const activeBtns=new Set(), updateActive=()=>{anyTouchBtnActive=activeBtns.size>0;};
      const press=(btn,action,val)=>{
        const start=(e)=>{e.preventDefault();ensureAudio();touch[action]=val;btn.classList.add("pressed");activeBtns.add(btn.id);updateActive();};
        const end=(e)=>{e.preventDefault();touch[action]=false;btn.classList.remove("pressed");activeBtns.delete(btn.id);updateActive();};
        btn.addEventListener("touchstart",start,{passive:false});btn.addEventListener("touchend",end,{passive:false});btn.addEventListener("touchcancel",end,{passive:false});
        btn.addEventListener("mousedown",start);btn.addEventListener("mouseup",end);btn.addEventListener("mouseleave",end);
      };
      press(btnL,"left",true); press(btnR,"right",true);
      const jumpStart=(e)=>{e.preventDefault();ensureAudio();touch.jump=true;btnJ.classList.add("pressed");activeBtns.add(btnJ.id);updateActive();};
      const jumpEnd=(e)=>{e.preventDefault();touch.jump=false;btnJ.classList.remove("pressed");activeBtns.delete(btnJ.id);updateActive()};
      btnJ.addEventListener("touchstart",jumpStart,{passive:false});btnJ.addEventListener("touchend",jumpEnd,{passive:false});btnJ.addEventListener("touchcancel",jumpEnd,{passive:false});
      btnJ.addEventListener("mousedown",jumpStart);btnJ.addEventListener("mouseup",jumpEnd);btnJ.addEventListener("mouseleave",jumpEnd);
    }
  }

  // ===== Animação VanBerto =====
  function scheduleBlink(scene){
    const blinkOnce=()=>{
      if(!player) return;
      player.setTexture("vanberto_blink");
      scene.time.delayedCall(120,()=>{if(player)applyVanBertoTexture(scene);});
      scene.time.delayedCall(2200+Math.floor(Math.random()*2600),blinkOnce);
    };
    scene.time.delayedCall(1800,blinkOnce);
  }

  function applyVanBertoTexture(scene){
    if(!player||!player.body) return;
    if(awaitingQuiz||!startOverlay.classList.contains("hidden")||!historyOverlay.classList.contains("hidden")){
      if(player.texture.key!=="vanberto_open") player.setTexture("vanberto_open"); return;
    }
    const onGround=!!player.body.blocked.down, moving=Math.abs(player.body.velocity.x)>5;
    if(onGround&&moving){
      const step=Math.floor(scene.time.now/140)%2;
      const tex=step===0?"vanberto_walk1":"vanberto_walk2";
      if(player.texture.key!==tex) player.setTexture(tex);
    } else { if(player.texture.key!=="vanberto_open") player.setTexture("vanberto_open"); }
  }

  // ===== TEXTURAS =====
  function makeTextures(scene){
    makePlatformTexture(scene);
    makeDoorTexture(scene);
    makeVirusTextures(scene);
    makeSparkTexture(scene);
    makePetalTexture(scene);
    makeItemTextures(scene);
    makeVanBertoTexture(scene,"vanberto_open",false,-1);
    makeVanBertoTexture(scene,"vanberto_blink",true,-1);
    makeVanBertoTexture(scene,"vanberto_walk1",false,0);
    makeVanBertoTexture(scene,"vanberto_walk2",false,1);
  }

  // Plataforma de pedra açoriana
  function makePlatformTexture(scene){
    if(scene.textures.exists("platform_stone")) return;
    const g=scene.make.graphics({x:0,y:0,add:false});
    g.fillStyle(0x000000,0.2); g.fillRoundedRect(3,22,100,6,3);
    g.fillStyle(0x5c3a1e,1);   g.fillRoundedRect(0,5,100,19,4);
    g.fillStyle(0x7a5030,1);   g.fillRoundedRect(0,0,100,9,4);
    g.lineStyle(2.5,0xfdf6e3,0.9); g.strokeRect(0,0,100,2);
    g.fillStyle(0xc8a46e,0.3);
    for(let i=0;i<5;i++) g.fillRect(6+i*18,10,12,3);
    g.fillStyle(0xe8c87a,0.4); g.fillRoundedRect(3,1,94,4,3);
    g.lineStyle(2,0x3b1f08,0.9); g.strokeRoundedRect(0,0,100,24,4);
    [14,36,58,82].forEach(fx=>{g.fillStyle(0xc8a46e,1);g.fillCircle(fx,3,2.5);g.fillStyle(0xfdf6e3,0.7);g.fillCircle(fx,3,1);});
    g.generateTexture("platform_stone",100,28); g.destroy();
  }

  // Porta — livro antigo
  function makeDoorTexture(scene){
    if(scene.textures.exists("door_book")) return;
    const w=72,h=90, tex=scene.textures.createCanvas("door_book",w,h), ctx=tex.getContext();
    // Moldura exterior amarelo-ouro muito brilhante
    ctx.fillStyle="#ffd700";
    ctx.beginPath(); ctx.roundRect(2,2,68,86,8); ctx.fill();
    // Painel azul UE brilhante — NÃO escuro
    ctx.fillStyle="#003399";
    ctx.beginPath(); ctx.roundRect(7,7,58,76,5); ctx.fill();
    // Brilho no topo do painel
    ctx.fillStyle="rgba(255,255,255,0.25)";
    ctx.beginPath(); ctx.roundRect(8,8,56,30,4); ctx.fill();
    // 12 estrelas amarelas grandes em círculo
    ctx.fillStyle="#ffdd00";
    ctx.shadowColor="#ffffff"; ctx.shadowBlur=8;
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2 - Math.PI/2;
      const sx=36+20*Math.cos(a), sy=48+20*Math.sin(a);
      // Estrela de 5 pontas
      ctx.save(); ctx.translate(sx,sy);
      ctx.beginPath();
      for(let j=0;j<5;j++){
        const outer=Math.PI*2*j/5 - Math.PI/2;
        const inner=outer + Math.PI/5;
        j===0 ? ctx.moveTo(Math.cos(outer)*5, Math.sin(outer)*5)
              : ctx.lineTo(Math.cos(outer)*5, Math.sin(outer)*5);
        ctx.lineTo(Math.cos(inner)*2, Math.sin(inner)*2);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    ctx.shadowBlur=0;
    // Contorno exterior dourado brilhante
    ctx.strokeStyle="#ffd700"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.roundRect(2,2,68,86,8); ctx.stroke();
    // Maçaneta branca brilhante
    ctx.fillStyle="#ffffff";
    ctx.beginPath(); ctx.arc(52,65,5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#ffd700"; ctx.lineWidth=1.5; ctx.stroke();
    tex.refresh();
  }

  // ===== Vírus — texturas melhoradas (port. do Internet Segura) =====
  function makeVirusTextures(scene){
    // ── Redondo (vermelho) ──
    if(!scene.textures.exists("virus_round")){
      const tex=scene.textures.createCanvas("virus_round",60,60), ctx=tex.getContext();
      const cx=30, cy=30;
      ctx.beginPath(); ctx.arc(cx,cy,28,0,Math.PI*2); ctx.fillStyle="rgba(220,38,38,0.18)"; ctx.fill();
      const gr=ctx.createRadialGradient(cx-6,cy-6,4,cx,cy,22);
      gr.addColorStop(0,"#fca5a5"); gr.addColorStop(1,"#ef4444");
      ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2); ctx.fillStyle=gr; ctx.fill();
      ctx.strokeStyle="#991b1b"; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2); ctx.stroke();
      for(let i=0;i<8;i++){
        const a=(Math.PI*2*i)/8;
        const x1=cx+Math.cos(a)*22, y1=cy+Math.sin(a)*22;
        const x2=cx+Math.cos(a)*30, y2=cy+Math.sin(a)*30;
        ctx.strokeStyle="#ef4444"; ctx.lineWidth=3;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
        ctx.beginPath(); ctx.arc(x2,y2,3,0,Math.PI*2); ctx.fillStyle="#fca5a5"; ctx.fill();
      }
      ctx.fillStyle="#7f1d1d";
      ctx.beginPath(); ctx.arc(cx-7,cy-5,3.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+7,cy-5,3.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx-5,cy+7,1.5,0,Math.PI*2); ctx.fillStyle="#fca5a5"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,   cy+7,1.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+5, cy+7,1.5,0,Math.PI*2); ctx.fill();
      tex.refresh();
    }
    // ── Estrela (laranja) ──
    if(!scene.textures.exists("virus_spike")){
      const tex=scene.textures.createCanvas("virus_spike",60,60), ctx=tex.getContext();
      const cx=30, cy=30, r1=24, r2=14;
      ctx.beginPath();
      for(let i=0;i<20;i++){
        const a=(Math.PI*2*i)/20-Math.PI/2, r=i%2===0?r1:r2;
        if(i===0) ctx.moveTo(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
        else ctx.lineTo(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
      }
      ctx.closePath(); ctx.fillStyle="#f97316"; ctx.fill();
      ctx.strokeStyle="#c2410c"; ctx.lineWidth=2; ctx.stroke();
      ctx.globalAlpha=0.3; ctx.beginPath(); ctx.arc(cx-5,cy-5,8,0,Math.PI*2); ctx.fillStyle="#fff7ed"; ctx.fill(); ctx.globalAlpha=1;
      ctx.fillStyle="#431407";
      ctx.beginPath(); ctx.arc(cx-6,cy-3,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+6,cy-3,3,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#431407"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(cx,cy+7,4,0.2,Math.PI-0.2); ctx.stroke();
      tex.refresh();
    }
    // ── Bicho (roxo) com antenas, pernas e olhos com brilho ──
    if(!scene.textures.exists("virus_bug")){
      const tex=scene.textures.createCanvas("virus_bug",60,60), ctx=tex.getContext();
      const gr=ctx.createRadialGradient(24,22,4,30,28,22);
      gr.addColorStop(0,"#d8b4fe"); gr.addColorStop(1,"#7c3aed");
      ctx.beginPath(); ctx.ellipse(30,30,22,18,0,0,Math.PI*2); ctx.fillStyle=gr; ctx.fill();
      ctx.strokeStyle="#4c1d95"; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.ellipse(30,30,22,18,0,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle="#4c1d95"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(24,13); ctx.lineTo(18,4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(36,13); ctx.lineTo(42,4); ctx.stroke();
      ctx.beginPath(); ctx.arc(18,4,3,0,Math.PI*2); ctx.fillStyle="#7c3aed"; ctx.fill();
      ctx.beginPath(); ctx.arc(42,4,3,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#4c1d95"; ctx.lineWidth=2;
      for(let i=0;i<3;i++){
        const y=22+i*10;
        ctx.beginPath(); ctx.moveTo(8,y); ctx.lineTo(20,y+2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(52,y); ctx.lineTo(40,y+2); ctx.stroke();
      }
      ctx.fillStyle="#1e1b4b";
      ctx.beginPath(); ctx.arc(24,27,3.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(36,27,3.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="white";
      ctx.beginPath(); ctx.arc(22.5,25.5,1.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(34.5,25.5,1.5,0,Math.PI*2); ctx.fill();
      tex.refresh();
    }
  }

  function makeSparkTexture(scene){
    if(scene.textures.exists("spark_item")) return;
    const g=scene.make.graphics({x:0,y:0,add:false});
    g.fillStyle(0xe8c87a,1);g.fillCircle(6,6,6);g.generateTexture("spark_item",12,12);g.destroy();
  }

  function makePetalTexture(scene){
    if(scene.textures.exists("petal")) return;
    const tex=scene.textures.createCanvas("petal",14,10),ctx=tex.getContext();
    ctx.fillStyle="#e8c87a";ctx.beginPath();ctx.ellipse(7,5,6,4,0.4,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="#c8a46e";ctx.lineWidth=0.8;ctx.stroke();tex.refresh();
  }

  function makeItemTextures(scene){
    makeTratadoTexture(scene);
    makeMedalhaTexture(scene);
    makeBandeiraTexture(scene);
    makeMoedaTexture(scene);
    makeHeartTexture(scene);
  }

  // ===== TRATADO (rolo azul/dourado — estilo pergaminho UE) =====
  function makeTratadoTexture(scene){
    if(scene.textures.exists("item_tratado")) return;
    const tex=scene.textures.createCanvas("item_tratado",48,52), ctx=tex.getContext();
    // Fundo do rolo — azul UE
    const gr=ctx.createLinearGradient(6,8,42,44);
    gr.addColorStop(0,"#2a4ab0"); gr.addColorStop(1,"#0d2060");
    ctx.fillStyle=gr; ctx.beginPath(); ctx.roundRect(6,8,36,36,3); ctx.fill();
    ctx.strokeStyle="#d4af37"; ctx.lineWidth=2; ctx.stroke();
    // Cilindros topo/base dourados
    ctx.fillStyle="#d4af37"; ctx.beginPath(); ctx.roundRect(4,6,40,6,3); ctx.fill();
    ctx.beginPath(); ctx.roundRect(4,40,40,6,3); ctx.fill();
    // Selo circular no centro
    ctx.beginPath(); ctx.arc(24,26,9,0,Math.PI*2);
    ctx.fillStyle="rgba(212,175,55,0.2)"; ctx.fill();
    ctx.strokeStyle="#d4af37"; ctx.lineWidth=1.5; ctx.stroke();
    // Texto "UE" mini
    ctx.font="bold 9px sans-serif"; ctx.fillStyle="#d4af37";
    ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("UE",24,26);
    // Linhas de texto
    ctx.strokeStyle="#a0b8e0"; ctx.lineWidth=0.8; ctx.globalAlpha=0.4;
    [17,35].forEach(y=>{ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(38,y);ctx.stroke();});
    ctx.globalAlpha=1;
    // Brilho
    ctx.fillStyle="rgba(255,255,255,0.12)"; ctx.fillRect(8,10,12,32);
    tex.refresh();
  }

  // ===== MEDALHA DOURADA (super modo) =====
  function makeMedalhaTexture(scene){
    if(scene.textures.exists("item_medalha")) return;
    const tex=scene.textures.createCanvas("item_medalha",52,58), ctx=tex.getContext();
    // Fita da medalha
    ctx.fillStyle="#1a5fb4"; ctx.fillRect(19,2,6,16);
    ctx.fillStyle="#d4af37"; ctx.fillRect(25,2,8,16);
    // Disco metálico
    const gr=ctx.createRadialGradient(26,38,4,26,38,18);
    gr.addColorStop(0,"#fff8c0"); gr.addColorStop(0.4,"#f5d060"); gr.addColorStop(1,"#b8860b");
    ctx.beginPath(); ctx.arc(26,38,18,0,Math.PI*2);
    ctx.fillStyle=gr; ctx.fill();
    ctx.strokeStyle="#8b6914"; ctx.lineWidth=2.5; ctx.stroke();
    // Brilho
    ctx.beginPath(); ctx.arc(20,32,6,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.fill();
    // Estrela no centro
    ctx.font="18px Apple Color Emoji,Segoe UI Emoji,sans-serif";
    ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("★",26,39);
    ctx.fillStyle="#8b6914"; ctx.font="bold 7px sans-serif"; ctx.fillText("★",26,39);
    tex.refresh();
  }

  // ===== BANDEIRA UE (círculo de 12 estrelas em fundo azul) =====
  function makeBandeiraTexture(scene){
    if(scene.textures.exists("item_bandeira")) return;
    const tex=scene.textures.createCanvas("item_bandeira",50,50), ctx=tex.getContext();
    // Fundo azul UE
    ctx.beginPath(); ctx.roundRect(4,4,42,42,5); ctx.fillStyle="#1a3fa0"; ctx.fill();
    ctx.strokeStyle="#d4af37"; ctx.lineWidth=2; ctx.stroke();
    // 12 estrelas em círculo
    const cx=25, cy=25, r=14;
    ctx.fillStyle="#f5d060";
    for(let i=0;i<12;i++){
      const angle=(i/12)*Math.PI*2 - Math.PI/2;
      const sx=cx+r*Math.cos(angle), sy=cy+r*Math.sin(angle);
      ctx.save(); ctx.translate(sx,sy); ctx.rotate(angle+Math.PI/2);
      ctx.beginPath();
      for(let j=0;j<5;j++){
        const a=(j*4*Math.PI/5)-Math.PI/2;
        const ai=(j*4*Math.PI/5)+Math.PI/10-Math.PI/2;
        j===0?ctx.moveTo(Math.cos(a)*3.5,Math.sin(a)*3.5):ctx.lineTo(Math.cos(a)*3.5,Math.sin(a)*3.5);
        ctx.lineTo(Math.cos(ai)*1.4,Math.sin(ai)*1.4);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    // Brilho leve
    ctx.fillStyle="rgba(255,255,255,0.08)"; ctx.beginPath(); ctx.roundRect(5,5,20,20,3); ctx.fill();
    tex.refresh();
  }

  // ===== MOEDA EURO =====
  function makeMoedaTexture(scene){
    if(scene.textures.exists("item_moeda")) return;
    const tex=scene.textures.createCanvas("item_moeda",46,46), ctx=tex.getContext();
    // Corpo da moeda
    const gr=ctx.createRadialGradient(18,16,3,23,23,20);
    gr.addColorStop(0,"#fefce8"); gr.addColorStop(0.35,"#fde047"); gr.addColorStop(1,"#b45309");
    ctx.beginPath(); ctx.arc(23,23,19,0,Math.PI*2);
    ctx.fillStyle=gr; ctx.fill();
    ctx.strokeStyle="#92400e"; ctx.lineWidth=2.5; ctx.stroke();
    // Anel interno
    ctx.beginPath(); ctx.arc(23,23,14,0,Math.PI*2);
    ctx.strokeStyle="rgba(180,83,9,0.4)"; ctx.lineWidth=1.5; ctx.stroke();
    // Símbolo €
    ctx.font="bold 20px Georgia,serif"; ctx.fillStyle="#92400e";
    ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("€",23,24);
    // Brilho
    ctx.beginPath(); ctx.arc(17,16,6,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.fill();
    tex.refresh();
  }

  function makeHeartTexture(scene){
    if(scene.textures.exists("item_heart")) return;
    const tex=scene.textures.createCanvas("item_heart",50,50),ctx=tex.getContext();
    ctx.beginPath();
    ctx.moveTo(25,42);ctx.bezierCurveTo(6,30,4,16,12,10);ctx.bezierCurveTo(17,6,22,8,25,13);
    ctx.bezierCurveTo(28,8,33,6,38,10);ctx.bezierCurveTo(46,16,44,30,25,42);ctx.closePath();
    const hgr=ctx.createRadialGradient(18,14,3,25,26,20);
    hgr.addColorStop(0,"#fecdd3");hgr.addColorStop(1,"#e11d48");
    ctx.fillStyle=hgr;ctx.fill();ctx.strokeStyle="#9f1239";ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.ellipse(18,16,5,3,-0.5,0,Math.PI*2);ctx.fillStyle="rgba(255,255,255,0.45)";ctx.fill();
    tex.refresh();
  }

  // ===== VanBerto — versão original =====
  function rrVan(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);
    ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }
  function cVan(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function cfVan(ctx,x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function lVan(ctx,x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}

  function makeVanBertoTexture(scene,key,blink,step){
    if(scene.textures.exists(key)) return;
    const w=96,h=96, tex=scene.textures.createCanvas(key,w,h), ctx=tex.getContext();
    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha=0.35; ctx.beginPath(); ctx.arc(48,52,40,0,Math.PI*2); ctx.fillStyle="#93c5fd"; ctx.fill(); ctx.globalAlpha=1;
    const bodyGrad=ctx.createLinearGradient(0,38,0,88); bodyGrad.addColorStop(0,"#e5f2ff"); bodyGrad.addColorStop(1,"#bfdbfe");
    const headGrad=ctx.createLinearGradient(0,14,0,48); headGrad.addColorStop(0,"#e5f2ff"); headGrad.addColorStop(1,"#bfdbfe");
    // cabeça deslocada 4px para baixo (de y=10 para y=14) para dar espaço à antena
    rrVan(ctx,26,14,44,34,18); ctx.fillStyle=headGrad; ctx.fill();
    const visorGrad=ctx.createLinearGradient(30,20,66,38); visorGrad.addColorStop(0,"#22d3ee"); visorGrad.addColorStop(1,"#38bdf8");
    rrVan(ctx,32,22,32,18,10); ctx.fillStyle=visorGrad; ctx.fill();
    if(blink){ctx.globalAlpha=0.85;rrVan(ctx,32,22,32,18,10);ctx.fillStyle="#e5f2ff";ctx.fill();ctx.globalAlpha=1;}
    ctx.fillStyle="#0f172a";
    if(!blink){cVan(ctx,41,31,3);cVan(ctx,55,31,3);}
    else{ctx.lineWidth=3;ctx.strokeStyle="#0f172a";lVan(ctx,38,31,44,31);lVan(ctx,52,31,58,31);}
    // antena: haste de y=14 até y=6, bolinha raio 5 em y=6 — visível e separada da cabeça
    ctx.lineWidth=3; ctx.strokeStyle="#38bdf8"; ctx.beginPath(); ctx.moveTo(48,14); ctx.lineTo(48,7); ctx.stroke();
    cfVan(ctx,48,7,5,"#38bdf8");
    // corpo e resto igual mas +4 em y
    rrVan(ctx,22,44,52,40,20); ctx.fillStyle=bodyGrad; ctx.fill();
    cfVan(ctx,48,66,8,"#9ca3af");
    rrVan(ctx,14,52,8,24,6); ctx.fillStyle="#e5e7eb"; ctx.fill();
    rrVan(ctx,74,52,8,24,6); ctx.fill();
    const baseY=78, stepAmt=3; let leftY=baseY, rightY=baseY;
    if(step===0){leftY=baseY-stepAmt;rightY=baseY+stepAmt;}
    else if(step===1){leftY=baseY+stepAmt;rightY=baseY-stepAmt;}
    rrVan(ctx,30,leftY,14,10,4); ctx.fillStyle="#1f2937"; ctx.fill();
    rrVan(ctx,52,rightY,14,10,4); ctx.fill();
    ctx.lineWidth=3; ctx.strokeStyle="#0f172a";
    rrVan(ctx,26,14,44,34,18); ctx.stroke();
    rrVan(ctx,22,44,52,40,20); ctx.stroke();
    tex.refresh();
  }

  // ===== Fundo =====
  function initBackground(scene){
    bgGraphics    =scene.add.graphics().setDepth(-60);
    starsGraphics =scene.add.graphics().setDepth(-55);
    hillsGraphics =scene.add.graphics().setDepth(-50);
    groundGraphics=scene.add.graphics().setDepth(-10);
    decorGraphics =scene.add.graphics().setDepth(-8);
    clouds=[]; for(let i=0;i<20;i++) clouds.push(scene.add.graphics().setDepth(-40));
    applyBackground(scene,0,2600);
  }

  function applyBackground(scene,themeIdx,worldW){
    const T=THEMES[themeIdx]||THEMES[0];
    bgGraphics.clear(); bgGraphics.fillGradientStyle(T.skyTop,T.skyTop,T.skyBot,T.skyBot,1); bgGraphics.fillRect(0,0,worldW,540);
    starsGraphics.clear(); starData=[];
    const starCount=30+Math.floor(worldW/100);
    for(let i=0;i<starCount;i++) starData.push({x:Math.random()*worldW,y:12+Math.random()*280,r:0.7+Math.random()*1.4,phase:Math.random()*Math.PI*2,speed:0.5+Math.random()*1.1});
    const sp=Math.max(130,Math.floor(worldW/(clouds.length+1)));
    clouds.forEach((g,i)=>{
      g.clear(); const x=100+i*sp,y=55+(i%5)*24,r=18+(i%3)*5;
      g.fillStyle(0xffffff,0.15);g.fillCircle(x+2,y+4,r);g.fillCircle(x+26,y+8,r-4);g.fillCircle(x-20,y+8,r-3);
      g.fillStyle(0xffffff,0.65);g.fillCircle(x,y,r);g.fillCircle(x+24,y+6,r-4);g.fillCircle(x-22,y+7,r-3);g.fillCircle(x+12,y-6,r-7);
    });
    hillsGraphics.clear();
    hillsGraphics.fillStyle(T.hillColor,0.3);
    for(let i=0;i<Math.ceil(worldW/320)+1;i++) hillsGraphics.fillEllipse(i*320+160,420,400,200);
    hillsGraphics.fillStyle(T.grassTop,0.2);
    for(let i=0;i<Math.ceil(worldW/240)+1;i++) hillsGraphics.fillEllipse(i*240+80+(i%2)*60,450,320,160);
    groundGraphics.clear();
    groundGraphics.fillStyle(T.grassTop,1); groundGraphics.fillRect(0,510,worldW,30);
    groundGraphics.fillStyle(0xfdf6e3,0.35); groundGraphics.fillRect(0,510,worldW,8);
    groundGraphics.fillStyle(0x000000,0.1); groundGraphics.fillRect(0,534,worldW,6);
    decorGraphics.clear();
    const dc=[0xc8a46e,0xe8c87a,0xfdf6e3,0xd4a56a,0xb8860b];
    for(let i=0;i<Math.floor(worldW/55);i++){
      const fx=18+i*55+(i%3)*8,fy=514+(i%2)*3,c=dc[i%dc.length];
      decorGraphics.fillStyle(c,0.7);decorGraphics.fillCircle(fx,fy,4);
      decorGraphics.fillStyle(0xffffff,0.6);decorGraphics.fillCircle(fx,fy,1.5);
    }
  }

  // ===== Botões UI =====
  btnMute.onclick=()=>{muted=!muted;btnMute.textContent=muted?"🔇 Som: OFF":"🔊 Som: ON";if(!muted){ensureAudio();SFX.coin();}saveGame();};
  btnHow.onclick=()=>howOverlay.classList.remove("hidden");
  btnCloseHow.onclick=()=>howOverlay.classList.add("hidden");

  // ===== Ecrã todo =====
  const isIOS=/iP(hone|ad|od)/.test(navigator.userAgent);

  function toggleFullscreen(){
    if(isIOS){
      alert("No iPhone/iPad usa o botão 'Partilhar' → 'Adicionar ao ecrã de início' para jogar em ecrã todo.");
      return;
    }
    if(!document.fullscreenElement&&!document.webkitFullscreenElement){
      const el=document.documentElement;
      if(el.requestFullscreen) el.requestFullscreen();
      else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if(document.exitFullscreen) document.exitFullscreen();
      else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }

  function updateFsButtons(full){
    const lbl=full?"✕ Ecrã normal":"⛶ Ecrã todo";
    const b1=document.getElementById("btnFullscreen");
    const b2=document.getElementById("btnFullscreenGame");
    if(b1) b1.textContent=lbl;
    if(b2) b2.textContent=lbl;
  }

  document.addEventListener("fullscreenchange",()=>updateFsButtons(!!document.fullscreenElement));
  document.addEventListener("webkitfullscreenchange",()=>updateFsButtons(!!document.webkitFullscreenElement));

  const btnFs=document.getElementById("btnFullscreen");
  const btnFsGame=document.getElementById("btnFullscreenGame");
  if(btnFs) btnFs.onclick=toggleFullscreen;
  if(btnFsGame) btnFsGame.onclick=toggleFullscreen;
  // Tecla F para fullscreen
  window.addEventListener("keydown",e=>{ if(e.key?.toLowerCase()==="f"&&!e.target.matches("input")) toggleFullscreen(); });

  btnStart.onclick=()=>{
    ensureAudio();SFX.coin();
    playerName=(playerNameInput?.value||"").trim();
    currentLevel=0;score=0;lives=3;livesLostThisLevel=0;
    quizStats.total=0;quizStats.correct=0;quizStats.everWrong=false;quizStats.errors=[];
    try{localStorage.removeItem(SAVE_KEY);}catch{}
    startOverlay.classList.add("hidden");
    document.body.classList.add("game-started");
    const legend=document.getElementById("legend");
    if(legend) legend.classList.remove("hidden");
    if(sceneRef){loadLevel(sceneRef,0);showHistory(0,()=>{});saveGame();}
  };

  const btnRetry=document.getElementById("btnRetry"), btnExit=document.getElementById("btnExit");
  if(btnRetry) btnRetry.onclick=()=>{
    gameOverOverlay.classList.add("hidden");
    lives=3;score=0;resetQuizStats();livesLostThisLevel=0;
    Object.keys(usedQuizByLevel).forEach(k=>usedQuizByLevel[k].clear());
    scoreText.setText(`⭐ Pontos: ${score}`);updateHearts();
    awaitingQuiz=false;sceneRef.physics.resume();loadLevel(sceneRef,0);saveGame();
  };
  if(btnExit) btnExit.onclick=()=>{
    gameOverOverlay.classList.add("hidden");try{sceneRef.physics.pause();}catch{}
    lives=3;score=0;resetQuizStats();livesLostThisLevel=0;
    startOverlay.classList.remove("hidden");
  };

  const btnWinRestart=document.getElementById("btnWinRestart");
  if(btnWinRestart) btnWinRestart.onclick=()=>{
    winOverlay.classList.add("hidden");
    document.getElementById("confetti")?.classList.add("hidden");
    lives=3;score=0;currentLevel=0;resetQuizStats();livesLostThisLevel=0;
    Object.keys(usedQuizByLevel).forEach(k=>usedQuizByLevel[k].clear());
    awaitingQuiz=false;
    try{sceneRef.physics.pause();}catch{}
    startOverlay.classList.remove("hidden");
    document.body.classList.remove("game-started");
    document.getElementById("legend")?.classList.add("hidden");
    saveGame();
  };
});

// Resize
window.addEventListener("resize",()=>{try{if(window.__eu_game?.scale)window.__eu_game.scale.refresh();}catch{}});

// Pausa automática ao mudar de separador
document.addEventListener("visibilitychange",()=>{
  try{
    const game=window.__eu_game; if(!game) return;
    const scene=game.scene.scenes[0]; if(!scene) return;
    if(document.hidden){scene.physics.pause();}
    else{
      const overlays=["startOverlay","quizOverlay","historyOverlay","gameOverOverlay","winOverlay"];
      const anyOpen=overlays.some(id=>{const el=document.getElementById(id);return el&&!el.classList.contains("hidden");});
      const isPaused=!!(document.getElementById("btnPause")?.textContent?.includes("Continuar"));
      if(!anyOpen&&!isPaused) scene.physics.resume();
    }
  }catch{}
});
