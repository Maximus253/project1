const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const card1 = document.getElementById("element1");
const card2 = document.getElementById("element2");
const card3 = document.getElementById("element3");
const card4 = document.getElementById("element4");
const card5 = document.getElementById("element5");
const card6 = document.getElementById("element6");

const scrollSpeed = 0.008;
const minCardBrightness = 0.5;
const maxCardBrightness = 1.0;
const activeCardSpacings = [25, 50, 75];

const cardTarget = "roadmapElementTarget";
const cardVisited = "roadmapElementVisited";
const targetCardKey = "targetCard";

let cards = [card1, card2, card3, card4, card5, card6];
let activeCards = [card1, card2, card3];
let inactiveCards = [card4, card5, card6];
let isScrolling = false;

rightArrow.onclick = onRightArrowClicked;
leftArrow.onclick = onLeftArrowClicked;

formatCards();

function formatCards() {
    let targetCard;

    if (localStorage[targetCardKey] == null) targetCard = card1;
    else targetCard = document.getElementById(localStorage[targetCardKey]);

    leftArrow.style.display = "none";

    card1.style.left = `${activeCardSpacings[0]}%`;
    card2.style.left = `${activeCardSpacings[1]}%`;
    card3.style.left = `${activeCardSpacings[2]}%`;
    card4.style.left = `${activeCardSpacings[0] + 75}%`;
    card5.style.left = `${activeCardSpacings[1] + 75}%`;
    card6.style.left = `${activeCardSpacings[2] + 75}%`;

    targetCard.classList.add(cardTarget);
    setCardBrightness(card4, minCardBrightness);
    setCardBrightness(card5, minCardBrightness);

    for (let i = 0; i < cards.indexOf(targetCard); i++)
        cards[i].classList.add(cardVisited);

    if (cards.indexOf(targetCard) > 2) onRightArrowClicked();
}

function onRightArrowClicked() {
    if (isScrolling) return;

    moveCardsLeft(0);
    rightArrow.style.display = "none";
}

function onLeftArrowClicked() {
    if (isScrolling) return;

    moveCardsRight(0);
    leftArrow.style.display = "none";
}

function moveCardsLeft(t) {
    isScrolling = true;
    t += scrollSpeed;

    for (let i = activeCards.length - 1; i >= 0; i--) {
        const card = activeCards[i];
        const start = activeCardSpacings[i];
        const end = start - 75.0;
        const easedT = easeInOutQuad(t);

        const pos = lerp(start, end, easedT);
        const brightness = lerp(maxCardBrightness, minCardBrightness, easedT);

        card.style.left = `${pos}%`;
        setCardBrightness(card, brightness);
    }

    for (let i = 0; i < inactiveCards.length; i++) {
        const card = inactiveCards[i];
        const start = activeCardSpacings[i] + 75.0;
        const end = start - 75.0;
        const easedT = easeInOutQuad(t);

        const pos = lerp(start, end, easedT);
        const brightness = lerp(minCardBrightness, maxCardBrightness, easedT);

        card.style.left = `${pos}%`;
        setCardBrightness(card, brightness);
    }

    if (t < 1.0) requestAnimationFrame(() => moveCardsLeft(t));
    else {
        swapActiveCards();
        isScrolling = false;

        leftArrow.style.display = "flex";
    }
}

function moveCardsRight(t) {
    isScrolling = true;
    t += scrollSpeed;

    for (let i = activeCards.length - 1; i >= 0; i--) {
        const card = activeCards[i];
        const start = activeCardSpacings[i];
        const end = start + 75.0;
        const easedT = easeInOutQuad(t);

        const pos = lerp(start, end, easedT);
        const brightness = lerp(maxCardBrightness, minCardBrightness, easedT);

        card.style.left = `${pos}%`;
        setCardBrightness(card, brightness);
    }

    for (let i = 0; i < inactiveCards.length; i++) {
        const card = inactiveCards[i];
        const start = activeCardSpacings[i] - 75.0;
        const end = start + 75.0;
        const easedT = easeInOutQuad(t);

        const pos = lerp(start, end, easedT);
        const brightness = lerp(minCardBrightness, maxCardBrightness, easedT);

        card.style.left = `${pos}%`;
        setCardBrightness(card, brightness);
    }

    if (t < 1.0) requestAnimationFrame(() => moveCardsRight(t));
    else {
        swapActiveCards();
        isScrolling = false;

        rightArrow.style.display = "flex";
    }
}

function setCardBrightness(card, brightness) {
    if (brightness == 1.0)
    {
        card.style.filter = null;
        return;
    }

    brightness *= 100;

    card.style.filter = `brightness(${brightness}%)`;
}

function swapActiveCards() {
    let swapCards = [];

    for (let card of inactiveCards) swapCards.push(card);

    inactiveCards.length = 0;

    for (let card of activeCards) inactiveCards.push(card);

    activeCards.length = 0;

    for (let card of swapCards) activeCards.push(card);
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function easeInOutQuad(t) {
    t *= 2;

    if (t < 1) return 0.5 * t * t;

    return -0.5 * (--t * (t - 2) - 1);
}

function onCardClicked(path, elementId) {
    localStorage[targetCardKey] = elementId;

    window.location.href = path;
}
