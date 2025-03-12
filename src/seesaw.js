import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import UTIL from "./utilities.js";

export default class Seesaw {
	animationTilt = 0.25;
	animationSpeed = 1;

	/** @param {THREE.Scene} scene */
	constructor(scene) {		
		// Learned about groups from https://stackoverflow.com/questions/10776495/is-there-a-container-type-object-in-three-js-to-transform-a-group-of-children
		this.group = new THREE.Group()	// use this for transformations to transform the entire object in world space
		scene.add(this.group);

		const base = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 3, 1), UTIL.blue_Material);
		this.group.add(base);
	
		this.board = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.25, 1), UTIL.yellow_Material);
		base.add(this.board);
	
		const handle_L = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.5, 1), UTIL.blue_Material);
		this.board.add(handle_L);
	
		const handle_R = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.5, 1), UTIL.blue_Material);
		this.board.add(handle_R);
	
		handle_L.translateX(-2);
		handle_L.translateY(0.25);

		handle_R.translateX(2);
		handle_R.translateY(0.25);

		this.board.translateY(0.5);
		this.board.translateZ(1);
		this.board.rotateX(UTIL.degToRad(90));
		
		base.translateY(0.5);
		base.rotateX(UTIL.degToRad(270));
	}

	translate(x, y, z) {
		this.group.translateX(x);
		this.group.translateY(y);
		this.group.translateZ(z);
	}

	animate(time) {
		this.board.rotation.z = (Math.sin(time * this.animationSpeed) * this.animationTilt);
	}
}