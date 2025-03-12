/*
	Learned about the various geometries of Three.js from https://threejs-journey.com/lessons/geometries#the-different-built-in-geometries
*/

import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import UTIL from "./utilities.js";
import Seesaw from "./seesaw.js";
import SwingSet from "./swingSet.js";
import StreetLight from "./streetlight.js";

let canvas;
let renderer;
let scene;
let orbitControls;
let camera;
let textureLoader;
let objLoader;

let geometry;
let material;

let seesaw;
let streetLight;

function main() {
	initGlobalVars();

	camera.position.x = 0;
	camera.position.y = 2;
	camera.position.z = 10;

	const playgroundSurfaceTexture = textureLoader.load("../assets/playgroundSurfaceTexture.jpg");
	playgroundSurfaceTexture.colorSpace = THREE.SRGBColorSpace;
	playgroundSurfaceTexture.wrapS = THREE.RepeatWrapping;
	playgroundSurfaceTexture.wrapT = THREE.RepeatWrapping;
	playgroundSurfaceTexture.repeat.set(5, 5);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);	// position and target both default to (0, 0, 0)
	directionalLight.position.set(-100, 200, -100);
	scene.add(directionalLight);

	const ambientLight = new THREE.AmbientLight(0xffffff, 5);	//0.1
	scene.add(ambientLight);

	const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({map: playgroundSurfaceTexture, side: THREE.DoubleSide}));
	ground.rotateX(UTIL.degToRad(90));
	scene.add(ground);

	seesaw = new Seesaw(scene);
	seesaw.translate(6, 0, 2);

	const swings = new SwingSet(scene);
	swings.translate(-10, 0, -7);
	swings.rotate(0, 30, 0);

	geometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI);
	const ball1 = new THREE.Mesh(geometry, UTIL.yellow_Material);
	scene.add(ball1);
	ball1.translateX(9);
	ball1.translateZ(-7);
	ball1.rotateX(UTIL.degToRad(270));

	geometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI);
	const ball2 = new THREE.Mesh(geometry, UTIL.green_Material);
	scene.add(ball2);
	ball2.translateX(6);
	ball2.translateZ(-9);
	ball2.rotateX(UTIL.degToRad(270));

	geometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI);
	const ball3 = new THREE.Mesh(geometry, UTIL.red_Material);
	scene.add(ball3);
	ball3.translateX(10);
	ball3.translateZ(-11);
	ball3.rotateX(UTIL.degToRad(270));

	streetLight = new StreetLight(scene);
	streetLight.translate(-4, 0, 6);

	objLoader.load("../assets/iPhoneXModel/iPhoneX.obj", root => {
		// have to do all code in the callback because don't know when it'll finish
		scene.add(root);
		root.scale.set(0.005, 0.005, 0.005);
		root.translateX(0.5);
		root.translateY(-1.85);
		root.translateZ(6.5);
		root.rotateX(UTIL.degToRad(270));
		root.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), UTIL.degToRad(345));
	});

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
	const far = 10000;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);	// defaults to looking down the -Z axis with +Y up

	orbitControls = new OrbitControls(camera, canvas);
	orbitControls.target.set(0, 5, 0);

	textureLoader = new THREE.TextureLoader();
	objLoader = new OBJLoader();
}

let prevTime = 0;
function tick(time) {
	time /= 1000;
	const deltaTime = time - prevTime;
	
	seesaw.animate(time);
	streetLight.animate(deltaTime);
	renderer.render(scene, camera);

	prevTime = time;

	requestAnimationFrame(tick);
}

main();