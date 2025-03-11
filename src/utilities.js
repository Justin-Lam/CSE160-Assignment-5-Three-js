/*
    Learned how to do default exporting from ChatGPT and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import
*/

import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"

/*
const x_Axis = new THREE.Vector3(1, 0, 0);
const y_Axis = new THREE.Vector3(0, 1, 0);
const z_Axis = new THREE.Vector3(0, 0, 1);
*/

const degToRad = (d) => d * (Math.PI / 180);

export default {
    /*
    x_Axis,
    y_Axis,
    z_Axis,
    */
    degToRad
};