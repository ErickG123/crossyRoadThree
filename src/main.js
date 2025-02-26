import * as THREE from "three";
import { Renderer } from "./renderer"
import { Camera } from "./camera";
import { player } from "./Player";
import { map } from "./Map";

import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";

import "./style.css";
import "./collectUserInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map)

const ambientLight = new  THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight();
dirLight.position.set(-100, -100, 200);
scene.add(dirLight);

const camera = Camera();
player.add(camera);

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
    animateVehicles();
    animatePlayer();
    hitTest();

    renderer.render(scene, camera);
}
