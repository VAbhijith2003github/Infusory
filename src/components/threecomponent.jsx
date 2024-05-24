import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Plane } from "@react-three/drei";
import Model from "./model";

function CameraControls() {
  const { camera } = useThree();
  camera.position.set(8, 2, 10);
  return <OrbitControls />;
}

function ThreeComponent() {
  return (
    <div className="displaydiv">
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight intensity={4} position={[5, 10, 5]} />
        <directionalLight intensity={4} position={[-10, 5, -5]} />
        <Sky sunPosition={[100, 100, 100]} />
        <Plane
          args={[100, 100]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2.0, 0]}
        >
          <meshStandardMaterial attach="material" color="black" />
        </Plane>
        <Model position={[0, 0, 0]} />
        <CameraControls />
      </Canvas>
        <div className="infodiv">
        <ul>DRAG CURSOR OVER IMAGE TO ROTATE</ul>
        <ul>DRAG CURSOR HOLDING RMB OVER IMAGE TO MOVE LEFT OR RIGHT</ul>
        <ul>SCROLL TO ZOOM IN OR OUT</ul>
      </div>
    </div>
  );
}

export default ThreeComponent;
