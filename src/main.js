import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"

let canvas;
let renderer;
let scene;
let camera;

let directionalLight;
let cubes;

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
	cubes = [
		createCube(geometry, 0x44aa88,  0),
		createCube(geometry, 0x8844aa, -2),
		createCube(geometry, 0xaa8844,  2),
	];

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
}

/**
 * @param {THREE.BoxGeometry} geometry
 * @param {number} color in hexadecimal
 * @param {number} x default = 0
 * @param {number} y default = 0
 * @returns {THREE.Mesh}
 */
function createCube(geometry, color, x = 0, y = 0) {
	const material = new THREE.MeshPhongMaterial({color});	// MeshBasicMaterial isn't affected by lights
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	
	cube.position.x = x;
	
	return cube;
}

/** @param {number} time end time of the previous frame (in ms) */
function tick(time) {
	time /= 1000;

	cubes.forEach((cube, index) => setCubeRotation(cube, index, time));
	renderer.render(scene, camera);
   
	requestAnimationFrame(tick);
}

function setCubeRotation(cube, index, time) {
	const speed = 1 + index * 0.1;
	const rot = time * speed;
	cube.rotation.x = rot;
	cube.rotation.y = rot;
}

main();