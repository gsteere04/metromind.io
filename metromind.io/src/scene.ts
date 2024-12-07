import * as THREE from 'three';

export function createScene(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Set pixel ratio for better visuals on high-DPI screens
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('grey'); // Set the scene background color

    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5; // Move the camera back to see the scene

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 'red' });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    // Start animation loop
    const start = () => {
        renderer.setAnimationLoop(animate);
    };

    // Stop animation loop
    const stop = () => {
        renderer.setAnimationLoop(null);
    };

    return { start, stop };
}
