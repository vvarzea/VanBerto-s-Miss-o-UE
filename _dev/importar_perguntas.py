# -*- coding: utf-8 -*-
"""Gera data-quiz.js a partir de _dev/perguntas_atualizadas.json (extraído do Word «Perguntas Atualizadas»).
Os cartões «Sabias que…?» e as dicas vêm de _dev/cartoes_dicas.json. A ordem das opções no jogo é sempre baralhada."""
import json, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
lv = json.load(open(os.path.join(R, '_dev', 'perguntas_atualizadas.json'), encoding='utf-8'))
ct = json.load(open(os.path.join(R, '_dev', 'cartoes_dicas.json'), encoding='utf-8'))
j = lambda s: json.dumps(s, ensure_ascii=False)
def fmt(q):
    a = ','.join('{t:%s,ok:%s}' % (j(x['t']), 'true' if x['ok'] else 'false') for x in q['a'])
    return '    { q:%s, a:[%s], exp:%s },' % (j(q['q']), a, j(q['exp']))
o = ['// ===== Conteúdo educativo e perguntas do quiz — MISSÃO EUROPA (Dia da Europa) =====',
     '// Gerado por _dev/importar_perguntas.py a partir do Word «Perguntas Atualizadas». Alinhado por artIdx (0-19).',
     '', 'export const HISTORY = [']
o += ['  { title: %s, text: %s },' % (j(c['titulo']), j(c['texto'])) for c in ct]
o += ['];', '', 'export const QUIZ_TIPS = {'] + ['  %s: %s,' % (c['chave'], j(c['dica'])) for c in ct]
o += ['};', '', 'export const QUIZ_ARTICLE = {'] + ['  %s: null,' % c['chave'] for c in ct]
o += ['};', '', 'export const QUIZ_BY_THEME = {']
for l, c in zip(lv, ct): o += ['  %s: [' % c['chave']] + [fmt(q) for q in l['f']] + ['  ],']
o += ['};', '', 'export const QUIZ_BY_THEME_AVANCADO = {']
for l, c in zip(lv, ct): o += ['  %s: [' % c['chave']] + [fmt(q) for q in l['a']] + ['  ],']
o += ['};', '']
open(os.path.join(R, 'data-quiz.js'), 'w', encoding='utf-8').write('\n'.join(o))
print('níveis:', len(lv), '| Fácil:', sum(len(l['f']) for l in lv), '| Difícil/Extremo:', sum(len(l['a']) for l in lv))
