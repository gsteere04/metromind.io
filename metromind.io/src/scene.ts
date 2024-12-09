import * as THREE from 'three';
import { createCamera } from './camera.ts';
import { Tile } from './city.ts';
import { createAssetInstance } from './assets.ts';

export function createScene(canvas: HTMLCanvasElement) {
    const { camera, onMouseDown, onMouseUp, onMouseMove} = createCamera(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Set pixel ratio for better visuals on high-DPI screens
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('grey'); // Set the scene background color

    let terrain: THREE.Mesh[][] = []; // Array for terrain meshes
    let buildings: THREE.Mesh[][] = []; // Array for building meshes

    const initialize = (city: { size: number; data: Tile[][] }, scene: THREE.Scene) => {
        scene.clear(); // Clear scene
        terrain = []; // Reset terrain array
        buildings = []; // Reset buildings array

        const validTerrainIds: string[] = ['grass', 'residential', 'commercial', 'governmental'];

        for (let x = 0; x < city.size; x++) {
            const column: THREE.Mesh[] = []; // Array to store meshes for this column

            for (let y = 0; y < city.size; y++) {
                const terrainId = city.data[x][y].terrainId;

                if (validTerrainIds.includes(terrainId)) {
                    const grassMesh = createAssetInstance(terrainId as 'grass', x, y);

                
                    if (grassMesh){
                        scene.add(grassMesh);
                        column.push(grassMesh);
                    }
                }   else {
                    console.warn(`Invalid terrainId: ${terrainId} at position (${x}, ${y})`)
                }
                // If this tile has a building, add it to the scene
                const tile = city.data[x][y];
                if (tile.building === 'building') {
                    const buildingMesh = createAssetInstance('residential', x, y);
                    if (buildingMesh){
                    scene.add(buildingMesh);
                    column.push(buildingMesh);
                    }
                }
            }

            terrain.push(column); // Add the column of meshes to terrain
        }

        setUpLights(); // Set up the lights for the scene
    };

    const setUpLights = () => {
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
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('mousemove', onMouseMove);
    };

    // Start animation loop
    const start = () => {
        addEventListeners(); // Attach listeners to the scene
        renderer.setAnimationLoop(animate);
    };

    // Stop animation loop
    const stop = () => {
        removeEventListeners(); // Remove listeners from scene
        renderer.setAnimationLoop(null);
    };

    return { 
        start, 
        stop,
        initialize,
        scene,
        camera,
        renderer
    };
}
