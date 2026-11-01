# -*- coding: utf-8 -*-
"""Gera data-quiz.js da Missão Europa (Dia da Europa).
Cada nível tem: tema (chave), título/texto do cartão «Sabias que…?», dica final, perguntas Fácil (3 opções)
e Difícil/Extremo (4 opções). A 1.ª opção de cada pergunta é a certa — o jogo baralha as opções ao mostrar."""
import json, os

L = []  # lista de níveis

def nivel(chave, titulo, texto, dica, facil, avancado):
    L.append(dict(chave=chave, titulo=titulo, texto=texto, dica=dica, facil=facil, avancado=avancado))

# ───────────────────────── MUNDO 1 — Reino das Bandeiras Perdidas ─────────────────────────
nivel("mapa_europa", "🗺️ Onde Fica a Europa?",
  "A Europa é um continente no hemisfério norte, banhado pelo Oceano Atlântico, pelo Oceano Ártico e por vários mares, como o Mediterrâneo e o Báltico. Portugal fica no extremo sudoeste, e o Cabo da Roca é o ponto mais ocidental da Europa continental.",
  "A Europa e a Ásia formam um único bloco de terra, a Eurásia. Portugal está no extremo ocidental da Europa, virado para o Atlântico.",
  [("Em que continente fica Portugal?", "Europa", "África", "Ásia", "Portugal fica no extremo sudoeste da Europa."),
   ("Que oceano banha a costa de Portugal?", "Oceano Atlântico", "Oceano Índico", "Oceano Pacífico", "A costa portuguesa, incluindo as ilhas dos Açores e da Madeira, está no Oceano Atlântico."),
   ("Qual destes é um mar que banha o sul da Europa?", "Mar Mediterrâneo", "Mar Vermelho", "Mar da Arábia", "O Mediterrâneo banha países como Espanha, França, Itália e Grécia."),
   ("A leste, a Europa está ligada a que continente?", "Ásia", "América", "Oceânia", "A Europa e a Ásia formam a Eurásia, uma enorme massa de terra contínua."),
   ("Qual destas cordilheiras fica na Europa?", "Os Alpes", "O Himalaia", "Os Andes", "Os Alpes atravessam países como a França, a Suíça, a Itália e a Áustria."),
   ("Qual destes rios atravessa várias capitais europeias?", "O Danúbio", "O Nilo", "O Amazonas", "O Danúbio passa por Viena, Bratislava, Budapeste e Belgrado.")],
  [("Qual das opções descreve melhor a posição da Europa no globo?", "No hemisfério norte, a oeste da Ásia e a norte de África", "No hemisfério sul, a norte da Antártida", "No hemisfério sul, a oeste da América do Sul", "No hemisfério norte, a sul de África", "A Europa fica no hemisfério norte, entre o Atlântico e a Ásia, e a norte de África."),
   ("Em que península ficam Portugal e Espanha?", "Península Ibérica", "Península Itálica", "Península Balcânica", "Península Escandinava", "Portugal e Espanha ocupam quase toda a Península Ibérica."),
   ("O Estreito de Gibraltar separa a Europa de que continente?", "África", "Ásia", "América", "Oceânia", "No ponto mais estreito, tem cerca de 14 km e separa a Espanha de Marrocos."),
   ("Qual é o ponto mais ocidental da Europa continental?", "Cabo da Roca", "Cabo Norte", "Cabo de São Vicente", "Cabo Finisterra", "O Cabo da Roca, em Portugal, é o ponto mais a oeste da Europa continental."),
   ("Porque se diz que Portugal tem uma posição estratégica na Europa?", "Porque tem uma longa costa atlântica, aberta às rotas marítimas", "Porque fica no centro geográfico da Europa", "Porque não tem fronteiras terrestres", "Porque fica junto ao Mar Báltico", "A costa atlântica ligou Portugal a África, às Américas e à Ásia desde os Descobrimentos.")])

nivel("portugal_europa", "🇵🇹 Portugal no Mapa da Europa",
  "Portugal tem fronteira terrestre apenas com a Espanha, na Península Ibérica. Inclui também dois arquipélagos no Atlântico, os Açores e a Madeira. Aderiu à então Comunidade Económica Europeia em 1986, depois de o tratado ter sido assinado em 1985 no Mosteiro dos Jerónimos, em Lisboa.",
  "Portugal e Espanha aderiram juntos à CEE, hoje União Europeia. Os Açores e a Madeira são regiões ultraperiféricas da UE.",
  [("Com que país Portugal tem fronteira terrestre?", "Espanha", "França", "Itália", "Portugal só faz fronteira por terra com a Espanha."),
   ("Qual é a capital de Portugal?", "Lisboa", "Porto", "Coimbra", "Lisboa é a capital e a maior cidade do país."),
   ("Que arquipélagos fazem parte de Portugal?", "Açores e Madeira", "Canárias e Baleares", "Malta e Chipre", "Os Açores e a Madeira são regiões autónomas portuguesas, no Atlântico."),
   ("Em que oceano ficam os Açores?", "Oceano Atlântico", "Oceano Índico", "Oceano Pacífico", "Os Açores são nove ilhas no meio do Atlântico Norte."),
   ("Em que ano Portugal entrou na então CEE, hoje União Europeia?", "1986", "1957", "2002", "Portugal e Espanha aderiram em 1 de janeiro de 1986."),
   ("Que moeda se usa em Portugal?", "O euro", "O escudo", "A libra", "O euro substituiu o escudo em 2002.")],
  [("Em que ano o euro substituiu o escudo nas notas e moedas de Portugal?", "2002", "1986", "1999", "2010", "As notas e moedas de euro começaram a circular a 1 de janeiro de 2002."),
   ("Qual é o ponto mais alto de Portugal?", "Montanha do Pico, nos Açores", "Torre, na Serra da Estrela", "Pico Ruivo, na Madeira", "Serra do Marão", "A Montanha do Pico tem 2351 metros; na parte continental o ponto mais alto é a Torre, na Serra da Estrela."),
   ("Como se chamam as regiões da UE muito afastadas do continente europeu, como os Açores e a Madeira?", "Regiões ultraperiféricas", "Regiões fronteiriças", "Regiões continentais", "Regiões neutras", "As regiões ultraperiféricas têm apoios especiais da UE por estarem longe e serem insulares."),
   ("Qual destes rios nasce em Espanha e desagua em Lisboa?", "Tejo", "Douro", "Mondego", "Guadiana", "O Tejo é o maior rio da Península Ibérica e desagua no Atlântico, junto a Lisboa."),
   ("Em que ano foi assinado o tratado de adesão de Portugal à CEE, nos Jerónimos?", "1985", "1975", "1995", "2005", "O tratado foi assinado a 12 de junho de 1985 e Portugal aderiu em 1986.")])

nivel("paises_capitais", "🏛️ Países e Capitais",
  "A União Europeia tem 27 países. Cada um tem a sua capital: Lisboa (Portugal), Madrid (Espanha), Paris (França), Roma (Itália), Berlim (Alemanha) e Atenas (Grécia) são só alguns exemplos. Países como a Noruega, a Suíça e o Reino Unido ficam na Europa, mas não fazem parte da UE.",
  "A UE tem 27 países. Estar na Europa não é o mesmo que ser membro da UE: a Noruega, a Suíça e o Reino Unido ficam na Europa, mas não são membros.",
  [("Qual é a capital da França?", "Paris", "Lyon", "Marselha", "Paris é a capital da França e fica no rio Sena."),
   ("Qual é a capital de Espanha?", "Madrid", "Barcelona", "Sevilha", "Madrid é a capital de Espanha, no centro do país."),
   ("Qual é a capital de Itália?", "Roma", "Milão", "Veneza", "Roma é a capital de Itália e já foi o centro do Império Romano."),
   ("Qual é a capital da Alemanha?", "Berlim", "Munique", "Hamburgo", "Berlim é a capital e a maior cidade da Alemanha."),
   ("Qual é a capital da Grécia?", "Atenas", "Salónica", "Esparta", "Atenas é a capital da Grécia e é uma das cidades mais antigas da Europa."),
   ("Quantos países fazem parte da União Europeia?", "27", "12", "50", "A UE tem 27 países desde a saída do Reino Unido, em 2020.")],
  [("Qual é a capital da Polónia?", "Varsóvia", "Cracóvia", "Gdansk", "Praga", "Varsóvia é a capital da Polónia, aderiu à UE em 2004."),
   ("Qual é a capital dos Países Baixos?", "Amesterdão", "Roterdão", "Haia", "Bruxelas", "Amesterdão é a capital; o governo e o parlamento ficam em Haia."),
   ("Qual é a capital da Áustria?", "Viena", "Salzburgo", "Berna", "Budapeste", "Viena é a capital da Áustria e fica no rio Danúbio."),
   ("Qual destes países NÃO pertence à União Europeia?", "Noruega", "Suécia", "Grécia", "Irlanda", "A Noruega fica na Europa, mas não é membro da UE."),
   ("Qual é a capital da Irlanda?", "Dublin", "Belfast", "Cork", "Edimburgo", "Dublin é a capital da República da Irlanda, país da UE.")])

nivel("bandeira_ue", "🇪🇺 A Bandeira Azul das 12 Estrelas",
  "A bandeira da União Europeia tem um fundo azul com doze estrelas douradas em círculo. O número doze é um símbolo de perfeição e plenitude, não tem a ver com o número de países, por isso não muda quando entram novos membros. O círculo representa a união e a harmonia entre os povos da Europa.",
  "A bandeira tem sempre 12 estrelas douradas em círculo sobre fundo azul, mesmo com 27 países na UE.",
  [("Que cor tem o fundo da bandeira da UE?", "Azul", "Vermelho", "Verde", "O fundo da bandeira europeia é azul, como o céu."),
   ("Quantas estrelas tem a bandeira da UE?", "12", "27", "5", "São sempre 12 estrelas, independentemente do número de países."),
   ("Que cor têm as estrelas da bandeira europeia?", "Douradas (amarelas)", "Brancas", "Vermelhas", "As estrelas são douradas sobre fundo azul."),
   ("Como estão dispostas as estrelas na bandeira?", "Em círculo", "Em linha reta", "Em triângulo", "O círculo simboliza a união entre os povos."),
   ("O círculo de estrelas simboliza…", "A união e a harmonia entre os povos da Europa", "As fases da Lua", "Os países fundadores", "O círculo representa solidariedade e harmonia."),
   ("Se um novo país entrar na UE, quantas estrelas terá a bandeira?", "Continua a ter 12", "Passa a ter 28", "Perde uma estrela", "O número 12 é simbólico, por isso nunca muda.")],
  [("Que organização criou a bandeira de 12 estrelas, em 1955?", "O Conselho da Europa", "A NATO", "A ONU", "O Parlamento Europeu", "O Conselho da Europa adotou-a em 1955; a UE passou a usá-la oficialmente em 1985."),
   ("Porque tem a bandeira 12 estrelas, se a UE tem 27 países?", "Porque o 12 simboliza perfeição e plenitude, não o número de países", "Porque só 12 países podem votar", "Porque 12 países fundaram a UE", "Porque o Parlamento reúne 12 meses por ano", "O número 12 é um símbolo; a bandeira não muda com o número de países."),
   ("Segundo a descrição oficial, o azul do fundo representa…", "O céu do Ocidente", "O Mar Mediterrâneo", "A água dos rios", "A paz mundial", "A descrição oficial fala em estrelas douradas sobre o fundo azul do céu do Ocidente."),
   ("Qual destas organizações usa a mesma bandeira de 12 estrelas, apesar de não ser a UE?", "O Conselho da Europa", "A NATO", "A ONU", "A FIFA", "O Conselho da Europa, com sede em Estrasburgo, é uma organização diferente da UE."),
   ("Em que anos a bandeira foi adotada, primeiro pelo Conselho da Europa e depois pelas Comunidades Europeias?", "1955 e 1985", "1945 e 1957", "1992 e 2002", "1985 e 2004", "Foi adotada em 1955 pelo Conselho da Europa e em 1985 pelas Comunidades Europeias.")])

nivel("simbolos_ue", "🎶 Os Símbolos da União Europeia",
  "A UE tem vários símbolos: a bandeira de doze estrelas, o hino (a «Ode à Alegria», de Beethoven, só música), o lema «Unida na diversidade», a moeda euro e o Dia da Europa, celebrado a 9 de maio. O euro entrou em circulação em notas e moedas a 1 de janeiro de 2002 e, em 2026, é usado por 21 países.",
  "O hino é a «Ode à Alegria» de Beethoven, o lema é «Unida na diversidade» e o Dia da Europa é a 9 de maio.",
  [("Qual é o hino da União Europeia?", "A «Ode à Alegria», de Beethoven", "A Portuguesa", "O Hino da Juventude", "A melodia vem da 9.ª Sinfonia de Beethoven."),
   ("Qual é o lema da UE?", "Unida na diversidade", "Cada país por si", "Mais depressa, mais longe", "O lema mostra que a Europa é feita de culturas diferentes que trabalham juntas."),
   ("Em que dia se celebra o Dia da Europa?", "9 de maio", "1 de janeiro", "25 de dezembro", "A 9 de maio celebra-se a paz e a união na Europa."),
   ("Que moeda é usada por muitos países da UE?", "O euro", "A libra", "O dólar", "O euro é a moeda comum de vários países da UE."),
   ("Qual é o símbolo do euro?", "€", "$", "£", "O símbolo € parece um «E» de Europa."),
   ("O hino europeu tem letra oficial?", "Não, é só música", "Sim, em português", "Sim, em francês", "Sem letra, o hino pertence a todos, seja qual for a língua que falem.")],
  [("Quem compôs a melodia do hino europeu?", "Ludwig van Beethoven", "Mozart", "Bach", "Verdi", "A melodia vem do último andamento da 9.ª Sinfonia de Beethoven."),
   ("O Dia da Europa recorda…", "A Declaração Schuman, de 1950", "A queda do Muro de Berlim", "A entrada do euro em circulação", "O Tratado de Maastricht", "A 9 de maio de 1950, Robert Schuman propôs unir o carvão e o aço da Europa."),
   ("O lema «Unida na diversidade» significa que…", "Os países trabalham juntos, respeitando as suas diferenças", "Todos os países têm de ser iguais", "Só existe uma língua", "Cada país governa sozinho", "A diversidade de línguas e culturas é vista como uma riqueza."),
   ("Quando começaram a circular as notas e moedas de euro?", "1 de janeiro de 2002", "1999", "1992", "2010", "Em 1999 o euro existiu só em pagamentos eletrónicos; as notas e moedas chegaram em 2002."),
   ("Quantos países usam o euro em 2026?", "21", "27", "12", "19", "A Bulgária tornou-se o 21.º país do euro em 1 de janeiro de 2026.")])

# ───────────────────────── MUNDO 2 — Vale das Mil Culturas ─────────────────────────
nivel("linguas", "🗣️ Tantas Línguas, Uma Europa",
  "A União Europeia tem 24 línguas oficiais, como o português, o espanhol, o francês, o alemão e o grego. Quase todas usam o alfabeto latino, mas o grego e o búlgaro usam outros alfabetos. As línguas são uma riqueza da Europa e há mais, como o mirandês, falado em Portugal, que não são oficiais da UE.",
  "A UE tem 24 línguas oficiais para que cada cidadão possa falar com as instituições na sua língua.",
  [("Que língua se fala em Portugal?", "Português", "Espanhol", "Francês", "O português é a língua oficial de Portugal."),
   ("Como se diz «obrigado» em inglês?", "Thank you", "Gracias", "Merci", "«Thank you» é «obrigado» em inglês."),
   ("Como se diz «olá» em francês?", "Bonjour", "Hola", "Ciao", "«Bonjour» é usado para cumprimentar em francês."),
   ("Como se diz «bom dia» em espanhol?", "Buenos días", "Guten Tag", "Buongiorno", "«Buenos días» é o bom dia espanhol."),
   ("Como se diz «olá» em italiano?", "Ciao", "Hallo", "Hej", "«Ciao» serve para dizer olá e adeus em italiano."),
   ("Quantas línguas oficiais tem a UE?", "24", "3", "100", "A UE tem 24 línguas oficiais.")],
  [("Qual destas línguas é falada na Alemanha e na Áustria?", "Alemão", "Neerlandês", "Sueco", "Polaco", "O alemão é falado na Alemanha e na Áustria."),
   ("Além do alfabeto latino, que alfabetos são usados em línguas oficiais da UE?", "O grego e o cirílico", "O árabe e o hebraico", "O chinês e o japonês", "O devanágari e o tâmil", "O grego é usado na Grécia e em Chipre; o cirílico, na Bulgária."),
   ("A que família pertence o português?", "Línguas românicas, que vêm do latim", "Línguas germânicas", "Línguas eslavas", "Línguas urálicas", "O português, o espanhol, o francês, o italiano e o romeno vêm do latim."),
   ("Porque tem a UE tantas línguas oficiais?", "Para que os cidadãos possam comunicar com as instituições na sua língua", "Porque ninguém pode aprender outra língua", "Porque só se fala latim", "Porque cada língua tem um país na ONU", "A UE respeita a diversidade linguística e as pessoas podem dirigir-se a ela na sua língua."),
   ("O Dia Europeu das Línguas, a 26 de setembro, serve para…", "Celebrar a diversidade linguística da Europa", "Falar apenas inglês", "Fazer exames de línguas", "Comemorar o Dia da Europa", "Promove a aprendizagem de línguas e o respeito por todas elas.")])

nivel("monumentos", "🏰 Monumentos e Património",
  "A Europa está cheia de monumentos famosos: a Torre Eiffel em Paris, o Coliseu em Roma, a Acrópole em Atenas e a Sagrada Família em Barcelona. Portugal tem a Torre de Belém e o Mosteiro dos Jerónimos, em Lisboa, e o centro histórico de Angra do Heroísmo, nos Açores, que são Património Mundial da UNESCO.",
  "O património conta a história dos povos e deve ser protegido para as gerações futuras.",
  [("Em que cidade fica a Torre Eiffel?", "Paris", "Roma", "Madrid", "A Torre Eiffel é o símbolo de Paris."),
   ("Em que país fica o Coliseu?", "Itália", "Grécia", "França", "O Coliseu fica em Roma, em Itália."),
   ("Em que cidade fica a Torre de Belém?", "Lisboa", "Porto", "Faro", "A Torre de Belém fica à beira do rio Tejo, em Lisboa."),
   ("Que monumento antigo fica em Atenas, na Grécia?", "A Acrópole, com o Pártenon", "O Big Ben", "A Sagrada Família", "A Acrópole tem mais de dois mil anos."),
   ("Em que cidade fica a Sagrada Família?", "Barcelona", "Lisboa", "Berlim", "A Sagrada Família é uma basílica desenhada por Gaudí."),
   ("O que é o Património Mundial da UNESCO?", "Locais especiais protegidos para toda a humanidade", "Uma lista de restaurantes", "Os maiores estádios", "A UNESCO protege locais importantes para todos.")],
  [("Qual destes monumentos fica em Berlim?", "O Portão de Brandemburgo", "A Torre Eiffel", "O Coliseu", "A Acrópole", "O Portão de Brandemburgo é um símbolo de Berlim e da união alemã."),
   ("Em Portugal, qual destes locais é Património Mundial da UNESCO?", "O centro histórico de Angra do Heroísmo, nos Açores", "O Estádio da Luz", "O Centro Comercial Colombo", "A Ponte 25 de Abril", "Angra do Heroísmo é Património Mundial desde 1983; também a Paisagem da Vinha da Ilha do Pico."),
   ("Que monumento romano, usado para espetáculos, fica em Itália?", "O Coliseu", "O Pártenon", "A Alhambra", "A Torre de Pisa", "O Coliseu recebia combates e espetáculos para milhares de pessoas."),
   ("A Alhambra, um palácio-fortaleza, fica em que país?", "Espanha", "Portugal", "Marrocos", "Itália", "A Alhambra fica em Granada, na Andaluzia."),
   ("Porque é importante proteger o património?", "Porque conta a nossa história e deve passar às gerações futuras", "Porque rende sempre dinheiro", "Porque só os turistas gostam", "Porque nunca se estraga", "O património une as pessoas através da memória e da cultura.")])

nivel("gastronomia_musica", "🍕 Sabores, Música e Tradições",
  "Cada país europeu tem sabores, músicas e festas próprias: a pizza em Itália, a paella em Espanha, o pastel de nata em Portugal, o croissant em França. O fado, símbolo musical português, é Património Imaterial da Humanidade desde 2011 e o flamenco espanhol também é reconhecido pela UNESCO.",
  "A comida, a música e as festas contam a história de cada povo. Conhecê-las é uma forma de respeitar a diversidade.",
  [("De que país é típica a pizza?", "Itália", "Alemanha", "Suécia", "A pizza nasceu em Nápoles, em Itália."),
   ("Qual é o doce típico de Portugal, famoso em Belém?", "O pastel de nata", "O croissant", "O strudel", "O pastel de nata é uma das marcas de Portugal."),
   ("A paella é um prato típico de que país?", "Espanha", "Grécia", "Polónia", "A paella nasceu em Valência, em Espanha."),
   ("O croissant é um pão doce típico de que país?", "França", "Irlanda", "Finlândia", "O croissant é muito associado a França."),
   ("Qual destes é um instrumento tradicional português?", "A guitarra portuguesa", "O didgeridoo", "O banjo", "A guitarra portuguesa acompanha o fado."),
   ("O Carnaval de Veneza é famoso por…", "As suas máscaras elegantes", "As touradas", "Os carros antigos", "As máscaras venezianas são conhecidas em todo o mundo.")],
  [("Desde que ano o fado é Património Imaterial da Humanidade da UNESCO?", "2011", "1986", "2002", "2020", "O fado foi reconhecido pela UNESCO em 2011."),
   ("Qual é o queijo grego, feito de leite de ovelha e cabra?", "Feta", "Parmesão", "Gouda", "Camembert", "O feta é típico da Grécia e usa-se em saladas."),
   ("A Oktoberfest é uma festa popular em que país?", "Alemanha", "Bélgica", "Irlanda", "Suécia", "A Oktoberfest realiza-se todos os anos em Munique, na Alemanha."),
   ("O que é uma tradição?", "Um costume que passa de geração em geração", "Uma moda de um dia", "Uma regra do Parlamento Europeu", "Um prato novo", "As tradições ligam o passado ao presente."),
   ("O flamenco é uma música e dança tradicional de que país?", "Espanha", "Itália", "Portugal", "Grécia", "O flamenco nasceu na Andaluzia, em Espanha.")])

nivel("diversidade_respeito", "🤝 Diversidade e Respeito",
  "A Europa é feita de muitas línguas, religiões e modos de vida, e essa diversidade é uma riqueza. A Carta dos Direitos Fundamentais da UE proíbe a discriminação, ou seja, tratar alguém pior por causa da sua origem, cor, religião, deficiência ou idade. Respeitar as diferenças faz parte do nosso dia a dia.",
  "Na Europa vivemos juntos com respeito pelas diferenças. Incluir os outros faz-nos mais fortes.",
  [("Na Europa há muitas culturas diferentes. O que devemos fazer?", "Respeitar as diferenças", "Troçar do que é diferente", "Evitar quem é diferente", "Respeitar a diversidade é a base de uma Europa unida."),
   ("Se um colega fala outra língua em casa, o que podes fazer?", "Aprender algumas palavras e incluí-lo nos jogos", "Ignorá-lo", "Rir-te do sotaque", "Incluir e aprender com os outros é o melhor caminho."),
   ("Qual é o lema da UE que fala de diversidade?", "Unida na diversidade", "Cada um por si", "Tudo igual", "O lema reconhece a riqueza das diferenças."),
   ("Todos temos direito a ser tratados com…", "Respeito e dignidade", "Indiferença", "Desprezo", "Todas as pessoas têm dignidade."),
   ("O que é a discriminação?", "Tratar alguém pior por causa de quem é", "Ajudar um amigo", "Partilhar um lanche", "A discriminação é injusta e está proibida na UE."),
   ("O que ganhamos ao conhecer outras culturas?", "Aprendemos coisas novas e fazemos novos amigos", "Perdemos a nossa identidade", "Ficamos todos iguais", "Conhecer outras culturas alarga os nossos horizontes.")],
  [("Qual atitude mostra respeito pela diversidade cultural?", "Ouvir e aprender com costumes diferentes dos meus", "Achar que a minha cultura é melhor", "Evitar quem tem outra religião", "Imitar um sotaque para rir", "Respeito é curiosidade e abertura."),
   ("O que significa «inclusão»?", "Fazer com que todos possam participar", "Escolher só quem é parecido connosco", "Excluir quem é novo", "Deixar alguém de fora por ser diferente", "Incluir é garantir que ninguém fica de fora."),
   ("A Carta dos Direitos Fundamentais da UE proíbe a discriminação por…", "Sexo, cor, origem, religião, deficiência ou idade, entre outras", "Apenas pela idade", "Apenas pela cor dos olhos", "Apenas pela nacionalidade", "A Carta protege todas as pessoas de tratamento injusto."),
   ("Um estereótipo é…", "Uma ideia simplificada e muitas vezes injusta sobre um grupo", "Um tipo de música", "Uma lei europeia", "Uma festa tradicional", "Os estereótipos esquecem que cada pessoa é única."),
   ("Se vires alguém a ser excluído por ser diferente, o melhor é…", "Incluí-lo e, se for preciso, pedir ajuda a um adulto", "Fingir que não vês", "Juntar-me a quem exclui", "Gozar também", "Ajudar e pedir apoio é sempre a melhor resposta.")])

# ───────────────────────── MUNDO 3 — Fortaleza da União ─────────────────────────
nivel("dia_europa_schuman", "📜 Dia da Europa e Declaração Schuman",
  "A 9 de maio de 1950, o ministro francês dos Negócios Estrangeiros, Robert Schuman, propôs que a França e a Alemanha pusessem em comum a produção de carvão e aço, para tornar uma nova guerra impensável. Essa Declaração Schuman é o ponto de partida da construção europeia e, por isso, o 9 de maio é o Dia da Europa.",
  "O Dia da Europa, a 9 de maio, celebra a paz e a união dos povos europeus.",
  [("Em que dia se celebra o Dia da Europa?", "9 de maio", "1 de junho", "31 de outubro", "O Dia da Europa é a 9 de maio."),
   ("Quem fez a Declaração de 9 de maio de 1950?", "Robert Schuman", "Cristóvão Colombo", "Napoleão", "Schuman era ministro francês dos Negócios Estrangeiros."),
   ("De que país era ministro Robert Schuman?", "França", "Portugal", "Alemanha", "Schuman era ministro dos Negócios Estrangeiros de França."),
   ("O que propôs a Declaração Schuman?", "Pôr em comum o carvão e o aço para evitar novas guerras", "Criar uma moeda única", "Abrir as fronteiras aos turistas", "Quem controla em conjunto o carvão e o aço dificilmente faz guerra."),
   ("Porque é importante o Dia da Europa?", "Celebra a paz e a união entre os povos europeus", "Marca o fim do ano escolar", "É o Natal europeu", "Lembra que a cooperação trouxe paz à Europa."),
   ("O que se costuma fazer no Dia da Europa?", "Festas, debates e jogos sobre a Europa em escolas e cidades", "Fecham-se as fronteiras", "Cancelam-se as aulas em todo o mundo", "As escolas e as cidades celebram a Europa com atividades.")],
  [("Em que ano foi apresentada a Declaração Schuman?", "1950", "1945", "1957", "1992", "A declaração foi feita a 9 de maio de 1950."),
   ("Quais eram os dois recursos a pôr em comum, segundo a Declaração?", "Carvão e aço", "Petróleo e gás", "Trigo e vinho", "Ouro e prata", "O carvão e o aço eram essenciais para a indústria e para as armas."),
   ("Porque se escolheram o carvão e o aço?", "Porque eram essenciais para fazer armas, e geri-los em conjunto dificultava a guerra", "Porque eram os produtos mais baratos", "Porque eram os mais bonitos", "Porque eram os únicos exportados", "Quem partilha os recursos para a guerra, perde a vontade de a fazer."),
   ("Qual foi a primeira comunidade criada com base na Declaração Schuman?", "A CECA, Comunidade Europeia do Carvão e do Aço", "O Euratom", "O espaço Schengen", "O Banco Central Europeu", "A CECA foi criada em 1951, pelo Tratado de Paris."),
   ("A Declaração Schuman é considerada…", "O ponto de partida da construção europeia", "O fim da Segunda Guerra Mundial", "A criação do euro", "A adesão de Portugal", "Dela nasceu a cooperação que levou à União Europeia.")])

nivel("paz_cooperacao", "🕊️ Paz e Cooperação",
  "A Europa viveu duas guerras mundiais no século XX. Depois da Segunda Guerra Mundial, os países perceberam que cooperar era a melhor forma de manter a paz. Em 2012, a União Europeia recebeu o Prémio Nobel da Paz por mais de seis décadas de contribuição para a paz, a reconciliação e a democracia na Europa.",
  "Cooperar significa trabalhar juntos. A UE nasceu para que os países europeus resolvessem os problemas através do diálogo.",
  [("O que a UE ajuda a manter entre os países?", "A paz", "A guerra", "O isolamento", "A UE nasceu para garantir a paz na Europa."),
   ("O que significa «cooperar»?", "Trabalhar em conjunto para um objetivo comum", "Competir sozinho", "Fugir dos problemas", "Cooperar é unir esforços."),
   ("Que prémio recebeu a UE em 2012 por promover a paz?", "O Prémio Nobel da Paz", "O Óscar", "A Bola de Ouro", "O Nobel da Paz reconheceu décadas de paz na Europa."),
   ("As duas guerras mundiais mostraram que…", "É melhor resolver os problemas dialogando", "As guerras resolvem tudo", "Ninguém aprende nada", "Depois das guerras, a Europa escolheu o diálogo."),
   ("Se dois amigos discutem por um jogo, o que ajuda a manter a paz?", "Conversar e chegar a um acordo", "Gritar mais alto", "Deixar de ser amigos", "Conversar é a base da paz, entre amigos e entre países."),
   ("Quando países colaboram, o que acontece muitas vezes?", "Resolvem melhor problemas que são de todos, como o ambiente", "Ficam todos sem amigos", "Tudo se torna impossível", "Juntos, os países têm mais força para resolver problemas comuns.")],
  [("Em que anos decorreram as duas guerras mundiais?", "1914–1918 e 1939–1945", "1815–1820 e 1900–1905", "1950–1955 e 1980–1985", "1789–1799 e 1848", "A Primeira foi de 1914 a 1918 e a Segunda de 1939 a 1945."),
   ("Em que ano a UE recebeu o Prémio Nobel da Paz?", "2012", "1950", "1992", "2020", "O Nobel da Paz foi atribuído à UE em 2012."),
   ("Qual foi o principal objetivo da CECA, criada em 1951?", "Evitar uma nova guerra entre a França e a Alemanha", "Aumentar o turismo", "Criar uma moeda única", "Substituir a NATO", "Unir as indústrias do carvão e do aço tornou a guerra mais difícil."),
   ("O que é a solidariedade entre países europeus?", "Apoiarem-se uns aos outros em momentos difíceis", "Cada um tratar só de si", "Pagar impostos ao país vizinho", "Falar a mesma língua", "A solidariedade é um dos pilares da UE."),
   ("Qual destes é um exemplo de cooperação europeia?", "Países da UE ajudarem-se após catástrofes, como incêndios", "Cada país ignorar os outros", "Países a impedirem viagens", "Cada país construir um muro", "O mecanismo europeu de proteção civil envia ajuda entre países.")])

nivel("historia_ue", "🏛️ Da CECA à União Europeia",
  "Em 1957, seis países (a Bélgica, a França, a Alemanha, a Itália, o Luxemburgo e os Países Baixos) assinaram o Tratado de Roma e criaram a Comunidade Económica Europeia. O Tratado de Maastricht (1992) deu origem à União Europeia, o euro chegou em 2002 e hoje a UE tem 27 países.",
  "A CEE nasceu em 1957 com 6 países. Hoje a UE tem 27, depois de vários alargamentos.",
  [("Em que ano foi assinado o Tratado de Roma?", "1957", "1999", "2020", "O Tratado de Roma criou a CEE em 1957."),
   ("Quantos países fundaram a CEE em 1957?", "6", "12", "27", "Foram seis os países fundadores."),
   ("Qual destes países foi um dos fundadores?", "A França", "Portugal", "A Suécia", "A França foi um dos seis fundadores."),
   ("Em que ano Portugal entrou na CEE, hoje UE?", "1986", "1957", "2004", "Portugal aderiu em 1986, com a Espanha."),
   ("Em que ano o euro começou a circular em notas e moedas?", "2002", "1957", "1986", "As notas e moedas de euro chegaram em 2002."),
   ("Como se chamava a UE antes de ter este nome?", "Comunidade Económica Europeia", "Clube dos Países Ricos", "Aliança do Atlântico", "A CEE foi a base da atual UE.")],
  [("Qual destes países NÃO foi fundador da CEE em 1957?", "Espanha", "Itália", "Bélgica", "Luxemburgo", "A Espanha aderiu em 1986."),
   ("Que tratado criou formalmente a União Europeia, assinado em 1992?", "O Tratado de Maastricht", "O Tratado de Lisboa", "O Tratado de Paris", "O Tratado de Nice", "Maastricht criou a UE e preparou o euro."),
   ("O Tratado de Lisboa, assinado em 2007, entrou em vigor em…", "2009", "2007", "2013", "1993", "Entrou em vigor a 1 de dezembro de 2009."),
   ("Quando foi o maior alargamento da UE, com dez novos países?", "2004", "1995", "1986", "2013", "A 1 de maio de 2004 entraram dez países, sobretudo da Europa de Leste."),
   ("Que país saiu da UE em 31 de janeiro de 2020?", "O Reino Unido", "A França", "A Suíça", "A Noruega", "Foi o chamado «Brexit».")])

nivel("valores_europeus", "⚖️ Valores Europeus",
  "O artigo 2.º do Tratado da União Europeia enumera os valores em que a UE assenta: o respeito pela dignidade humana, a liberdade, a democracia, a igualdade, o Estado de direito e o respeito pelos direitos humanos. São os valores que unem os países europeus e que cada um de nós pode viver no dia a dia.",
  "Dignidade, liberdade, democracia, igualdade e Estado de direito são os valores que unem a Europa.",
  [("Qual destes é um valor da UE?", "A liberdade", "A desigualdade", "A injustiça", "A liberdade é um dos valores da UE."),
   ("O que significa democracia?", "O povo participa nas decisões, por exemplo votando", "Manda só uma pessoa", "Ninguém decide nada", "Na democracia, os cidadãos escolhem os seus representantes."),
   ("O que é a igualdade?", "Todos têm os mesmos direitos", "Só alguns têm direitos", "Todos têm de fazer a mesma coisa", "Igualdade é ter os mesmos direitos e oportunidades."),
   ("A dignidade humana quer dizer que…", "Todas as pessoas merecem respeito", "Só os adultos merecem respeito", "O respeito depende da riqueza", "Toda a pessoa tem valor, sem exceções."),
   ("O que é o Estado de direito?", "Todos, incluindo os governantes, têm de cumprir as leis", "Só o povo cumpre as leis", "Não existem leis", "As leis aplicam-se a todos por igual."),
   ("Qual destas ideias NÃO é um valor da UE?", "A censura", "A democracia", "O respeito pelos direitos humanos", "A UE defende a liberdade de expressão, não a censura.")],
  [("Onde estão enumerados os valores da UE?", "No Tratado da União Europeia (artigo 2.º)", "Na Constituição Portuguesa", "No Código da Estrada", "Na Carta das Nações Unidas", "O artigo 2.º do Tratado lista os valores comuns."),
   ("Qual destas situações defende a liberdade de expressão?", "Poder dar a opinião sem medo, respeitando os outros", "Insultar quem pensa diferente", "Proibir jornais", "Obrigar todos a pensar igual", "A liberdade de expressão tem de respeitar os direitos dos outros."),
   ("A separação de poderes é importante porque…", "Evita que uma só pessoa ou grupo tenha poder a mais", "Faz as leis demorar", "Dispensa os tribunais", "Impede as eleições", "Dividir o poder protege a liberdade."),
   ("Quando as eleições são livres e justas, os cidadãos podem…", "Escolher os seus representantes", "Escolher todas as leis todos os dias", "Evitar pagar impostos", "Mudar as fronteiras", "As eleições são o centro da democracia."),
   ("Que valor protege o direito a um julgamento justo?", "O Estado de direito", "A livre circulação", "O mercado único", "A moeda única", "Num Estado de direito, ninguém está acima da lei.")])

nivel("direitos_cidadaos", "🪪 Direitos dos Cidadãos",
  "Quem tem nacionalidade de um país da UE é também cidadão europeu. Isso dá direito a viver, estudar e trabalhar noutro país da UE, a votar nas eleições europeias, a ser protegido por qualquer embaixada de um país da UE fora da Europa e a usar o Cartão Europeu de Seguro de Doença. A Carta dos Direitos Fundamentais da UE reúne estes direitos.",
  "Ser cidadão europeu significa ter direitos em toda a UE, como viver, estudar e trabalhar noutro país.",
  [("Qual é um direito dos cidadãos da UE?", "Viver, estudar e trabalhar noutro país da UE", "Ter sempre notas máximas", "Não ir à escola", "Os cidadãos da UE podem escolher onde viver na União."),
   ("O que é a cidadania europeia?", "Ser cidadão da UE por seres cidadão de um país membro", "Ter um passaporte espacial", "Ser cidadão de todos os países do mundo", "A cidadania europeia vem juntar-se à nacional."),
   ("Quem pode votar nas eleições europeias?", "Os cidadãos com a idade mínima exigida no seu país", "Só os políticos", "Só quem fala inglês", "Em Portugal, a idade mínima é 18 anos."),
   ("O que significa «livre circulação»?", "Poder viajar e viver noutros países da UE", "Conduzir sem regras", "Ir de graça a todo o lado", "É um dos direitos mais conhecidos da UE."),
   ("Se ficares doente noutro país da UE, podes usar…", "O Cartão Europeu de Seguro de Doença", "O cartão da biblioteca", "O cartão de amigo", "O cartão dá acesso a cuidados de saúde públicos durante uma estadia temporária."),
   ("A moeda única permite…", "Pagar com a mesma moeda em vários países", "Que todos ganhem o mesmo", "Esquecer as contas", "O euro facilita viagens e compras.")],
  [("Que documento reúne os direitos fundamentais dos cidadãos da UE?", "A Carta dos Direitos Fundamentais da UE", "A Carta de Condução", "A Carta Magna da Escola", "O Código Penal", "A Carta junta direitos como a dignidade, a liberdade e a igualdade."),
   ("Em que ano a Carta dos Direitos Fundamentais passou a ter força jurídica?", "2009", "2000", "1957", "2020", "Foi proclamada em 2000 e tornou-se vinculativa com o Tratado de Lisboa, em 2009."),
   ("O que é a «Iniciativa de Cidadania Europeia»?", "Um milhão de cidadãos pode pedir à Comissão que proponha uma lei", "Um concurso de desenho", "Um tipo de passaporte", "Uma eleição para a Comissão", "Exige um milhão de assinaturas em pelo menos sete países."),
   ("Que direito têm os cidadãos da UE fora da UE?", "Proteção de qualquer embaixada de um país da UE, se o seu não tiver representação", "Isenção de impostos", "Ter tudo grátis", "Votar em eleições de outro país", "É a proteção consular dos cidadãos da UE."),
   ("O espaço Schengen permite…", "Atravessar fronteiras internas sem controlos sistemáticos", "Usar o euro em todos os países", "Falar só inglês", "Não pagar portagens", "Facilita viagens entre os países do espaço Schengen.")])

nivel("instituicoes", "🏢 As Instituições Europeias",
  "O Parlamento Europeu, eleito diretamente pelos cidadãos, discute e aprova leis. A Comissão Europeia propõe leis e faz cumprir as regras. O Conselho da UE reúne os governos dos países. O Tribunal de Justiça, no Luxemburgo, garante que o direito europeu é cumprido. Em 2024, Portugal elegeu 21 dos 720 eurodeputados.",
  "O Parlamento Europeu é eleito de cinco em cinco anos. A Comissão fica em Bruxelas, o Tribunal de Justiça no Luxemburgo e o Banco Central Europeu em Frankfurt.",
  [("Onde fica a sede da Comissão Europeia?", "Bruxelas", "Lisboa", "Roma", "A Comissão tem a sede em Bruxelas, na Bélgica."),
   ("Que instituição é eleita diretamente pelos cidadãos?", "O Parlamento Europeu", "A Comissão Europeia", "O Tribunal de Justiça", "Os eurodeputados são eleitos de cinco em cinco anos."),
   ("Quantos anos dura o mandato dos eurodeputados?", "5", "1", "20", "Cada mandato dura cinco anos."),
   ("Além de Bruxelas, onde se reúne o Parlamento Europeu?", "Estrasburgo", "Lisboa", "Madrid", "O Parlamento tem sessões em Bruxelas e em Estrasburgo, em França."),
   ("Onde fica o Tribunal de Justiça da UE?", "No Luxemburgo", "Em Paris", "Em Lisboa", "O Tribunal de Justiça fica no Luxemburgo."),
   ("O que faz o Parlamento Europeu?", "Discute e aprova leis europeias", "Constrói estradas", "Organiza o Campeonato da Europa", "O Parlamento representa os cidadãos nas decisões da UE.")],
  [("Que instituição propõe novas leis europeias?", "A Comissão Europeia", "O Banco Central Europeu", "O Tribunal de Contas", "O Conselho da Europa", "A Comissão tem o poder de propor leis."),
   ("Onde fica a sede do Banco Central Europeu?", "Frankfurt", "Bruxelas", "Estrasburgo", "Paris", "O BCE fica em Frankfurt, na Alemanha."),
   ("Que instituição reúne os governos dos países da UE e decide leis com o Parlamento?", "O Conselho da União Europeia", "O Tribunal de Justiça", "O Parlamento Europeu", "O Eurostat", "No Conselho estão representados os governos dos 27 países."),
   ("Como se chamam os membros do Parlamento Europeu?", "Eurodeputados", "Comissários", "Embaixadores", "Juízes", "Os eurodeputados são eleitos pelos cidadãos."),
   ("Quantos eurodeputados elegeu Portugal em 2024?", "21", "12", "27", "36", "Portugal elegeu 21 dos 720 eurodeputados.")])

# ───────────────────────── MUNDO 4 — O Futuro da Europa ─────────────────────────
nivel("ambiente", "🌱 Proteger o Ambiente",
  "A UE quer ser o primeiro continente com neutralidade climática em 2050. O Pacto Ecológico Europeu apoia a energia limpa, a reciclagem e a economia circular. Cada um de nós pode ajudar: separar o lixo, poupar água e energia e usar mais o transporte público.",
  "Reduzir, reutilizar e reciclar. Pequenos gestos fazem a diferença!",
  [("Qual destes gestos ajuda o ambiente?", "Separar o lixo e reciclar", "Deitar papéis para o chão", "Deixar a torneira aberta", "Reciclar poupa recursos e reduz o lixo."),
   ("De que cor é o ecoponto do papel?", "Azul", "Amarelo", "Verde", "O ecoponto azul é para papel e cartão."),
   ("O que é a sustentabilidade?", "Usar os recursos sem prejudicar o futuro", "Gastar tudo hoje", "Comprar muitas coisas", "Sustentável é o que pode durar para as gerações futuras."),
   ("O que significam os 3 R?", "Reduzir, reutilizar e reciclar", "Rir, ler e rezar", "Rodar, rolar e remar", "Os 3 R ajudam a produzir menos lixo."),
   ("Qual destas energias é renovável?", "A solar", "O carvão", "O petróleo", "A energia solar nunca se esgota."),
   ("Porque devemos plantar árvores?", "Absorvem CO₂ e dão sombra e casa a animais", "Fazem barulho", "Gastam água inutilmente", "As árvores ajudam o clima e a biodiversidade.")],
  [("O que é o Pacto Ecológico Europeu?", "Um plano da UE para chegar à neutralidade climática em 2050", "Um tratado sobre desporto", "Uma moeda ecológica", "Uma lei sobre férias", "Visa reduzir emissões e proteger a natureza."),
   ("O que quer dizer «neutralidade climática»?", "Emitir tantos gases com efeito de estufa como se consegue retirar da atmosfera", "Nunca haver verão", "Proibir todos os carros", "Não haver chuva", "Equilibra as emissões e a sua absorção."),
   ("Qual gás é o principal responsável pelo aquecimento global provocado pelo ser humano?", "O dióxido de carbono (CO₂)", "O oxigénio", "O azoto", "O hélio", "O CO₂ vem sobretudo da queima de combustíveis fósseis."),
   ("O que é a economia circular?", "Reutilizar e reciclar para desperdiçar menos", "Fabricar tudo em fábricas redondas", "Usar e deitar fora", "Comprar tudo novo", "Os produtos e materiais têm uma segunda vida."),
   ("Qual a vantagem de usar o transporte público?", "Menos carros e menos emissões", "Mais trânsito", "Mais poluição", "Menos paragens", "O transporte público reduz o trânsito e a poluição.")])

nivel("energia_clima", "☀️ Energia Limpa e Clima",
  "As energias renováveis, como a solar, a eólica, a hídrica e a geotérmica, produzem eletricidade sem esgotar os recursos da Terra. Portugal produz mais de metade da sua eletricidade com fontes renováveis em vários anos recentes, e nos Açores há eletricidade a partir do calor da própria terra, a energia geotérmica.",
  "Poupar energia e usar energias renováveis ajuda a travar as alterações climáticas.",
  [("Qual destas energias vem do vento?", "A eólica", "A solar", "A hidráulica", "Os aerogeradores transformam o vento em eletricidade."),
   ("Qual destas energias vem do Sol?", "A solar", "A eólica", "A nuclear", "Os painéis solares usam a luz do Sol."),
   ("Os painéis solares servem para…", "Produzir eletricidade a partir do Sol", "Guardar água", "Aquecer o mar", "Transformam luz solar em eletricidade."),
   ("Qual é uma boa forma de poupar energia em casa?", "Apagar as luzes quando saímos", "Deixar tudo ligado", "Abrir o frigorífico muitas vezes", "Pequenos gestos poupam energia e dinheiro."),
   ("O que são as alterações climáticas?", "Mudanças a longo prazo no clima da Terra", "O tempo de ontem para hoje", "Uma estação nova", "O clima do planeta está a aquecer."),
   ("Que lâmpadas gastam menos energia?", "As LED", "As incandescentes antigas", "As velas", "As lâmpadas LED duram mais e gastam menos.")],
  [("Portugal produz muita eletricidade a partir de…", "Energias renováveis, como a eólica, a hídrica e a solar", "Apenas carvão", "Apenas energia nuclear", "Apenas gás natural", "Em vários anos recentes, mais de metade da eletricidade veio de renováveis."),
   ("Qual é o objetivo da UE para 2050?", "A neutralidade climática", "Fechar todas as fábricas", "Usar só carvão", "Dobrar as emissões", "A UE quer deixar de emitir mais gases do que absorve."),
   ("O que é a energia geotérmica?", "Calor vindo do interior da Terra", "Energia dos ventos", "Energia das ondas", "Energia do Sol", "Nos Açores, produz-se eletricidade a partir de calor da terra."),
   ("Qual destes é um combustível fóssil?", "O carvão", "O vento", "O Sol", "A água", "Os combustíveis fósseis libertam CO₂ quando queimados."),
   ("Porque é bom isolar bem as casas?", "Gasta-se menos energia a aquecer e a arrefecer", "Ficam mais barulhentas", "Têm menos luz", "Aumenta o consumo", "Um bom isolamento poupa energia e dinheiro.")])

nivel("ciencia_inovacao", "🔬 Ciência e Inovação",
  "A UE investe em ciência e tecnologia: o programa Horizonte Europa apoia a investigação, o Galileo é o sistema europeu de navegação por satélite e o Copernicus observa a Terra do espaço para vigiar o clima e os oceanos. O Regulamento Geral de Proteção de Dados (RGPD) protege também a privacidade dos cidadãos.",
  "A ciência e a inovação ajudam a resolver problemas, como as alterações climáticas e as doenças.",
  [("O que é um satélite?", "Um objeto que orbita a Terra", "Um tipo de avião", "Um barco", "Os satélites ajudam na comunicação e na observação do planeta."),
   ("O que faz a investigação científica?", "Descobre coisas novas e ajuda a resolver problemas", "Inventa histórias", "Só dá trabalhos", "A ciência faz avançar o conhecimento."),
   ("Qual destas tecnologias ajuda a produzir energia limpa?", "Os painéis solares", "Os motores a carvão", "As fogueiras", "Os painéis solares aproveitam a luz do Sol."),
   ("O que é a inteligência artificial?", "Computadores que aprendem a fazer tarefas parecidas com as de uma pessoa", "Robôs que são pessoas", "Um livro de ciências", "A IA ajuda, mas precisa de uso responsável."),
   ("Marie Curie, que viveu em França, ficou famosa por…", "Descobertas sobre a radioatividade", "Pintar quadros", "Construir pontes", "Ganhou dois Prémios Nobel."),
   ("O que é um robô?", "Uma máquina que pode ser programada para fazer tarefas", "Um animal", "Uma planta", "Os robôs fazem tarefas para as quais foram programados.")],
  [("Como se chama o sistema europeu de navegação por satélite?", "Galileo", "Copernicus", "Hubble", "Apollo", "O Galileo é o «GPS europeu»."),
   ("O programa Copernicus da UE serve para…", "Observar a Terra e monitorizar o ambiente", "Navegar pelas estrelas", "Pagar bolsas", "Controlar aeroportos", "Usa satélites para acompanhar o clima, os oceanos e as florestas."),
   ("Como se chama o principal programa de financiamento da UE para investigação e inovação (2021–2027)?", "Horizonte Europa", "Erasmus+", "Galileo", "Euro Next", "O Horizonte Europa apoia projetos científicos em toda a UE."),
   ("O CERN, onde fica o maior acelerador de partículas do mundo, localiza-se perto de…", "Genebra", "Lisboa", "Berlim", "Roma", "O CERN fica junto a Genebra, na fronteira entre a Suíça e a França."),
   ("Que regra da UE protege os dados pessoais dos cidadãos?", "O Regulamento Geral de Proteção de Dados (RGPD)", "A regra dos 3 R", "O Dia da Europa", "O Tratado de Roma", "O RGPD aplica-se desde 2018 em toda a UE.")])

nivel("mobilidade_erasmus", "🚆 Viajar e Estudar na Europa",
  "Na UE, os jovens podem estudar, fazer estágios ou voluntariado noutro país com o programa Erasmus+, criado em 1987. O espaço Schengen permite atravessar fronteiras sem controlos, o euro facilita os pagamentos e o roaming nos países da UE já não custa extra. O DiscoverEU oferece passes de comboio a jovens de 18 anos.",
  "Erasmus+, Schengen e o euro tornam mais fácil estudar, viajar e conhecer a Europa.",
  [("O que é o programa Erasmus+?", "Um programa para estudar, formar-se ou fazer voluntariado noutro país", "Um jogo de computador", "Uma moeda", "O Erasmus+ apoia a aprendizagem e a mobilidade."),
   ("Que transporte liga cidades europeias por carris?", "O comboio", "O submarino", "O balão", "Há muitas ligações de comboio entre cidades da Europa."),
   ("Para viajar entre países do espaço Schengen, em geral, basta…", "Um documento de identificação válido", "Um visto especial", "Uma carta de condução", "Não há controlos sistemáticos nas fronteiras internas."),
   ("Que vantagem tem estudar noutro país?", "Aprender uma língua e conhecer outras culturas", "Faltar às aulas", "Não ter testes", "Estudar fora alarga os horizontes."),
   ("Qual destes é um meio de transporte mais amigo do ambiente?", "A bicicleta", "O avião a jato privado", "O carro grande, com uma só pessoa", "A bicicleta não polui."),
   ("Quando viajas pela zona euro, podes…", "Pagar sem trocar de moeda", "Usar escudos", "Pagar só com conchas", "O euro é aceite em 21 países da UE.")],
  [("Em que ano começou o programa Erasmus?", "1987", "1957", "1999", "2012", "O Erasmus nasceu em 1987 e deu origem ao Erasmus+."),
   ("O DiscoverEU oferece a jovens de 18 anos…", "Passes de viagem para explorar a Europa, sobretudo de comboio", "Casas grátis", "Carros", "Computadores", "Os passes são atribuídos através de candidatura."),
   ("O que significa «roaming» sem custos extra na UE?", "Podes usar o telemóvel noutro país da UE sem pagar mais pelo uso", "Todos os telemóveis são grátis", "A internet é grátis para sempre", "Não se pagam chamadas nacionais", "Desde 2017, «roam like at home» aplica-se na UE."),
   ("Qual destes países NÃO faz parte do espaço Schengen?", "A Irlanda", "Portugal", "Espanha", "Itália", "A Irlanda e Chipre são da UE, mas não estão no espaço Schengen."),
   ("O que é o Corpo Europeu de Solidariedade?", "Um programa para jovens fazerem voluntariado e ajudarem comunidades", "Um exército europeu", "Uma equipa de futebol", "Um banco de poupança", "Os jovens participam em projetos solidários na Europa.")])

nivel("jovens_cidadania_digital", "🌟 Jovens e Cidadania Digital",
  "Os jovens são o futuro da Europa e têm voz: votam (a partir da idade mínima do seu país), participam em consultas e associações e podem apresentar ideias. Na internet, ser cidadão digital é usar a tecnologia com respeito, segurança e espírito crítico, sem espalhar desinformação. O contrário de indiferença é participar!",
  "A Europa constrói-se com todos nós. Participa, informa-te bem e usa a internet com responsabilidade.",
  [("Quem pode participar na construção do futuro da Europa?", "Todos, incluindo os jovens", "Só os adultos", "Só os políticos", "Todos podem ajudar a construir a Europa."),
   ("Como podes participar na tua escola?", "Votando para delegado, dando ideias e ajudando em projetos", "Ficando sempre calado", "Estragando materiais", "Participar é o primeiro passo da cidadania."),
   ("Antes de partilhar uma notícia online, deves…", "Verificar se a fonte é de confiança", "Partilhar logo", "Mudar o título", "Verificar evita espalhar notícias falsas."),
   ("O que é a desinformação?", "Informação falsa espalhada de propósito", "Uma aula de informática", "Uma nova língua", "A desinformação engana as pessoas."),
   ("Qual é uma boa regra para proteger os teus dados online?", "Não partilhar palavras-passe nem dados pessoais", "Dar a morada a todos", "Usar a mesma palavra-passe em tudo", "Os dados pessoais são só teus."),
   ("A cidadania digital é…", "Usar a internet com respeito, segurança e responsabilidade", "Ter muitos seguidores", "Estar online todo o dia", "Ser cidadão digital é cuidar de nós e dos outros online.")],
  [("Com que idade se pode votar nas eleições nacionais em Portugal?", "18 anos", "16 anos", "21 anos", "14 anos", "Em alguns países da UE pode votar-se mais cedo nas europeias, mas em Portugal é aos 18."),
   ("Qual é uma forma de os jovens fazerem ouvir a sua voz na Europa?", "Participar em consultas públicas, eleições e organizações juvenis", "Ficar sempre calado", "Esperar que decidam por eles", "Evitar votar", "A participação dá força à democracia."),
   ("O que é o Dia da Internet Mais Segura (Safer Internet Day)?", "Um dia, em fevereiro, para promover o uso seguro e responsável da internet", "Um dia para proibir a internet", "Um dia para comprar tecnologia", "O Dia do Euro", "É celebrado em muitos países, incluindo os da UE."),
   ("Para identificar desinformação, qual destas estratégias ajuda?", "Verificar a fonte e procurar a notícia noutros sítios", "Acreditar no que é mais partilhado", "Confiar só no título", "Desconfiar de tudo sem verificar", "O espírito crítico ajuda a distinguir o que é verdadeiro."),
   ("Qual é o contrário de indiferença, quando falamos de cidadania?", "Participação e envolvimento", "Silêncio", "Desinteresse", "Distância", "A Europa precisa de pessoas interessadas e participativas.")])


# ───────────────────────── Equilíbrio do tamanho das respostas ─────────────────────────
# Para a resposta certa não ser sempre a mais comprida (pista fácil!), algumas perguntas têm a certa
# encurtada e/ou as erradas reescritas com um tamanho semelhante. Chave: (tema, "f"|"a", índice) → (certa|None, [erradas]).
AJ = {
 # Fácil (2 erradas)
 ("bandeira_ue","f",4): (None,["As quatro estações do ano e os seus ciclos","Os países que fundaram a União Europeia"]),
 ("simbolos_ue","f",0): (None,["A «Marselhesa», o hino nacional de França","«Imagine», a canção de John Lennon"]),
 ("monumentos","f",5): (None,["Uma lista de restaurantes recomendados pela UE","Os maiores estádios de futebol da Europa"]),
 ("diversidade_respeito","f",1): ("Incluí-lo e aprender palavras novas",["Fazer de conta que não o ouves","Pedir-lhe que fale só em português"]),
 ("diversidade_respeito","f",4): (None,["Dar uma ajuda extra a quem precisa","Escolher quem joga na equipa por sorteio"]),
 ("diversidade_respeito","f",5): ("Aprendemos e fazemos novos amigos",["Perdemos a nossa própria identidade","Ficamos todos exatamente iguais"]),
 ("dia_europa_schuman","f",3): ("Unir o carvão e o aço para evitar a guerra",["Criar uma moeda única para a Europa","Abrir as fronteiras a todos os turistas do mundo"]),
 ("dia_europa_schuman","f",4): ("Celebra a paz e a união na Europa",["Marca o fim do ano escolar na UE","É o Natal dos países europeus"]),
 ("dia_europa_schuman","f",5): ("Festas, jogos e debates sobre a Europa",["Fecham-se as fronteiras entre os países","Cancelam-se as aulas durante uma semana"]),
 ("paz_cooperacao","f",1): ("Trabalhar juntos por um objetivo",["Competir para ver quem ganha","Fugir dos problemas dos outros"]),
 ("paz_cooperacao","f",3): ("O diálogo é melhor do que a guerra",["A guerra é a melhor solução","Os países devem viver isolados"]),
 ("paz_cooperacao","f",5): ("Resolvem melhor problemas comuns, como o ambiente",["Deixam de ter qualquer língua própria","Passam a ter todos exatamente a mesma cultura"]),
 ("valores_europeus","f",1): ("O povo participa nas decisões, votando",["Decide sempre uma só pessoa, sem votos","Ninguém precisa de seguir regras"]),
 ("valores_europeus","f",4): ("Todos, até os governantes, cumprem as leis",["Só os cidadãos comuns cumprem as leis","Cada pessoa decide que leis cumpre"]),
 ("direitos_cidadaos","f",0): ("Estudar e trabalhar noutro país da UE",["Escolher as leis de qualquer país","Ter sempre a nota máxima nos testes"]),
 ("direitos_cidadaos","f",1): ("Ser cidadão da UE e do teu país",["Ser cidadão de qualquer país do mundo","Ter um passaporte só para a Europa"]),
 ("direitos_cidadaos","f",2): ("Quem tem a idade mínima exigida",["Apenas quem trabalha em Bruxelas","Só quem fala várias línguas"]),
 ("direitos_cidadaos","f",3): ("Viajar e viver noutros países da UE",["Conduzir sem respeitar as regras","Entrar nos museus sem pagar"]),
 ("direitos_cidadaos","f",4): (None,["O cartão de uma biblioteca europeia","O cartão de estudante de outro país"]),
 ("direitos_cidadaos","f",5): ("Usar a mesma moeda em vários países",["Que todos tenham o mesmo ordenado","Que os preços sejam iguais em todo o lado"]),
 ("ambiente","f",2): ("Usar recursos sem prejudicar o futuro",["Gastar tudo o que existe, sem pensar","Comprar coisas novas todas as semanas"]),
 ("ambiente","f",5): ("Absorvem CO₂ e dão abrigo a animais",["Fazem barulho quando há vento","Gastam muita água sem utilidade"]),
 ("energia_clima","f",2): (None,["Guardar a água da chuva para beber","Aquecer a água do mar e das praias"]),
 ("energia_clima","f",4): ("Mudanças a longo prazo no clima",["O tempo que faz de um dia para o outro","As estações do ano a repetirem-se"]),
 ("ciencia_inovacao","f",0): (None,["Um tipo de avião muito rápido","Um barco que atravessa o oceano"]),
 ("ciencia_inovacao","f",1): ("Descobre coisas novas e resolve problemas",["Inventa histórias para o cinema","Só serve para dar trabalhos na escola"]),
 ("ciencia_inovacao","f",3): ("Programas que aprendem a fazer tarefas",["Máquinas que têm sentimentos humanos","Um livro de ciência sobre o futuro"]),
 ("ciencia_inovacao","f",4): (None,["Pintar quadros famosos de Paris","Construir as primeiras pontes de ferro"]),
 ("ciencia_inovacao","f",5): ("Uma máquina programada para fazer tarefas",["Um animal que vive em laboratórios","Uma planta usada para fazer papel"]),
 ("mobilidade_erasmus","f",0): ("Estudar ou fazer voluntariado noutro país",["Um jogo de computador sobre viagens","Uma moeda usada só por estudantes"]),
 ("mobilidade_erasmus","f",2): (None,["Um visto especial para cada país","Uma carta de condução internacional"]),
 ("mobilidade_erasmus","f",3): ("Aprender línguas e conhecer culturas",["Faltar às aulas durante um ano","Deixar de ter testes e trabalhos"]),
 ("jovens_cidadania_digital","f",1): ("Votando, dando ideias e ajudando em projetos",["Ficando sempre calado nas reuniões","Esperando que os outros decidam tudo"]),
 ("jovens_cidadania_digital","f",2): (None,["Partilhar logo, para ser o primeiro","Mudar o título para ser mais popular"]),
 ("jovens_cidadania_digital","f",3): (None,["Uma aula nova da disciplina de TIC","Um tipo de jogo online de perguntas"]),
 ("jovens_cidadania_digital","f",4): ("Não partilhar a palavra-passe com ninguém",["Dar a morada a quem pedir online","Usar a mesma palavra-passe em todo o lado"]),
 ("jovens_cidadania_digital","f",5): ("Usar a internet com respeito e segurança",["Ter muitos seguidores nas redes sociais","Passar o dia inteiro ligado online"]),
 # Difícil/Extremo (3 erradas)
 ("mapa_europa","a",0): ("No hemisfério norte, a oeste da Ásia",["No hemisfério sul, junto à Antártida","No hemisfério norte, a sul de África","No hemisfério sul, a leste da Austrália"]),
 ("mapa_europa","a",4): ("Tem costa atlântica aberta às rotas marítimas",["Fica no centro geográfico da Europa","Não tem fronteiras terrestres com nenhum país","Fica junto ao Mar Báltico, no norte"]),
 ("bandeira_ue","a",1): ("O 12 simboliza perfeição, não o número de países",["Só 12 países têm direito a voto na UE","A UE foi fundada por 12 países","O Parlamento reúne durante 12 meses"]),
 ("bandeira_ue","a",3): (None,["A NATO, aliança militar","A ONU, em Nova Iorque","A FIFA, do futebol"]),
 ("simbolos_ue","a",0): (None,["Wolfgang Amadeus Mozart","Johann Sebastian Bach","Giuseppe Verdi, de Itália"]),
 ("simbolos_ue","a",2): ("Os países cooperam e respeitam as diferenças",["Todos os países têm de ser iguais em tudo","Só existe uma língua oficial na Europa","Cada país decide tudo sozinho"]),
 ("simbolos_ue","a",3): (None,["1 de janeiro de 1999","1 de maio de 2004","1 de janeiro de 2010"]),
 ("linguas","a",2): (None,["Línguas germânicas, como o alemão","Línguas eslavas, como o polaco","Línguas urálicas, como o húngaro"]),
 ("linguas","a",3): ("Para que cada cidadão fale com a UE na sua língua",["Porque ninguém consegue aprender outra língua","Porque o latim já não se pode usar","Porque cada língua tem um país na ONU"]),
 ("linguas","a",4): (None,["Fazer exames de línguas a todos os alunos","Comemorar o Dia da Europa nas escolas","Falar apenas inglês durante o dia todo"]),
 ("monumentos","a",1): ("Angra do Heroísmo, nos Açores",["O Estádio da Luz, em Lisboa","A Ponte 25 de Abril, em Lisboa","O Centro Comercial Colombo"]),
 ("monumentos","a",4): ("Porque guarda a nossa história para o futuro",["Porque dá sempre muito dinheiro a quem o visita","Porque só os turistas gostam de o ver","Porque nunca se estraga com o tempo"]),
 ("diversidade_respeito","a",0): ("Aprender com costumes diferentes dos meus",["Achar que a minha cultura é a melhor","Evitar quem tem outra religião ou língua","Imitar o sotaque de um colega para rir"]),
 ("diversidade_respeito","a",2): ("Sexo, cor, origem, religião ou idade, entre outras",["Só por motivos ligados à nacionalidade","Apenas pela cor dos olhos e do cabelo","Apenas pela idade da pessoa"]),
 ("diversidade_respeito","a",3): ("Uma ideia simplificada e injusta sobre um grupo",["Um tipo de música tradicional europeia","Uma lei europeia sobre a diversidade","Uma festa tradicional de verão"]),
 ("diversidade_respeito","a",4): ("Incluí-lo e, se preciso, chamar um adulto",["Fingir que não vi nada e seguir caminho","Juntar-me ao grupo que o exclui","Rir-me da situação com os colegas"]),
 ("dia_europa_schuman","a",2): ("Eram essenciais para as armas, e juntos evitavam a guerra",["Porque eram os produtos mais baratos e mais fáceis de vender","Porque eram os únicos materiais que a Europa exportava","Porque eram os materiais mais usados na construção de casas"]),
 ("dia_europa_schuman","a",3): ("A CECA, do Carvão e do Aço",["O Euratom, da energia atómica","O espaço Schengen, das fronteiras","O Banco Central Europeu, do euro"]),
 ("paz_cooperacao","a",2): ("Evitar nova guerra entre a França e a Alemanha",["Aumentar o turismo entre os países europeus","Criar uma moeda única para toda a Europa","Substituir a NATO como aliança militar"]),
 ("paz_cooperacao","a",3): ("Ajudarem-se nos momentos difíceis",["Cada país tratar apenas de si próprio","Pagar impostos ao país vizinho","Todos os países falarem a mesma língua"]),
 ("paz_cooperacao","a",4): ("Países da UE ajudarem-se após incêndios",["Cada país ignorar o que se passa nos outros","Os países fecharem as fronteiras ao vizinho","Cada país construir um muro à sua volta"]),
 ("valores_europeus","a",0): (None,["Na Constituição da República Portuguesa","No Código da Estrada de cada país","Na Carta das Nações Unidas, em Nova Iorque"]),
 ("valores_europeus","a",1): ("Dar a opinião sem medo, respeitando os outros",["Insultar quem pensa de forma diferente","Proibir os jornais de falarem de política","Obrigar todos a pensar da mesma maneira"]),
 ("valores_europeus","a",2): ("Evita que alguém tenha demasiado poder",["Faz com que as leis demorem mais tempo","Dispensa a existência de tribunais","Impede que se façam eleições livres"]),
 ("direitos_cidadaos","a",0): (None,["A Carta de Condução de cada país","A Carta Magna das escolas europeias","O Código Penal de cada país da UE"]),
 ("direitos_cidadaos","a",2): ("Um milhão de cidadãos pede uma lei à Comissão",["Um concurso de desenho entre escolas europeias","Um passaporte especial para cidadãos europeus","Uma eleição para escolher a Comissão"]),
 ("direitos_cidadaos","a",3): ("Ajuda de qualquer embaixada de um país da UE",["Isenção de impostos em qualquer país do mundo","Ter todos os serviços de saúde gratuitos","Votar nas eleições nacionais de outro país"]),
 ("direitos_cidadaos","a",4): ("Passar fronteiras internas sem controlos",["Usar o euro em todos os países da UE","Falar só inglês em todas as fronteiras","Não pagar portagens nas autoestradas"]),
 ("ambiente","a",0): ("Um plano da UE para o clima até 2050",["Um tratado sobre desportos de inverno","Uma moeda feita com materiais reciclados","Uma lei sobre as férias dos alunos"]),
 ("ambiente","a",1): ("Emitir só os gases que se consegue absorver",["Nunca haver verão no continente europeu","Proibir todos os carros em todo o continente","Deixar de haver chuva na Europa"]),
 ("ambiente","a",2): (None,["O oxigénio, que respiramos","O azoto, que existe no ar","O hélio, dos balões"]),
 ("ambiente","a",4): (None,["Mais trânsito e mais ruído","Mais poluição no ar das cidades","Menos paragens para os passageiros"]),
 ("energia_clima","a",0): ("Energias renováveis, como a eólica e a solar",["Apenas carvão e outros combustíveis fósseis","Apenas energia nuclear de centrais próprias","Apenas gás natural vindo de fora"]),
 ("energia_clima","a",2): (None,["Energia produzida pelos ventos","Energia produzida pelas ondas do mar","Energia que vem diretamente do Sol"]),
 ("energia_clima","a",4): ("Gasta-se menos energia na casa",["As casas ficam mais barulhentas","As divisões ficam com menos luz","O consumo de energia aumenta"]),
 ("ciencia_inovacao","a",1): (None,["Navegar pelo céu durante a noite","Pagar bolsas de estudo a jovens","Controlar o tráfego dos aeroportos"]),
 ("ciencia_inovacao","a",4): ("O RGPD, de proteção de dados",["A regra dos 3 R, da reciclagem","O Dia da Europa, a 9 de maio","O Tratado de Roma, de 1957"]),
 ("mobilidade_erasmus","a",1): ("Passes para explorar a Europa de comboio",["Casas gratuitas em vários países","Carros elétricos para as viagens","Computadores portáteis para estudar"]),
 ("mobilidade_erasmus","a",2): ("Usar o telemóvel noutro país da UE sem custos extra",["Todos os telemóveis passam a ser gratuitos","A internet fica gratuita em toda a UE","Deixam de se pagar chamadas nacionais"]),
 ("mobilidade_erasmus","a",4): ("Voluntariado de jovens em projetos solidários",["Um exército europeu formado por jovens","Uma seleção de futebol dos jovens","Um banco europeu para poupar dinheiro"]),
 ("jovens_cidadania_digital","a",1): ("Participar em consultas, eleições e associações",["Ficar calado e deixar que outros decidam","Esperar que decidam tudo por eles","Evitar votar quando chegar a idade"]),
 ("jovens_cidadania_digital","a",2): ("Um dia, em fevereiro, para uma internet mais segura",["Um dia para proibir o uso da internet","Um dia para vender tecnologia nova","O dia em que se comemora o euro"]),
 ("jovens_cidadania_digital","a",3): ("Verificar a fonte e comparar com outras notícias",["Acreditar sempre no que é mais partilhado","Confiar apenas no título da notícia","Desconfiar de tudo sem verificar nada"]),
 ("jovens_cidadania_digital","a",4): (None,["Silêncio e afastamento","Desinteresse e distância","Isolamento e cansaço"]),
}

AJ.update({
 ("bandeira_ue","f",2): (None,["Brancas e prateadas","Vermelhas e laranja"]),
 ("monumentos","f",3): (None,["O Big Ben, a torre de Londres","A Sagrada Família, em Barcelona"]),
 ("gastronomia_musica","f",4): (None,["O didgeridoo australiano","O sitar indiano"]),
 ("gastronomia_musica","f",5): (None,["As corridas de touros na praça","Os carros antigos do centro"]),
 ("diversidade_respeito","f",2): (None,["Cada um tem de ser igual","Tudo igual para todos"]),
 ("diversidade_respeito","f",3): (None,["Indiferença e desprezo","Medo e desconfiança"]),
 ("paz_cooperacao","f",2): (None,["O Óscar de melhor filme","A Bola de Ouro do futebol"]),
 ("paz_cooperacao","f",4): (None,["Gritar mais alto que o outro","Deixar de falar para sempre"]),
 ("historia_ue","f",5): (None,["Clube dos Países Mais Ricos","Aliança Militar do Atlântico"]),
 ("ambiente","f",3): (None,["Recolher, regar e replantar","Rir, ler e rezar todos os dias"]),
 ("ciencia_inovacao","f",5): ("Uma máquina que se programa",["Um animal de laboratório","Uma planta muito rara"]),
 ("mobilidade_erasmus","f",0): ("Estudar ou fazer voluntariado noutro país",["Um jogo de computador sobre viagens pela Europa","Uma moeda usada só por estudantes universitários"]),
 ("jovens_cidadania_digital","f",0): (None,["Só os adultos que trabalham","Apenas os políticos eleitos"]),
 ("jovens_cidadania_digital","f",1): ("Votando, dando ideias e ajudando em projetos",["Ficando sempre calado nas reuniões da turma","Esperando que os outros decidam tudo por mim"]),
 ("bandeira_ue","a",1): ("O 12 simboliza perfeição, não o número de países",["Só 12 países podem votar nas decisões da UE","Foram 12 os países que fundaram a União","O Parlamento reúne 12 meses por ano"]),
 ("monumentos","a",0): (None,["A Torre Eiffel, de Paris","O Coliseu, de Roma","A Acrópole, de Atenas"]),
 ("gastronomia_musica","a",3): ("Um costume passado de geração em geração",["Uma moda passageira que dura um dia","Uma regra criada pelo Parlamento Europeu","Um prato novo inventado esta semana"]),
 ("diversidade_respeito","a",2): ("Sexo, cor, origem, religião ou idade, entre outras",["Apenas por motivos ligados à nacionalidade da pessoa","Apenas pela cor dos olhos e do cabelo","Apenas pela altura e pelo peso da pessoa"]),
 ("diversidade_respeito","a",3): ("Uma ideia simplificada e injusta sobre um grupo",["Um estilo de música tradicional da Europa","Uma lei europeia sobre diversidade cultural","Uma festa tradicional do solstício de verão"]),
 ("dia_europa_schuman","a",4): (None,["O fim da Segunda Guerra Mundial, em 1945","A criação do euro como moeda comum","A adesão de Portugal à então CEE"]),
 ("instituicoes","a",2): (None,["O Tribunal de Justiça da UE","O Parlamento Europeu, em Estrasburgo","O Eurostat, de estatísticas"]),
 ("ambiente","a",3): ("Reutilizar e reciclar para gastar menos",["Fabricar tudo em fábricas circulares","Usar e deitar fora o que não serve","Comprar sempre tudo novo, todos os meses"]),
 ("ciencia_inovacao","a",1): (None,["Navegar pelas estrelas durante a noite","Pagar bolsas de estudo a jovens estudantes","Controlar o tráfego dos aeroportos europeus"]),
 ("ciencia_inovacao","a",2): (None,["Erasmus+, de mobilidade","Galileo, de navegação","Euronext, da bolsa"]),
 ("mobilidade_erasmus","a",2): ("Usar o telemóvel noutro país da UE sem custos extra",["Todos os telemóveis passam a ser gratuitos na Europa","A internet fica gratuita em toda a UE para sempre","Deixam de se pagar chamadas dentro do próprio país"]),
 ("mobilidade_erasmus","a",4): ("Voluntariado de jovens em projetos solidários",["Um exército europeu composto por jovens soldados","Uma seleção de futebol dos jovens europeus","Um banco europeu para jovens poupadores"]),
 ("jovens_cidadania_digital","a",1): ("Participar em consultas, eleições e associações",["Ficar sempre calado e deixar outros decidirem","Esperar que os adultos decidam tudo por eles","Evitar votar quando chegar à idade certa"]),
 ("jovens_cidadania_digital","a",2): ("Um dia, em fevereiro, para uma internet mais segura",["Um dia para proibir o uso da internet nas escolas","Um dia para vender tecnologia nova às famílias","O dia em que se comemora a chegada do euro"]),
 ("jovens_cidadania_digital","a",3): ("Verificar a fonte e comparar com outras notícias",["Acreditar sempre no que é mais partilhado","Confiar apenas no título e na imagem da notícia","Desconfiar de tudo sem nunca verificar nada"]),
})

# ───────────────────────── Perguntas novas (documento «100 Perguntas Novas») ─────────────────────────
# Revistas uma a uma: entram só as que não repetem perguntas já existentes; as que tinham erros foram corrigidas.
# (nível, início da pergunta) → alterações. Fácil → banco Fácil (3 opções); Difícil/Extremo → banco Difícil (4 opções).
import json as _json
_NOVAS = _json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'perguntas_novas_vanda.json'), encoding='utf-8'))
_ENTRAM = {
 1:["Qual é o maior país da Europa"],
 2:["Em que parte da Europa se localiza","Qual destas ilhas pertence ao arquipélago","Qual destas opções identifica corretamente os grupos"],
 3:["Qual é a capital da Bélgica","Qual é a capital da Estónia","Que país tem Sófia","Qual destas associações país–capital"],
 4:["As estrelas da bandeira europeia têm quantas pontas"],
 5:["Qual destas afirmações sobre os símbolos"],
 6:["Qual destas línguas é oficial da União","Qual destas línguas pertence ao grupo das línguas fino","Porque é que as instituições europeias traduzem"],
 7:["Stonehenge"],
 8:["A tradição musical do flamenco","Em que país nasceu a tradição dos mercados de Natal"],
 9:["Qual é uma atitude de respeito","Numa atividade, um colega tem","Uma publicação online ridiculariza"],
 10:["Qual era o objetivo político fundamental"],
 11:["O que ajuda a manter a paz","Quando um país sofre uma catástrofe","Qual destas organizações é uma aliança","O que significa resolver um conflito","Porque é que a cooperação entre países"],
 12:["Em que ano entrou em vigor o Tratado de Maastricht","Qual destas sequências apresenta"],
 13:["Qual destes é um valor fundamental","A igualdade perante a lei","Qual destes conjuntos reúne valores"],
 14:["Qual destes é um direito de quem vive","Se um produto comprado","Que regulamento europeu é conhecido","Qual destes é um direito relacionado com os teus dados","Uma empresa recolhe mais dados"],
 15:["Que instituição reúne ministros dos governos","Qual é a principal função do Tribunal","Qual é a diferença correta entre o Conselho Europeu"],
 16:["Qual destas ações ajuda a reduzir o lixo","Qual destes habitats é particularmente","O que é uma espécie invasora"],
 17:["Qual é a principal finalidade da eficiência","Qual é a diferença entre adaptação"],
 18:["Que instrumento permite observar","Que instrumento é usado para observar","Porque é que os dados científicos"],
 19:["Qual destes documentos pode ser usado","Qual é a diferença entre União Europeia e Espaço Schengen"],
 20:["Antes de publicar uma fotografia","O que é phishing","Qual é um sinal possível de desinformação","Recebes um vídeo viral"],
}
def _correcoes(q):
    if q['q'].startswith('Qual é o maior país da Europa'):
        q['q']='Qual é o maior país situado inteiramente na Europa?'
    if q['q'].startswith('Em que parte da Europa se localiza'):
        q['q']='Em que parte da Europa se localiza Portugal continental?'
        q['a']=[{'t':'Sudoeste','ok':True},{'t':'Noroeste','ok':False},{'t':'Nordeste','ok':False}]
    if q['q'].startswith('Se um produto comprado'):
        q['a']=[{'t':'Ao vendedor','ok':True},{'t':'Ao Parlamento Europeu','ok':False},{'t':'Ao Tribunal de Justiça da UE','ok':False}]
        q['exp']='Em regra, deves contactar primeiro o vendedor; na UE, a garantia legal dos bens é de, pelo menos, dois anos.'
    if q['q'].startswith('Que regulamento europeu é conhecido'):
        q['a']=[{'t':'O RGPD','ok':True},{'t':'O Código Schengen','ok':False},{'t':'O Pacto Ecológico Europeu','ok':False},{'t':'O Tratado de Maastricht','ok':False}]
    return q
_porChave={n['chave']:n for n in L}
_chaves=[n['chave'] for n in L]
_n_novas=0
for q in _NOVAS:
    if not any(q['q'].startswith(p) for p in _ENTRAM.get(q['nivel'],[])): continue
    q=_correcoes(q)
    ok=[a for a in q['a'] if a['ok']]; erradas=[a['t'] for a in q['a'] if not a['ok']]
    assert len(ok)==1
    n=_porChave[_chaves[q['nivel']-1]]
    if q['tipo']=='FÁCIL': assert len(erradas)==2,q['q']; n['facil'].append((q['q'],ok[0]['t'],*erradas,q['exp']))
    else: assert len(erradas)==3,q['q']; n['avancado'].append((q['q'],ok[0]['t'],*erradas,q['exp']))
    _n_novas+=1
print('perguntas novas integradas:',_n_novas)

AJ.update({
 ("linguas","a",6): ("Para que os cidadãos acompanhem a vida da UE",["Para que todos os países adotem uma só língua","Para substituir as línguas regionais de cada país","Apenas para facilitar o turismo na Europa"]),
 ("diversidade_respeito","a",5): ("Adaptar a atividade para o incluir",["Pedir-lhe que assista sem participar","Ignorar o pedido e seguir o plano","Decidir sem lhe perguntar o que precisa"]),
 ("diversidade_respeito","a",6): ("Não partilhar, denunciar e apoiar quem foi visado",["Partilhar para aumentar as visualizações","Responder com insultos ao outro grupo","Guardar a publicação e enviá-la à turma"]),
 ("dia_europa_schuman","a",5): ("Tornar uma nova guerra menos provável",["Criar de imediato uma moeda única","Formar um só Estado para toda a Europa","Eliminar as línguas de cada país"]),
 ("paz_cooperacao","a",7): ("Porque os problemas atravessam fronteiras",["Porque cada país resolve tudo sozinho","Porque dispensa a ciência e os dados","Porque impede a partilha de informação"]),
 ("historia_ue","a",6): ("CECA (1951), Roma (1957), Maastricht (1992)",["Maastricht (1992), CECA (1951), Roma (1957)","Roma (1957), Lisboa (2007), CECA (1951)","UE (1993), CECA (1951), Roma (1957)"]),
 ("valores_europeus","a",5): ("Todos têm proteção legal, sem discriminação",["Algumas pessoas estão acima da lei","Só os governantes têm direitos legais","As leis não valem para os visitantes"]),
 ("valores_europeus","a",6): ("Dignidade, liberdade, democracia, igualdade e Estado de direito",["Competição, censura, poder militar e uniformidade cultural","Neutralidade, isolamento, segredo, obediência e tradição","Riqueza, fama, tradição, autoridade e hierarquia social"]),
 ("instituicoes","a",6): ("Garantir o cumprimento do direito da UE",["Organizar as eleições nacionais dos países","Definir os orçamentos das câmaras municipais","Escolher os eurodeputados de cada país"]),
 ("instituicoes","a",7): ("Um define prioridades políticas; o outro aprova leis",["São duas designações da mesma instituição","Um é eleito diretamente e o outro é um tribunal","Um representa só as regiões e o outro só as cidades"]),
 ("ambiente","a",6): ("Espécie de fora que prejudica o ecossistema",["Qualquer espécie que seja muito rara","Uma espécie que só vive em reservas naturais","Uma espécie que migra todos os anos"]),
 ("energia_clima","a",6): ("Adaptar é preparar-se; mitigar é reduzir emissões",["Adaptar é reduzir emissões; mitigar é construir abrigos","São duas palavras para o mesmo conceito","Mitigar é ignorar os impactos do clima"]),
 ("mobilidade_erasmus","a",6): ("A UE é uma união política; Schengen é circulação livre",["São o mesmo conjunto de países europeus","Schengen é a moeda comum da UE","A UE trata de vistos e Schengen do comércio"]),
 ("jovens_cidadania_digital","a",5): ("Uma fraude para roubar dados com mensagens falsas",["Um programa para editar vídeos e fotografias","Uma forma segura de guardar palavras-passe","Um desporto de pesca nos rios europeus"]),
 ("jovens_cidadania_digital","a",6): ("Notícia sem fonte, que pede partilha imediata",["Informação confirmada por várias fontes","Artigo com data, autor e fontes claras","Comunicado oficial que se pode verificar"]),
 ("jovens_cidadania_digital","a",7): ("Verificar origem, data e fontes independentes",["Partilhar porque tem muitas visualizações","Confiar apenas nos comentários do vídeo","Assumir que o vídeo é de hoje e verdadeiro"]),
})

def aplicar_ajustes():
    usados=set()
    for n in L:
        for tipo,lista in (("f",n['facil']),("a",n['avancado'])):
            for i,q in enumerate(lista):
                k=(n['chave'],tipo,i)
                if k in AJ:
                    cert,erradas=AJ[k]; usados.add(k)
                    t=q[0]; ok=cert if cert else q[1]; exp=q[-1]
                    assert len(erradas)==(2 if tipo=="f" else 3),k
                    lista[i]=(t,ok,*erradas,exp)
    faltam=set(AJ)-usados; assert not faltam,faltam
aplicar_ajustes()

# ───────────────────────── Escrita do ficheiro ─────────────────────────
def j(s): return json.dumps(s, ensure_ascii=False)

def fmt_f(q):
    t, ok, w1, w2, exp = q
    return '    { q:%s, a:[{t:%s,ok:true},{t:%s,ok:false},{t:%s,ok:false}], exp:%s },' % (j(t), j(ok), j(w1), j(w2), j(exp))

def fmt_a(q):
    t, ok, w1, w2, w3, exp = q
    return '    { q:%s, a:[{t:%s,ok:true},{t:%s,ok:false},{t:%s,ok:false},{t:%s,ok:false}], exp:%s },' % (j(t), j(ok), j(w1), j(w2), j(w3), j(exp))

out = []
out.append('// ===== Conteúdo educativo e perguntas do quiz — MISSÃO EUROPA (Dia da Europa) =====')
out.append('// HISTORY, QUIZ_TIPS, QUIZ_ARTICLE, QUIZ_BY_THEME, QUIZ_BY_THEME_AVANCADO')
out.append('// Gerado por _dev/gerar_quiz_europa.py — alinhado por artIdx (0-19). Fácil: 3 opções; Difícil/Extremo: 4 opções.')
out.append('')
out.append('export const HISTORY = [')
for n in L:
    out.append('  { title: %s, text: %s },' % (j(n['titulo']), j(n['texto'])))
out.append('];')
out.append('')
out.append('export const QUIZ_TIPS = {')
for n in L:
    out.append('  %s: %s,' % (n['chave'], j(n['dica'])))
out.append('};')
out.append('')
out.append('export const QUIZ_ARTICLE = {')
for n in L:
    out.append('  %s: null,' % n['chave'])
out.append('};')
out.append('')
out.append('export const QUIZ_BY_THEME = {')
for n in L:
    out.append('  %s: [' % n['chave'])
    out.extend(fmt_f(q) for q in n['facil'])
    out.append('  ],')
out.append('};')
out.append('')
out.append('export const QUIZ_BY_THEME_AVANCADO = {')
for n in L:
    out.append('  %s: [' % n['chave'])
    out.extend(fmt_a(q) for q in n['avancado'])
    out.append('  ],')
out.append('};')
out.append('')

raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(raiz, 'data-quiz.js'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('níveis:', len(L), '| Fácil:', sum(len(n['facil']) for n in L), '| Difícil/Extremo:', sum(len(n['avancado']) for n in L))
print('chaves:', ','.join(n['chave'] for n in L))
