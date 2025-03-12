import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import UTIL from "./utilities.js";

export default class StreetLight {
	animationSpeed = 5;

	/** @param {THREE.Scene} scene */
	constructor(scene) {		
		// Learned about groups from https://stackoverflow.com/questions/10776495/is-there-a-container-type-object-in-three-js-to-transform-a-group-of-children
		this.group = new THREE.Group()	// use this for transformations to transform the entire object in world space
		scene.add(this.group);

		const base_lower = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.5), UTIL.dark_Material);
		this.group.add(base_lower);

		const base_upper = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.5), UTIL.dark_Material);
		base_lower.add(base_upper);

		const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.dark_Material);
		base_upper.add(pole);

		this.lightRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 9, 9), UTIL.yellow_Material);
		pole.add(this.lightRing1);

		this.lightRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 9, 9), UTIL.yellow_Material);
		pole.add(this.lightRing2);

		const pointLight = new THREE.PointLight(0xffffff, 15, 0, 1);
		pole.add(pointLight);
		pointLight.translateY(3);

		base_lower.translateY(0.25);

		base_upper.translateY(0.5);

		pole.translateY(2.75);

		this.lightRing1.translateY(3);

		this.lightRing2.translateY(3);
		this.lightRing2.rotateY(UTIL.degToRad(90));
	}

	translate(x, y, z) {
		this.group.translateX(x);
		this.group.translateY(y);
		this.group.translateZ(z);
	}

	animate(deltaTime) {
		this.lightRing1.rotateOnAxis(new THREE.Vector3(4, 3, 9).normalize(), this.animationSpeed * deltaTime);
		this.lightRing2.rotateOnAxis(new THREE.Vector3(1, 5, 8).normalize(), this.animationSpeed * deltaTime);
	}
}