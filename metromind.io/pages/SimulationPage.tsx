import { useEffect, useRef } from 'react';
import { createScene } from '../src/scene';
import { createCity } from '../src/city';

const SimulationPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const city = createCity(8);
            const sceneController = createScene(canvasRef.current);

            // Retrieve the scene object from the sceneController
            const scene = sceneController.scene;

            sceneController.initialize(city, scene);
            sceneController.start();

            // Cleanup when the component unmounts
            return () => sceneController.stop();
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ 
                width: '100vw',
                height: '100vh',
                display: 'block',
                 }}
        />
        
    );
};

export default SimulationPage;
