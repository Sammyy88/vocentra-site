import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface PhysicsTomatoesProps {
  count: number;
}

const PhysicsTomatoes: React.FC<PhysicsTomatoesProps> = ({ count }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Matter.js Engine and World
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // Set default gravity
    engine.gravity.y = 1;
    engine.gravity.x = 0;

    // 2. Setup Boundaries (Floor, Left, Right)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const wallOptions = { isStatic: true, render: { visible: false } };
    
    const ground = Matter.Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -100, width, 60, wallOptions);

    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 3. Setup Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 4. Custom DOM Renderer (60fps synced with Physics)
    Matter.Events.on(engine, 'afterUpdate', () => {
      const bodies = Matter.Composite.allBodies(engine.world);
      for (const body of bodies) {
        if (body.plugin.domElement) {
          const el = body.plugin.domElement as HTMLDivElement;
          // Offset by -25px to center the 50x50 element on the physics body's center
          el.style.transform = `translate(${body.position.x - 25}px, ${body.position.y - 25}px) rotate(${body.angle}rad)`;
        }
      }
    });

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    // Device orientation handler for gravity
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // gamma: left-to-right tilt (-90 to 90)
      // beta: front-to-back tilt (-180 to 180)
      const gamma = event.gamma || 0;
      const beta = event.beta || 0;
      
      // Clamp and normalize to -1 to 1 for gravity
      const gravityX = Matter.Common.clamp(gamma, -90, 90) / 90;
      const gravityY = Matter.Common.clamp(beta, -90, 90) / 90;

      // Only update if we actually have movement data (prevents breaking desktop gravity)
      if (gamma !== 0 || beta !== 0) {
        engine.gravity.x = gravityX * 1.5; // Multiply for slightly stronger effect
        engine.gravity.y = gravityY * 1.5;
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('deviceorientation', handleOrientation);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []); // Run once on mount

  // Watch for count changes to spawn new tomatoes
  useEffect(() => {
    if (count > prevCountRef.current && engineRef.current && containerRef.current) {
      const width = window.innerWidth;
      const startX = Math.random() * (width - 100) + 50; // Random x position
      const startY = -50; // Start above screen

      // Create a circular physics body
      const tomatoBody = Matter.Bodies.circle(startX, startY, 25, {
        restitution: 0.6, // Bounciness
        friction: 0.005,
        density: 0.04
      });

      // Create the DOM element for the tomato
      const tomatoEl = document.createElement('div');
      tomatoEl.innerText = '🍅';
      tomatoEl.style.position = 'absolute';
      tomatoEl.style.top = '0px';
      tomatoEl.style.left = '0px';
      tomatoEl.style.fontSize = '40px';
      tomatoEl.style.width = '50px';
      tomatoEl.style.height = '50px';
      tomatoEl.style.display = 'flex';
      tomatoEl.style.alignItems = 'center';
      tomatoEl.style.justifyContent = 'center';
      tomatoEl.style.userSelect = 'none';
      tomatoEl.style.pointerEvents = 'none'; // Prevent it from blocking clicks
      
      containerRef.current.appendChild(tomatoEl);

      // Link the DOM element to the physics body so the render loop can find it
      tomatoBody.plugin.domElement = tomatoEl;

      // Add it to the world
      Matter.World.add(engineRef.current.world, tomatoBody);
    }
    prevCountRef.current = count;
  }, [count]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-50" 
    />
  );
};

export default PhysicsTomatoes;
