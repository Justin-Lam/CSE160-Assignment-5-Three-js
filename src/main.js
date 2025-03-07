import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let canvas;
let renderer;
let scene;
let camera;
let textureLoader;

let directionalLight;
let cube1;	// lit colored
let cube2;	// unlit single textured
let cube3;	// unlit multi textured

function main() {
	initGlobalVars();

	camera.position.z = 2;	// back up so we can see the origin

	const color = 0xFFFFFF;
    const intensity = 3;
    directionalLight = new THREE.DirectionalLight(color, intensity);	// position and target both default to (0, 0, 0)
    directionalLight.position.set(-1, 2, 4);
    scene.add(directionalLight);

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const material_Cube1 = new THREE.MeshPhongMaterial({color: 0x44aa88});
	cube1 = new THREE.Mesh(geometry, material_Cube1);
	cube1.position.x = -1.5;
	scene.add(cube1);

	const material_Cube2 = new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/wall.jpg")});
	cube2 = new THREE.Mesh(geometry, material_Cube2);
	scene.add(cube2);

	const materials_Cube3 = [
		new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/flower-1.jpg")}),
		new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/flower-2.jpg")}),
		new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/flower-3.jpg")}),
		new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/flower-4.jpg")}),
		new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/flower-5.jpg")}),
		new THREE.MeshBasicMaterial({map: loadColorTexture("../assets/flower-6.jpg")})
	];
	cube3 = new THREE.Mesh(geometry, materials_Cube3);
	cube3.position.x = 1.5;
	scene.add(cube3);

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
	const far = 5;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);	// defaults to looking down the -Z axis with +Y up

	textureLoader = new THREE.TextureLoader();
}

function loadColorTexture(path) {
	const texture = textureLoader.load(path);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

/** @param {number} time end time of the previous frame (in ms) */
function tick(time) {
	time /= 1000;

	animateCube(cube1, time);
	animateCube(cube2, time);
	animateCube(cube3, time);

	renderer.render(scene, camera);
   
	requestAnimationFrame(tick);
}

function animateCube(cube, time) {
	cube.rotation.x = time;
	cube.rotation.y = time;
}

main();