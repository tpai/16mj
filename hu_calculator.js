// hu_calculator.js
// Logic for determining winning hands (Hu) and calculating scores (Tai).

// Simulating TILES and TILE_TYPES for standalone testing if needed.
// In actual integration, these would likely be imported or globally available if not in this file.
const TILE_TYPES_HC = { CHARACTER: 'w', BAMBOO: 's', DOT: 't', WIND: 'f', DRAGON: 'd', FLOWER: 'h' };

// Helper to insert a tile into a sorted hand (maintaining sort order by id)
function insertTileIntoSortedHand(tile, hand) {
    const newHand = [...hand];
    let inserted = false;
    for (let i = 0; i < newHand.length; i++) {
        if (tile.id <= newHand[i].id) {
            newHand.splice(i, 0, tile);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        newHand.push(tile);
    }
    return newHand;
}

// Helper ported from p16mj.py: next_not_block (used by isHu)
function huNextNotBlocked(block, startIndex = 0) {
    for (let i = startIndex; i < block.length; i++) {
        if (block[i] === 0) return i;
    }
    return -1;
}

// Helper ported from p16mj.py: next_two_not_blsame (simplified for isHu context)
function huNextTwoNotBlockedDifferentVal(block, hand, startIndex, firstTileId) {
    const indices = [];
    for (let i = startIndex; i < hand.length; i++) {
        if (block[i] === 0 && hand[i].id !== firstTileId) {
            indices.push(i);
            if (indices.length === 2) break;
        }
    }
    return indices.length === 2 ? indices : [-1, -1];
}


// Ported from hu_result.py: hu(pmj, value)
// Checks if a hand + given tile forms a winning Mahjong hand.
// pmj: array of player's tile objects (already sorted by id)
// drawnTile: the tile object that was just drawn or claimed for win.
function isHu(playerHandTiles, winningTile) {
    if (!winningTile) { // Cannot win on a null tile (e.g. empty wall draw)
        // console.log("isHu check: winningTile is null. Returning false.");
        return false;
    }
    const hand = insertTileIntoSortedHand(winningTile, playerHandTiles);
    const handSize = hand.length;
    
    if ((handSize - 2) % 3 !== 0) { 
        // This check is generally good for standard hands.
        // console.log("isHu: Invalid hand size for standard melds after adding winning tile.", handSize);
        // return false; // Some special hands (like 7 pairs, 13 orphans) would fail this.
    }
    
    let block = new Array(handSize).fill(0);

    // Iterate through all possible pairs
    for (let i = 0; i < handSize - 1; i++) {
        if (i > 0 && hand[i].id === hand[i-1].id && block[i-1] === 1 && block[i] === 1) continue; // Already used this pair as a found pair

        if (hand[i].id === hand[i+1].id) { // Found a potential pair
            block.fill(0); 
            block[i] = 1;
            block[i+1] = 1;
            let setsFound = 0;
            let allMeldable = true;

            for (let j = 0; j < handSize; j++) {
                if (block[j] === 1) continue; 

                const k1 = huNextNotBlocked(block, j + 1);
                const k2 = huNextNotBlocked(block, k1 + 1);
                if (k1 !== -1 && k2 !== -1 && hand[j].id === hand[k1].id && hand[j].id === hand[k2].id) {
                    block[j] = 1; block[k1] = 1; block[k2] = 1;
                    setsFound++;
                    continue; 
                }

                if (hand[j].type === TILE_TYPES_HC.DOT || hand[j].type === TILE_TYPES_HC.BAMBOO || hand[j].type === TILE_TYPES_HC.CHARACTER) {
                    let seq_m1 = -1, seq_m2 = -1;
                    for(let m = 0; m < handSize; m++) { 
                        if(block[m] === 0 && m !==j && hand[m].type === hand[j].type && hand[m].id === hand[j].id + 1) {
                            seq_m1 = m;
                            break;
                        }
                    }
                    if (seq_m1 !== -1) {
                        for(let m = 0; m < handSize; m++) { 
                             if(block[m] === 0 && m !==j && m !== seq_m1 && hand[m].type === hand[j].type && hand[m].id === hand[j].id + 2) {
                                seq_m2 = m;
                                break;
                            }
                        }
                    }

                    if (seq_m1 !== -1 && seq_m2 !== -1) {
                        block[j] = 1; block[seq_m1] = 1; block[seq_m2] = 1;
                        setsFound++;
                        continue;
                    }
                }
                allMeldable = false;
                break; 
            }
            
            const expectedSets = (handSize - 2) / 3;
            if (allMeldable && setsFound === expectedSets) {
                 if (block.every(b => b === 1)) { 
                    return true; 
                 }
            }
        }
    }
    return false; 
}


class HuResult {
    constructor(playerHand, exposedMelds, dealerStatus, turnInfo, flowerTilesList, gameWind, playerSeatWind, isLastTile, drawnTileObj, firstHearStatus, discardedWinningTileObj, isFlowerHu, isRobbingKong, isKongReplacementWin) {
        this.mj = [...playerHand]; 
        this.dj = exposedMelds || []; 
        this.hnum = dealerStatus.isDealer ? (dealerStatus.consecutiveWins || 0) + 1 : 0; 
        this.ft = turnInfo.isFirstTurnForPlayer; 
        this.hj = flowerTilesList ? [...flowerTilesList].sort((a,b) => a.id - b.id) : [];
        this.circle = gameWind; 
        this.door = playerSeatWind; 
        this.last = isLastTile; 
        this.gethu = drawnTileObj; 
        this.first_hear = firstHearStatus || 0; 
        this.drophu = discardedWinningTileObj; 
        this.hhu = isFlowerHu || false; 
        this.bkong = isRobbingKong || false; 
        this.bpkong = isKongReplacementWin || false; 
        
        this.isTsumo = (this.gethu !== null && this.gethu !== undefined); // Added for clarity

        const tileForFullHand = this.gethu || this.drophu;
        this.fmj = tileForFullHand ? insertTileIntoSortedHand(tileForFullHand, this.mj) : [...this.mj]; 
            
        this.table = {}; 
        this.calculateTai();
    }

    p_selfhu() { return this.isTsumo ? 1 : 0; }
    
    p_dmjclear() { 
        if (this.hhu) return 0;
        for (const meld of this.dj) {
            if (meld.type === 'pon' || meld.type === 'chi' || (meld.type === 'minkong') || (meld.type === 'kakang')) { // AnKong is concealed
                return 0; 
            }
        }
        return 1; 
    }

    clear_selfhu() { 
        if (this.p_selfhu() > 0 && this.p_dmjclear() > 0) {
            return 3; 
        }
        return 0;
    }

    hosthu() { return this.hnum > 0 ? 1 : 0; }
    
    cal_scolor_fmj() { 
        let triplets = 0;
        let i = 0;
        const hand = [...this.fmj].sort((a,b)=>a.id-b.id); 
        
        while (i < hand.length - 2) {
            if (hand[i].id === hand[i+1].id && hand[i].id === hand[i+2].id) {
                if (this.isTsumo) { 
                    triplets++;
                } else if (this.drophu !== null) { 
                    if (hand[i].uniqueId !== this.drophu.uniqueId &&
                        hand[i+1].uniqueId !== this.drophu.uniqueId &&
                        hand[i+2].uniqueId !== this.drophu.uniqueId) {
                        triplets++;
                    } else if (hand[i].id !== this.drophu.id) { 
                        triplets++;
                    }
                }
                i += 3;
            } else {
                i++;
            }
        }
        return triplets;
    }

    cal_same_color() { 
        let bundle_number = this.cal_scolor_fmj();
        for (const meld of this.dj) {
            if (meld.type === 'ankong') { // Check for AnKong specifically
                bundle_number++;
            }
        }
        return bundle_number;
    }

    same_color_bundle(n) { 
        if (this.hhu) return 0;
        const anKeCount = this.cal_same_color(); 
        if (n === anKeCount) {
            if (n === 3) return 2;  
            if (n === 4) return 5;  
            if (n === 5 && this.fmj.length >=17) return 8; 
            return 0;
        }
        return 0;
    }
    
    pphu() { 
        if (this.hhu) return 0;
        let pungKongCount = 0;
        for (const meld of this.dj) { 
            if (meld.type === 'pon' || meld.type === 'minkong' || meld.type === 'ankong' || meld.type === 'kakang') {
                pungKongCount++;
            } else if (meld.type === 'chi') {
                return 0; 
            }
        }
        
        let pairFound = false;
        const handToCheck = [...this.fmj].sort((a,b)=>a.id-b.id);

        for (let i = 0; i < handToCheck.length - 1; i++) {
            if (handToCheck[i].id === handToCheck[i+1].id) {
                 const tempHandWithoutPair = handToCheck.filter((t, index) => index !== i && index !== i+1);
                 let remainingAreTriplets = true;
                 if (tempHandWithoutPair.length % 3 !== 0) {
                     remainingAreTriplets = false;
                 } else {
                     for(let k=0; k < tempHandWithoutPair.length; k+=3) {
                         if(!(tempHandWithoutPair[k].id === tempHandWithoutPair[k+1].id && 
                              tempHandWithoutPair[k].id === tempHandWithoutPair[k+2].id)) {
                             remainingAreTriplets = false;
                             break;
                         }
                     }
                 }
                 if(remainingAreTriplets) {
                     pairFound = true;
                     for(let k=0; k < tempHandWithoutPair.length; k+=3) {
                         pungKongCount++;
                     }
                     break; 
                 }
            }
        }
        
        if (!pairFound && handToCheck.length > 0) return 0; 
        if(handToCheck.length === 0 && this.fmj.length === 0 && this.dj.length > 0 && !pairFound) { return 0; }


        const totalTilesInWinningHand = this.fmj.length + this.dj.reduce((sum, meld) => sum + meld.tiles.length, 0);
        // For 16-tile mahjong (5 sets + 1 pair = 17 tiles)
        // For 13-tile mahjong (4 sets + 1 pair = 14 tiles)
        // Assuming TILES_PER_PLAYER refers to the initial hand size (16 for this game)
        // A winning hand has TILES_PER_PLAYER + 1 tiles.
        const requiredSets = ( (TILES_PER_PLAYER + 1) - 2) / 3;


        if (pungKongCount === requiredSets && pairFound) { 
            return 4; 
        }
        return 0;
    }

    calculateTai() {
        this.table["門清自摸 (Concealed Self-Draw)"] = this.clear_selfhu();
        if (this.table["門清自摸 (Concealed Self-Draw)"] === 0) { 
            this.table["自摸 (Self-Draw)"] = this.p_selfhu();
            this.table["門清 (Concealed Hand)"] = this.p_dmjclear();
        } else {
             this.table["自摸 (Self-Draw)"] = 0;
             this.table["門清 (Concealed Hand)"] = 0;
        }
        this.table["莊家 (Dealer Win)"] = this.hosthu();
        this.table["三暗刻 (3 Concealed Triplets)"] = this.same_color_bundle(3);
        this.table["四暗刻 (4 Concealed Triplets)"] = this.same_color_bundle(4);
        this.table["對對胡 (All Pungs/Kongs)"] = this.pphu();

        console.log("Hu Score Table:", this.table);
    }

    getTotalTai() {
        let total = 0;
        for (const key in this.table) {
            total += this.table[key];
        }
        return total;
    }
}

// export { isHu, HuResult }; // Uncomment if using modules
