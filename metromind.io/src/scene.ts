import * as THREE from 'three';
import { createCamera } from './camera.ts';
import { Tile } from './city.ts';


export function createScene(canvas: HTMLCanvasElement) {
    const { camera, onMouseDown, onMouseUp, onMouseMove} = createCamera(canvas)
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Set pixel ratio for better visuals on high-DPI screens
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('grey'); // Set the scene background color

    let meshes: Tile[][] = [];

    const initialize = (city: { size: number; data: Tile[][] }, scene: THREE.Scene) => {
        scene.clear(); // Clear scene
        meshes = []; // Reset meshes array
         for (let x = 0; x < city.size; x++){
            const column: Tile[] = [];
            for(let y = 0; y < city.size; y++){
                const tile = city.data[x][y]; // Gather Tile object at location
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.set(tile.x, 0, tile.y);
                scene.add(mesh);

                tile.mesh = mesh
                column.push(tile);

            }
            meshes.push(column)
         }
         setUpLights()
    }

    const setUpLights =() => {
        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3)
        ];

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights);
    };

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

    return { 
        start, 
        stop,
        initialize,
        scene,
        camera,
        renderer };
}
