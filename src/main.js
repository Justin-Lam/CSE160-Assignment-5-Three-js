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
let orbitControls;
let camera;
let textureLoader;

let geometry;
let material;

let seesaw;

function main() {
	initGlobalVars();

	camera.position.x = 0;
	camera.position.y = 2;
	camera.position.z = 10;

	geometry = new THREE.BoxGeometry(1, 1, 1);
	material = new THREE.MeshBasicMaterial({color: 0xff0000});
	const origin = new THREE.Mesh(geometry, material);
	scene.add(origin);

	geometry = new THREE.PlaneGeometry(100, 100);
	material = new THREE.MeshBasicMaterial({color: 0xfffff0, side: THREE.DoubleSide});
	const ground = new THREE.Mesh(geometry, material);
	ground.rotateX(UTIL.degToRad(90));
	scene.add(ground);

	seesaw = new Seesaw(scene);
	seesaw.translate(6, 0, 2);

	const swings = new SwingSet(scene);
	swings.translate(-10, 0, -7);
	swings.rotate(0, 30, 0);

	geometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI);
	material = new THREE.MeshBasicMaterial({color: 0xffff00});
	const ball1 = new THREE.Mesh(geometry, material);
	scene.add(ball1);
	ball1.translateX(9);
	ball1.translateZ(-7);
	ball1.rotateX(UTIL.degToRad(270));

	geometry = new THREE.SphereGeometry(1.75, 32, 16, 0, Math.PI);
	const ball2 = new THREE.Mesh(geometry, material);
	scene.add(ball2);
	ball2.translateX(6);
	ball2.translateZ(-9);
	ball2.rotateX(UTIL.degToRad(270));

	geometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI);
	const ball3 = new THREE.Mesh(geometry, material);
	scene.add(ball3);
	ball3.translateX(10);
	ball3.translateZ(-11);
	ball3.rotateX(UTIL.degToRad(270));

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

	orbitControls = new OrbitControls(camera, canvas);

	textureLoader = new THREE.TextureLoader();
}

function tick(time) {
	time /= 1000;
	
	seesaw.animate(time);
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
}

main();