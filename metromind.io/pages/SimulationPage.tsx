import { useEffect, useRef } from 'react';
import { createScene } from '../src/scene';

const SimulationPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            // Pass the canvas element to the createScene function
            const sceneController = createScene(canvasRef.current);
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
