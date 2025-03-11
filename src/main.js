/*
	Learned about the various geometries of Three.js from https://threejs-journey.com/lessons/geometries#the-different-built-in-geometries
*/

import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import UTIL from "./utilities.js";
import { Seesaw } from "./seesaw.js";
import { SwingSet } from "./swingSet.js";

let canvas;
let renderer;
let scene;
let camera;
let textureLoader;

let geometry;
let material;

let seesaw;
let swings;

function main() {
	initGlobalVars();

	camera.position.x = 0;
	camera.position.y = 2;
	camera.position.z = 10;

	geometry = new THREE.PlaneGeometry(100, 100);
	material = new THREE.MeshBasicMaterial({color: 0xfffff0, side: THREE.DoubleSide});
	const ground = new THREE.Mesh(geometry, material);
	ground.rotateX(UTIL.degToRad(90));
	scene.add(ground);

	seesaw = new Seesaw(scene);
	seesaw.translate(2, 0, 2);

	swings = new SwingSet(scene);
	swings.translate(-5, 0, -5);
	swings.rotate(0, 30, 0);

	requestAnimationFrame(tick);
}

/** Creates canvas, renderer, scene, and camera. */
function initGlobalVars() {
	canvas = document.querySelector("#canvas");
	renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	scene = new THREE.Scene();

	const fov = 75;
	const aspect = 2;	// default canvas is 300x150 so its aspect is 2 (300/150)
	const near = 0.1;
	const far = 100;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);	// defaults to looking down the -Z axis with +Y up

	textureLoader = new THREE.TextureLoader();
}

function tick(time) {
	time /= 1000;
	
	seesaw.animate(time);
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
}

main();