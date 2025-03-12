// Learned how to do default exporting from ChatGPT and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import

import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"

const blue_Material = new THREE.MeshPhongMaterial({color: 0x078BE2});
const yellow_Material = new THREE.MeshPhongMaterial({color: 0xFAF658});
const red_Material = new THREE.MeshPhongMaterial({color: 0xD71605});
const green_Material = new THREE.MeshPhongMaterial({color: 0x58E53F});
const dark_Material = new THREE.MeshPhongMaterial({color: 0x4B4B4B});

function degToRad(degrees) { return degrees * (Math.PI / 180); }

export default {
	blue_Material,
	yellow_Material,
	red_Material,
	green_Material,
	dark_Material,
	degToRad
};