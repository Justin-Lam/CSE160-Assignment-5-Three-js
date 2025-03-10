import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let canvas;
let renderer;
let scene;
let camera;
let textureLoader;

function main() {
	initGlobalVars();

	camera.position.y = 2;	// back up so we can see the origin
	camera.position.z = 10;	// back up so we can see the origin

	const geometry = new THREE.CylinderGeometry(1, 1, 2, 3, 1); 
	const material = new THREE.MeshBasicMaterial({color: 0xffff00}); 
	const seesaw_base = new THREE.Mesh(geometry, material);
	seesaw_base.rotateX(Math.PI/2);
	seesaw_base.rotateY(Math.PI/3);
	scene.add(seesaw_base);

	renderer.render(scene, camera);
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

main();