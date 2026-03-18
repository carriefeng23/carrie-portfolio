type BlockType = {
  id: number;
  level: number;
  index: number;
  position: [number, number, number];
  rotation: number;
  state: string;
  trait: string | null;
  targetPosition?: [number, number, number];
};

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { traits } from "../data/trait.ts";

const BLOCK = {
  length: 3,
  height: 0.4,
  depth: 1,
  gap: 0.05,
};

const LEVELS = 10;

function createTower() {
  const blocks = [];
  let id = 0;

  for (let level = 0; level < LEVELS; level++) {
    const isRotated = level % 2 === 1;

    for (let i = 0; i < 3; i++) {
      blocks.push({
        id: id++,
        level,
        index: i,
        position: [
          isRotated ? 0 : (i - 1) * (BLOCK.depth + BLOCK.gap),
          level * (BLOCK.height + 0.02),
          isRotated ? (i - 1) * (BLOCK.depth + BLOCK.gap) : 0,
        ] as [number, number, number],
        rotation: isRotated ? Math.PI / 2 : 0,
        state: "idle", // idle | active | moving | stacked
        trait: null as string | null,
      });
    }
  }

  return blocks;
}

function Block({
  data,
  onClick,
  isActive,
}: {
  data: BlockType;
  onClick: () => void;
  isActive: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;

    // Smooth animation
    ref.current.position.lerp(
      new THREE.Vector3(...data.targetPosition),
      0.1
    );
  });

  return (
    <group
      position={data.position}
      rotation={[0, data.rotation, 0]}
    >
      <RoundedBox
        ref={ref}
        args={[BLOCK.length, BLOCK.height, BLOCK.depth]}
        radius={0.04}
        smoothness={4}
        onClick={isActive ? onClick : undefined}
      >
        <meshStandardMaterial
          color={data.trait ? "#e6d27a" : "#e5d1a8"}
        />
      </RoundedBox>

      {data.trait && (
        <Text
          position={[0, BLOCK.height / 2 + 0.05, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.18}
          color="black"
        >
          {data.trait}
        </Text>
      )}
    </group>
  );
}

function Scene() {
  const [blocks, setBlocks] = useState<BlockType[]>(createTower());
  const [current, setCurrent] = useState(0);
  const [stackHeight, setStackHeight] = useState(LEVELS);

  function handleClick(blockId: number) {
    const trait = traits[current % traits.length];

    // STEP 1: slide out
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              targetPosition: [
                b.position[0] + 2,
                b.position[1],
                b.position[2],
              ],
              state: "moving",
              trait,
            }
          : b
      )
    );

    // STEP 2: stack on top
    setTimeout(() => {
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === blockId
            ? {
                ...b,
                targetPosition: [
                  (current % 3 - 1) * (BLOCK.depth + BLOCK.gap),
                  stackHeight * (BLOCK.height + 0.02),
                  0,
                ],
              }
            : b
        )
      );

      setStackHeight((h) => h + 1);
      setCurrent((c) => c + 1);
    }, 800);
  }

  const activeBlock = blocks[current];

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0b1c2c" />
      </mesh>

      {blocks.map((b, i) => (
        <Block
          key={b.id}
          data={{
            ...b,
            targetPosition: b.targetPosition || b.position,
          }}
          isActive={b.id === activeBlock?.id}
          onClick={() => handleClick(b.id)}
        />
      ))}

      <Text position={[0, 5, -5]} fontSize={0.4}>
        Pull a block to get to know me
      </Text>
    </>
  );
}

export default function JengaIntro() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [6, 5, 10], fov: 30 }}>
        <Scene />
      </Canvas>
    </div>
  );
}