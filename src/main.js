import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let canvas;
let renderer;
let scene;
let camera;
let textureLoader;

let geometry;
let material;

const x_Axis = new THREE.Vector3(1, 0, 0);
const y_Axis = new THREE.Vector3(0, 1, 0);
const z_Axis = new THREE.Vector3(0, 0, 1);
const degToRad = (d) => d * (Math.PI / 180);

function main() {
	initGlobalVars();

	camera.position.y = 2;	// back up so we can see the origin
	camera.position.z = 10;	// back up so we can see the origin

	geometry = new THREE.PlaneGeometry(100, 100);
	material = new THREE.MeshBasicMaterial({color: 0xfffff0, side: THREE.DoubleSide});
	const ground = new THREE.Mesh(geometry, material);
	ground.rotateOnWorldAxis(x_Axis, degToRad(90))
	scene.add(ground);

	geometry = new THREE.CylinderGeometry(1, 1, 2, 3, 1); 
	material = new THREE.MeshBasicMaterial({color: 0xffff00}); 
	const seesaw_base = new THREE.Mesh(geometry, material);
	seesaw_base.rotateOnWorldAxis(y_Axis, degToRad(60));
	seesaw_base.rotateOnWorldAxis(x_Axis, degToRad(90));
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