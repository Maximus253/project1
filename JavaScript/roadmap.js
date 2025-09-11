drawSmallLines();
drawBigLine();

function drawSmallLines() {
    const canvases = document.getElementsByName("roadmapCanvas");
    const lineDefinitions = [
        {
            startX: -10,
            startY: 80,
            controlX: 0,
            controlY: 50,
            endX: 200,
            endY: 60,
            hasArrow: true,
            arrowX: 170.5,
            arrowY: 58.8,
        },
        {
            startX: -10,
            startY: 80,
            controlX: 0,
            controlY: 120,
            endX: 200,
            endY: 80,
            hasArrow: true,
            arrowX: 170.5,
            arrowY: 86,
        },
        {
            startX: -10,
            startY: 80,
            controlX: 70,
            controlY: 60,
            endX: 60,
            endY: 180,
            hasArrow: false,
        },
        {
            startX: -10,
            startY: 80,
            controlX: 0,
            controlY: 50,
            endX: 200,
            endY: 60,
            hasArrow: true,
            arrowX: 170.5,
            arrowY: 58.8,
        }
    ];

    for (let i = 0; i < canvases.length; i++) {
        let canvas = canvases[i];
        let definition = lineDefinitions[i];

        const ctx = canvas.getContext("2d");

        unblurLines(ctx, canvas);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(definition.startX, definition.startY);
        ctx.quadraticCurveTo(
            definition.controlX,
            definition.controlY,
            definition.endX,
            definition.endY
        );
        ctx.stroke();

        if (definition.hasArrow)
            drawArrow(ctx, definition.arrowX, definition.arrowY, 20, 0);
    }
}

function drawBigLine() {
    const longCanvas = document.getElementById("longArrowCanvas");
    const ctx = longCanvas.getContext("2d");

    unblurLines(ctx, longCanvas);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.quadraticCurveTo(
      50, 50, 100, 50
    );
    ctx.stroke();
}

function unblurLines(ctx, canvas) {
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
}

function drawArrow(ctx, posX, posY, length, angle) {
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(
        posX - length * Math.cos(angle - Math.PI / 6),
        posY - length * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        posX - length * Math.cos(angle + Math.PI / 6),
        posY - length * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.fill();
}
