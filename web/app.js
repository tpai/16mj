const tileImages = {
  t1: 'Image/MJt1.gif', t2: 'Image/MJt2.gif', t3: 'Image/MJt3.gif',
  t4: 'Image/MJt4.gif', t5: 'Image/MJt5.gif', t6: 'Image/MJt6.gif',
  t7: 'Image/MJt7.gif', t8: 'Image/MJt8.gif', t9: 'Image/MJt9.gif',
  s1: 'Image/MJs1.gif', s2: 'Image/MJs2.gif', s3: 'Image/MJs3.gif',
  s4: 'Image/MJs4.gif', s5: 'Image/MJs5.gif', s6: 'Image/MJs6.gif',
  s7: 'Image/MJs7.gif', s8: 'Image/MJs8.gif', s9: 'Image/MJs9.gif',
  w1: 'Image/MJw1.gif', w2: 'Image/MJw2.gif', w3: 'Image/MJw3.gif',
  w4: 'Image/MJw4.gif', w5: 'Image/MJw5.gif', w6: 'Image/MJw6.gif',
  w7: 'Image/MJw7.gif', w8: 'Image/MJw8.gif', w9: 'Image/MJw9.gif',
  f1: 'Image/MJf1.gif', f2: 'Image/MJf2.gif', f3: 'Image/MJf3.gif', f4: 'Image/MJf4.gif',
  d1: 'Image/MJd1.gif', d2: 'Image/MJd2.gif', d3: 'Image/MJd3.gif',
  h1: 'Image/MJh1.gif', h2: 'Image/MJh2.gif', h3: 'Image/MJh3.gif', h4: 'Image/MJh4.gif',
  h5: 'Image/MJh5.gif', h6: 'Image/MJh6.gif', h7: 'Image/MJh7.gif', h8: 'Image/MJh8.gif'
};

// tile ordering, first 34 tiles repeat 4 times
const tileOrder = [
  't1','t2','t3','t4','t5','t6','t7','t8','t9',
  's1','s2','s3','s4','s5','s6','s7','s8','s9',
  'w1','w2','w3','w4','w5','w6','w7','w8','w9',
  'f1','f2','f3','f4','d1','d2','d3',
  'h1','h2','h3','h4','h5','h6','h7','h8'
];

let deck = [];
const players = [[], [], [], []];
const discards = [[], [], [], []];
const melds = [[], [], [], []];
const flowers = [[], [], [], []];
let turn = 0; // 0 = you
let gameOver = false;
let pendingAction = null;
let showAIDeck = false;
let playerNeedsDraw = false;

const tileToIndex = {
  t1:0,t2:1,t3:2,t4:3,t5:4,t6:5,t7:6,t8:7,t9:8,
  s1:9,s2:10,s3:11,s4:12,s5:13,s6:14,s7:15,s8:16,s9:17,
  w1:18,w2:19,w3:20,w4:21,w5:22,w6:23,w7:24,w8:25,w9:26,
  f1:27,f2:28,f3:29,f4:30,d1:31,d2:32,d3:33,
  h1:34,h2:35,h3:36,h4:37,h5:38,h6:39,h7:40,h8:41
};

function isFlower(t) {
  return t && t.startsWith('h');
}

function insertMj(mjv, mj) {
  const arr = mj.slice();
  let inserted = false;
  for (let i=0;i<arr.length;i++) {
    if (mjv <= arr[i]) {
      arr.splice(i,0,mjv);
      inserted = true;
      break;
    }
  }
  if (!inserted) arr.push(mjv);
  return [arr, arr.length];
}

function nextNotBlock(block, mjNum, next=0) {
  for (let i=next;i<mjNum;i++) if (block[i]===0) return i;
  return -1;
}

function nextTwoNotBlock(block, mjNum, next) {
  const n0 = nextNotBlock(block, mjNum, next);
  if (n0 === -1) return [-1,-1];
  const n1 = nextNotBlock(block, mjNum, n0+1);
  if (n1 === -1) return [n0,-1];
  return [n0,n1];
}

function nextNotBlSame(block, mjNum, mj, sv, next=0) {
  for (let i=next;i<mjNum;i++) if (block[i]===0 && mj[i]!==sv) return i;
  return -1;
}

function nextTwoNotBlSame(block, mjNum, next, mj, sv) {
  const n0 = nextNotBlSame(block, mjNum, mj, sv, next);
  if (n0 === -1) return [-1,-1];
  const n1 = nextNotBlSame(block, mjNum, mj, mj[n0], n0+1);
  if (n1 === -1) return [n0,-1];
  return [n0,n1];
}

function hu(pmj, value) {
  let [mj, mjNum] = insertMj(value, pmj);
  let block = new Array(mjNum).fill(0);
  let c = 0;
  while (c < mjNum) {
    if (mjNum - 1 === c) break;
    if (mj[c] === mj[c+1]) {
      block[c] = block[c+1] = 1;
      let i = 0;
      let mjHu = 1;
      while (i < mjNum) {
        if (block[i] === 1) { i++; continue; }
        let [n1,n2] = nextTwoNotBlock(block, mjNum, i+1);
        if (n1 !== -1 && n2 !== -1) {
          if (mj[i] === mj[n1] && mj[i] === mj[n2]) {
            block[i] = block[n1] = block[n2] = 1;
            i++; continue;
          } else {
            let [m1,m2] = nextTwoNotBlSame(block, mjNum, i+1, mj, mj[i]);
            if (m1 !== -1 && m2 !== -1 && mj[i] < 27 &&
                Math.floor(mj[i]/9) === Math.floor(mj[m1]/9) &&
                mj[i]+1 === mj[m1] && mj[m1]+1 === mj[m2]) {
              block[i] = block[m1] = block[m2] = 1;
              i++; continue;
            } else {
              mjHu = 0; break;
            }
          }
        } else { mjHu = 0; break; }
      }
      if (mjHu === 1) return true;
      block = new Array(mjNum).fill(0);
      c += 2;
    }
    c += 1;
  }
  return false;
}

function buildDeck() {
  deck = [];
  tileOrder.forEach((t, idx) => {
    if (idx < 34) {
      for (let i = 0; i < 4; i++) deck.push(t);
    } else {
      deck.push(t);
    }
  });
}

function parseTile(t) {
  return {suit: t[0], num: parseInt(t.slice(1))};
}

function removeTileFromHand(pid, tile, count=1) {
  for (let i=0;i<count;i++) {
    const idx = players[pid].indexOf(tile);
    if (idx !== -1) players[pid].splice(idx,1);
  }
}

function canPong(pid, tile) {
  return players[pid].filter(t=>t===tile).length >= 2;
}

function canKong(pid, tile) {
  return players[pid].filter(t=>t===tile).length >= 3;
}

function canHu(pid, tile) {
  const base = players[pid].map(t=>tileToIndex[t]).sort((a,b)=>a-b);
  return hu(base, tileToIndex[tile]);
}

function sortPlayer(pid) {
  players[pid].sort((a,b) => tileToIndex[a] - tileToIndex[b]);
}

function replaceFlowers(pid) {
  let changed = true;
  while (changed && deck.length > 0) {
    changed = false;
    for (let i=0;i<players[pid].length;i++) {
      if (isFlower(players[pid][i])) {
        flowers[pid].push(players[pid][i]);
        players[pid].splice(i,1);
        if (deck.length > 0) {
          players[pid].push(deck.shift());
        }
        changed = true;
        break;
      }
    }
    sortPlayer(pid);
  }
}

function flowerTai(pid) {
  const seatFlowers = [
    ['h1','h5'],
    ['h2','h6'],
    ['h3','h7'],
    ['h4','h8']
  ];
  let tai = 0;
  const f = flowers[pid];
  seatFlowers[pid].forEach(t => { if (f.includes(t)) tai += 1; });
  const seasons = ['h1','h2','h3','h4'];
  const gent = ['h5','h6','h7','h8'];
  if (seasons.every(t => f.includes(t))) tai += 2;
  if (gent.every(t => f.includes(t))) tai += 2;
  return tai;
}

function canChi(pid, tile, from) {
  if (pid !== (from+1)%4) return [];
  const {suit, num} = parseTile(tile);
  if (!['t','s','w'].includes(suit)) return [];
  const have = t => players[pid].includes(t);
  const res = [];
  if (num>=3 && have(`${suit}${num-2}`) && have(`${suit}${num-1}`)) res.push([`${suit}${num-2}`,`${suit}${num-1}`]);
  if (num>=2 && num<=8 && have(`${suit}${num-1}`) && have(`${suit}${num+1}`)) res.push([`${suit}${num-1}`,`${suit}${num+1}`]);
  if (num<=7 && have(`${suit}${num+1}`) && have(`${suit}${num+2}`)) res.push([`${suit}${num+1}`,`${suit}${num+2}`]);
  return res;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderPlayerHand() {
  const handEl = document.getElementById('player-hand');
  handEl.innerHTML = '';
  players[0].forEach((t, idx) => {
    const img = document.createElement('img');
    img.src = tileImages[t];
    img.className = 'tile';
    if (!playerNeedsDraw) {
      img.addEventListener('click', () => discard(idx));
      img.style.cursor = 'pointer';
    } else {
      img.style.opacity = '0.5';
    }
    handEl.appendChild(img);
  });
}

function renderPlayerMelds() {
  const mEl = document.getElementById('player-melds');
  if (!mEl) return;
  mEl.innerHTML = '';
  melds[0].forEach(m => {
    m.tiles.forEach(t => {
      const img = document.createElement('img');
      img.src = tileImages[t];
      img.className = 'tile';
      mEl.appendChild(img);
    });
  });
}

function renderPlayerFlowers() {
  const fEl = document.getElementById('player-flowers');
  if (!fEl) return;
  fEl.innerHTML = '';
  flowers[0].forEach(t => {
    const img = document.createElement('img');
    img.src = tileImages[t];
    img.className = 'tile';
    fEl.appendChild(img);
  });
}

function renderAiHand(p) {
  const el = document.getElementById(`hand-${p}`);
  if (!el) return;
  el.innerHTML = '';
  if (showAIDeck) {
    el.style.display = 'flex';
    players[p].forEach(t => {
      const img = document.createElement('img');
      img.src = tileImages[t];
      img.className = 'tile';
      el.appendChild(img);
    });
  } else {
    el.style.display = 'none';
  }
}

function renderDiscardPile(p) {
  const pile = document.getElementById(`discard-${p}`);
  pile.innerHTML = '';
  discards[p].forEach(t => {
    const img = document.createElement('img');
    img.src = tileImages[t];
    img.className = 'tile';
    pile.appendChild(img);
  });
}

function renderAll() {
  renderPlayerHand();
  renderPlayerFlowers();
  renderPlayerMelds();
  for (let i = 0; i < 4; i++) {
    renderDiscardPile(i);
    if (i !== 0) renderAiHand(i);
  }
  document.getElementById('deck-size').textContent = deck.length;
}

function updateControls() {
  const drawBtn = document.getElementById('drawBtn');
  const sortBtn = document.getElementById('sortBtn');
  if (gameOver) {
    drawBtn.disabled = true;
    sortBtn.disabled = true;
    return;
  }
  if (pendingAction) {
    drawBtn.disabled = true;
    sortBtn.disabled = true;
    return;
  }
  if (turn === 0) {
    sortBtn.disabled = false;
    drawBtn.disabled = deck.length === 0 || players[0].length !== 16;
  } else {
    drawBtn.disabled = true;
    sortBtn.disabled = true;
  }
}

function startGame() {
  buildDeck();
  shuffle(deck);
  for (let p = 0; p < 4; p++) {
    players[p] = deck.splice(0, 16);
    sortPlayer(p);
    discards[p] = [];
    melds[p] = [];
    flowers[p] = [];
  }
  players[0].push(deck.shift()); // host draws first
  sortPlayer(0);
  replaceFlowers(0);
  replaceFlowers(1);
  replaceFlowers(2);
  replaceFlowers(3);
  turn = 0;
  gameOver = false;
  pendingAction = null;
  playerNeedsDraw = false;
  renderAll();
  updateControls();
}

function drawTileFor(pid) {
  if (deck.length === 0) return null;
  players[pid].push(deck.shift());
  replaceFlowers(pid);
  sortPlayer(pid);
  const tile = players[pid][players[pid].length - 1];
  if (pid === 0) playerNeedsDraw = false;
  renderAll();
  if (tile && checkHu(pid, tile)) {
    declareWin(pid);
  }
  return tile;
}

function drawTile() {
  if (turn !== 0 || deck.length === 0 || players[0].length !== 16) return;
  drawTileFor(0);
  updateControls();
}

function discard(idx) {
  if (turn !== 0) return;
  if (playerNeedsDraw) return;
  const tile = players[0].splice(idx, 1)[0];
  discards[0].push(tile);
  playerNeedsDraw = true;
  renderAll();
  checkReactions(0, tile);
}

function sortHand() {
  sortPlayer(0);
  renderPlayerHand();
}

function checkHu(id, tile) {
  const base = players[id].slice(0, players[id].length - 1).map(t => tileToIndex[t]);
  base.sort((a,b) => a-b);
  return hu(base, tileToIndex[tile]);
}

function declareWin(id) {
  gameOver = true;
  renderAll();
  updateControls();
  let msg = id === 0 ? 'You win!' : `Player ${id + 1} wins!`;
  const tai = flowerTai(id);
  if (tai > 0) msg += ` (Flower tai: ${tai})`;
  alert(msg);
}

function showActionButtons(opts, from, tile) {
  pendingAction = {from, tile, opts};
  const act = document.getElementById('actions');
  if (!act) return;
  act.innerHTML = '';
  const add = (name, actName) => {
    const b = document.createElement('button');
    b.textContent = name;
    b.addEventListener('click', () => handleAction(actName));
    act.appendChild(b);
  };
  if (opts.hu) add('Hu', 'hu');
  if (opts.kong) add('Kong', 'kong');
  if (opts.pong) add('Pong', 'pong');
  if (opts.chi) add('Chi', 'chi');
  add('Skip', 'skip');
  act.style.display = 'block';
  updateControls();
}

function hideActionButtons() {
  const act = document.getElementById('actions');
  if (act) { act.innerHTML = ''; act.style.display = 'none'; }
}

function handleAction(action) {
  const {tile, from, opts} = pendingAction;
  if (action === 'hu') {
    declareWin(0);
    pendingAction = null;
    hideActionButtons();
    return;
  }
  if (action === 'pong') doPong(0, tile);
  else if (action === 'kong') { doKong(0, tile); }
  else if (action === 'chi') { doChi(0, opts.chi[0], tile); }
  else if (action === 'skip') { pendingAction = null; hideActionButtons(); nextTurn(); return; }
  pendingAction = null;
  hideActionButtons();
  renderAll();
  updateControls();
}

function doPong(pid, tile) {
  removeTileFromHand(pid, tile, 2);
  melds[pid].push({type:'pong', tiles:[tile,tile,tile]});
  if (deck.length > 0) {
    drawTileFor(pid);
  }
  turn = pid;
}

function doKong(pid, tile) {
  removeTileFromHand(pid, tile, 3);
  melds[pid].push({type:'kong', tiles:[tile,tile,tile,tile]});
  if (deck.length > 0) {
    drawTileFor(pid);
  }
  turn = pid;
}

function doChi(pid, combo, tile) {
  removeTileFromHand(pid, combo[0]);
  removeTileFromHand(pid, combo[1]);
  melds[pid].push({type:'chi', tiles:[combo[0], combo[1], tile]});
  if (deck.length > 0) {
    drawTileFor(pid);
  }
  turn = pid;
}

function aiDiscard(id) {
  if (gameOver) return;
  const dIdx = Math.floor(Math.random() * players[id].length);
  const discardTile = players[id].splice(dIdx,1)[0];
  discards[id].push(discardTile);
  renderAll();
  checkReactions(id, discardTile);
}

function aiKong(id, tile) {
  doKong(id, tile);
  renderAll();
  setTimeout(() => aiDiscard(id), 300);
}

function aiPong(id, tile) {
  doPong(id, tile);
  renderAll();
  setTimeout(() => aiDiscard(id), 300);
}

function aiChi(id, tile, combos) {
  doChi(id, combos[0], tile);
  renderAll();
  setTimeout(() => aiDiscard(id), 300);
}

function aiHu(id) {
  declareWin(id);
}

function checkReactions(from, tile) {
  if (gameOver) { updateControls(); return; }
  // Hu check
  for (let i=1;i<4;i++) {
    const pid = (from+i)%4;
    if (canHu(pid, tile)) {
      if (pid === 0) { showActionButtons({hu:true}, from, tile); return; }
      aiHu(pid); return;
    }
  }
  // Pong/Kong
  for (let i=1;i<4;i++) {
    const pid = (from+i)%4;
    if (canKong(pid, tile)) {
      if (pid === 0) { showActionButtons({kong:true}, from, tile); return; }
      aiKong(pid, tile); return;
    }
    if (canPong(pid, tile)) {
      if (pid === 0) { showActionButtons({pong:true}, from, tile); return; }
      aiPong(pid, tile); return;
    }
  }
  // Chi for next player
  const next = (from+1)%4;
  const chiOpts = canChi(next, tile, from);
  if (chiOpts.length > 0) {
    if (next === 0) { showActionButtons({chi:chiOpts}, from, tile); return; }
    aiChi(next, tile, chiOpts); return;
  }
  nextTurn();
}

function nextTurn() {
  if (gameOver) {
    updateControls();
    return;
  }
  if (deck.length === 0) {
    alert('No tiles left. Game over.');
    updateControls();
    return;
  }
  turn = (turn + 1) % 4;
  if (turn === 0) playerNeedsDraw = true;
  updateControls();
  if (turn !== 0) {
    setTimeout(() => aiTurn(turn), 500);
  }
}

function aiTurn(id) {
  if (gameOver) {
    updateControls();
    return;
  }
  if (deck.length === 0) {
    updateControls();
    return;
  }
  const drawn = deck.shift();
  players[id].push(drawn);
  replaceFlowers(id);
  const last = players[id][players[id].length - 1];
  if (last && checkHu(id, last)) {
    declareWin(id);
    return;
  }
  const dIdx = Math.floor(Math.random() * players[id].length);
  const discardTile = players[id].splice(dIdx, 1)[0];
  discards[id].push(discardTile);
  renderAll();
  checkReactions(id, discardTile);
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('drawBtn').addEventListener('click', drawTile);
document.getElementById('sortBtn').addEventListener('click', sortHand);
document.getElementById('toggleAi').addEventListener('click', toggleAi);

function toggleAi() {
  showAIDeck = !showAIDeck;
  const btn = document.getElementById('toggleAi');
  btn.textContent = showAIDeck ? 'Hide AI Hands' : 'Show AI Hands';
  renderAll();
}
