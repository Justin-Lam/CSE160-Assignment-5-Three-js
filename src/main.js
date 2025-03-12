/*
	Learned about the various geometries of Three.js from https://threejs-journey.com/lessons/geometries#the-different-built-in-geometries
*/

import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
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
let mtlLoader;

let geometry;
let material;

let seesaw;
let streetLight;

function main() {
	initGlobalVars();

	renderer.shadowMap.enabled = true;

	scene.fog = new THREE.FogExp2(0xDDDDDD, 0.015);

	camera.position.x = 0;
	camera.position.y = 2;
	camera.position.z = 10;

	const directionalLight = new THREE.DirectionalLight(0xABD3E1, 5);	// position and target both default to (0, 0, 0)
	directionalLight.shadow.camera.left = -25;
	directionalLight.shadow.camera.right = 25;
	directionalLight.shadow.camera.top = 25;
	directionalLight.shadow.camera.bottom = -25;
	directionalLight.shadow.camera.far = 50;
	directionalLight.castShadow = true;
	directionalLight.position.set(15, 20, 10);
	scene.add(directionalLight);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
	scene.add(ambientLight);

	const skyTexture = textureLoader.load("../assets/skyTexture.jpg", () => {
		skyTexture.mapping = THREE.EquirectangularReflectionMapping;
		skyTexture.colorSpace = THREE.SRGBColorSpace;
		scene.background = skyTexture;
	});

	const playgroundSurfaceTexture = textureLoader.load("../assets/playgroundSurfaceTexture.jpg");
	playgroundSurfaceTexture.colorSpace = THREE.SRGBColorSpace;
	playgroundSurfaceTexture.wrapS = THREE.RepeatWrapping;
	playgroundSurfaceTexture.wrapT = THREE.RepeatWrapping;
	playgroundSurfaceTexture.repeat.set(5, 5);

	const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({map: playgroundSurfaceTexture, side: THREE.DoubleSide}));
	ground.receiveShadow = true;
	ground.rotateX(UTIL.degToRad(90));
	scene.add(ground);

	seesaw = new Seesaw();
	scene.add(seesaw);
	seesaw.position.set(6, 0, 2);

	const swings = new SwingSet();
	scene.add(swings);
	swings.position.set(-10, 0, -7);
	swings.rotateY(UTIL.degToRad(30));

	geometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI);
	const ball1 = new THREE.Mesh(geometry, UTIL.yellow_Material);
	ball1.castShadow = true;
	ball1.receiveShadow = true;
	scene.add(ball1);
	ball1.translateX(9);
	ball1.translateZ(-7);
	ball1.rotateX(UTIL.degToRad(270));

	geometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI);
	const ball2 = new THREE.Mesh(geometry, UTIL.green_Material);
	ball2.castShadow = true;
	ball2.receiveShadow = true;
	scene.add(ball2);
	ball2.translateX(6);
	ball2.translateZ(-9);
	ball2.rotateX(UTIL.degToRad(270));

	geometry = new THREE.SphereGeometry(2, 32, 16, 0, Math.PI);
	const ball3 = new THREE.Mesh(geometry, UTIL.red_Material);
	ball3.castShadow = true;
	ball3.receiveShadow = true;
	scene.add(ball3);
	ball3.translateX(10);
	ball3.translateZ(-11);
	ball3.rotateX(UTIL.degToRad(270));

	streetLight = new StreetLight();
	scene.add(streetLight);
	streetLight.position.set(-4, 0, 6);

	const treeTexture = textureLoader.load("../assets/tree.png");
	const treeBillboard = new THREE.Sprite(new THREE.SpriteMaterial({map: treeTexture, transparent: true}));
	scene.add(treeBillboard);
	treeBillboard.scale.set(10, 10, 10);
	treeBillboard.position.set(-10, 5, -25);

	mtlLoader.load("../assets/12222_Cat_v1_l3.mtl", mtl => {
		mtl.preload();
		objLoader.setMaterials(mtl);
		objLoader.load("../assets/12222_Cat_v1_l3.obj", root => {
			// have to do all code in the callback because don't know when it'll finish
			// and idk how to do JS promises or .then() whatever stuffs
			scene.add(root);
			root.scale.set(0.05, 0.05, 0.05);
			root.rotateX(UTIL.degToRad(270));
		});
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
	mtlLoader = new MTLLoader();
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