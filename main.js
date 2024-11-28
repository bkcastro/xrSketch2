import * as THREE from 'three';
import { XRButton } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
camera.position.set(0, 0, 10)
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );

const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 

document.body.appendChild(XRButton.createButton(renderer))

const group = new THREE.Group(); 

scene.add(group); 
group.scale.multiplyScalar(1/3)
group.position.y = 1

function draw() {
    group.clear(); 

    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.TorusGeometry( 1+Math.random()*3, 0.1, 6, (Math.random() > .5) ? 3 : 4,); 
        const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
        torus.rotation.set(
            Math.random()*Math.PI, 
            Math.random()*Math.PI, 
            Math.random()*Math.PI
        )
        torus.position.set(
            (Math.random()-.5) * 10, 
            Math.random() * 10,
            (Math.random()-.5) * 10, 
        )
    
        group.add(torus); 
    }
}

draw(); 

setInterval(() => {
   draw();
}, 3000); 

let lastUpdateTime = 0; 
const targetFrameTime = 1000 / 30; 

function animate(timestamp) {
    renderer.render(scene, camera);

    if (timestamp - lastUpdateTime >= targetFrameTime) {
        group.rotation.y += 0.005; 
        lastUpdateTime = timestamp;
    }
}

renderer.setAnimationLoop( animate );