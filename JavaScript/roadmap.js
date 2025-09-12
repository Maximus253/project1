const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const card1 = document.getElementById("element1");
const card2 = document.getElementById("element2");
const card3 = document.getElementById("element3");
const card4 = document.getElementById("element4");
const card5 = document.getElementById("element5");

const previewClass = "roadmapPreview";
const scrollSpeed = 0.008;

const activeCardSpacings = [25, 50, 75];
let activeCards = [card1, card2, card3];
let inactiveCards = [card4, card5];
let isScrolling = false;

rightArrow.onclick = onRightArrowClicked;

formatCards();

function formatCards() {
    leftArrow.style.display = "none";

    card4.classList.add(previewClass);
    card5.classList.add(previewClass);

    card1.style.left = `${activeCardSpacings[0]}%`;
    card2.style.left = `${activeCardSpacings[1]}%`;
    card3.style.left = `${activeCardSpacings[2]}%`;
    card4.style.left = `${activeCardSpacings[0] + 75}%`;
    card5.style.left = `${activeCardSpacings[1] + 75}%`;
}

function onRightArrowClicked() {
    if (isScrolling)
        return;

    moveCardsLeft(0);
}

function moveCardsLeft(t) {
    isScrolling = true;
    t += scrollSpeed;

    for (let i = activeCards.length - 1; i >= 0; i--) {
        const card = activeCards[i];
        const start = activeCardSpacings[i];
        const end = start - 75.0;

        const current = lerp(start, end, easeInOutQuad(t));
        card.style.left = `${current}%`;
    }

    for (let i = 0; i < inactiveCards.length; i++) {
        const card = inactiveCards[i];
        const start = activeCardSpacings[i] + 75.0;
        const end = start - 75.0;

        const current = lerp(start, end, easeInOutQuad(t));
        card.style.left = `${current}%`;
    }

    if (t < 1.0) requestAnimationFrame(() => moveCardsLeft(t));
    else {
        swapActiveCards();
        isScrolling = false;
    }
}

function swapActiveCards() {
    let swapCards = [];

    for (let card of inactiveCards) swapCards.push(card);

    inactiveCards.length = 0;

    for (let card of activeCards) inactiveCards.push(card);

    activeCards.length = 0;

    for (let card of swapCards) activeCards.push(card);

    for (let card of inactiveCards) card.classList.add(previewClass);

    for (let card of activeCards) card.classList.remove(previewClass);
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function easeInOutQuad(t) {
    t *= 2;

    if (t < 1) return 0.5 * t * t;

    return -0.5 * (--t * (t - 2) - 1);
}
