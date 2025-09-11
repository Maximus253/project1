const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

formatCards();

function formatCards()
{
    leftArrow.style.display = "none";
    const card1 = document.getElementById("element1");
    const card2 = document.getElementById("element2");
    const card3 = document.getElementById("element3");

    card1.style.left = "25%";
    card2.style.left = "50%";
    card3.style.left = "75%";
}

// use requestAnimationFrame