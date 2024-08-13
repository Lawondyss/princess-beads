# Princezničky korále

Jedná se o narozeninovou hru pro mou Julit.

Principem hry je rozluštit hádanky, které odkazují na nějaká místa.

Ona místa skrývají jednotlivé "korále", což jsou kódy, které je potřeba naskenovat v aplikaci. 

Naskenováním kódu se potvrdí nalezení a odkryje se další hádanka, kterých může být libovolné množství.

Získáním všech korálů se zobrazí závěřečná hádanka. Narozdíl od předešlých hádanek, musí být vyřešena až jako poslední.

Naskenováním závěrečného kódu se zobrazí zpráva s pokladem.

Hádanky a další nastavení jsou vysvětlena v `.env.example`, který lze použít jako šablonu pro lokální `.env`.

Deploy v GitHub Actions používá environment variables nastavené v projektu pod `github-pages`.

