// --- Crash Functions ---
function crashWithMemory() {
    updateScore("💣 Memory Bomb", "💀 CRASHED");
    const data = [];
    while (true) data.push(new Array(1e7).fill('💥'));
}

function crashWithDOM(depth = 0) {
    updateScore("🌊 DOM Flood", "💀 CRASHED");
    const el = document.createElement('div');
    el.textContent = `BOOM x${depth}`;
    document.body.appendChild(el);
    crashWithDOM(depth + 1);
}

async function crashWithWASM() {
    updateScore("⚡ WASM Nuke", "💀 CRASHED");
    const wasmCode = 'AGFzbQEAAAABBgFgAX8BAgEAAwMBgAFgAX9/AgA=';
    const response = await fetch(`data:application/wasm;base64,${wasmCode}`);
    const buffer = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(buffer);
    instance.exports.main();
}

// --- Reset Tab ---
function resetTab() {
    location.reload();
}

// --- Theme Toggle ---
function toggleTheme() {
    document.body.classList.toggle('light');
}

// --- Scoreboard ---
function updateScore(method, status) {
    const scores = {
        "💣 Memory Bomb": 0,
        "🌊 DOM Flood": 0,
        "⚡ WASM Nuke": 0
    };
    scores[method] = status;
    const scoreList = document.getElementById('scores');
    scoreList.innerHTML = Object.entries(scores).map(([m, s]) =>
        `<li>${m}: ${s}</li>`
    ).join('');
}
