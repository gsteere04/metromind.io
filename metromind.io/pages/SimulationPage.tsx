import { useEffect, useRef, useState } from 'react';
import { createScene } from '../src/scene';
import { createCity } from '../src/city';
import './styling/SimulationPage.css';

const SimulationPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeTool, setActiveTool] = useState<string>('');
    const [sceneController, setSceneController] = useState<any>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const city = createCity(12);
            const controller = createScene(canvasRef.current);
            setSceneController(controller);

            // Retrieve the scene object from the controller
            const scene = controller.scene;

            controller.initialize(city, scene);
            controller.onObjectSelected = (tile) => {
                console.log('Tile Data:', tile);
            };
            controller.start();
            // Cleanup when the component unmounts
            return () => controller.stop();
        }
    }, []);

    useEffect(() => {
        // Perform actions based on the active tool
        if (activeTool === 'bulldoze') {
            console.log('Bulldoze tool is active');
            // Trigger bulldoze logic here
            
        } else if (activeTool === 'residential') {
            console.log('Residential tool is active');
            // Trigger residential logic here
        } else if (activeTool === 'commercial') {
            console.log('Commercial tool is active');
            // Trigger commercial logic here
        } else if (activeTool === 'governmental') {
            console.log('Governmental tool is active');
            // Trigger governmental logic here
        } else if (activeTool === 'roads') {
            console.log('Road tool is active');
            // Trigger road logic here
        }
    }, [activeTool]); // This effect runs whenever activeTool changes

    const toggleDrawer = () => setDrawerOpen((prev) => !prev);

    const handleToolClick = (toolId: string, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveTool(toolId);
        
        if (toolId === 'residential' && sceneController) {
            sceneController.setSelectedTool('residential');
        }
    };

    return (
        <div id="simulation-container">
            {/* Drawer toggle button */}
            <div id='toolbar-toggle-container'>
                <div id='drawer-toggle' onClick={toggleDrawer}>
                    {drawerOpen ? 'Close Toolbar' : 'Open Toolbar'}
                </div>
                <div id='ui-toolbar-drawer' className={drawerOpen ? 'open' : ''}>
                    <button
                        id='bulldoze-button'
                        className={`ui-button ${activeTool === 'bulldoze' ? 'selected' : ''}`}
                        onClick={(e) => handleToolClick('bulldoze', e)}
                    >
                        BULLDOZE
                    </button>

                    <button
                        id='residential-button'
                        className={`ui-button ${activeTool === 'residential' ? 'selected' : ''}`}
                        onClick={(e) => handleToolClick('residential', e)}
                    >
                        RESIDENTIAL
                    </button>

                    <button
                        id='commercial-button'
                        className={`ui-button ${activeTool === 'commercial' ? 'selected' : ''}`}
                        onClick={(e) => handleToolClick('commercial', e)}
                    >
                        COMMERCIAL
                    </button>

                    <button
                        id='governmental-button'
                        className={`ui-button ${activeTool === 'governmental' ? 'selected' : ''}`}
                        onClick={(e) => handleToolClick('governmental', e)}
                    >
                        GOVERNMENTAL
                    </button>

                    <button
                        id='roads-button'
                        className={`ui-button ${activeTool === 'roads' ? 'selected' : ''}`}
                        onClick={(e) => handleToolClick('roads', e)}
                    >
                        ROADS
                    </button>
                </div>
            </div>

            <div id='loading-overlay' className='hidden'>Loading Simulation...</div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'block'
                }}
            />
        </div>
    );
};

export default SimulationPage;
