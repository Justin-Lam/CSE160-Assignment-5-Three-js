import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import UTIL from "./utilities.js";

export default class SwingSet {
	/** @param {THREE.Scene} scene */
	constructor(scene) {		
		// Learned about groups from https://stackoverflow.com/questions/10776495/is-there-a-container-type-object-in-three-js-to-transform-a-group-of-children
		this.group = new THREE.Group()	// use this for transformations to transform the entire object in world space
		scene.add(this.group);

		const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 10), UTIL.red_Material);
		topBar.castShadow = true;
		topBar.receiveShadow = true;
		this.group.add(topBar);

		const stand_L_Front = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_L_Front.castShadow = true;
		stand_L_Front.receiveShadow = true;
		topBar.add(stand_L_Front);

		const stand_L_Back = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_L_Back.castShadow = true;
		stand_L_Back.receiveShadow = true;
		topBar.add(stand_L_Back);

		const stand_R_Front = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_R_Front.castShadow = true;
		stand_R_Front.receiveShadow = true;
		topBar.add(stand_R_Front);

		const stand_R_Back = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_R_Back.castShadow = true;
		stand_R_Back.receiveShadow = true;
		topBar.add(stand_R_Back);

		const seat_L_rope_L = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_L_rope_L.castShadow = true;
		seat_L_rope_L.receiveShadow = true;
		topBar.add(seat_L_rope_L);

		const seat_L_rope_R = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_L_rope_R.castShadow = true;
		seat_L_rope_R.receiveShadow = true;
		topBar.add(seat_L_rope_R);

		const seat_L = new THREE.Mesh(new THREE.BoxGeometry(2, 0.25, 1), UTIL.green_Material);
		seat_L.castShadow = true;
		seat_L.receiveShadow = true;
		seat_L_rope_L.add(seat_L);

		const seat_R_rope_L = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_R_rope_L.castShadow = true;
		seat_R_rope_L.receiveShadow = true;
		topBar.add(seat_R_rope_L);

		const seat_R_rope_R = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_R_rope_R.castShadow = true;
		seat_R_rope_R.receiveShadow = true;
		topBar.add(seat_R_rope_R);

		const seat_R = new THREE.Mesh(new THREE.BoxGeometry(2, 0.25, 1), UTIL.green_Material);
		seat_R.castShadow = true;
		seat_R.receiveShadow = true;
		seat_R_rope_L.add(seat_R);

		stand_L_Front.translateY(-5);
		stand_L_Front.rotateZ(UTIL.degToRad(90));
		stand_L_Front.rotateX(UTIL.degToRad(315));
		stand_L_Front.translateY(-2.5);

		stand_L_Back.translateY(-5);
		stand_L_Back.rotateZ(UTIL.degToRad(90));
		stand_L_Back.rotateX(UTIL.degToRad(45));
		stand_L_Back.translateY(-2.5);

		stand_R_Front.translateY(5);
		stand_R_Front.rotateZ(UTIL.degToRad(90));
		stand_R_Front.rotateX(UTIL.degToRad(315));
		stand_R_Front.translateY(-2.5);

		stand_R_Back.translateY(5);
		stand_R_Back.rotateZ(UTIL.degToRad(90));
		stand_R_Back.rotateX(UTIL.degToRad(45));
		stand_R_Back.translateY(-2.5);

		seat_L_rope_L.translateY(-3);
		seat_L_rope_L.translateX(1.5);
		seat_L_rope_L.rotateZ(UTIL.degToRad(90));

		seat_L_rope_R.translateY(-1);
		seat_L_rope_R.translateX(1.5);
		seat_L_rope_R.rotateZ(UTIL.degToRad(90));

		seat_L.translateX(1);
		seat_L.translateY(-1.5);

		seat_R_rope_L.translateY(1);
		seat_R_rope_L.translateX(1.5);
		seat_R_rope_L.rotateZ(UTIL.degToRad(90));

		seat_R_rope_R.translateY(3);
		seat_R_rope_R.translateX(1.5);
		seat_R_rope_R.rotateZ(UTIL.degToRad(90));

		seat_R.translateX(1);
		seat_R.translateY(-1.5);

		topBar.translateY(3.5);
		topBar.rotateZ(UTIL.degToRad(270));
	}

	translate(x, y, z) {
		this.group.translateX(x);
		this.group.translateY(y);
		this.group.translateZ(z);
	}

	rotate(x, y, z) {
		this.group.rotateX(UTIL.degToRad(x));
		this.group.rotateY(UTIL.degToRad(y));
		this.group.rotateZ(UTIL.degToRad(z));
	}
}