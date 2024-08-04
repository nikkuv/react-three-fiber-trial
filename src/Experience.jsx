import { useEffect, useState } from "react";
import {
  Html,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );
  const iframeSrc =
    "https://social-media-dashboard-with-theme-switcher-jtynqwnvi.vercel.app";

  const [backgroundColor, setBackgroundColor] = useState("#F4F7FF");

  useEffect(() => {
    function handleModeChange(event) {
      
      if (event.origin === iframeSrc && event.data.type === "modeChange") {
        setBackgroundColor(event.data.isDarkMode ? "#1F212E" : "#F4F7FF");
      }
    }

    window.addEventListener("message", handleModeChange);

    return () => {
      window.removeEventListener("message", handleModeChange);
    };
  }, []);

  return (
    <>
      <Environment preset="sunset" />
      <color attach="background" args={[backgroundColor]} />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#F4F7FF"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <primitive object={computer.scene} position-y={[-1.5]}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src={iframeSrc}></iframe>
            </Html>
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={-1.4}
        opacity={0.4}
        width={10}
        height={10}
        scale={5}
        far={3}
      />
    </>
  );
}
