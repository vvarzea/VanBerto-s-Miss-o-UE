// ===== Sistemas de progressão: mapa, artefactos, conquistas — MISSÃO EUROPA =====
// MAP_REGIONS, ARTEFACTS, ARTEFACT_SETS, SET_REACTIONS, ACHIEVEMENTS_DEFS

// Mantém os 20 níveis e a sua dificuldade intactos (só o TEMA de cada
// nível mudou, ver data-levels.js). Os 4 mundos e as posições dos bosses
// mantêm-se exatamente iguais à estrutura original.
export const MAP_REGIONS = [
  { id:"origens",        icon:"🗺️", name:"Reino das Bandeiras Perdidas", sub:"Mapas, países, capitais e o Guardião dos Mapas",       levels:[0,1,2,3,4],
    mapBg:"map-mundo1.webp",
    nodePos:[{x:11.0,y:74.0},{x:30.0,y:38.0},{x:46.0,y:52.0},{x:56.0,y:82.0},{x:88.0,y:70.0}] },
  { id:"desenvolvimento",icon:"🎭", name:"Vale das Mil Culturas",         sub:"Línguas, tradições e o Dragão da Confusão Cultural",   levels:[5,6,7,8],
    mapBg:"map-mundo2.webp",
    nodePos:[{x:14.0,y:80.0},{x:40.0,y:62.0},{x:49.0,y:32.0},{x:80.0,y:40.0}] },
  { id:"protecao",       icon:"🏛️", name:"Fortaleza da União",            sub:"Dia da Europa, valores, direitos e o Titã da Discórdia", levels:[9,10,11,12,13,14],
    mapBg:"map-mundo3.webp",
    nodePos:[{x:9.0,y:82.0},{x:24.0,y:38.0},{x:44.0,y:88.0},{x:55.0,y:62.0},{x:73.0,y:22.0},{x:84.0,y:73.0}] },
  { id:"participacao",   icon:"🌱", name:"O Futuro da Europa",            sub:"Ambiente, inovação, jovens e a Sombra da Indiferença",  levels:[15,16,17,18,19],
    mapBg:"map-mundo4.webp",
    nodePos:[{x:5.0,y:78.0},{x:18.0,y:89.0},{x:35.0,y:82.0},{x:30.0,y:59.0},{x:50.0,y:53.0}] },
  { id:"base",           icon:"🏠", name:"Base do VanBerto's",            sub:"O teu ponto de partida",                               levels:[] },
];

export const ARTEFACTS = [
  { emoji:"🧭", name:"Bússola da Europa", short:"Onde Fica a Europa", color:"#40d0ff", glow:"rgba(64,208,255,0.6)", vanberto:"Já sei onde fica a Europa no mapa!", set:0 },
  { emoji:"🇵🇹", name:"Bandeira de Portugal", short:"Portugal na Europa", color:"#ff6060", glow:"rgba(255,96,96,0.6)", vanberto:"Portugal, no extremo ocidental da Europa!", set:0 },
  { emoji:"🏛️", name:"Mapa das Capitais", short:"Países e Capitais", color:"#ffd700", glow:"rgba(255,215,0,0.6)", vanberto:"Lisboa, Paris, Roma, Bruxelas... já sei muitas!", set:0 },
  { emoji:"🇪🇺", name:"Bandeira das 12 Estrelas", short:"A Bandeira Europeia", color:"#4a7bff", glow:"rgba(74,123,255,0.6)", vanberto:"Doze estrelas douradas em círculo!", set:0 },
  { emoji:"🎶", name:"Partitura da Ode à Alegria", short:"Símbolos da UE", color:"#ffe060", glow:"rgba(255,224,96,0.6)", vanberto:"Unida na diversidade!", set:0 },
  { emoji:"🗣️", name:"Balão das Línguas", short:"Línguas da Europa", color:"#ff9060", glow:"rgba(255,144,96,0.6)", vanberto:"24 línguas oficiais, uma só Europa!", set:1 },
  { emoji:"🏰", name:"Chave do Património", short:"Monumentos e Património", color:"#c0a0ff", glow:"rgba(192,160,255,0.6)", vanberto:"Proteger o património é guardar a nossa história!", set:1 },
  { emoji:"🥘", name:"Prato Tradicional", short:"Sabores e Tradições", color:"#ffa040", glow:"rgba(255,160,64,0.6)", vanberto:"Cada país tem sabores e músicas únicos!", set:1 },
  { emoji:"🤝", name:"Mãos Unidas", short:"Diversidade e Respeito", color:"#80ffb0", glow:"rgba(128,255,176,0.6)", vanberto:"Diferentes, mas unidos pelo respeito!", set:1 },
  { emoji:"📜", name:"Declaração Schuman", short:"Dia da Europa", color:"#ffd080", glow:"rgba(255,208,128,0.6)", vanberto:"9 de maio de 1950: tudo começou aqui!", set:1 },
  { emoji:"🕊️", name:"Pomba da Paz", short:"Paz e Cooperação", color:"#e8f4ff", glow:"rgba(232,244,255,0.6)", vanberto:"Juntos, a paz é mais forte!", set:2 },
  { emoji:"📖", name:"Tratado de Roma", short:"Da CECA à UE", color:"#ffc060", glow:"rgba(255,192,96,0.6)", vanberto:"Seis países começaram, hoje somos 27!", set:2 },
  { emoji:"⚖️", name:"Balança dos Valores", short:"Valores Europeus", color:"#ff6b35", glow:"rgba(255,107,53,0.6)", vanberto:"Dignidade, liberdade, democracia, igualdade e Estado de direito!", set:2 },
  { emoji:"🪪", name:"Cartão do Cidadão Europeu", short:"Direitos dos Cidadãos", color:"#60d0ff", glow:"rgba(96,208,255,0.6)", vanberto:"Sou cidadão do meu país e da Europa!", set:2 },
  { emoji:"🏢", name:"Chave do Parlamento", short:"Instituições Europeias", color:"#80c8ff", glow:"rgba(128,200,255,0.6)", vanberto:"Parlamento, Comissão, Conselho e Tribunal!", set:2 },
  { emoji:"🌱", name:"Rebento do Futuro", short:"Proteger o Ambiente", color:"#60e060", glow:"rgba(96,224,96,0.6)", vanberto:"Reduzir, reutilizar e reciclar!", set:3 },
  { emoji:"☀️", name:"Painel Solar", short:"Energia Limpa e Clima", color:"#ffe060", glow:"rgba(255,224,96,0.6)", vanberto:"Sol e vento: energia para o futuro!", set:3 },
  { emoji:"🔬", name:"Microscópio da Inovação", short:"Ciência e Inovação", color:"#c080ff", glow:"rgba(192,128,255,0.6)", vanberto:"A ciência abre caminhos!", set:3 },
  { emoji:"🚆", name:"Bilhete Erasmus+", short:"Viajar e Estudar", color:"#ff80a0", glow:"rgba(255,128,160,0.6)", vanberto:"Estudar noutro país é uma grande aventura!", set:3 },
  { emoji:"⭐", name:"A 12.ª Estrela", short:"Jovens e Cidadania Digital", color:"#ffd700", glow:"rgba(255,215,0,0.7)", vanberto:"A Europa brilha quando todos participamos!", set:3 },
];

export const ARTEFACT_SETS = [
  { name:"Mapas e Símbolos",        icon:"🗺️", bonus:150 },
  { name:"Culturas da Europa",      icon:"🎭", bonus:150 },
  { name:"Valores e Instituições",  icon:"🏛️", bonus:150 },
  { name:"O Futuro da Europa",      icon:"🌱", bonus:200 },
];

export const SET_REACTIONS = [
  "🎉 Conjunto MAPAS E SÍMBOLOS completo! Já conheces a Europa de lés a lés!",
  "🎭 Conjunto CULTURAS completo! Respeitas e celebras a diversidade europeia!",
  "🏛️ Conjunto VALORES E INSTITUIÇÕES completo! Percebes como a Europa se une!",
  "⭐ Conjunto COMPLETO! As 12 estrelas brilham — GUARDIÃO SUPREMO da Europa!",
];

export const ACHIEVEMENTS_DEFS = [
  { id:"primeiros_passos", tier:"🥉", name:"Primeiros Passos",        desc:"Completa o primeiro nível." },
  { id:"curioso",          tier:"🥉", name:"Curioso",                  desc:"Lê 10 curiosidades." },
  { id:"explorador",       tier:"🥈", name:"Explorador",               desc:"Encontra todos os segredos de um nível." },
  { id:"sabio",            tier:"🥈", name:"Sábio",                    desc:"Acerta 20 perguntas." },
  { id:"caca_tesouros",    tier:"🏆", name:"Caçador de Tesouros",      desc:"Encontra todas as salas secretas do jogo." },
  { id:"guardiao",         tier:"🥇", name:"Guardião da Europa",       desc:"Completa o jogo e recupera as 12 estrelas." },
  { id:"mestre",           tier:"🥇", name:"Mestre VanBerto's",        desc:"Acerta todas as perguntas à primeira tentativa." },
  { id:"lenda",            tier:"🏆", name:"Lenda Europeia",           desc:"100% de conclusão — todos os níveis e todas as estrelas." },
];
