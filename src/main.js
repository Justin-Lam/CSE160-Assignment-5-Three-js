// Learned about the geometries of Three.js from https://threejs-journey.com/lessons/geometries#the-different-built-in-geometries

import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import UTIL from "./utilities.js";
import Seesaw from "./seesaw.js";
import SwingSet from "./swingSet.js";
import StreetLight from "./streetLight.js";

function main() {
	const canvas = document.getElementById("canvas");

	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	renderer.shadowMap.enabled = true;

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xDDDDDD, 0.015);
	
	const camera = new THREE.PerspectiveCamera(60, canvas.width/canvas.height, 0.1, 500);	// defaults to looking down the -Z axis with +Y up
	camera.position.set(0, 3, 10);

	const textureLoader = new THREE.TextureLoader();
	const objLoader = new OBJLoader();
	const mtlLoader = new MTLLoader();

	const orbitControls = new OrbitControls(camera, canvas);
	orbitControls.target.set(0, 3, 0);

	const directionalLight = new THREE.DirectionalLight(0xABD3E1, 5);	// position and target both default to (0, 0, 0)
	directionalLight.shadow.camera.left = directionalLight.shadow.camera.bottom = -25;
	directionalLight.shadow.camera.right = directionalLight.shadow.camera.top = 25;
	directionalLight.shadow.camera.far = 50;
	directionalLight.castShadow = true;
	scene.add(directionalLight);
	directionalLight.position.set(15, 20, 10);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
	scene.add(ambientLight);

	const skyTexture = textureLoader.load("./assets/skyTexture.jpg");
	skyTexture.mapping = THREE.EquirectangularReflectionMapping;
	skyTexture.colorSpace = THREE.SRGBColorSpace;
	scene.background = skyTexture;

	const playgroundSurfaceTexture = textureLoader.load("./assets/playgroundSurfaceTexture.jpg");
	playgroundSurfaceTexture.colorSpace = THREE.SRGBColorSpace;
	playgroundSurfaceTexture.wrapS = playgroundSurfaceTexture.wrapT = THREE.RepeatWrapping;
	playgroundSurfaceTexture.repeat.set(5, 5);
	
	const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({map: playgroundSurfaceTexture, side: THREE.DoubleSide}));
	ground.receiveShadow = true;
	scene.add(ground);
	ground.rotateX(UTIL.degToRad(90));

	const seesaw = new Seesaw();
	scene.add(seesaw);
	seesaw.position.set(6, 0, 2);

	const swings = new SwingSet();
	scene.add(swings);
	swings.position.set(-10, 0, -7);
	swings.rotateY(UTIL.degToRad(30));

	const ball1 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI), UTIL.yellow_Material);
	ball1.castShadow = ball1.receiveShadow = true;
	scene.add(ball1);
	ball1.position.set(9, 0, -7);
	ball1.rotateX(UTIL.degToRad(270));

	const ball2 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI), UTIL.green_Material);
	ball2.castShadow = ball2.receiveShadow = true;
	scene.add(ball2);
	ball2.position.set(6, 0, -9);
	ball2.rotateX(UTIL.degToRad(270));

	const ball3 = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 16, 0, Math.PI), UTIL.red_Material);
	ball3.castShadow = ball3.receiveShadow = true;
	scene.add(ball3);
	ball3.position.set(10, 0, -11);
	ball3.rotateX(UTIL.degToRad(270));

	const streetLight = new StreetLight();
	scene.add(streetLight);
	streetLight.position.set(-4, 0, 6);

	const treeTexture = textureLoader.load("./assets/tree.png");
	const treeBillboard = new THREE.Sprite(new THREE.SpriteMaterial({map: treeTexture, transparent: true}));
	scene.add(treeBillboard);
	treeBillboard.position.set(-10, 5, -25);
	treeBillboard.scale.set(10, 10, 10);

	mtlLoader.load("./assets/12222_Cat_v1_l3.mtl", mtl => {
		mtl.preload();
		objLoader.setMaterials(mtl);
		objLoader.load("./assets/12222_Cat_v1_l3.obj", root => {
			// have to do all code in the callback because don't know when it'll finish
			// and idk how to do JS promises or .then() whatever stuffs
			scene.add(root);
			root.scale.set(0.05, 0.05, 0.05);
			root.rotateX(UTIL.degToRad(270));
		});
	});

	requestAnimationFrame(tick)

	let prevTime = 0;
	function tick(time) {
		time /= 1000;

		seesaw.animate(time);
		streetLight.animate(time - prevTime);
		
		renderer.render(scene, camera);

		prevTime = time;

		requestAnimationFrame(tick);
	}
}

main();