let pyodide = null;

const webEditors = document.getElementById("web-editors");
const pyEditor = document.getElementById("python-editor-container");
const webFrame = document.getElementById("web-frame");
const pyPreview = document.getElementById("python-preview");
const btnWeb = document.getElementById("btn-web");
const btnPy = document.getElementById("btn-python");
const output = document.getElementById("console-output");
const loading = document.getElementById("loading");

btnWeb.onclick = () => switchMode("web");
btnPy.onclick = () => switchMode("python");

function switchMode(mode) {
  const web = mode === "web";

  webEditors.style.display = web ? "flex" : "none";
  pyEditor.style.display = web ? "none" : "flex";
  webFrame.style.display = web ? "block" : "none";
  pyPreview.style.display = web ? "none" : "block";

  btnWeb.classList.toggle("active", web);
  btnPy.classList.toggle("active", !web);

  if (web) updateWebPreview();
  else initPyodide();
}

function updateWebPreview() {
  const html = htmlCode.value;
  const css = `<style>${cssCode.value}</style>`;
  const js = `<script>${jsCode.value}<\/script>`;

  const doc = webFrame.contentDocument;
  doc.open();
  doc.write(html + css + js);
  doc.close();
}

async function initPyodide() {
  if (pyodide) return;

  loading.style.display = "block";
  pyodide = await loadPyodide();

  pyodide.setStdout({
    batched: msg => output.textContent += msg + "\n"
  });

  loading.style.display = "none";
}

runBtn.onclick = async () => {
  output.textContent = "Running...\n";
  await pyodide.runPythonAsync(pythonCode.value);
};

// INIT
updateWebPreview();
