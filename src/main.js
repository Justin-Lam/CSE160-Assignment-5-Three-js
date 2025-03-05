import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"

let canvas;
let renderer;
let scene;
let camera;

let cube;

function main() {
	initGlobalVars();

	camera.position.z = 2;	// back up so we can see the origin

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	requestAnimationFrame(tick);
}

function initGlobalVars() {
	canvas = document.querySelector("#canvas");
	renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	scene = new THREE.Scene();

	const fov = 75;
	const aspect = 2;	// default canvas is 300x150 so its aspect is 2 (300/150)
	const near = 0.1;
	const far = 5;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);	// defaults to looking down the -Z axis with +Y up
}

/** @param {number} time end time of the previous frame (in ms) */
function tick(time) {
	time /= 1000;

	animateCube(time, time);
	renderer.render(scene, camera);
   
	requestAnimationFrame(tick);
}

function animateCube(xRotation, yRotation) {
	cube.rotation.x = xRotation;
	cube.rotation.y = yRotation;
}

main();