import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"

main();

function main() {
	const canvas = document.querySelector("#canvas");
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	const scene = new THREE.Scene();

	const fov = 75;
	const aspect = 2;	// default canvas is 300x150 so its aspect is 2 (300/150)
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);	// defaults to looking down the -Z axis with +Y up
	camera.position.z = 2;	// back up so we can see the origin

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
	const cube = new THREE.Mesh(geometry, material);

	scene.add(cube);

	renderer.render(scene, camera);
}