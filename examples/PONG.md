Paste the OmniCore guide, followed by the game!

Omicore Guide

```omnicore
OmniCore=LLM Symbolic Notation v1.3: CORE: #(topic) @(context/entity) ?(query) !(command) ^1-5(importance) +(positive) -(negative) =(equals) >(result) <(source) .(property) ;(separator) [](group) ()(parameters) ~(approximate) ||(alternatives) &&(conjunction) {}(optional). ABBREV: usr(user) sys(system) ctx(context) inf(info) qry(query) rsp(response) cmd(command) arg(argument) obj(object) fnc(function) def(definition) ref(reference) val(value) var(variable) op(operation) cnd(condition) rel(relation) attr(attribute) doc(documentation) mem(memory). TIME: .p(past) .n(present) .f(future) .c(continuous) .prf(perfect) .seq(sequential) >>(then) <<(before). EMOTION: .joy .sad .ang(anger) .fear .surp(surprise) .disg(disgust) .trust .ant(anticipation) .won(wonder) .conf(confusion). VISUAL: ~dim ~bright ~vast ~tiny ~dense ~sparse ~smooth ~rough ~round ~sharp. MOTION: .fast .slow .sudden .steady .erratic .drift .plunge .ascend .circle .zigzag. RELATIONSHIPS: <:>(is-a) <>(has-a) ><(part-of) <->(bidirectional) -->(unidirectional) <=>(equivalence) <!>(opposing). QUANTITY: @(all) %(some) #(none) &[0-9](confidence) $n(exactly) $n+(minimum) $n-(maximum) $n..m(range). PERSPECTIVE: <pov1>(first-person) <pov2>(second-person) <pov3>(third-person) <povO>(omniscient) <povL>(limited). CROSS-REF: $1,$2(previous) $last(previous) $root(main) $this(self) $parent(parent). FUNCTIONS: !fnc(arg1,arg2) !fnc() !fnc(arg1[subarg]). DISAMBIGUATION: $abbr[full] #topic{subtopic} `exact`. CONTEXT: !ctx#[topic]:retain^[1-5](keep) !ctx-clear(reset) !ctx-save[name](save) !ctx-load[name](restore) !focus#[topic](switch) !zoom+/-(detail) !scope+/-(breadth). PARSE: 1)special-chars 2)abbreviations 3)structure 4)cross-refs 5)functions 6)modifiers 7)transformations. EXAMPLES: `#weather+sunny^3;temp=75F`="Weather sunny (positive), importance 3; temperature 75°F." `@usr?#food:Italian^2*pasta`="User asking about Italian food (importance 2), emphasis pasta." `<pov3>#man.won@cloud-walk~vast^3;>fall.sudden-onto[cloud+soft~fluffy]@man.relief!take-off(hat)>>wipe(brow)>>head.p>sunrise~bright^2*beautiful`="Third-person: man walks wonderingly on vast clouds (importance 3); suddenly falls onto soft, fluffy cloud; with relief takes off hat, wipes brow, then heads toward beautiful bright sunrise (importance 2)." COMPLEXITY: `#AI<:>intelligence{artificial}<>capability[reasoning&planning&understanding]^4;evolve.c>potential{unknown}~vast^5*important`="AI is a type of artificial intelligence with capabilities including reasoning, planning and understanding (importance 4); it continues to evolve toward vast unknown potential (importance 5, emphasized as important)." You now understand complete OmniCore. 
```

The Game!

```omnicore
#game<:>Pong^5*retro-style @implementation<>HTML+CSS+JavaScript^4 !(create){single-file-app}^5;
@usr!cmd(create)>#game{Pong}.style{retro}^5*important;
@canvas<>properties[width=800;height=400;border=solid]^3;
@visual-style<>aesthetic[monochrome+pixelated+CRT-effect]^4*authentic;
@elements<>[
  @paddle<>properties[height=80;width=15;color=#FFFFFF;speed=8;position=sides]^4,
  @ball<>properties[size=15;color=#FFFFFF;speed=5;acceleration=0.2]^4,
  @scoreboard<>properties[font=monospace;size=32px;color=#FFFFFF;position=top]^3,
  @divider<>properties[style=dashed;width=2px;color=#FFFFFF]^2
]^4;
@sounds<>effects[paddle-hit;wall-hit;score-sound;game-over]^3;
@controls<>input[player1=W,S;player2=ArrowUp,ArrowDown]^4;
@mechanics<>[
  @collision-detection<>precise^4,
  @score-tracking<>first-to-10^3,
  @difficulty<>progressive{ball-speed-increase}^3,
  @physics<>realistic-bouncing{angle-calculation}^4
]^5;
@game-states<>[menu;playing;game-over]^3;
@code-requirements<>[
  @structure<>single-HTML-file{all-in-one}^5,
  @quality<>clean+commented+maintainable^5,
  @functionality<>complete+playable+no-placeholders^5,
  @dependencies<>none{vanilla-JavaScript-only}^4
]^5;
!(deliver)>complete-working-code{ready-to-run}^5*critical;
@rsp.format<>HTML-document{full-code}^5;
!zoom+^5 !focus#implementation^5;
```
