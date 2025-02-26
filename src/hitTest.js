import * as THREE from "three";
import { metadata as rows } from "./Map";
import { player, position } from "./Player";

export function hitTest() {
    const row = rows[position.currentRow - 1];
    if (!row) return;

    if (row.type === "car" || row.type === "truck") {
        const playerBoundingBox = new THREE.Box3();
        playerBoundingBox.setFromObject(player);

        row.vehicles.forEach(({ ref }) => {
            if (!ref) throw Error("Vehicle reference is missing");

            const vehicleBoundingBox = new THREE.Box3();
            vehicleBoundingBox.setFromObject(ref);

            if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
                window.alert("Game over!");
                window.location.reload();
            }
        });
    }
}
