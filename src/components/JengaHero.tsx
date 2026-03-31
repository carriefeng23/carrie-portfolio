import React, { useMemo, useState } from "react";

type Block = {
  id: string;
  trait?: string;
  revealed: boolean;
  removed: boolean;
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

function makeRow(rowNum: number): Block[] {
  return [1, 2, 3].map((n) => ({
    id: `r${rowNum}b${n}`,
    revealed: false,
    removed: false,
  }));
}

const INITIAL_ROWS: Block[][] = [
  makeRow(1),
  makeRow(2),
  makeRow(3),
  makeRow(4),
  makeRow(5),
  makeRow(6),
];

export default function JengaHero() {
  const [rows, setRows] = useState<Block[][]>(INITIAL_ROWS);
  const [stackedBlocks, setStackedBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [traitIndex, setTraitIndex] = useState(0);

  const revealedTraits = useMemo(() => {
    return [...rows.flat(), ...stackedBlocks]
      .map((b) => b.trait)
      .filter((t): t is string => Boolean(t));
  }, [rows, stackedBlocks]);

  function selectBlock(blockId: string) {
    setActiveId(blockId);
  }

  function revealBlock() {
    if (!activeId) return;

    let usedNewTrait = false;

    setRows((prev) =>
      prev.map((row) =>
        row.map((block) => {
          if (block.id !== activeId) return block;

          if (!block.trait) {
            usedNewTrait = true;
            return {
              ...block,
              trait: TRAITS[traitIndex % TRAITS.length],
              revealed: true,
            };
          }

          return {
            ...block,
            revealed: !block.revealed,
          };
        })
      )
    );

    if (usedNewTrait) {
      setTraitIndex((prev) => prev + 1);
    }
  }

  function flipBack() {
    if (!activeId) return;

    setRows((prev) =>
      prev.map((row) =>
        row.map((block) =>
          block.id === activeId ? { ...block, revealed: false } : block
        )
      )
    );
  }

  function stackOnTop() {
    if (!activeId) return;

    let movedBlock: Block | null = null;

    setRows((prev) =>
      prev.map((row) =>
        row.map((block) => {
          if (block.id !== activeId) return block;
          movedBlock = { ...block, removed: true, revealed: false };
          return { ...block, removed: true, revealed: false };
        })
      )
    );

    if (movedBlock) {
      setStackedBlocks((prev) => [...prev, movedBlock as Block]);
    }

    setActiveId(null);
  }

  return (
    <section id="home" className="jenga-section">
      <div className="jenga-copy">
        <p className="eyebrow">INTERACTIVE INTRO</p>
        <h1 className="jenga-title">Let’s play Jenga</h1>
        <p className="subtext">
          Pick any block. Each one reveals a little more about me.
        </p>

        <div className="controls">
          <button onClick={revealBlock} disabled={!activeId}>
            Reveal trait
          </button>
          <button onClick={flipBack} disabled={!activeId}>
            Flip back
          </button>
          <button onClick={stackOnTop} disabled={!activeId}>
            Stack on top
          </button>
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

        <a href="#about" className="scroll-link">
          Scroll to explore ↓
        </a>
      </div>

      <div className="tower-stage">
        <div className="stack-tray">
          {stackedBlocks.map((block, i) => (
            <div
              key={`${block.id}-${i}`}
              className={`tray-block ${i % 2 === 0 ? "h" : "v"}`}
            />
          ))}
        </div>

        <div className="tower">
          {rows.map((row, rowIndex) => {
            const orientation = rowIndex % 2 === 0 ? "horizontal" : "vertical";

            return (
              <div
                key={`row-${rowIndex}`}
                className={`tower-row ${orientation}`}
              >
                {row.map((block) => {
                  if (block.removed) {
                    return (
                      <div
                        key={block.id}
                        className={`block-slot ${orientation}`}
                      />
                    );
                  }

                  const isActive = activeId === block.id;

                  return (
                    <button
                      key={block.id}
                      type="button"
                      className={`jenga-block ${orientation} ${
                        isActive ? "pulled" : ""
                      } ${block.revealed ? "revealed" : ""}`}
                      onClick={() => selectBlock(block.id)}
                    >
                      <span className="block-face block-front" />
                      <span className="block-face block-back">
                        {block.trait || ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}