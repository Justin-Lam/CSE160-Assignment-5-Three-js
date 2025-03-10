import * as THREE from "three";	// a namespace import - creates namespace object THREE containing all exports (due to *) from the module "three"
import UTIL from "./utilities.js";

export class Seesaw {
    /** @param {THREE.Scene} scene */
    constructor(scene) {
        let geometry;
        let material;

        geometry = new THREE.CylinderGeometry(1, 1, 1, 3, 1); 
        material = new THREE.MeshBasicMaterial({color: 0xffff00}); 
        const seesaw_base = new THREE.Mesh(geometry, material);
        scene.add(seesaw_base);
    
        geometry = new THREE.BoxGeometry(5, 0.25, 1); 
        material = new THREE.MeshBasicMaterial({color: 0x00f000}); 
        const seesaw_board = new THREE.Mesh(geometry, material);
        seesaw_base.add(seesaw_board);
    
        geometry = new THREE.BoxGeometry(0.25, 0.5, 1); 
        material = new THREE.MeshBasicMaterial({color: 0x00ffff}); 
        const seesaw_handle_L = new THREE.Mesh(geometry, material);
        seesaw_board.add(seesaw_handle_L);
    
        geometry = new THREE.BoxGeometry(0.25, 0.5, 1); 
        material = new THREE.MeshBasicMaterial({color: 0x00ffff}); 
        const seesaw_handle_R = new THREE.Mesh(geometry, material);
        seesaw_board.add(seesaw_handle_R);
    
        seesaw_handle_L.translateX(-1.5);
        seesaw_handle_L.translateY(0.25);
        seesaw_handle_R.translateX(1.5);
        seesaw_handle_R.translateY(0.25);
        seesaw_board.translateY(0.5);
        seesaw_board.translateZ(1);
        seesaw_board.rotateX(UTIL.degToRad(90));
        seesaw_base.rotateX(UTIL.degToRad(270));
    }

    animate(time) {

    }
}