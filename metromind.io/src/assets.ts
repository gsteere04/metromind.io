import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

// Base colors for materials
const COLORS = {
    grass: 0x00ff00,
    residential: 'blue',
    commercial: 'orange',
    governmental: 'black'
};

const assets = { 
    'grass': (x: number, y: number) => {
        const material = new THREE.MeshLambertMaterial({ color: COLORS.grass });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'grass', x, y }
        mesh.position.set(x, -0.5, y);
        return mesh;
    },

    'residential': (x: number, y: number) => {
        const material = new THREE.MeshLambertMaterial({ color: COLORS.residential });
        const buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.userData = { id: 'residential', x, y }
        buildingMesh.position.set(x, 0.5, y);
        return buildingMesh;
    },

    'commercial': (x: number, y: number) => {
        const material = new THREE.MeshLambertMaterial({ color: COLORS.commercial });
        const buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.userData = { id: 'commercial', x, y }
        buildingMesh.position.set(x, 0.5, y);
        return buildingMesh;
    },

    'governmental': (x: number, y: number) => {
        const material = new THREE.MeshLambertMaterial({ color: COLORS.governmental });
        const buildingMesh = new THREE.Mesh(geometry, material);
        buildingMesh.userData = { id: 'governmental', x, y }
        buildingMesh.position.set(x, 0.5, y);
        return buildingMesh;
    },
}

type AssetId = keyof typeof assets;

export const createAssetInstance = (assetId: AssetId, x: number, y: number) => {
    if (assetId in assets) {
        return assets[assetId](x, y);
    } else {
        console.warn(`Asset Id ${assetId} is not found.`);
        return undefined;
    }
}
