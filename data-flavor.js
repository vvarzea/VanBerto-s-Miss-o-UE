// ===== Frases soltas e mensagens de "tempero" — MISSÃO EUROPA =====
// PRAISE, PAUSE_TIPS, LEVEL_ENTRY_PHRASES, DYNAMIC_MSGS_CORRECT, DYNAMIC_MSGS_WRONG,
// VB_LEVEL_INTRO, VB_HIT, VB_QUIZ_CORRECT, VB_QUIZ_WRONG, VB_STAR_POWER, VB_PERFECT_LEVEL

export const PRAISE = ["🌟 Excelente!", "⭐ Muito bem!", "🇪🇺 Boa resposta!", "🎉 Fantástico!", "✨ Brilhante!", "🏆 Continua assim!"];

// PAUSE_TIPS são sobre MECÂNICAS de jogo (agachar, super-salto, power-ups,
// tipos de vilão), não sobre o tema — mantidos tal como no original.
export const PAUSE_TIPS = [
  "🔽 <b>Agachar:</b> Prime ↓, S ou o botão 'Agachar' para te esquivares de ataques altos e passares por baixo de obstáculos!",
  "💡 <b>Star Power:</b> Apanha a estrela ⭐ e atropela vilões durante 8 segundos — +50 pontos cada!",
  "🛡️ <b>Escudo:</b> Fica invencível por 8s e absorve um golpe de qualquer vilão.",
  "🦅 <b>Asas:</b> Dão um segundo salto no ar — ótimo para plataformas altas!",
  "❓ <b>Bloco surpresa:</b> Passa por cima dos blocos <b>❓</b> para revelar itens escondidos!",
  "🟠 <b>Trampolim:</b> Salta numa plataforma laranja para voar muito mais alto que o normal.",
  "🥇 <b>Bónus:</b> Completa um nível sem perder vidas para ganhar +50 pontos extra!",
  "🔴 Trapalhão — lento e previsível. 🔵 Saltitão — salta às vezes. 🟢 Perseguilão — persegue-te!",
  "❤️ <b>Coração:</b> Apanha-o para ganhar +1 vida (máximo 5 ao mesmo tempo).",
  "🦘 <b>Nível dos Trampolins:</b> Os vãos são intransponíveis sem trampolim — procura-os no chão!",
  "🔥 <b>Nível da Lava:</b> O chão queima! Mantém-te sempre em cima das plataformas.",
  "🏃 <b>Nível da Esteira:</b> Todas as plataformas se movem — observa o ritmo antes de saltar!"
];

// Frase curta mostrada ao entrar em cada nível — alinhada por posição no
// array LEVELS (0-19), NÃO por artIdx.
export const LEVEL_ENTRY_PHRASES = [
  "A Europa está no mapa! 🗺️",
  "Portugal faz parte da Europa! 🇵🇹",
  "Cada país tem a sua capital! 🏛️",
  "Doze estrelas em círculo! 🇪🇺",
  "Unida na diversidade! 🎶",
  "Tantas línguas, uma Europa! 🗣️",
  "A Europa tem monumentos incríveis! 🏰",
  "Sabores e tradições de norte a sul! 🥘",
  "Respeitar as diferenças! 🤝",
  "9 de maio — Dia da Europa! 📜",
  "A paz é um tesouro! 🕊️",
  "Da CECA à União Europeia! 📖",
  "Valores que nos unem! ⚖️",
  "Direitos de todos os cidadãos! 🪪",
  "Conhece as instituições! 🏢",
  "Cuidar do ambiente é cuidar do futuro! 🌱",
  "Energia limpa para todos! ☀️",
  "A ciência abre caminhos! 🔬",
  "Viajar e estudar na Europa! 🚆",
  "A Europa brilha quando participas! ⭐"
];

export const DYNAMIC_MSGS_CORRECT = [
  "🌟 Fantástico!",
  "✨ Excelente!",
  "🎉 És incrível!",
  "🇪🇺 Sabia que conseguias!",
  "🏆 Estrela recuperada!",
  "⭐ Muito bem!"
];

export const DYNAMIC_MSGS_WRONG = [
  "💪 Quase!", "🔄 Vamos tentar novamente!", "📚 Aprender também é vencer!",
  "❤️ Não desistas!", "💡 Próxima vez consegues!"
];

// Fala mais longa do VanBerto's à entrada de cada nível — indexada por
// posição no array LEVELS (0-19), NÃO por artIdx. O motor usa sempre
// VB_LEVEL_INTRO[0] no arranque do jogo (ver dia-crianca.js).
export const VB_LEVEL_INTRO = [
  "Hoje vamos descobrir onde fica a Europa! 🗺️ Estás preparado?",
  "Portugal fica no extremo ocidental da Europa! 🇵🇹 Vamos explorar o mapa?",
  "Cada país tem a sua capital! 🏛️ Vamos aprender algumas?",
  "A bandeira tem 12 estrelas douradas em círculo! 🇪🇺 Vamos recuperá-las?",
  "Hino, lema, moeda e Dia da Europa! 🎶 Vamos descobrir os símbolos?",
  "A Europa fala muitas línguas! 🗣️ Vamos ouvi-las?",
  "Torres, castelos e palácios! 🏰 Vamos visitar o património?",
  "Pizza, pastel de nata, fado, flamenco! 🥘 Vamos saborear a Europa?",
  "Todos diferentes, todos iguais em direitos! 🤝 Vamos respeitar as diferenças?",
  "A 9 de maio de 1950 começou tudo! 📜 Vamos conhecer a Declaração Schuman?",
  "A paz não nasce sozinha! 🕊️ Vamos descobrir como se construiu?",
  "Seis países fundaram a CEE em 1957! 📖 Vamos viajar no tempo?",
  "Dignidade, liberdade, democracia, igualdade! ⚖️ Vamos conhecer os valores?",
  "Ser cidadão europeu dá-nos direitos! 🪪 Vamos descobri-los?",
  "Parlamento, Comissão, Conselho e Tribunal! 🏢 Vamos conhecê-los?",
  "O planeta é a nossa casa! 🌱 Vamos cuidar dele?",
  "O Sol e o vento dão-nos energia! ☀️ Vamos aproveitá-la?",
  "A ciência ajuda a resolver problemas! 🔬 Vamos inovar?",
  "Erasmus+, comboios e Schengen! 🚆 Vamos viajar pela Europa?",
  "Último nível! A tua participação acende a 12.ª estrela! ⭐ Dá tudo!"
];

export const VB_HIT = [
  "Ups! Perdemos uma vida, mas os heróis nunca desistem! 💪",
  "Autsch! Cuida-te! Os vilões estão rápidos hoje! 🔴",
  "Ai! Respira fundo e vamos de novo! ❤️",
  "Atenção aos vilões! Já consegues! 🛡️",
  "Não faz mal! Cada erro ensina algo novo! 📚",
  "Vamos lá, guerreiro digital! Ainda temos vidas! 🌟"
];

export const VB_QUIZ_CORRECT = [
  "INCRÍVEL! Sabias mesmo a resposta! 🏆",
  "Que craque! Mais uma estrela a brilhar! ✨",
  "Fantástico! Estou tão orgulhoso de ti! 🎉",
  "Isso mesmo! A Europa agradece! 🇪🇺",
  "Brilhante! Nada te escapa! 🌟",
  "Que resposta! Mereces uma estrela! ⭐"
];

export const VB_QUIZ_WRONG = [
  "Quase! Aprende e vai mais forte na próxima! 📖",
  "Não faz mal! Errar também é aprender! 💡",
  "Boa tentativa! Desta vez não foi, mas chegas lá! 💪",
  "Até os heróis erram — o importante é tentar! ❤️",
  "Relê a dica e tenta outra vez! 🔄"
];

export const VB_STAR_POWER = [
  "STAR POWER! Agora és IMPARÁVEL! ⭐",
  "Uau, a estrela! Vai atropelar tudo! 💥",
  "SUPER VANBERTO'S ATIVADO! 🌟",
  "Estrela apanhada! 8 segundos de glória! ✨"
];

export const VB_PERFECT_LEVEL = [
  "PERFEITO! Nenhuma vida perdida! Lendário! 🏆",
  "Uau! Passaste o nível sem um arranhão! ⭐",
  "Impecável! Guardião da Europa nível máximo! 🌟",
  "Incrível! Isso merecia um bónus extra! 🎉"
];
