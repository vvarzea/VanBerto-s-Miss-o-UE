// ===== Conteúdo narrativo — MISSÃO EUROPA (Dia da Europa) =====
// Ficheiro puramente de dados, sem lógica de jogo.
// Os ids internos dos bosses (virus_gigante, monstro_phishing, robo_spam, espiao_sombras) mantêm-se
// por compatibilidade com o motor: 1.º Guardião dos Mapas, 2.º Dragão da Confusão Cultural,
// 3.º Titã da Discórdia, 4.º Sombra da Indiferença.

export const REGION_INTRO = {
  origens: {
    vanberto: "A bandeira perdeu as estrelas! Vamos recuperar os mapas e os símbolos da Europa!",
    arrival: "Bem-vindo ao Reino das Bandeiras Perdidas — mapas, países, capitais e símbolos da Europa. 🗺️"
  },
  desenvolvimento: {
    vanberto: "Aqui a Europa fala mil línguas... vamos descobrir as suas culturas!",
    arrival: "Bem-vindo ao Vale das Mil Culturas — línguas, monumentos, sabores e tradições. 🎭"
  },
  protecao: {
    vanberto: "Esta fortaleza guarda a história da nossa união... vamos descobrir porque cooperamos!",
    arrival: "A Fortaleza da União guarda a história, os valores e os direitos dos cidadãos europeus. 🏛️"
  },
  participacao: {
    vanberto: "Estamos quase lá! Falta recuperar a última estrela... a do futuro!",
    arrival: "O Futuro da Europa pede ambiente, ciência, viagens e jovens participativos. 🌱"
  }
};

// "{N}" é substituído pelo número real de saltos necessários (def.hp, já com o +1 do modo Difícil)
// no momento em que o texto é mostrado — ver startBossFight(). Nunca escrever o número aqui.
export const BOSS_OBJECTIVE = {
  virus_gigante: "Desvia-te dos pinos de mapa 📍 que o Guardião dos Mapas atira e salta-lhe em cima {N} vezes para o vencer!",
  monstro_phishing: "Desvia-te dos balões de confusão 💬 que o Dragão lança e salta-lhe em cima {N} vezes para o vencer!",
  robo_spam: "O Titã patrulha depressa e atira pedras 🪨 — apanha o ritmo e salta-lhe em cima {N} vezes para o vencer!",
  espiao_sombras: "A Sombra anda muito depressa a atirar orbes de indiferença 🌑! Salta-lhe em cima {N} vezes para o vencer!"
};

// "reaction" = fala do VanBerto's ANTES do boss se apresentar; "rally" = DEPOIS da ameaça, antes do combate.
export const BOSS_INTRO_VB = {
  virus_gigante: {
    reaction: "Os mapas estão todos baralhados... alguém por aqui levou as estrelas!",
    rally: "Vamos mostrar-lhe que conhecemos a Europa de lés a lés!"
  },
  monstro_phishing: {
    reaction: "Tantas línguas misturadas... isto está uma grande confusão!",
    rally: "Cada cultura é uma riqueza! Não vais baralhar-nos!"
  },
  robo_spam: {
    reaction: "Sinto a Europa dividida... este gigante quer separar-nos!",
    rally: "Juntos somos mais fortes! A cooperação vence a discórdia!"
  },
  espiao_sombras: {
    reaction: "Está tudo tão cinzento... como se ninguém se importasse.",
    rally: "Quando participamos, a Europa brilha! Vamos acender a última estrela!"
  }
};

// Uma única fala de vitória por boss, ligada às estrelas recuperadas (3 por mundo, 12 no total).
export const BOSS_VICTORY_VB = {
  virus_gigante: "Conseguimos! Recuperámos as 3 primeiras estrelas da bandeira! ⭐ (3/12)",
  monstro_phishing: "Vencemos! Mais 3 estrelas voltaram a brilhar! ⭐ (6/12)",
  robo_spam: "A união venceu a discórdia! Já temos 9 estrelas! ⭐ (9/12)",
  espiao_sombras: "As 12 estrelas brilham outra vez! A Europa está unida! 🇪🇺 (12/12)"
};

// Frases curtas mostradas (sem parar o jogo, só um "floatie") sempre que se apanha um objeto de conhecimento no combate do Dragão.
export const KNOWLEDGE_FACTS = [
  "⭐ A bandeira tem 12 estrelas.",
  "🗣️ A UE tem 24 línguas oficiais.",
  "🤝 Unida na diversidade!",
  "🎭 Cada cultura é uma riqueza.",
  "🕊️ A UE nasceu para defender a paz."
];

// Falas curtas do boss em marcos de HP durante o combate.
export const BOSS_HP_TAUNTS = {
  virus_gigante: {
    atStart: ["Ninguém se orienta sem os meus mapas!", "Não me consegues apanhar!", "Vou esconder todos os países!"],
    hp2: ["Argh! Isso picou...", "Não contava com esse salto!", "Ainda tenho mapas de sobra!"],
    hp1: ["Não... os mapas estão a ficar claros!", "Isto não pode ser...", "Estou a perder o norte!"]
  },
  monstro_phishing: {
    atStart: ["Vais ficar baralhado!", "Ninguém entende ninguém aqui!", "Achas mesmo que me vais vencer?"],
    hp2: ["Isso foi sorte!", "Não contava com esse salto...", "Grrr, tenta outra vez!"],
    hp1: ["Não! As culturas estão a entender-se!", "Isto não pode ser...", "A diversidade... é mais forte!"]
  },
  robo_spam: {
    atStart: ["Vou dividir-vos a todos!", "Não me apanhas, sou rápido demais!", "Cada um por si!"],
    hp2: ["Essa abalou-me as pedras!", "Não contava com essa pancada!", "Ainda tenho muros para erguer!"],
    hp1: ["Não... estão todos a cooperar!", "Os meus muros... estão a ruir!", "Isto não pode ser!"]
  },
  espiao_sombras: {
    atStart: ["Para quê tentar? Ninguém liga!", "Nunca me vais apanhar no ar!", "Nada vai mudar, desiste!"],
    hp2: ["Impossível! Estás mesmo interessado?", "Isso não devia ter acontecido...", "Grrr, mais rápido da próxima vez!"],
    hp1: ["Não... a tua participação está a vencer!", "A sombra... está a desaparecer!", "Isto não pode ser o fim!"]
  }
};

// Um "letreiro"/NPC por nível — alinhado por artIdx (0-19), tal como HISTORY[].
export const NPC_SIGNS = [
  { emoji:"🧭", text:"Sabias que a Europa é o segundo continente mais pequeno do mundo?" },
  { emoji:"🇵🇹", text:"Portugal e Espanha aderiram juntos à então CEE, em 1986." },
  { emoji:"🏛️", text:"A UE tem 27 países e cada um tem a sua capital!" },
  { emoji:"🇪🇺", text:"A bandeira europeia tem sempre 12 estrelas, mesmo com 27 países!" },
  { emoji:"🎶", text:"O hino da UE é a «Ode à Alegria», de Beethoven — só música, sem letra oficial." },
  { emoji:"🗣️", text:"A UE tem 24 línguas oficiais. Aprender uma língua nova abre muitas portas!" },
  { emoji:"🏰", text:"O centro histórico de Angra do Heroísmo, nos Açores, é Património Mundial da UNESCO." },
  { emoji:"🥘", text:"O fado é Património Imaterial da Humanidade desde 2011." },
  { emoji:"🤝", text:"O lema da UE é «Unida na diversidade»." },
  { emoji:"📜", text:"A 9 de maio de 1950, Robert Schuman propôs unir o carvão e o aço da Europa." },
  { emoji:"🕊️", text:"Em 2012, a União Europeia recebeu o Prémio Nobel da Paz." },
  { emoji:"📖", text:"O Tratado de Roma, de 1957, criou a CEE com 6 países fundadores." },
  { emoji:"⚖️", text:"Dignidade, liberdade, democracia, igualdade e Estado de direito: os valores da UE." },
  { emoji:"🪪", text:"Se és cidadão de um país da UE, és também cidadão europeu!" },
  { emoji:"🏢", text:"O Parlamento Europeu é eleito de 5 em 5 anos pelos cidadãos." },
  { emoji:"🌱", text:"A UE quer chegar à neutralidade climática em 2050." },
  { emoji:"☀️", text:"Nos Açores há eletricidade produzida com o calor da terra: energia geotérmica!" },
  { emoji:"🔬", text:"O Galileo é o sistema europeu de navegação por satélite." },
  { emoji:"🚆", text:"O Erasmus+ já levou milhões de jovens a estudar noutros países." },
  { emoji:"⭐", text:"Para a Europa brilhar, todos temos de participar!" }
];
