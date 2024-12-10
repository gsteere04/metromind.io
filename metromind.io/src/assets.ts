import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

// Predefined materials for reuse
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const residentialMaterial = new THREE.MeshLambertMaterial({ color: 'blue' });
const commercialMaterial = new THREE.MeshLambertMaterial({ color: 'orange' });
const governmentalMaterial = new THREE.MeshLambertMaterial({ color: 'black' });

const assets = { 
    'grass': (x: number, y: number) => {
        const mesh = new THREE.Mesh(geometry, grassMaterial);
        mesh.userData = { id: 'grass', x, y }
        mesh.position.set(x, -0.5, y);
        return mesh;
    },

    'residential': (x: number, y: number) => {
        const buildingMesh = new THREE.Mesh(geometry, residentialMaterial);
        buildingMesh.userData = { id: 'residential', x, y }
        buildingMesh.position.set(x, 0.5, y);
        return buildingMesh;
    },

    'commercial': (x: number, y: number) => {
        const buildingMesh = new THREE.Mesh(geometry, commercialMaterial);
        buildingMesh.userData = { id: 'commercial', x, y }
        buildingMesh.position.set(x, 0.5, y);
        return buildingMesh;
    },

    'governmental': (x: number, y: number) => {
        const buildingMesh = new THREE.Mesh(geometry, governmentalMaterial);
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
