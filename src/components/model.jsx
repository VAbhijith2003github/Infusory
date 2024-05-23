import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import model from "../files/House.glb";
import carmodel from "../files/model1/source/camaro.glb"

function Model() {
  const gltf = useLoader(GLTFLoader, carmodel);
  const ref = useRef();

  return <primitive ref={ref} object={gltf.scene} scale={1} />;
}

export default Model;
