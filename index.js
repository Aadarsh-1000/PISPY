// --- MODE SWITCHING ---
    function switchMode(mode) {
        const webEditors = document.getElementById('web-editors');
        const pyEditor = document.getElementById('python-editor-container');
        const webFrame = document.getElementById('web-frame');
        const pyPreview = document.getElementById('python-preview');
        const btnWeb = document.getElementById('btn-web');
        const btnPy = document.getElementById('btn-python');

        if (mode === 'web') {
            webEditors.style.display = 'flex';
            pyEditor.style.display = 'none';
            webFrame.style.display = 'block';
            pyPreview.style.display = 'none';
            btnWeb.classList.add('active');
            btnPy.classList.remove('active');
            updateWebPreview(); // Refresh web view
        } else {
            webEditors.style.display = 'none';
            pyEditor.style.display = 'flex';
            webFrame.style.display = 'none';
            pyPreview.style.display = 'flex';
            btnWeb.classList.remove('active');
            btnPy.classList.add('active');
            initPyodide(); // Load Python if not loaded
        }
    }

    // --- WEB COMPILER LOGIC ---
    function updateWebPreview() {
        const html = document.getElementById('html-code').value;
        const css = `<style>${document.getElementById('css-code').value}</style>`;
        const js = `<script>${document.getElementById('js-code').value}<\/script>`;
        
        const frame = document.getElementById('web-frame');
        const doc = frame.contentDocument || frame.contentWindow.document;
        
        doc.open();
        doc.write(html + css + js);
        doc.close();
    }

    // --- PYTHON COMPILER LOGIC (Pyodide) ---
    let pyodide = null;
    const outputDiv = document.getElementById('console-output');
    const loadingBadge = document.getElementById('loading');

    async function initPyodide() {
        if (pyodide) return; // Already loaded

        loadingBadge.style.display = 'block';
        outputDiv.innerText = "Initializing Python environment...\n";

        try {
            pyodide = await loadPyodide();
            
            // Redirect Python print() to our HTML console div
            pyodide.setStdout({
                batched: (msg) => {
                    outputDiv.innerText += msg + "\n";
                    outputDiv.scrollTop = outputDiv.scrollHeight;
                }
            });

            outputDiv.innerText += "Python Loaded! Click 'Run Code'.\n";
        } catch (err) {
            outputDiv.innerText += "Error loading Python: " + err;
        } finally {
            loadingBadge.style.display = 'none';
        }
    }

    async function runPython() {
        if (!pyodide) {
            alert("Python is still loading, please wait...");
            return;
        }

        const code = document.getElementById('python-code').value;
        outputDiv.innerText = ">>> Running...\n";

        try {
            await pyodide.runPythonAsync(code);
        } catch (err) {
            outputDiv.innerText += "Error: " + err;
        }
    }

    // Initialize default view
    updateWebPreview();