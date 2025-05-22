// Mahjong game logic
console.log("Mahjong JavaScript file loaded.");

// Tile types and definitions
const TILE_TYPES = { CHARACTER: 'w', BAMBOO: 's', DOT: 't', WIND: 'f', DRAGON: 'd', FLOWER: 'h' };
const TILES = [
    { code: 't1', name: 'Dot 1', type: TILE_TYPES.DOT, value: 1, fileName: 'MJt1.gif', id: 0 }, { code: 't2', name: 'Dot 2', type: TILE_TYPES.DOT, value: 2, fileName: 'MJt2.gif', id: 1 }, { code: 't3', name: 'Dot 3', type: TILE_TYPES.DOT, value: 3, fileName: 'MJt3.gif', id: 2 }, { code: 't4', name: 'Dot 4', type: TILE_TYPES.DOT, value: 4, fileName: 'MJt4.gif', id: 3 }, { code: 't5', name: 'Dot 5', type: TILE_TYPES.DOT, value: 5, fileName: 'MJt5.gif', id: 4 }, { code: 't6', name: 'Dot 6', type: TILE_TYPES.DOT, value: 6, fileName: 'MJt6.gif', id: 5 }, { code: 't7', name: 'Dot 7', type: TILE_TYPES.DOT, value: 7, fileName: 'MJt7.gif', id: 6 }, { code: 't8', name: 'Dot 8', type: TILE_TYPES.DOT, value: 8, fileName: 'MJt8.gif', id: 7 }, { code: 't9', name: 'Dot 9', type: TILE_TYPES.DOT, value: 9, fileName: 'MJt9.gif', id: 8 },
    { code: 's1', name: 'Bamboo 1', type: TILE_TYPES.BAMBOO, value: 1, fileName: 'MJs1.gif', id: 9 }, { code: 's2', name: 'Bamboo 2', type: TILE_TYPES.BAMBOO, value: 2, fileName: 'MJs2.gif', id: 10 }, { code: 's3', name: 'Bamboo 3', type: TILE_TYPES.BAMBOO, value: 3, fileName: 'MJs3.gif', id: 11 }, { code: 's4', name: 'Bamboo 4', type: TILE_TYPES.BAMBOO, value: 4, fileName: 'MJs4.gif', id: 12 }, { code: 's5', name: 'Bamboo 5', type: TILE_TYPES.BAMBOO, value: 5, fileName: 'MJs5.gif', id: 13 }, { code: 's6', name: 'Bamboo 6', type: TILE_TYPES.BAMBOO, value: 6, fileName: 'MJs6.gif', id: 14 }, { code: 's7', name: 'Bamboo 7', type: TILE_TYPES.BAMBOO, value: 7, fileName: 'MJs7.gif', id: 15 }, { code: 's8', name: 'Bamboo 8', type: TILE_TYPES.BAMBOO, value: 8, fileName: 'MJs8.gif', id: 16 }, { code: 's9', name: 'Bamboo 9', type: TILE_TYPES.BAMBOO, value: 9, fileName: 'MJs9.gif', id: 17 },
    { code: 'w1', name: 'Character 1', type: TILE_TYPES.CHARACTER, value: 1, fileName: 'MJw1.gif', id: 18 }, { code: 'w2', name: 'Character 2', type: TILE_TYPES.CHARACTER, value: 2, fileName: 'MJw2.gif', id: 19 }, { code: 'w3', name: 'Character 3', type: TILE_TYPES.CHARACTER, value: 3, fileName: 'MJw3.gif', id: 20 }, { code: 'w4', name: 'Character 4', type: TILE_TYPES.CHARACTER, value: 4, fileName: 'MJw4.gif', id: 21 }, { code: 'w5', name: 'Character 5', type: TILE_TYPES.CHARACTER, value: 5, fileName: 'MJw5.gif', id: 22 }, { code: 'w6', name: 'Character 6', type: TILE_TYPES.CHARACTER, value: 6, fileName: 'MJw6.gif', id: 23 }, { code: 'w7', name: 'Character 7', type: TILE_TYPES.CHARACTER, value: 7, fileName: 'MJw7.gif', id: 24 }, { code: 'w8', name: 'Character 8', type: TILE_TYPES.CHARACTER, value: 8, fileName: 'MJw8.gif', id: 25 }, { code: 'w9', name: 'Character 9', type: TILE_TYPES.CHARACTER, value: 9, fileName: 'MJw9.gif', id: 26 },
    { code: 'f1', name: 'East Wind', type: TILE_TYPES.WIND, value: 1, fileName: 'MJf1.gif', id: 27 }, { code: 'f2', name: 'South Wind', type: TILE_TYPES.WIND, value: 2, fileName: 'MJf2.gif', id: 28 }, { code: 'f3', name: 'West Wind', type: TILE_TYPES.WIND, value: 3, fileName: 'MJf3.gif', id: 29 }, { code: 'f4', name: 'North Wind', type: TILE_TYPES.WIND, value: 4, fileName: 'MJf4.gif', id: 30 },
    { code: 'd1', name: 'Red Dragon', type: TILE_TYPES.DRAGON, value: 1, fileName: 'MJd1.gif', id: 31 }, { code: 'd2', name: 'Green Dragon', type: TILE_TYPES.DRAGON, value: 2, fileName: 'MJd2.gif', id: 32 }, { code: 'd3', name: 'White Dragon', type: TILE_TYPES.DRAGON, value: 3, fileName: 'MJd3.gif', id: 33 },
    { code: 'h1', name: 'Flower 1', type: TILE_TYPES.FLOWER, value: 1, fileName: 'MJh1.gif', id: 34 }, { code: 'h2', name: 'Flower 2', type: TILE_TYPES.FLOWER, value: 2, fileName: 'MJh2.gif', id: 35 }, { code: 'h3', name: 'Flower 3', type: TILE_TYPES.FLOWER, value: 3, fileName: 'MJh3.gif', id: 36 }, { code: 'h4', name: 'Flower 4', type: TILE_TYPES.FLOWER, value: 4, fileName: 'MJh4.gif', id: 37 }, { code: 'h5', name: 'Flower 5', type: TILE_TYPES.FLOWER, value: 5, fileName: 'MJh5.gif', id: 38 }, { code: 'h6', name: 'Flower 6', type: TILE_TYPES.FLOWER, value: 6, fileName: 'MJh6.gif', id: 39 }, { code: 'h7', name: 'Flower 7', type: TILE_TYPES.FLOWER, value: 7, fileName: 'MJh7.gif', id: 40 }, { code: 'h8', name: 'Flower 8', type: TILE_TYPES.FLOWER, value: 8, fileName: 'MJh8.gif', id: 41 },
];
const BASIC_TILES_FOR_HU_CHECK = TILES.filter(t => t.type !== TILE_TYPES.FLOWER).map(({id, type, value, name, fileName}) => ({id, type, value, name, fileName, uniqueId: `basic_${id}`}));

const TILE_BACK_FILENAME = 'mjback.gif';
const TILES_PER_PLAYER = 16;
const PLAYER_IDS = ['south', 'east', 'north', 'west'];
let DEALER_PLAYER_ID = 'east'; // Initial dealer, can change

const MELD_TYPES = { CHI: 'chi', PON: 'pon', KONG_MIN: 'minkong', KONG_AN: 'ankong', KONG_KA: 'kakang' };

let fullDeck = [];
let playerHands = { south: [], east: [], north: [], west: [] };
let flowerTiles = { south: [], east: [], north: [], west: [] };
let discardPiles = { south: [], east: [], north: [], west: [] };
let playerExposedMelds = { south: [], east: [], north: [], west: [] };
let wall = [];

let availableActions = { 
    pon: false, chi: false, kong: false, ting: false, hu: false,
    huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } 
};
let playerTingStatus = { south: false, east: false, north: false, west: false };
let chiCombinations = [];
let currentKongContext = { type: null, tiles: [], sourceMeld: null };
let lastDiscardedTileForClaim = null;
let lastDiscarderPlayerId = null;
let isGameOver = false;

let currentPlayerIndex = 0;
let currentWind = 0; // Game round wind (0:East, 1:South, 2:West, 3:North)
// Player seat winds are relative to the current dealer. East is always 0.
// This mapping is fixed based on player positions, not on who is current dealer.
// The actual DEALER_PLAYER_ID will determine who is "East Seat" for scoring/rules.
const playerSeatWind = { east: 0, south: 1, west: 2, north: 3 }; 


let canPlayerDraw = false;
let mustPlayerDiscard = false;
// let isReplacementDraw = false; // Replaced by parameter in processPlayerDraw

// --- Core Game Logic ---
function createFullDeck() { fullDeck = []; TILES.forEach(tileInfo => { if (tileInfo.type !== TILE_TYPES.FLOWER) { for (let i = 0; i < 4; i++) { fullDeck.push({...tileInfo, uniqueId: `${tileInfo.code}_${i}`}); } } else { fullDeck.push({...tileInfo, uniqueId: tileInfo.code}); } }); return fullDeck; }
function shuffleDeck(deck) { for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; } }
function sortHand(hand) { hand.sort((a, b) => { if (a.id !== b.id) return a.id - b.id; return a.uniqueId.localeCompare(b.uniqueId); }); }

function dealTiles() {
    wall = [...fullDeck];
    shuffleDeck(wall);
    PLAYER_IDS.forEach(player => {
        playerHands[player] = [];
        flowerTiles[player] = [];
        discardPiles[player] = [];
        playerExposedMelds[player] = [];
        playerTingStatus[player] = false;
        const playerAreaDiv = document.getElementById(`player-area-${player}`);
        if(playerAreaDiv) playerAreaDiv.classList.remove('ting-active');
    });
    availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } };
    chiCombinations = [];
    currentKongContext = { type: null, tiles: [], sourceMeld: null };
    updateActionButtons();

    for (let i = 0; i < TILES_PER_PLAYER; i++) {
        for (const player of PLAYER_IDS) { drawInitialTileForPlayer(player, true); }
    }
    PLAYER_IDS.forEach(player => sortHand(playerHands[player]));
}

function drawInitialTileForPlayer(playerId, isInitialDeal = false) { if (wall.length === 0) return null; let drawnTile = wall.pop(); while (drawnTile && drawnTile.type === TILE_TYPES.FLOWER) { flowerTiles[playerId].push(drawnTile); if (wall.length > 0) { drawnTile = wall.shift(); } else { drawnTile = null; break; } } if (drawnTile) { playerHands[playerId].push(drawnTile); } return drawnTile; }

function nextTurn() {
    if (isGameOver) return;
    mustPlayerDiscard = false;
    canPlayerDraw = false;
    // isReplacementDraw = false; // No longer global
    availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } };
    chiCombinations = [];
    currentKongContext = { type: null, tiles: [], sourceMeld: null };
    lastDiscardedTileForClaim = null;
    lastDiscarderPlayerId = null;
    updateActionButtons();

    currentPlayerIndex = (currentPlayerIndex + 1) % PLAYER_IDS.length;
    const currentPlayer = PLAYER_IDS[currentPlayerIndex];
    updateCurrentPlayerDisplay(currentPlayer); // Also updates dealer display via updateGameInfoDisplay
    console.log(`Turn passes to ${currentPlayer}. Ting status: ${playerTingStatus[currentPlayer]}`);
    processPlayerDraw(currentPlayer, false); // Player draws their tile (false for isKongReplacementDraw)
}

function processPlayerDraw(playerId, isKongReplacementDraw = false) {
    if (isGameOver) return;
    if (playerTingStatus[playerId] && isKongReplacementDraw) { console.log(`${playerId} (Ting) is drawing replacement after Kong.`); }
    if (wall.length === 0) {
        console.log("Wall is empty. Cannot draw.");
        if (!isKongReplacementDraw && !isGameOver) { 
            console.log("Game ends in exhaustive draw (placeholder)."); isGameOver = true; revealAllHands(); updateActionButtons(); 
        }
        return;
    }
    canPlayerDraw = false; let drawnTile = wall.pop(); updateWallCount();
    while (drawnTile && drawnTile.type === TILE_TYPES.FLOWER) {
        console.log(`${playerId} drew a flower: ${drawnTile.name}`); flowerTiles[playerId].push(drawnTile); sortHand(flowerTiles[playerId]); displayPlayerHand(playerId, playerId === 'south');
        if (wall.length > 0) { drawnTile = wall.shift(); updateWallCount(); } else { drawnTile = null; break; }
    }
    const finalDrawnTile = drawnTile;
    if (finalDrawnTile) { console.log(`${playerId} drew: ${finalDrawnTile.name}`); playerHands[playerId].push(finalDrawnTile); sortHand(playerHands[playerId]);
    } else { 
        console.log(`${playerId} drew no valid tile (wall empty or flower with no replacement).`);
        if (wall.length === 0 && !isKongReplacementDraw && !isGameOver) { console.log("Game ends in exhaustive draw (no tile after flower)."); isGameOver = true; revealAllHands(); updateActionButtons(); return; }
    }
    displayPlayerHand(playerId, playerId === 'south');
    if (playerId === 'south') {
        availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; currentKongContext = { type: null, tiles: [], sourceMeld: null };
        if (finalDrawnTile) { 
            const handToCheckForHu = playerHands.south.filter(t => t.uniqueId !== finalDrawnTile.uniqueId);
            if (isHu(handToCheckForHu, finalDrawnTile)) {
                availableActions.hu = true; availableActions.huContext = { tile: finalDrawnTile, isTsumo: true, winningPlayerId: 'south', fromKongReplacement: isKongReplacementDraw }; console.log("South can Tsumo with drawn tile:", finalDrawnTile.name);
            }
        }
        if (playerTingStatus.south) { 
            if (availableActions.hu) { console.log("South (Ting) can Hu with drawn tile!"); } 
            else if (finalDrawnTile) { console.log("South (Ting) auto-discarding drawn tile:", finalDrawnTile.name); mustPlayerDiscard = false; updateActionButtons(); processPlayerDiscard('south', finalDrawnTile.uniqueId); return; } 
            else { console.log("South (Ting) drew no valid tile."); if (wall.length === 0 && !isGameOver) { if(!isGameOver) nextTurn(); } }
        } else if (!availableActions.hu) { 
            if (finalDrawnTile) { 
                const anKongHandTiles = checkAnKong('south'); const kaKongableMeldInfo = checkKaKong('south', finalDrawnTile);
                if (anKongHandTiles) { availableActions.kong = true; currentKongContext = { type: MELD_TYPES.KONG_AN, tiles: anKongHandTiles.slice(0, 4) }; } 
                else if (kaKongableMeldInfo) { availableActions.kong = true; currentKongContext = { type: MELD_TYPES.KONG_KA, tiles: [finalDrawnTile], sourceMeld: kaKongableMeldInfo.meld }; }
            }
            if (playerHands.south.length === TILES_PER_PLAYER + 1 && !availableActions.kong) { if (checkTing('south')) { availableActions.ting = true; } }
            mustPlayerDiscard = true; 
        }
        updateActionButtons(); 
    } else { 
        if (finalDrawnTile || playerHands[playerId].length > TILES_PER_PLAYER || isKongReplacementDraw) { setTimeout(() => processAITurn(playerId, finalDrawnTile, isKongReplacementDraw), 500); } 
        else if (playerHands[playerId].length <= TILES_PER_PLAYER && !finalDrawnTile && !isKongReplacementDraw) { console.log(`${playerId} AI drew flower, no replacement, turn ends.`); if(!isGameOver) nextTurn(); }
    }
}

function processPlayerDiscard(playerId, tileUniqueId) {
    if (isGameOver) return;
    if (playerId === 'south' && !mustPlayerDiscard && !playerTingStatus.south) { console.warn("Not in a state to discard."); return; }
    const hand = playerHands[playerId]; const tileIndex = hand.findIndex(t => t.uniqueId === tileUniqueId);
    if (tileIndex === -1) { console.error("Tile not found for discard:", tileUniqueId); return; }
    const discardedTile = hand.splice(tileIndex, 1)[0]; discardPiles[playerId].push(discardedTile); sortHand(hand);
    console.log(`${playerId} discarded: ${discardedTile.name}`);
    displayPlayerHand(playerId, playerId === 'south'); displayDiscardPile(playerId);
    if (playerId === 'south') mustPlayerDiscard = false;

    for (const otherPlayerId of PLAYER_IDS) { 
        if (otherPlayerId === playerId) continue;
        if (!isGameOver && isHu(playerHands[otherPlayerId], discardedTile)) {
            console.log(`${otherPlayerId} can Ron on ${playerId}'s discard: ${discardedTile.name}`);
            if (otherPlayerId === 'south') { 
                availableActions.hu = true; availableActions.huContext = { tile: discardedTile, isTsumo: false, winningPlayerId: 'south', fromKongReplacement: false }; updateActionButtons(); return; 
            } else { handleHuAction(otherPlayerId, discardedTile, false, false); return; }
        }
    }
    if (isGameOver) return; 

    if (playerTingStatus[playerId]) { console.log(`${playerId} (Ting) discarded. Turn ends.`); if(!isGameOver) nextTurn(); return; }

    lastDiscardedTileForClaim = discardedTile; lastDiscarderPlayerId = playerId;
    availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } };
    chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null };
    const playerOrderForClaim = []; let nextPlayerIdx = PLAYER_IDS.indexOf(playerId);
    for (let i = 0; i < PLAYER_IDS.length - 1; i++) { nextPlayerIdx = (nextPlayerIdx + 1) % PLAYER_IDS.length; playerOrderForClaim.push(PLAYER_IDS[nextPlayerIdx]); }

    for (const claimingPlayerId of playerOrderForClaim) {
        if (playerTingStatus[claimingPlayerId]) { continue; }
        if (claimingPlayerId === 'south') {
            availableActions.pon = checkPon('south', discardedTile);
            const minKongHandTiles = checkMinKong('south', discardedTile);
            if (minKongHandTiles) { availableActions.kong = true; currentKongContext = { type: MELD_TYPES.KONG_MIN, tiles: minKongHandTiles }; }
            const southPlayerIndex = PLAYER_IDS.indexOf('south'); const expectedPrevIdx = (southPlayerIndex - 1 + PLAYER_IDS.length) % PLAYER_IDS.length;
            if (lastDiscarderPlayerId === PLAYER_IDS[expectedPrevIdx]) { chiCombinations = checkChi('south', discardedTile, lastDiscarderPlayerId); if (chiCombinations.length > 0) availableActions.chi = true; }
            updateActionButtons();
            if (availableActions.pon || availableActions.chi || availableActions.kong || availableActions.hu) { console.log("South player has action options. Pausing turn."); return; }
        } else { 
            if (checkPon(claimingPlayerId, discardedTile)) console.log(`${claimingPlayerId} AI can Pon ${discardedTile.name}`);
            if (checkMinKong(claimingPlayerId, discardedTile)) console.log(`${claimingPlayerId} AI can MinKong ${discardedTile.name}`);
            const aiPlayerIndex = PLAYER_IDS.indexOf(claimingPlayerId); const expectedPrevToAIIdx = (aiPlayerIndex - 1 + PLAYER_IDS.length) % PLAYER_IDS.length;
            if (lastDiscarderPlayerId === PLAYER_IDS[expectedPrevToAIIdx]) { if (checkChi(claimingPlayerId, discardedTile, lastDiscarderPlayerId).length > 0) console.log(`${claimingPlayerId} AI can Chi ${discardedTile.name}`); }
        }
    }
    if(isGameOver) return;
    lastDiscardedTileForClaim = null; lastDiscarderPlayerId = null;
    availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } };
    chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null };
    updateActionButtons();
    console.log("No player claimed discard. Proceeding to next player's turn.");
    if(!isGameOver) nextTurn();
}

// --- Action Check Functions ---
function checkPon(playerId, tileToCheck) { if (!tileToCheck) return false; const hand = playerHands[playerId]; let count = 0; hand.forEach(tileInHand => { if (tileInHand.id === tileToCheck.id) { count++; } }); return count >= 2; }
function checkChi(playerId, discardedTile, previousPlayerId) { if (!discardedTile || discardedTile.type === TILE_TYPES.WIND || discardedTile.type === TILE_TYPES.DRAGON || discardedTile.type === TILE_TYPES.FLOWER) { return []; } const playerIndex = PLAYER_IDS.indexOf(playerId); const prevPlayerIndex = PLAYER_IDS.indexOf(previousPlayerId); if ((prevPlayerIndex + 1) % PLAYER_IDS.length !== playerIndex) { return []; } const hand = playerHands[playerId]; const validCombinations = []; const tileValue = discardedTile.value; const tileType = discardedTile.type; const findTileInHand = (val, type) => hand.find(t => t.value === val && t.type === type); if (tileValue >= 3) { const tMinus2 = findTileInHand(tileValue - 2, tileType); const tMinus1 = findTileInHand(tileValue - 1, tileType); if (tMinus2 && tMinus1) validCombinations.push([tMinus2, tMinus1]); } if (tileValue >= 2 && tileValue <= 8) { const tMinus1 = findTileInHand(tileValue - 1, tileType); const tPlus1 = findTileInHand(tileValue + 1, tileType); if (tMinus1 && tPlus1) validCombinations.push([tMinus1, tPlus1]); } if (tileValue <= 7) { const tPlus1 = findTileInHand(tileValue + 1, tileType); const tPlus2 = findTileInHand(tileValue + 2, tileType); if (tPlus1 && tPlus2) validCombinations.push([tPlus1, tPlus2]); } return validCombinations; }
function checkMinKong(playerId, discardedTile) { if (!discardedTile) return null; const hand = playerHands[playerId]; const matches = hand.filter(tileInHand => tileInHand.id === discardedTile.id); return matches.length === 3 ? matches : null; }
function checkAnKong(playerId) { const hand = playerHands[playerId]; if (hand.length < 4) return null; const counts = {}; hand.forEach(tile => { counts[tile.id] = (counts[tile.id] || 0) + 1; }); for (const tileIdStr in counts) { if (counts[tileIdStr] === 4) { return hand.filter(tile => tile.id === parseInt(tileIdStr)); } } return null; }
function checkKaKong(playerId, drawnTile) { if (!drawnTile) return null; const melds = playerExposedMelds[playerId]; for (let i = 0; i < melds.length; i++) { const meld = melds[i]; if (meld.type === MELD_TYPES.PON && meld.tiles[0].id === drawnTile.id) { return { meld: meld, meldIndex: i }; } } return null; }
function checkTing(playerId) { const hand = playerHands[playerId]; if (hand.length < TILES_PER_PLAYER) return false; for (let i = 0; i < hand.length; i++) { const d_tile = hand[i]; let tempHand = hand.filter((tile, index) => index !== i); if (tempHand.length < 2 || (tempHand.length -2) % 3 !== 0 ) continue; for (const w_tile of BASIC_TILES_FOR_HU_CHECK) { if (isHu(tempHand, w_tile)) { console.log(`checkTing (${playerId}): Hand is Ting. Discard ${d_tile.name}, waits for ${w_tile.name}`); return true; } } } return false; }

// --- UI Update Functions ---
function displayPlayerHand(playerId, showFace = true) { const handDiv = document.getElementById(`hand-${playerId}`); handDiv.innerHTML = ''; const hand = playerHands[playerId]; hand.forEach(tile => { const tileElement = showFace ? createTileImageElement(tile) : createTileBackImageElement(); if (playerId === 'south' && mustPlayerDiscard && showFace && !playerTingStatus.south && !isGameOver ) { tileElement.classList.add('clickable'); tileElement.addEventListener('dblclick', () => { if (mustPlayerDiscard && PLAYER_IDS[currentPlayerIndex] === 'south' && !isGameOver) { processPlayerDiscard('south', tile.uniqueId); } }, { once: true }); } handDiv.appendChild(tileElement); }); displayMelds(playerId); displayFlowers(playerId); }
function displayMelds(playerId) { const meldsArea = document.getElementById(`melds-${playerId}`); Array.from(meldsArea.getElementsByClassName('meld')).forEach(el => el.remove()); playerExposedMelds[playerId].forEach(meld => { const meldDiv = document.createElement('div'); meldDiv.classList.add('meld', `meld-${meld.type}`); meld.tiles.forEach((tile, index) => { let tileElement; if (meld.type === MELD_TYPES.KONG_AN && meld.concealed && (index === 1 || index === 2)) { tileElement = createTileImageElement(tile); } else { tileElement = createTileImageElement(tile); } meldDiv.appendChild(tileElement); }); meldsArea.appendChild(meldDiv); }); }
function displayFlowers(playerId) { const meldsArea = document.getElementById(`melds-${playerId}`); Array.from(meldsArea.getElementsByClassName('flower-tile-display')).forEach(el => el.remove()); if (flowerTiles[playerId].length > 0) { const flowerContainer = document.createElement('div'); flowerContainer.className = 'flower-tile-display'; flowerTiles[playerId].forEach(flower => { const flowerElement = createTileImageElement(flower); flowerContainer.appendChild(flowerElement); }); meldsArea.appendChild(flowerContainer); } }
function displayDiscardPile(playerId) { const discardDiv = document.getElementById(`discards-${playerId}`); discardDiv.innerHTML = ''; discardPiles[playerId].forEach(tile => { const tileElement = createTileImageElement(tile); tileElement.classList.add('discarded'); discardDiv.appendChild(tileElement); }); }
function updateWallCount() { const wallCountSpan = document.getElementById('wall-count'); if (wallCountSpan) wallCountSpan.textContent = wall.length; }

function updateGameInfoDisplay() {
    const roundWindDisplay = document.getElementById('round-wind-display');
    const dealerDisplay = document.getElementById('dealer-display');
    const windNames = ["East", "South", "West", "North"];

    if (roundWindDisplay) roundWindDisplay.textContent = windNames[currentWind % 4];
    if (dealerDisplay) dealerDisplay.textContent = DEALER_PLAYER_ID.charAt(0).toUpperCase() + DEALER_PLAYER_ID.slice(1);

    PLAYER_IDS.forEach(pId => {
        const playerAreaDiv = document.getElementById(`player-area-${pId}`);
        if (playerAreaDiv) {
            if (pId === DEALER_PLAYER_ID) {
                playerAreaDiv.classList.add('is-dealer');
            } else {
                playerAreaDiv.classList.remove('is-dealer');
            }
        }
    });
}

function updateCurrentPlayerDisplay(playerId) { 
    const displaySpan = document.getElementById('current-player'); 
    if (displaySpan) displaySpan.textContent = playerId.charAt(0).toUpperCase() + playerId.slice(1); 
    PLAYER_IDS.forEach(pId => { 
        const playerAreaDiv = document.getElementById(`player-area-${pId}`); 
        if (playerAreaDiv) { 
            if (pId === playerId) { playerAreaDiv.classList.add('current-player-active'); } 
            else { playerAreaDiv.classList.remove('current-player-active'); } 
        } 
    }); 
    updateGameInfoDisplay(); // Update round/dealer info when current player changes as well
}
function createTileImageElement(tile) { const img = document.createElement('img'); img.src = `assets/images/${tile.fileName}`; img.alt = tile.name; img.classList.add('tile-image'); img.setAttribute('data-tile-code', tile.code); img.setAttribute('data-tile-id', tile.id); img.setAttribute('data-tile-unique-id', tile.uniqueId); return img; }
function createTileBackImageElement() { const img = document.createElement('img'); img.src = `assets/images/${TILE_BACK_FILENAME}`; img.alt = 'Tile Back'; img.classList.add('tile-image'); return img; }

// --- Event Handlers ---
function handleDrawTileFromWall(event) { if (event.target.id !== 'game-board' && !event.target.closest('#center-area')) { const reAddListener = () => { const gameBoard = document.getElementById('game-board'); gameBoard.removeEventListener('click', handleDrawTileFromWall); gameBoard.addEventListener('click', handleDrawTileFromWall, { once: true }); }; if (event.target.classList.contains('tile-image') && event.target.closest(`#hand-${PLAYER_IDS[currentPlayerIndex]}`)) { if (PLAYER_IDS[currentPlayerIndex] === 'south' && canPlayerDraw) reAddListener(); return; } if (PLAYER_IDS[currentPlayerIndex] === 'south' && canPlayerDraw) reAddListener(); return; } const currentPlayer = PLAYER_IDS[currentPlayerIndex]; if (currentPlayer === 'south' && canPlayerDraw && !isGameOver) { processPlayerDraw('south', false); } else { if(currentPlayer === 'south' && canPlayerDraw && !isGameOver) { const gameBoard = document.getElementById('game-board'); gameBoard.removeEventListener('click', handleDrawTileFromWall); gameBoard.addEventListener('click', handleDrawTileFromWall, { once: true }); } } }

// --- Action Button Handlers ---
function handlePonAction() { if (!availableActions.pon || !lastDiscardedTileForClaim || PLAYER_IDS[currentPlayerIndex] !== 'south' || isGameOver) { if (PLAYER_IDS[currentPlayerIndex] !== 'south' && !availableActions.pon) { return; } } const claimingPlayer = 'south'; const hand = playerHands[claimingPlayer]; const matches = hand.filter(tile => tile.id === lastDiscardedTileForClaim.id); if (matches.length < 2) return; const originalDiscarderId = lastDiscarderPlayerId; currentPlayerIndex = PLAYER_IDS.indexOf(claimingPlayer); updateCurrentPlayerDisplay(claimingPlayer); let removedCount = 0; const tilesForMeld = [lastDiscardedTileForClaim]; playerHands[claimingPlayer] = hand.filter(tile => { if (removedCount < 2 && tile.id === lastDiscardedTileForClaim.id) { tilesForMeld.push({...tile}); removedCount++; return false; } return true; }); sortHand(tilesForMeld); const newMeld = { type: MELD_TYPES.PON, tiles: tilesForMeld, sourcePlayer: originalDiscarderId, concealed: false }; playerExposedMelds[claimingPlayer].push(newMeld); if (discardPiles[originalDiscarderId] && discardPiles[originalDiscarderId].length > 0) { const lastDiscarded = discardPiles[originalDiscarderId][discardPiles[originalDiscarderId].length -1]; if (lastDiscarded.uniqueId === lastDiscardedTileForClaim.uniqueId) { discardPiles[originalDiscarderId].pop(); } } lastDiscardedTileForClaim = null; lastDiscarderPlayerId = null; availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null }; updateActionButtons(); displayPlayerHand(claimingPlayer, true); displayDiscardPile(originalDiscarderId); mustPlayerDiscard = true; canPlayerDraw = false; }
function handleChiAction() { if (!availableActions.chi || chiCombinations.length === 0 || !lastDiscardedTileForClaim || PLAYER_IDS[currentPlayerIndex] !== 'south' || isGameOver) { if (PLAYER_IDS[currentPlayerIndex] !== 'south' && !availableActions.chi) { return; } return; } const claimingPlayer = 'south'; const originalDiscarderId = lastDiscarderPlayerId; const [tile1FromHand, tile2FromHand] = chiCombinations[0]; currentPlayerIndex = PLAYER_IDS.indexOf(claimingPlayer); updateCurrentPlayerDisplay(claimingPlayer); let hand = playerHands[claimingPlayer]; let tile1Found = false, tile2Found = false; playerHands[claimingPlayer] = hand.filter(tileInHand => { if (!tile1Found && tileInHand.uniqueId === tile1FromHand.uniqueId) { tile1Found = true; return false; } if (!tile2Found && tileInHand.uniqueId === tile2FromHand.uniqueId) { tile2Found = true; return false; } return true; }); let meldTiles = [tile1FromHand, tile2FromHand, lastDiscardedTileForClaim]; sortHand(meldTiles); const newMeld = { type: MELD_TYPES.CHI, tiles: meldTiles, sourcePlayer: originalDiscarderId, concealed: false }; playerExposedMelds[claimingPlayer].push(newMeld); if (discardPiles[originalDiscarderId] && discardPiles[originalDiscarderId].length > 0) { const lastDiscarded = discardPiles[originalDiscarderId][discardPiles[originalDiscarderId].length -1]; if (lastDiscarded.uniqueId === lastDiscardedTileForClaim.uniqueId) { discardPiles[originalDiscarderId].pop(); } } lastDiscardedTileForClaim = null; lastDiscarderPlayerId = null; chiCombinations = []; availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; currentKongContext = { type: null, tiles: [], sourceMeld: null }; updateActionButtons(); displayPlayerHand(claimingPlayer, true); displayDiscardPile(originalDiscarderId); mustPlayerDiscard = true; canPlayerDraw = false; }
function handleKongAction() { if (!availableActions.kong || !currentKongContext || !currentKongContext.type || isGameOver) { console.warn("Kong button clicked, but not available or context missing."); return; } const kongMakerId = PLAYER_IDS[currentPlayerIndex]; if (kongMakerId !== 'south') { console.error("Kong action initiated by non-human player unexpectedly via button."); return; } console.log(`${kongMakerId} performs Kong (${currentKongContext.type}).`); let sourcePlayerOfDiscard = null; let newMeld; switch (currentKongContext.type) { case MELD_TYPES.KONG_MIN: sourcePlayerOfDiscard = lastDiscarderPlayerId; const handTilesForMinKong = currentKongContext.tiles; let removedMinKongCount = 0; playerHands[kongMakerId] = playerHands[kongMakerId].filter(tile => { if (removedMinKongCount < handTilesForMinKong.length && handTilesForMinKong.find(ht => ht.uniqueId === tile.uniqueId)) { removedMinKongCount++; return false; } return true; }); const allMinKongTiles = [...handTilesForMinKong, lastDiscardedTileForClaim]; sortHand(allMinKongTiles); newMeld = { type: MELD_TYPES.KONG_MIN, tiles: allMinKongTiles, sourcePlayer: sourcePlayerOfDiscard, concealed: false }; playerExposedMelds[kongMakerId].push(newMeld); if (discardPiles[sourcePlayerOfDiscard] && discardPiles[sourcePlayerOfDiscard].length > 0) { const lastDiscard = discardPiles[sourcePlayerOfDiscard][discardPiles[sourcePlayerOfDiscard].length -1]; if (lastDiscard.uniqueId === lastDiscardedTileForClaim.uniqueId) { discardPiles[sourcePlayerOfDiscard].pop(); } else { console.error("MinKong: Discarded tile mismatch.");} } currentPlayerIndex = PLAYER_IDS.indexOf(kongMakerId); break; case MELD_TYPES.KONG_AN: const anKongTilesToRemove = currentKongContext.tiles; let removedAnKongCount = 0; playerHands[kongMakerId] = playerHands[kongMakerId].filter(tile => { if (removedAnKongCount < anKongTilesToRemove.length && anKongTilesToRemove.find(akt => akt.uniqueId === tile.uniqueId)) { removedAnKongCount++; return false; } return true; }); sortHand(anKongTilesToRemove); newMeld = { type: MELD_TYPES.KONG_AN, tiles: anKongTilesToRemove, concealed: true, sourcePlayer: null }; playerExposedMelds[kongMakerId].push(newMeld); break; case MELD_TYPES.KONG_KA: const { sourceMeld, tiles: [drawnTileForKaKong] } = currentKongContext; const ponMeldToUpgradeIndex = playerExposedMelds[kongMakerId].findIndex( meld => meld.type === MELD_TYPES.PON && meld.tiles.length === 3 && meld.tiles[0].id === sourceMeld.tiles[0].id && meld.tiles.some(t => t.uniqueId === sourceMeld.tiles[0].uniqueId) ); if (ponMeldToUpgradeIndex !== -1) { const ponMeldObject = playerExposedMelds[kongMakerId][ponMeldToUpgradeIndex]; const drawnTileIndexInHand = playerHands[kongMakerId].findIndex(t => t.uniqueId === drawnTileForKaKong.uniqueId); if (drawnTileIndexInHand !== -1) { playerHands[kongMakerId].splice(drawnTileIndexInHand, 1); } else { console.error("KaKong: Drawn tile for KaKong not found in hand."); return; } ponMeldObject.type = MELD_TYPES.KONG_KA; ponMeldObject.tiles.push(drawnTileForKaKong); sortHand(ponMeldObject.tiles); ponMeldObject.concealed = false; } else { console.error("KaKong: Could not find the Pon meld to upgrade!", currentKongContext.sourceMeld); return; } break; default: console.error("Unknown Kong type:", currentKongContext.type); return; } lastDiscardedTileForClaim = null; lastDiscarderPlayerId = null; availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null }; updateActionButtons(); displayPlayerHand(kongMakerId, true); if (sourcePlayerOfDiscard) displayDiscardPile(sourcePlayerOfDiscard); updateCurrentPlayerDisplay(kongMakerId); console.log(`${kongMakerId} konged, drawing replacement tile.`); canPlayerDraw = false; mustPlayerDiscard = false; processPlayerDraw(kongMakerId, true); }
function handleTingAction() { if (!availableActions.ting || playerTingStatus.south || isGameOver) { console.warn("Ting button clicked, but action not available or already Ting."); return; } playerTingStatus.south = true; console.log("South player declared Ting."); document.getElementById('player-area-south').classList.add('ting-active'); availableActions.ting = false; availableActions.chi = false; availableActions.pon = false; availableActions.kong = false; updateActionButtons(); mustPlayerDiscard = true; }

function handleHuAction(directPlayerId = null, directTile = null, directIsTsumo = null, directFromKongReplacement = null) {
    if (isGameOver) return;
    let winningPlayerId, winningTile, isTsumo, fromKongReplacement;

    if (directPlayerId) { 
        winningPlayerId = directPlayerId; winningTile = directTile; isTsumo = directIsTsumo; fromKongReplacement = directFromKongReplacement;
    } else { 
        if (!availableActions.hu || !availableActions.huContext.tile) { console.warn("Hu button clicked, but action not available or context missing."); return; }
        winningPlayerId = availableActions.huContext.winningPlayerId; winningTile = availableActions.huContext.tile; isTsumo = availableActions.huContext.isTsumo; fromKongReplacement = availableActions.huContext.fromKongReplacement;
    }
    
    let handForHuCheck;
    if (isTsumo) { 
        handForHuCheck = playerHands[winningPlayerId].filter(t => t.uniqueId !== winningTile.uniqueId);
    } else { 
        handForHuCheck = [...playerHands[winningPlayerId]];
    }

    if (isHu(handForHuCheck, winningTile)) {
        isGameOver = true;
        console.log(`Player ${winningPlayerId} wins! Type: ${isTsumo ? 'Tsumo' : 'Ron'}. Tile: ${winningTile.name}`);
        
        availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } };
        revealAllHands();

        const isDealerTheWinner = (winningPlayerId === DEALER_PLAYER_ID);
        const dealerStatus = { isDealer: isDealerTheWinner, consecutiveWins: 0 }; 
        const turnInfo = { isFirstTurnForPlayer: false }; 
        const isLastWallTile = (wall.length === 0 && isTsumo);

        const scoreInfo = new HuResult(
            handForHuCheck, playerExposedMelds[winningPlayerId], dealerStatus, turnInfo, flowerTiles[winningPlayerId],
            currentWind, playerSeatWind[winningPlayerId], isLastWallTile,
            isTsumo ? winningTile : null, 
            playerTingStatus[winningPlayerId] ? 1 : 0, 
            !isTsumo ? winningTile : null,
            false, false, fromKongReplacement
        );
        displayScore(winningPlayerId, scoreInfo); 
    } else {
        console.error(`Hu declared by ${winningPlayerId}, but isHu check failed. This should not happen.`);
        isGameOver = false; 
    }
}

function handleSkipAction() { if(isGameOver) return; console.log("Player clicked Skip."); if (lastDiscardedTileForClaim || currentKongContext.type || availableActions.hu ) { const originalDiscarder = lastDiscarderPlayerId; const wasKongOption = currentKongContext.type !== null; const wasHuOption = availableActions.hu; lastDiscardedTileForClaim = null; lastDiscarderPlayerId = null; availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null }; updateActionButtons(); if (wasKongOption && PLAYER_IDS[currentPlayerIndex] === 'south' && playerHands['south'].length > TILES_PER_PLAYER && !wasHuOption) { console.log("South skipped Kong option from draw, must now discard."); mustPlayerDiscard = true; } else if (wasHuOption && PLAYER_IDS[currentPlayerIndex] === 'south' && playerHands['south'].length > TILES_PER_PLAYER) { console.log("South skipped Hu option from draw, must now discard."); mustPlayerDiscard = true; } else if (originalDiscarder || wasKongOption || wasHuOption) { if (!mustPlayerDiscard && !isGameOver) nextTurn(); } } else { availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null }; updateActionButtons(); } }
function updateActionButtons() { 
    const btnPon = document.getElementById('btn-pon'); const btnChi = document.getElementById('btn-chi'); const btnKong = document.getElementById('btn-kong'); const btnHu = document.getElementById('btn-hu'); const btnSkip = document.getElementById('btn-skip'); const btnTing = document.getElementById('btn-ting'); const btnNewGameModal = document.getElementById('btn-new-game-modal');
    if (!btnPon) return; 

    const currentActorId = PLAYER_IDS[currentPlayerIndex]; 

    if (isGameOver) {
        btnPon.disabled = true; btnChi.disabled = true; btnKong.disabled = true; btnTing.disabled = true; btnHu.disabled = true; btnSkip.disabled = true;
        if(btnNewGameModal) btnNewGameModal.style.display = 'inline-block';
        const newGameControlsBtn = document.getElementById('btn-new-game');
        if (newGameControlsBtn && newGameControlsBtn !== btnNewGameModal) newGameControlsBtn.style.display = 'none';
        return;
    }
    if(btnNewGameModal) btnNewGameModal.style.display = 'none';
    const newGameControlsBtn = document.getElementById('btn-new-game'); 
    if (newGameControlsBtn && newGameControlsBtn !== btnNewGameModal) newGameControlsBtn.style.display = 'none';


    btnPon.disabled = !availableActions.pon || playerTingStatus[currentActorId];
    btnChi.disabled = !availableActions.chi || playerTingStatus[currentActorId];
    btnKong.disabled = !availableActions.kong || playerTingStatus[currentActorId];
    btnHu.disabled = !availableActions.hu;
    btnTing.disabled = !availableActions.ting || playerTingStatus[currentActorId]; 
    btnSkip.disabled = !(availableActions.pon || availableActions.chi || availableActions.kong || availableActions.hu || availableActions.ting);
}

// --- AI Helper Functions & Logic ---
function aiNextNotBlocked(block, startIndex = 0) { for (let i = startIndex; i < block.length; i++) { if (block[i] === 0) return i; } return -1; }
function aiMarkSets(hand, block) { aiMarkTriplets(hand, block); aiMarkSequences(hand, block); }
function aiMarkTriplets(hand, block) { for (let i = 0; i < hand.length - 2; i++) { if (block[i] === 1) continue; if (hand[i].id === hand[i+1].id && hand[i].id === hand[i+2].id) { block[i] = 1; block[i+1] = 1; block[i+2] = 1; i += 2; } } }
function aiMarkSequences(hand, block) { for (let i = 0; i < hand.length; i++) { if (block[i] === 1) continue; const firstIndices = []; for(let j=i+1; j < hand.length; j++) { if(block[j] === 0 && hand[j].id !== hand[i].id) firstIndices.push(j); } if(firstIndices.length < 2) continue; const tileI = hand[i]; if (tileI.type === TILE_TYPES.WIND || tileI.type === TILE_TYPES.DRAGON || tileI.type === TILE_TYPES.FLOWER) continue; let m1Idx = -1, m2Idx = -1; for (let j = 0; j < firstIndices.length; j++) { const potentialM1Idx = firstIndices[j]; if (hand[potentialM1Idx].type === tileI.type && hand[potentialM1Idx].id === tileI.id + 1) { m1Idx = potentialM1Idx; break; } } if (m1Idx === -1) continue; for (let j = 0; j < firstIndices.length; j++) { const potentialM2Idx = firstIndices[j]; if (potentialM2Idx === m1Idx) continue; if (hand[potentialM2Idx].type === tileI.type && hand[potentialM2Idx].id === tileI.id + 2) { m2Idx = potentialM2Idx; break; } } if (m1Idx !== -1 && m2Idx !== -1) { block[i] = 1; block[m1Idx] = 1; block[m2Idx] = 1; } } }
function aiMarkPotentialSets(hand, block) { let unblockedCount = block.filter(b => b === 0).length; if (unblockedCount <= 2) return; for (let i = 0; i < hand.length - 1; i++) { if (block[i] === 1) continue; const n0 = i; const n1 = aiNextNotBlocked(block, n0 + 1); if (n1 === -1) continue; const tileN0 = hand[n0]; const tileN1 = hand[n1]; if (tileN0.id === tileN1.id) { block[n0] = 1; block[n1] = 1; unblockedCount -=2; if (unblockedCount <= 2 && unblockedCount > 0) return; i = n1; continue; } if (tileN0.type !== TILE_TYPES.WIND && tileN0.type !== TILE_TYPES.DRAGON && tileN0.type !== TILE_TYPES.FLOWER && tileN0.type === tileN1.type && (tileN1.id === tileN0.id + 1 || tileN1.id === tileN0.id + 2)) { block[n0] = 1; block[n1] = 1; unblockedCount -=2; if (unblockedCount <= 2 && unblockedCount > 0) return; i = n1; } } }

function processAITurn(playerId, drawnTileByAI, isKongReplacementDraw = false) {
    if (isGameOver) return;
    console.log(`Processing AI turn for ${playerId}. Drawn: ${drawnTileByAI?.name}, Replacement: ${isKongReplacementDraw}. Ting: ${playerTingStatus[playerId]}`);
    const currentHand = playerHands[playerId];

    if (drawnTileByAI) { // AI Tsumo check
        const handBeforeDraw = currentHand.filter(t => t.uniqueId !== drawnTileByAI.uniqueId);
        if (isHu(handBeforeDraw, drawnTileByAI)) {
            console.log(`${playerId} AI TSUMO with ${drawnTileByAI.name}!`);
            handleHuAction(playerId, drawnTileByAI, true, isKongReplacementDraw); return; 
        }
    }
    
    if (playerTingStatus[playerId]) {
        if (drawnTileByAI) { 
            console.log(`${playerId} AI (Ting) auto-discarding drawn tile: ${drawnTileByAI.name}`);
            processPlayerDiscard(playerId, drawnTileByAI.uniqueId);
        } else if (isKongReplacementDraw && currentHand.length === TILES_PER_PLAYER) {
            console.log(`${playerId} AI (Ting) after Kong replacement (flower ended chain), must discard from 16 tiles.`);
            let temporaryHand = [...currentHand]; sortHand(temporaryHand);
            const tileToDiscard = temporaryHand[temporaryHand.length - 1]; 
            if(tileToDiscard) processPlayerDiscard(playerId, tileToDiscard.uniqueId); else { console.error("AI Ting no tile to discard"); if(!isGameOver) nextTurn(); }
        } else {
             console.log(`${playerId} AI (Ting) drew no valid tile. Passing turn if no other action.`);
             if (PLAYER_IDS[currentPlayerIndex] === playerId && !canPlayerDraw && !mustPlayerDiscard && !isGameOver) nextTurn();
        }
        return;
    }

    if (drawnTileByAI || isKongReplacementDraw) {
        const anKongTilesAI = checkAnKong(playerId);
        const kaKongableMeldInfoAI = drawnTileByAI ? checkKaKong(playerId, drawnTileByAI) : null;
        if (anKongTilesAI) { 
            console.log(`${playerId} AI: Found AN KONG with ${anKongTilesAI[0].name}. (AI Will Kong)`);
            currentKongContext = { type: MELD_TYPES.KONG_AN, tiles: anKongTilesAI.slice(0,4) };
            let removedAnKongCount = 0; playerHands[playerId] = playerHands[playerId].filter(tile => { if (removedAnKongCount < currentKongContext.tiles.length && currentKongContext.tiles.find(akt => akt.uniqueId === tile.uniqueId)) { removedAnKongCount++; return false; } return true; });
            const anKongMeld = { type: MELD_TYPES.KONG_AN, tiles: [...currentKongContext.tiles].sort((a,b)=>a.id-b.id), concealed: true, sourcePlayer: null }; playerExposedMelds[playerId].push(anKongMeld);
            displayPlayerHand(playerId, false); console.log(`${playerId} AI konged (AnKong), drawing replacement.`); processPlayerDraw(playerId, true); return;
        } else if (kaKongableMeldInfoAI) { 
            console.log(`${playerId} AI: Found KA KONG with ${drawnTileByAI.name}. (AI Will Kong)`);
            currentKongContext = { type: MELD_TYPES.KONG_KA, tiles: [drawnTileByAI], sourceMeld: kaKongableMeldInfoAI.meld };
            const { sourceMeld, tiles: [tileForKaKong] } = currentKongContext;
            const ponMeldToUpgradeIdx = playerExposedMelds[playerId].findIndex( m => m.type === MELD_TYPES.PON && m.tiles[0].id === sourceMeld.tiles[0].id && m.tiles.some(t=> t.uniqueId === sourceMeld.tiles[0].uniqueId) );
            if (ponMeldToUpgradeIdx !== -1) {
                const ponMeldObj = playerExposedMelds[playerId][ponMeldToUpgradeIdx];
                const drawnIdxInHand = playerHands[playerId].findIndex(t => t.uniqueId === tileForKaKong.uniqueId);
                if (drawnIdxInHand !== -1) playerHands[playerId].splice(drawnIdxInHand, 1);
                ponMeldObj.type = MELD_TYPES.KONG_KA; ponMeldObj.tiles.push(tileForKaKong); sortHand(ponMeldObj.tiles); ponMeldObj.concealed = false;
                displayPlayerHand(playerId, false); console.log(`${playerId} AI konged (KaKong), drawing replacement.`); processPlayerDraw(playerId, true); return;
            }
        }
    }
    
    if (!playerTingStatus[playerId] && (currentHand.length === TILES_PER_PLAYER + 1 || (currentHand.length === TILES_PER_PLAYER && isKongReplacementDraw))) {
        if (checkTing(playerId)) {
            playerTingStatus[playerId] = true;
            document.getElementById(`player-area-${playerId}`).classList.add('ting-active');
            console.log(`${playerId} AI declared Ting.`);
        }
    }

    if (currentHand.length > TILES_PER_PLAYER || (isKongReplacementDraw && currentHand.length === TILES_PER_PLAYER) || (playerTingStatus[playerId] && currentHand.length === TILES_PER_PLAYER +1) ) {
        let temporaryHand = [...currentHand]; sortHand(temporaryHand); 
        let block = new Array(temporaryHand.length).fill(0);
        aiMarkSets(temporaryHand, block);
        let unblockedCount = block.filter(b => b === 0).length;
        if (unblockedCount > 1) aiMarkPotentialSets(temporaryHand, block);
        let discardIndex = aiNextNotBlocked(block, 0); 
        if (discardIndex === -1) discardIndex = temporaryHand.length - 1; 
        const tileToDiscard = temporaryHand[discardIndex];
        if (!tileToDiscard) { console.error(`${playerId} AI: No tile to discard found.`); if (PLAYER_IDS[currentPlayerIndex] === playerId && !isGameOver) nextTurn(); return; }
        setTimeout(() => { processPlayerDiscard(playerId, tileToDiscard.uniqueId); }, 500 + Math.random()*300);
    } else { // AI does not need to discard
        if (PLAYER_IDS[currentPlayerIndex] === playerId && !canPlayerDraw && !mustPlayerDiscard && !isKongReplacementDraw && !isGameOver) {
             if(!isGameOver) nextTurn(); // Pass turn if AI has no action and it's still its turn.
        }
    }
}

// --- Game End and Reset ---
function revealAllHands() {
    PLAYER_IDS.forEach(pId => {
        displayPlayerHand(pId, true); 
    });
}

function displayScore(playerId, scoreInfo) {
    const overlay = document.getElementById('score-display-overlay');
    const winMessage = document.getElementById('win-message');
    const scoreDetailsDiv = document.getElementById('score-details');
    const totalTaiDisplay = document.getElementById('total-tai');
    
    winMessage.textContent = `Player ${playerId.charAt(0).toUpperCase() + playerId.slice(1)} Wins! ( ${scoreInfo.isTsumo ? 'Tsumo' : 'Ron'} )`;
    scoreDetailsDiv.innerHTML = ''; 

    let detailsHtml = '<ul>';
    for (const pattern in scoreInfo.table) {
        if (scoreInfo.table[pattern] > 0) {
            detailsHtml += `<li>${pattern}: ${scoreInfo.table[pattern]} Tai</li>`;
        }
    }
    detailsHtml += '</ul>';
    scoreDetailsDiv.innerHTML = detailsHtml;
    
    totalTaiDisplay.textContent = `Total Tai: ${scoreInfo.getTotalTai()}`;
    if(overlay) overlay.style.display = 'flex';
    updateActionButtons(); 
}

function resetGame() {
    console.log("Resetting game...");
    isGameOver = false;

    playerHands = { south: [], east: [], north: [], west: [] };
    flowerTiles = { south: [], east: [], north: [], west: [] };
    discardPiles = { south: [], east: [], north: [], west: [] };
    playerExposedMelds = { south: [], east: [], north: [], west: [] };
    wall = [];
    playerTingStatus = { south: false, east: false, north: false, west: false };
    PLAYER_IDS.forEach(pId => {
        const playerAreaDiv = document.getElementById(`player-area-${pId}`);
        if (playerAreaDiv) playerAreaDiv.classList.remove('ting-active');
        if (playerAreaDiv) playerAreaDiv.classList.remove('is-dealer'); 
    });

    availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } };
    chiCombinations = [];
    currentKongContext = { type: null, tiles: [], sourceMeld: null };
    lastDiscardedTileForClaim = null;
    lastDiscarderPlayerId = null;
    canPlayerDraw = false;
    mustPlayerDiscard = false;
    
    DEALER_PLAYER_ID = 'east'; 
    currentPlayerIndex = PLAYER_IDS.indexOf(DEALER_PLAYER_ID); 
    currentWind = 0; 

    const overlay = document.getElementById('score-display-overlay');
    if (overlay) overlay.style.display = 'none';
    
    createFullDeck(); 
    dealTiles(); 

    PLAYER_IDS.forEach(pId => {
        displayPlayerHand(pId, pId === 'south');
        displayDiscardPile(pId); 
    });
    updateWallCount();
    
    const dealer = PLAYER_IDS[currentPlayerIndex];
    updateCurrentPlayerDisplay(dealer); 
    console.log(`${dealer} is the dealer and starts the new game.`);
    console.log(`${dealer} draws an initial extra tile.`);
    processPlayerDraw(dealer, false); 
    updateActionButtons(); 
}

// --- Initialization ---
function initGame() { 
    console.log("Initializing game..."); 
    currentWind = 0; 
    DEALER_PLAYER_ID = 'east'; 
    createFullDeck(); 
    dealTiles(); 
    PLAYER_IDS.forEach(pId => { displayPlayerHand(pId, pId === 'south'); displayDiscardPile(pId); });
    availableActions = { pon: false, chi: false, kong: false, ting: false, hu: false, huContext: { tile: null, isTsumo: false, winningPlayerId: null, fromKongReplacement: false } }; 
    chiCombinations = []; currentKongContext = { type: null, tiles: [], sourceMeld: null }; 
    
    currentPlayerIndex = PLAYER_IDS.indexOf(DEALER_PLAYER_ID);
    const dealer = PLAYER_IDS[currentPlayerIndex]; 
    updateCurrentPlayerDisplay(dealer); 
    console.log(`${dealer} is the dealer and starts the game.`);
    console.log(`${dealer} draws an initial extra tile.`);
    processPlayerDraw(dealer, false); 
    updateWallCount(); 
    updateActionButtons(); 
}

window.onload = () => {
    initGame();
    document.getElementById('btn-pon').addEventListener('click', handlePonAction);
    document.getElementById('btn-chi').addEventListener('click', handleChiAction); 
    document.getElementById('btn-kong').addEventListener('click', handleKongAction);
    document.getElementById('btn-ting').addEventListener('click', handleTingAction);
    document.getElementById('btn-hu').addEventListener('click', () => handleHuAction()); 
    document.getElementById('btn-skip').addEventListener('click', handleSkipAction);
    document.getElementById('btn-new-game-modal').addEventListener('click', resetGame);
    const newGameControlsBtn = document.getElementById('btn-new-game'); 
    if(newGameControlsBtn) newGameControlsBtn.style.display = 'none'; 
};
