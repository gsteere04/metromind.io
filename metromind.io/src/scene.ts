import * as THREE from 'three';
import { createCamera } from './camera.ts';

export function createScene(canvas: HTMLCanvasElement) {
    const { camera, onMouseDown, onMouseUp, onMouseMove} = createCamera(canvas)
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Set pixel ratio for better visuals on high-DPI screens
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('grey'); // Set the scene background color

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 'red' });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
        renderer.render(scene, camera);
    };

    // Add event listeners
    const addEventListeners = () => {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
    };

    // Remove event listeners
    const removeEventListeners = () => {
        canvas.removeEventListener('mousedown', onMouseDown)
        canvas.removeEventListener('mouseup', onMouseUp)
        canvas.removeEventListener('mousemove', onMouseMove)
    };


    // Start animation loop
    const start = () => {
        addEventListeners() // Attach listeners to the scene
        renderer.setAnimationLoop(animate);
    };

    // Stop animation loop
    const stop = () => {
        removeEventListeners() // Remove listeners from scene
        renderer.setAnimationLoop(null);
    };

    return { start, stop };
}
