import * as THREE from 'three';
import { createCamera } from './camera.ts';
import { Tile } from './city.ts';
import { createAssetInstance } from './assets.ts';


export function createScene(canvas: HTMLCanvasElement) {
    const { camera, onMouseDown: cameraOnMouseDown, onMouseUp, onMouseMove } = createCamera(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Set pixel ratio for better visuals on high-DPI screens
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('grey'); // Set the scene background color

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject: THREE.Mesh | undefined = undefined;
    let cityData: { size: number; data: Tile[][] } | null = null; // Store city data

    let terrain: THREE.Mesh[][] = []; // Array for terrain meshes
    let buildings: THREE.Mesh[][] = []; // Array for building meshes
    let onObjectSelected: (object: THREE.Mesh | Tile) => void = () => {}
    let selectedTool: string | null = null;
    
        const initialize = (city: { size: number; data: Tile[][] }, scene: THREE.Scene) => {
            cityData = city
            scene.clear(); // Clear scene
            terrain = []; // Reset terrain array
            buildings = []; // Reset buildings array

        const validTerrainIds: string[] = ['grass', 'residential', 'commercial', 'governmental'];

        for (let x = 0; x < city.size; x++) {
            const column: THREE.Mesh[] = []; // Array to store meshes for this column

            for (let y = 0; y < city.size; y++) {
                const terrainId = city.data[x][y].terrainId;

                if (validTerrainIds.includes(terrainId)) {
                    const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00})
                    const grassMesh = createAssetInstance(terrainId as 'grass', x, y);

                    if (grassMesh) {
                        grassMesh.material = grassMaterial;
                        scene.add(grassMesh);
                        column.push(grassMesh);
                    }
                } else {
                    console.warn(`Invalid terrainId: ${terrainId} at position (${x}, ${y})`);
                }

                // If this tile has a building, add it to the scene
                const tile = city.data[x][y];
                if (tile.building === 'building') {
                    const buildingMaterial = new THREE.MeshLambertMaterial();

                    const buildingMesh = createAssetInstance('residential', x, y);
                    if (buildingMesh) {
                        if (buildingMesh.material instanceof THREE.MeshLambertMaterial) {
                            const assetColor = buildingMesh.material.color;
                            buildingMaterial.color.set(assetColor)
                        }
                        buildingMesh.material = buildingMaterial;
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
            new THREE.DirectionalLight(0xffffff, 0.3),
        ];

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights);
    };

    const animate = () => {
        renderer.render(scene, camera);
    };

    const setSelectedTool = (tool: string | null) => {
        selectedTool = tool;
        console.log('Selected tool:', selectedTool);
    };

    const handleMouseDown = (event: MouseEvent) => {
        if (!cityData) {
            console.error("City Data is not initialized!");
            return;
        }
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersections = raycaster.intersectObjects(scene.children, false);

        if (intersections.length > 0) {
            const hitObject = intersections[0].object;

            if (hitObject instanceof THREE.Mesh) {
                // Deselect previous selection
                if (selectedObject && selectedObject.material instanceof THREE.MeshLambertMaterial) {
                    selectedObject.material.emissive.setHex(0x000000);
                }

                selectedObject = hitObject;

                // Highlight selected object
                if (selectedObject.material instanceof THREE.MeshLambertMaterial) {
                    selectedObject.material.emissive.setHex(0x555555);
                }

                if (selectedObject.userData) {
                    const { x, y } = selectedObject.userData as { x: number; y: number };
                    const tile = cityData.data[x][y];
                    console.log('Selected Tile:', tile);

                    // Only add building if residential tool is selected
                    if (selectedTool === 'residential' && !tile.building) {
                        console.log('Adding building at:', x, y);
                        const buildingMesh = createAssetInstance('residential', x, y);
                        if (buildingMesh) {
                            scene.add(buildingMesh);
                            if (!buildings[x]) buildings[x] = [];
                            buildings[x][y] = buildingMesh;
                            tile.building = 'residential';
                            console.log('Building added successfully');
                        }
                    }

                    if (selectedTool === 'commercial' && !tile.building) {
                        console.log('Adding building at:', x, y);
                        const buildingMesh = createAssetInstance('commercial', x, y);
                        if (buildingMesh) {
                            scene.add(buildingMesh);
                            if (!buildings[x]) buildings[x] = [];
                            buildings[x][y] = buildingMesh;
                            tile.building = 'commercial';
                            console.log('Building added successfully');
                        }
                    }

                    if (selectedTool === 'governmental' && !tile.building) {
                        console.log('Adding building at:', x, y);
                        const buildingMesh = createAssetInstance('governmental', x, y);
                        if (buildingMesh) {
                            scene.add(buildingMesh);
                            if (!buildings[x]) buildings[x] = [];
                            buildings[x][y] = buildingMesh;
                            tile.building = 'governmental';
                            console.log('Building added successfully');
                        }
                    }

                    if (selectedTool === 'road' && !tile.building) {
                        console.log('Adding building at:', x, y);
                        const buildingMesh = createAssetInstance('road', x, y);
                        if (buildingMesh) {
                            scene.add(buildingMesh);
                            if (!buildings[x]) buildings[x] = [];
                            buildings[x][y] = buildingMesh;
                            tile.building = 'road';
                            console.log('Building added successfully');
                        }
                    }

                    onObjectSelected(tile);
                } else {
                    console.log('No userData found for the selected object!');
                }
            }
        }

        cameraOnMouseDown(event);
    };

            
    // Add event listeners
    const addEventListeners = () => {
        canvas.addEventListener('mousedown', handleMouseDown.bind(scene));
        canvas.addEventListener('mouseup', onMouseUp.bind(scene));
        canvas.addEventListener('mousemove', onMouseMove.bind(scene));
    };

    // Remove event listeners
    const removeEventListeners = () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
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
        onObjectSelected,
        start,
        stop,
        initialize,
        scene,
        camera,
        renderer,
        setSelectedTool,
    };
}