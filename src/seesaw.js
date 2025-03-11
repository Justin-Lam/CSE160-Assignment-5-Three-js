import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import UTIL from "./utilities.js";

export class Seesaw {
	animationTilt = 0.25;
	animationSpeed = 1;

	/** @param {THREE.Scene} scene */
	constructor(scene) {
		let geometry;
		let material;
		
		// Learned about groups from https://stackoverflow.com/questions/10776495/is-there-a-container-type-object-in-three-js-to-transform-a-group-of-children
		this.group = new THREE.Group()	// use this for transformations to transform the entire object with respect to the global world
		scene.add(this.group);

		geometry = new THREE.CylinderGeometry(1, 1, 1, 3, 1); 
		material = new THREE.MeshBasicMaterial({color: 0xffff00}); 
		const seesaw_base = new THREE.Mesh(geometry, material);
		this.group.add(seesaw_base);
	
		geometry = new THREE.BoxGeometry(5, 0.25, 1); 
		material = new THREE.MeshBasicMaterial({color: 0x00f000}); 
		this.seesaw_board = new THREE.Mesh(geometry, material);
		seesaw_base.add(this.seesaw_board);
	
		geometry = new THREE.BoxGeometry(0.25, 0.5, 1); 
		material = new THREE.MeshBasicMaterial({color: 0x00ffff}); 
		const seesaw_handle_L = new THREE.Mesh(geometry, material);
		this.seesaw_board.add(seesaw_handle_L);
	
		geometry = new THREE.BoxGeometry(0.25, 0.5, 1); 
		material = new THREE.MeshBasicMaterial({color: 0x00ffff}); 
		const seesaw_handle_R = new THREE.Mesh(geometry, material);
		this.seesaw_board.add(seesaw_handle_R);
	
		seesaw_handle_L.translateX(-1.5);
		seesaw_handle_L.translateY(0.25);

		seesaw_handle_R.translateX(1.5);
		seesaw_handle_R.translateY(0.25);

		this.seesaw_board.translateY(0.5);
		this.seesaw_board.translateZ(1);
		this.seesaw_board.rotateX(UTIL.degToRad(90));
		
		seesaw_base.rotateX(UTIL.degToRad(270));
	}

	translate(x, y, z) {
		this.group.translateX(x);
		this.group.translateY(y);
		this.group.translateZ(z);
	}

	animate(time) {
		this.seesaw_board.rotation.z = (Math.sin(time * this.animationSpeed) * this.animationTilt);
	}
}