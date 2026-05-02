import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { RoundedBox, Text, Environment, OrbitControls } from "@react-three/drei";

type BlockData = {
  id: string;
  row: number;
  col: number;
  removed: boolean;
  revealed: boolean;
  trait?: string;
};

const TRAITS = [
  "Curious",
  "Creative",
  "Analytical",
  "Thoughtful",
  "Adaptable",
  "Organized",
  "Collaborative",
  "Warm",
  "Story-driven",
  "Resilient",
  "Ambitious",
  "Detail-oriented",
];

const BASE_LAYERS = 8;

const BLOCK_LENGTH = 1.8;
const BLOCK_WIDTH = 0.6;
const BLOCK_HEIGHT = 0.36;

const LAYER_GAP = 0.02;
const SIDE_GAP = 0.04;
const PULL_DISTANCE = 0.42;

function createInitialBlocks(): BlockData[] {
  const blocks: BlockData[] = [];
  for (let row = 0; row < BASE_LAYERS; row++) {
    for (let col = 0; col < 3; col++) {
      blocks.push({
        id: `r${row}b${col}`,
        row,
        col,
        removed: false,
        revealed: false,
      });
    }
  }
  return blocks;
}

function getLayerIndex(row: number, stackedIndex?: number) {
  return stackedIndex !== undefined ? BASE_LAYERS + Math.floor(stackedIndex / 3) : row;
}

function isRotatedLayer(layer: number) {
  return layer % 2 === 1;
}

function getBlockBasePosition(
  row: number,
  col: number,
  stackedIndex?: number
): [number, number, number] {
  const layer = getLayerIndex(row, stackedIndex);
  const rotated = isRotatedLayer(layer);
  const y = layer * (BLOCK_HEIGHT + LAYER_GAP);

  const lateralOffset = (col - 1) * (BLOCK_WIDTH + SIDE_GAP);

  if (!rotated) {
    return [0, y, lateralOffset];
  }

  return [lateralOffset, y, 0];
}

function getBlockRotation(
  row: number,
  stackedIndex?: number
): [number, number, number] {
  const layer = getLayerIndex(row, stackedIndex);
  const rotated = isRotatedLayer(layer);
  return [0, rotated ? Math.PI / 2 : 0, 0];
}

function getPulledPosition(
  block: BlockData,
  stackedIndex: number | undefined,
  isActive: boolean
): [number, number, number] {
  const base = getBlockBasePosition(block.row, block.col, stackedIndex);
  const layer = getLayerIndex(block.row, stackedIndex);
  const rotated = isRotatedLayer(layer);

  if (!isActive || stackedIndex !== undefined) return base;

  if (!rotated) {
    return [base[0] + PULL_DISTANCE, base[1], base[2]];
  }

  return [base[0], base[1], base[2] + PULL_DISTANCE];
}

function willTowerFall(nextBlocks: BlockData[]) {
  for (let row = 0; row < BASE_LAYERS; row++) {
    const remaining = nextBlocks.filter((b) => b.row === row && !b.removed);

    // New rule: if an entire layer is gone, the tower falls
    if (remaining.length === 0) {
      return true;
    }

    // Existing rule: if only one edge block remains, the tower falls
    if (remaining.length === 1) {
      const onlyBlock = remaining[0];
      if (onlyBlock.col === 0 || onlyBlock.col === 2) {
        return true;
      }
    }
  }

  return false;
}

function BlockMesh({
  block,
  stackedIndex,
  isActive,
  disabled,
  onSelect,
}: {
  block: BlockData;
  stackedIndex?: number;
  isActive: boolean;
  disabled: boolean;
  onSelect: (id: string) => void;
}) {
  const position = getPulledPosition(block, stackedIndex, isActive);
  const rotation = getBlockRotation(block.row, stackedIndex);

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onSelect(block.id);
      }}
    >
      <RoundedBox
        args={[BLOCK_LENGTH, BLOCK_HEIGHT, BLOCK_WIDTH]}
        radius={0.05}
        smoothness={5}
      >
        <meshStandardMaterial
          color={isActive ? "#e79ad0" : block.revealed ? "#d9b7ea" : "#efece4"}
          metalness={0.08}
          roughness={0.42}
        />
      </RoundedBox>

      {isActive && !disabled && (
        <RoundedBox
          args={[BLOCK_LENGTH + 0.04, BLOCK_HEIGHT + 0.04, BLOCK_WIDTH + 0.04]}
          radius={0.05}
          smoothness={5}
        >
          <meshStandardMaterial
            color="#ff69b4"
            transparent
            opacity={0.14}
            emissive="#ff69b4"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
      )}
    </group>
  );
}

function ActiveTraitLabel({
  activeBlock,
}: {
  activeBlock: BlockData | null;
}) {
  if (!activeBlock || !activeBlock.revealed || !activeBlock.trait) return null;

  return (
    <group position={[2.2, 2.15, 0]}>
      <RoundedBox args={[1.9, 0.42, 0.08]} radius={0.06} smoothness={5}>
        <meshStandardMaterial color="#d14f98" />
      </RoundedBox>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.17}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.55}
      >
        {activeBlock.trait}
      </Text>
    </group>
  );
}

function JengaScene({
  blocks,
  activeId,
  stackedIds,
  hasFallen,
  onSelect,
}: {
  blocks: BlockData[];
  activeId: string | null;
  stackedIds: string[];
  hasFallen: boolean;
  onSelect: (id: string) => void;
}) {
  const stackedMap = new Map(stackedIds.map((id, i) => [id, i]));
  const activeBlock = blocks.find((b) => b.id === activeId) ?? null;

  const towerRotation: [number, number, number] = hasFallen
    ? [0, 0, -0.48]
    : [0, 0, 0];

  const towerPosition: [number, number, number] = hasFallen
    ? [0.55, -1.42, 0]
    : [0, -1.2, 0];

  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} />
      <directionalLight position={[-5, 5, -4]} intensity={0.25} />
      <directionalLight position={[0, 7, 0]} intensity={0.35} />

      <group position={towerPosition} rotation={towerRotation}>
        {blocks
          .filter((b) => !b.removed || stackedMap.has(b.id))
          .map((block) => (
            <BlockMesh
              key={block.id}
              block={block}
              stackedIndex={stackedMap.get(block.id)}
              isActive={activeId === block.id}
              disabled={hasFallen}
              onSelect={onSelect}
            />
          ))}
      </group>

      <ActiveTraitLabel activeBlock={activeBlock} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.38, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#1b0b15" />
      </mesh>

      <Environment preset="studio" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export default function JengaHero3D() {
  const [blocks, setBlocks] = useState<BlockData[]>(createInitialBlocks());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [traitIndex, setTraitIndex] = useState(0);
  const [stackedIds, setStackedIds] = useState<string[]>([]);
  const [hasFallen, setHasFallen] = useState(false);

  const activeBlock = blocks.find((b) => b.id === activeId) ?? null;

  const revealedTraits = useMemo(() => {
    return blocks
      .map((b) => b.trait)
      .filter((t): t is string => Boolean(t));
  }, [blocks]);

  function handleSelect(id: string) {
    if (hasFallen) return;

    let shouldAdvanceTrait = false;

    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) {
          return { ...block, revealed: false };
        }

        if (!block.trait) {
          shouldAdvanceTrait = true;
          return {
            ...block,
            trait: TRAITS[traitIndex % TRAITS.length],
            revealed: true,
          };
        }

        return {
          ...block,
          revealed: true,
        };
      })
    );

    if (shouldAdvanceTrait) {
      setTraitIndex((prev) => prev + 1);
    }

    setActiveId(id);
  }

  function handleFlipBack() {
    if (!activeId || hasFallen) return;

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === activeId ? { ...block, revealed: false } : block
      )
    );

    setActiveId(null);
  }

  function handleStack() {
    if (!activeId || hasFallen) return;

    let nextBlocks: BlockData[] = [];

    setBlocks((prev) => {
      nextBlocks = prev.map((block) =>
        block.id === activeId
          ? { ...block, removed: true, revealed: false }
          : block
      );
      return nextBlocks;
    });

    setStackedIds((prev) => [...prev, activeId]);
    setActiveId(null);

    setTimeout(() => {
      if (willTowerFall(nextBlocks)) {
        setHasFallen(true);
      }
    }, 0);
  }

  function handleReset() {
    setBlocks(createInitialBlocks());
    setActiveId(null);
    setTraitIndex(0);
    setStackedIds([]);
    setHasFallen(false);
  }

  return (
    <section id="home" className="jenga-section">
      <div className="jenga-copy">
        <p className="eyebrow">A LITTLE FUN WAY TO GET TO KNOW ME!!!</p>
        <h1 className="jenga-title">JENGA TIME!</h1>
        <p className="subtext">
          Get to know me by playing a quick game of Jenga! Click on a block to reveal a trait about me. But be careful - if you take out the wrong block, the tower might fall!
        </p>

        <div className="controls">
          <button onClick={handleFlipBack} disabled={!activeId || hasFallen}>
            Flip back
          </button>
          <button onClick={handleStack} disabled={!activeId || hasFallen}>
            Stack on top
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>

        <div className="traits-progress">
          <p className="traits-label">Traits revealed:</p>
          <div className="traits-list">
            {revealedTraits.map((trait, i) => (
              <span key={`${trait}-${i}`} className="trait-chip">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {activeBlock?.revealed && activeBlock.trait && !hasFallen && (
          <p className="active-trait-readout">
            Current block: <strong>{activeBlock.trait}</strong>
          </p>
        )}

        {hasFallen && (
          <p className="tower-fallen-message">
            The tower fell... &#128517; hit reset to play again.
          </p>
        )}

      </div>

      <div className="tower-3d-wrap">
        <Canvas orthographic camera={{ position: [7, 6.5, 7], zoom: 100 }}>
          <JengaScene
            blocks={blocks}
            activeId={activeId}
            stackedIds={stackedIds}
            hasFallen={hasFallen}
            onSelect={handleSelect}
          />
        </Canvas>
      </div>
    </section>
  );
}