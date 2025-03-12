import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import UTIL from "./utilities.js";

export default class StreetLight {
	animationSpeed = 5;

	/** @param {THREE.Scene} scene */
	constructor(scene) {
		let geometry;
		let material;
		
		// Learned about groups from https://stackoverflow.com/questions/10776495/is-there-a-container-type-object-in-three-js-to-transform-a-group-of-children
		this.group = new THREE.Group()	// use this for transformations to transform the entire object in world space
		scene.add(this.group);

		geometry = new THREE.CylinderGeometry(0.75, 0.75, 0.5);
		material = new THREE.MeshBasicMaterial({color: 0xffff00});
		const base_lower = new THREE.Mesh(geometry, material);
		this.group.add(base_lower);

		geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5);
		material = new THREE.MeshBasicMaterial({color: 0xfff000});
		const base_upper = new THREE.Mesh(geometry, material);
		base_lower.add(base_upper);

		geometry = new THREE.CylinderGeometry(0.25, 0.25, 5);
		material = new THREE.MeshBasicMaterial({color: 0xfff0f0});
		const pole = new THREE.Mesh(geometry, material);
		base_upper.add(pole);

		geometry = new THREE.TorusGeometry(0.5, 0.1, 9, 9); 
		material = new THREE.MeshBasicMaterial( { color: 0x0fff00 } ); 
		this.light1 = new THREE.Mesh( geometry, material );
		pole.add(this.light1);

		this.light2 = new THREE.Mesh( geometry, material );
		pole.add(this.light2);

		base_lower.translateY(0.25);

		base_upper.translateY(0.5);

		pole.translateY(2.75);

		this.light1.translateY(3);

		this.light2.translateY(3);
		this.light2.rotateY(UTIL.degToRad(90));
	}

	translate(x, y, z) {
		this.group.translateX(x);
		this.group.translateY(y);
		this.group.translateZ(z);
	}

	animate(deltaTime) {
		this.light1.rotateOnAxis(new THREE.Vector3(4, 3, 9).normalize(), this.animationSpeed * deltaTime);
		this.light2.rotateOnAxis(new THREE.Vector3(1, 5, 8).normalize(), this.animationSpeed * deltaTime);
	}
}