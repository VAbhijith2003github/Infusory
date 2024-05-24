import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrbitControls, Sky, Plane } from "@react-three/drei";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDB } from "../../firebase-config";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Sidebar from "../../components/sidebar";

function CameraControls() {
  const { camera } = useThree();
  camera.position.set(8, 2, 10);
  return <OrbitControls />;
}

function Model({ modelUrl }) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const modelRef = useRef();

  return <primitive ref={modelRef} object={gltf.scene} scale={1} />;
}

const View = () => {
  const { modelname } = useParams();
  const [modelUrl, setModelUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModelUrl = async () => {
      try {
        const modelRef = ref(imageDB, `glb-files/${modelname}`);
        const url = await getDownloadURL(modelRef);
        setModelUrl(url);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching model URL:", err);
      }
    };

    fetchModelUrl();
  }, [modelname]);

  return (
    <>
      <Sidebar />
      <div className="displaydiv">
        {error && <p>Error loading model: {error}</p>}
        {modelUrl && (
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
            <Model modelUrl={modelUrl} position={[0, 0, 0]} />
            <CameraControls />
          </Canvas>
        )}
        <div className="infodiv">
          <ul>DRAG CURSOR OVER IMAGE TO ROTATE</ul>
          <ul>DRAG CURSOR HOLDING RMB OVER IMAGE TO MOVE LEFT OR RIGHT</ul>
          <ul>SCROLL TO ZOOM IN OR OUT</ul>
        </div>
      </div>
    </>
  );
};

export default View;
