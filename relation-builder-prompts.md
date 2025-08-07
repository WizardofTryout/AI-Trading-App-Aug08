# Relation-Builder Development Prompts for AI-Powered IDEs

This file outlines the step-by-step prompts to be used in an AI-assisted development environment (such as GitHub Copilot, Gemini in JetBrains, or Windsurf) to develop the Relation-Builder module of the Trading Strategy App.

## 📌 Objective
Implement a **Relation-Builder** that allows users to visually create logical relations between indicators and operators using a drag-and-drop interface.

---

## 🧭 Step-by-Step Prompts

### Step 1: Setup Frontend Boilerplate
```prompt
Create a new React component named `RelationBuilder`. Use TailwindCSS for styling and Zustand for local state management. The component should be able to render a canvas or grid where draggable items can be positioned.
```

### Step 2: Define Data Models
```prompt
Create TypeScript interfaces for:
- `IndicatorNode` (id, name, type, value)
- `OperatorNode` (id, operation, inputs[])
- `RelationEdge` (sourceId, targetId)

Add a Zustand store to manage these nodes and their relations.
```

### Step 3: Drag-and-Drop Support
```prompt
Integrate `@dnd-kit/core` or `react-flow` to allow dragging nodes onto the canvas and connecting them via edges. The visual layout should update when connections are made.
```

### Step 4: Node Palette
```prompt
Create a sidebar palette with draggable indicator and operator templates. Users should be able to drag these into the canvas.
```

### Step 5: Visual Linking of Nodes
```prompt
Implement edge creation: When two nodes are visually connected, add a new `RelationEdge` to the store. Show the connection as a line.
```

### Step 6: Real-Time Logic Builder
```prompt
Whenever a change occurs in the graph, generate a JSON-based intermediate representation of the logical structure. This should include operator chaining and indicator references.
```

### Step 7: Evaluation Engine (Optional in Editor)
```prompt
Write a function that converts the relation graph (JSON) into a Pine Script strategy condition or a DSL-like string. This can later be exported for backtesting or execution.
```

### Step 8: UI Enhancements
```prompt
Add hover, delete, and rename functionality to nodes. Add zoom and pan to the canvas area. Optional: add undo/redo.
```

### Step 9: Export Functionality
```prompt
Add a button to export the current relation as:
- Pine Script fragment
- JSON
- Natural language explanation (optional, via GPT)
```

---

## ⚙️ Tech Stack
- React + TypeScript
- TailwindCSS
- Zustand (State)
- @dnd-kit/core or react-flow (Drag & Drop)
- GPT API or Gemini (optional for text generation)

---

## ✅ Success Criteria
- User can drag & drop indicators/operators into a canvas.
- Logical relations can be created by visually linking nodes.
- The system can export a valid strategy structure from these links.
- The editor remains reactive, stable, and extensible.

---

_Last updated: 2025-06-04 20:37:31_
