"use client";

import { useState, useEffect } from "react";
import GridLayout, { LayoutItem, WidthProvider } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);

export default function CSSGridGenerator() {
  const [cols, setCols] = useState(5);
  const [gap, setGap] = useState(8);
  const [cardType, setCardType] = useState<"square" | "rectangle" | "custom">("square");
  const [isMobile, setIsMobile] = useState(false);
  const [layout, setLayout] = useState<LayoutItem[]>(
    Array.from({ length: 9 }, (_, index) => ({
      i: String(index + 1),
      x: index % 5,
      y: Math.floor(index / 5),
      w: 1,
      h: 1,
    }))
  );

  // Check for mobile view with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const addItem = () => {
    const newItem: LayoutItem = {
      i: String(layout.length + 1),
      x: 0,
      y: Infinity,
      w: cardType === "square" ? 1 : cardType === "rectangle" ? 2 : 1,
      h: cardType === "square" ? 1 : cardType === "rectangle" ? 1 : 2,
    };
    setLayout((prev) => [...prev, newItem]);
  };

  const isOverlap = (a: LayoutItem, b: LayoutItem) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  const handleMerge = (currentLayout: LayoutItem[]) => {
    const mergedLayout = [...currentLayout];

    for (let i = 0; i < mergedLayout.length; i++) {
      for (let j = i + 1; j < mergedLayout.length; j++) {
        const a = mergedLayout[i];
        const b = mergedLayout[j];

        if (isOverlap(a, b)) {
          mergedLayout[i] = {
            x: Math.min(a.x, b.x),
            y: Math.min(a.y, b.y),
            w: Math.max(a.x + a.w, b.x + b.w) - Math.min(a.x, b.x),
            h: Math.max(a.y + a.h, b.y + b.h) - Math.min(a.y, b.y),
            i: a.i,
          };
          mergedLayout.splice(j, 1);
          j--;
        }
      }
    }

    setLayout(mergedLayout);
  };

  const generateCSS = () => `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  gap: ${gap}px;
  padding: ${gap}px;
}
${layout
  .map(
    (item) => `
.item-${item.i} {
  grid-column: ${item.x + 1} / span ${item.w};
  grid-row: ${item.y + 1} / span ${item.h};
  min-height: 60px;
}`
  )
  .join("\n")}
`;

  const generateHTML = () => `
<div class="grid-container">
${layout.map((item) => `  <div class="item-${item.i}">Item ${item.i}</div>`).join("\n")}
</div>
`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied ✅");
  };

  const resetGrid = () => {
    setLayout([
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 1, y: 0, w: 1, h: 1 },
      { i: "3", x: 2, y: 0, w: 1, h: 1 },
    ]);
  };

  /* ---------- STYLES ---------- */
  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
    padding: isMobile ? "16px" : "24px",
    border: "1px solid #e2e8f0",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "14px",
    fontWeight: 500,
    color: "#1e293b",
    background: "#f8fafc",
    transition: "all 0.2s",
  };

  const primaryBtn: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "12px 16px" : "14px 20px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: 600,
    fontSize: isMobile ? "13px" : "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 10px rgba(79, 70, 229, 0.3)",
  };

  const secondaryBtn: React.CSSProperties = {
    width: "100%",
    padding: isMobile ? "12px 16px" : "14px 20px",
    borderRadius: "12px",
    border: "2px solid #e0e7ff",
    background: "transparent",
    color: "#4f46e5",
    fontWeight: 600,
    fontSize: isMobile ? "13px" : "14px",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  const codeBlock: React.CSSProperties = {
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "16px",
    borderRadius: "12px",
    fontSize: isMobile ? "12px" : "13px",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
  };

  const panelHeader: React.CSSProperties = {
    fontSize: isMobile ? "16px" : "18px",
    fontWeight: 700,
    marginBottom: "16px",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const cardTypeStyle = (type: string): React.CSSProperties => ({
    padding: isMobile ? "10px 12px" : "12px 16px",
    borderRadius: "12px",
    border: `2px solid ${cardType === type ? "#4f46e5" : "#e2e8f0"}`,
    background: cardType === type ? "#eef2ff" : "#fff",
    color: cardType === type ? "#4f46e5" : "#64748b",
    fontWeight: 600,
    fontSize: isMobile ? "12px" : "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center" as const,
    flex: 1,
  });

  const adStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center" as const,
    color: "#475569",
    fontWeight: 600,
    border: "2px dashed #cbd5e1",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: isMobile ? "0 10px" : "0",
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f4f6fb, #e0e7ff)",
          fontFamily: "'Inter', system-ui, sans-serif",
          padding: "0",
          overflowX: "hidden",
        }}
      >
        {/* TOP AD SPACE - Mobile Only */}
        <div style={{ ...adStyle, margin: "10px", minHeight: "60px", fontSize: "14px" }}>
          📱 Mobile Ad Space - Top
        </div>

        <div
          style={{
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "100vw",
            overflowX: "hidden",
          }}
        >
          {/* SETTINGS PANEL */}
          <div style={cardStyle}>
            <div style={panelHeader}>⚙️ Grid Settings</div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#475569" }}>
                Columns: <span style={{ color: "#4f46e5" }}>{cols}</span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                style={{ width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#475569" }}>
                Gap Size: <span style={{ color: "#4f46e5" }}>{gap}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={4}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                style={{ width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                <span>0px</span>
                <span>8px</span>
                <span>12px</span>
                <span>16px</span>
                <span>20px</span>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#475569" }}>
                Card Type
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setCardType("square")} style={cardTypeStyle("square")}>
                  Square
                </button>
                <button onClick={() => setCardType("rectangle")} style={cardTypeStyle("rectangle")}>
                  Rectangle
                </button>
                <button onClick={() => setCardType("custom")} style={cardTypeStyle("custom")}>
                  Custom
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <button 
                style={primaryBtn} 
                onClick={addItem}
                onTouchStart={(e) => e.currentTarget.style.transform = "scale(0.98)"}
                onTouchEnd={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                ➕ Add Card
              </button>
              <button 
                style={secondaryBtn}
                onClick={() => handleMerge(layout)}
                onTouchStart={(e) => e.currentTarget.style.background = "#f1f5f9"}
                onTouchEnd={(e) => e.currentTarget.style.background = "transparent"}
              >
                🧩 Merge
              </button>
            </div>

            <button 
              style={secondaryBtn} 
              onClick={resetGrid}
              onTouchStart={(e) => e.currentTarget.style.background = "#f1f5f9"}
              onTouchEnd={(e) => e.currentTarget.style.background = "transparent"}
            >
              🔄 Reset Grid
            </button>
          </div>

          {/* GRID CANVAS */}
          <div style={cardStyle}>
            <div style={panelHeader}>🧩 Grid Canvas</div>
            <div style={{ 
              overflowX: "auto", 
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y"
            }}>
              <div style={{ 
                minWidth: cols * 70,
                minHeight: "400px",
                position: "relative"
              }}>
                <ResponsiveGridLayout
                  layout={layout}
                  cols={cols}
                  rowHeight={60}
                  margin={[gap, gap]}
                  isResizable={!isMobile}
                  isDraggable={true}
                  draggableHandle=".drag-handle"
                  containerPadding={[0, 0]}
                  onDragStop={() => handleMerge(layout)}
                  onLayoutChange={(newLayout) => setLayout(newLayout as LayoutItem[])}
                  useCSSTransforms={true}
                  preventCollision={true}
                  compactType={null}
                  style={{
                    minHeight: "400px",
                  }}
                >
                  {layout.map((item) => (
                    <div
                      key={item.i}
                      style={{
                        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        color: "#fff",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                        fontSize: "14px",
                        position: "relative",
                        overflow: "hidden",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                    >
                      <div className="drag-handle" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        cursor: isMobile ? "grab" : "move",
                      }}></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          fontSize: "10px",
                          background: "rgba(255,255,255,0.2)",
                          padding: "2px 6px",
                          borderRadius: "8px",
                          pointerEvents: "none",
                        }}
                      >
                        {item.w}x{item.h}
                      </div>
                      <div style={{ 
                        textAlign: "center", 
                        pointerEvents: "none",
                        padding: "8px"
                      }}>
                        Item {item.i}
                      </div>
                    </div>
                  ))}
                </ResponsiveGridLayout>
              </div>
            </div>
            <div style={{ 
              fontSize: "12px", 
              color: "#64748b", 
              marginTop: "12px",
              textAlign: "center"
            }}>
              👆 Drag to move | 📱 Pinch to scroll
            </div>
          </div>

          {/* CODE SECTION */}
          <div style={cardStyle}>
            <div style={panelHeader}>📄 Generated Code</div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  style={{ ...primaryBtn, flex: 1 }}
                  onClick={() => copy(generateCSS())}
                  onTouchStart={(e) => e.currentTarget.style.transform = "scale(0.98)"}
                  onTouchEnd={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  📋 Copy CSS
                </button>
                <button 
                  style={{ 
                    ...primaryBtn, 
                    flex: 1, 
                    background: "linear-gradient(135deg, #10b981, #059669)",
                  }}
                  onClick={() => copy(generateHTML())}
                  onTouchStart={(e) => e.currentTarget.style.transform = "scale(0.98)"}
                  onTouchEnd={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  📋 Copy HTML
                </button>
              </div>
            </div>
            
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>
                HTML Preview
              </div>
              <pre style={codeBlock}>{generateHTML()}</pre>
            </div>
            
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>
                CSS Preview
              </div>
              <pre style={codeBlock}>{generateCSS()}</pre>
            </div>
          </div>
        </div>

        {/* BOTTOM AD SPACE - Mobile Only */}
        <div style={{ ...adStyle, margin: "10px", minHeight: "60px", fontSize: "14px" }}>
          📱 Mobile Ad Space - Bottom
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f6fb, #e0e7ff)",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* LEFT AD SPACE - Desktop Only */}
      <div style={{ 
        width: "180px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "flex-start",
        paddingTop: "20px"
      }}>
        <div style={{...adStyle, minHeight: "400px", width: "160px" }}>
          🖥️ Desktop Ad - Left
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          overflowY: "auto",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HEADER AND SETTINGS */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ ...cardStyle, flex: 1, minWidth: "300px" }}>
            <div style={panelHeader}>🎨 CSS Grid Generator</div>
            <div style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>
              Create responsive grid layouts visually. Drag, resize, and merge items to generate perfect CSS Grid code.
            </div>
          </div>

          <div style={{ ...cardStyle, width: "320px", minWidth: "280px" }}>
            <div style={panelHeader}>⚙️ Settings</div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px", color: "#475569" }}>
                Card Type
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setCardType("square")} style={cardTypeStyle("square")}>
                  Square
                </button>
                <button onClick={() => setCardType("rectangle")} style={cardTypeStyle("rectangle")}>
                  Rectangle
                </button>
                <button onClick={() => setCardType("custom")} style={cardTypeStyle("custom")}>
                  Custom
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#475569" }}>
                Columns: <span style={{ color: "#4f46e5" }}>{cols}</span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                style={{ width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10</span>
                <span>12</span>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#475569" }}>
                Gap: <span style={{ color: "#4f46e5" }}>{gap}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={32}
                step={4}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                style={{ width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                <span>0px</span>
                <span>8px</span>
                <span>16px</span>
                <span>24px</span>
                <span>32px</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                style={primaryBtn}
                onClick={addItem}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                ➕ Add Card
              </button>
              <button 
                style={secondaryBtn}
                onClick={resetGrid}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* GRID CANVAS */}
        <div style={{ ...cardStyle, minHeight: "500px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div style={panelHeader}>🧩 Grid Canvas</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                style={secondaryBtn}
                onClick={() => handleMerge(layout)}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                🧩 Merge Overlapping
              </button>
            </div>
          </div>

          <ResponsiveGridLayout
            layout={layout}
            cols={cols}
            rowHeight={80}
            margin={[gap, gap]}
            isResizable={true}
            isDraggable={true}
            draggableHandle=".drag-handle"
            onDragStop={() => handleMerge(layout)}
            onLayoutChange={(newLayout) => setLayout(newLayout as LayoutItem[])}
            useCSSTransforms={true}
            preventCollision={true}
            style={{
              minHeight: Math.max(400, Math.ceil(layout.length / cols) * 80 + gap * (layout.length / cols)),
            }}
          >
            {layout.map((item) => (
              <div
                key={item.i}
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
                  fontSize: "16px",
                  position: "relative",
                  overflow: "hidden",
                  userSelect: "none",
                }}
              >
                <div className="drag-handle" style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  cursor: "move",
                }}></div>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "11px",
                    background: "rgba(255,255,255,0.2)",
                    padding: "3px 8px",
                    borderRadius: "10px",
                    pointerEvents: "none",
                  }}
                >
                  {item.w}x{item.h}
                </div>
                <div style={{ textAlign: "center", pointerEvents: "none" }}>
                  <div style={{ fontSize: "20px", fontWeight: 700 }}>Item {item.i}</div>
                  <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>
                    {item.w}×{item.h} grid
                  </div>
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
          <div style={{ 
            fontSize: "13px", 
            color: "#64748b", 
            marginTop: "16px",
            textAlign: "center"
          }}>
            👆 Drag to move | ↔️ Drag edges to resize
          </div>
        </div>

        {/* CODE GENERATOR */}
        <div style={{ display: "flex", gap: "20px", height: "400px", flexWrap: "wrap" }}>
          <div style={{ ...cardStyle, flex: 1, display: "flex", flexDirection: "column", minWidth: "300px" }}>
            <div style={{ ...panelHeader, justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
              <span>📄 Generated Code</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button 
                  style={{ ...primaryBtn, padding: "10px 20px", width: "auto" }}
                  onClick={() => copy(generateCSS())}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  📋 Copy CSS
                </button>
                <button 
                  style={{ 
                    ...primaryBtn, 
                    padding: "10px 20px", 
                    width: "auto", 
                    background: "linear-gradient(135deg, #10b981, #059669)" 
                  }}
                  onClick={() => copy(generateHTML())}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  📋 Copy HTML
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flex: 1, gap: "20px", overflow: "hidden", flexWrap: "wrap" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: "300px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px", color: "#475569" }}>
                  HTML
                </div>
                <pre style={{ ...codeBlock, flex: 1, overflow: "auto" }}>{generateHTML()}</pre>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: "300px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px", color: "#475569" }}>
                  CSS
                </div>
                <pre style={{ ...codeBlock, flex: 1, overflow: "auto" }}>{generateCSS()}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT AD SPACE - Desktop Only */}
      <div style={{ 
        width: "180px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "flex-start",
        paddingTop: "20px"
      }}>
        <div style={{...adStyle, minHeight: "400px", width: "160px" }}>
          🖥️ Desktop Ad - Right
        </div>
      </div>
    </div>
  );
}