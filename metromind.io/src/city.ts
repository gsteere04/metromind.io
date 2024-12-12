import * as THREE from 'three';

export interface Tile {
    x: number;
    y: number;
    building: string;
    terrainId: string;
    mesh?: THREE.Mesh;
}

export const createCity = (size: number) => {
    const data: Tile[][] = [];

    const initialize = () => { 
        for (let x = 0; x < size; x++) {
            const column: Tile[] = [];
            for (let y = 0; y < size; y++) {
                const tile: Tile = { 
                    x,
                    y,
                    building: '',
                    terrainId: 'grass'
                 };

                column.push(tile);
            }
            data.push(column);
        }
    }
    initialize();

    return { 
        size,
        data,
    };

}