import * as THREE from "three";
import { 
    player,
    position,
    movesQueue, 
    stepCompleted
} from "./player";
import { tileSize } from "./constants";

const moveClock = new THREE.Clock(false);

export function animatePlayer() {
    if (!movesQueue.length) return;

    if (!moveClock.running) moveClock.start();

    const stepTime = 0.2;
    const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

    setPosition(progress);

    if (progress >= 1) {
        stepCompleted();
        moveClock.stop();
    }
}

function setPosition(progress) {
    const startX = position.currentTile * tileSize;
    const startY = position.currentRow * tileSize;
    let endX = startX;
    let endY = startY;

    if (movesQueue[0] === "left") endX -= tileSize;
    if (movesQueue[0] === "right") endX += tileSize;
    if (movesQueue[0] === "forward") endY += tileSize;
    if (movesQueue[0] === "backward") endY -= tileSize;
  
    player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
    player.children[0].position.z = Math.sin(progress * Math.PI) * 8 + 10;
}
