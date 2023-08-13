import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { pointsInner, pointsOuter } from '../lib/utils';

const ParticleHero = () => {
  return (
    <div className="relative">
      <Canvas
        camera={{
          position: [3, -15, -3],
        }}
        style={{ height: '50vh' }}
        className="bg-black">
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
      <h2 className="absolute top-[5%] right-[2%] text-white font-medium text-6xl md:text-8xl pointer-events-none">
        You create,
      </h2>
      <h2 className="absolute top-[35%] right-[2%] text-white font-medium text-6xl md:text-8xl pointer-events-none">
        we supply.
      </h2>
      <p className="absolute bottom-[2%] right-[1%] text-gray-300 text-2xl md:text-lg sm:text-xs pointer-events-none">
        *Drag & Zoom
      </p>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.08, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={1}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleHero;
