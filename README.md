# PISPY

A dual-mode web-based IDE for **Python** and **Web Development** (HTML/CSS/JS) with live preview and persistent code storage.

## Features

**Two Powerful Modes:**
- **HTML/CSS/JS Mode** – Write web code with live preview in the browser
- **Python Mode** – Execute Python code directly in your browser using Pyodide with canvas drawing support

**Live Preview** – See your HTML/CSS/JS changes instantly

**Auto-Save** – Code is automatically saved to browser localStorage and restored on page refresh

**Canvas Drawing** – Full Python canvas API support for graphics and visualizations

**Zero Setup** – No installation required; runs entirely in the browser

## How to Use

1. **Open `index.html`** in any modern web browser
2. **Toggle Modes:**
   - Click **"HTML / CSS / JS"** to write web code with live preview
   - Click **"Python (Canvas)"** to write and execute Python code

### Web Mode
- Edit HTML, CSS, and JavaScript in separate panels
- See changes update in real-time in the preview pane
- Your code persists across page refreshes

### Python Mode
- Write Python code using the full Python syntax
- Click **"Run Code ▶"** to execute
- Output appears in the Console section
- Draw on canvas using the `canvas` API (via `js.document.getElementById()`)

## Technical Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Python Runtime:** [Pyodide](https://pyodide.org/) v0.25.0
- **Fonts:** Google Fonts (Lexend)
- **Storage:** Browser localStorage

## Browser Requirements

- Modern browser with support for:
  - ES6+ JavaScript
  - Web Workers (for Pyodide)
  - localStorage
  - Canvas API

## Example: Drawing with Python

```python
import js

canvas = js.document.getElementById('py-canvas')
ctx = canvas.getContext('2d')

# Draw shapes
ctx.fillStyle = 'blue'
ctx.fillRect(50, 50, 100, 100)

ctx.beginPath()
ctx.arc(200, 100, 40, 0, 6.28)
ctx.fillStyle = 'red'
ctx.fill()

print("Drawing complete!")
```

## Features in Detail

### Code Persistence
All your code automatically saves to localStorage as you type. Close and reopen the browser—your work is still there.

### Live Preview
The HTML/CSS/JS preview updates instantly as you type, showing exactly how your web page will look.

### Python Canvas API
Full access to the browser's canvas drawing API through Python, perfect for:
- Data visualizations
- Graphics and animations
- Educational coding
- Creative projects

## License

Open source and free to use.

---

**Start coding now:** Open `index.html` in your browser and begin exploring!
