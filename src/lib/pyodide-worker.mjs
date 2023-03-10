
// webworker.js

// Setup your project to serve `py-worker.js`. You should also serve
// `pyodide.js`, and all its associated `.asm.js`, `.data`, `.json`,
// and `.wasm` files as well:
importScripts("https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js");

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide();
  await pyodide.loadPackage("sympy")
  await self.pyodide.runPythonAsync(`from sympy.abc import x, y,z;from sympy import solve`);
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  // make sure loading is done
  await pyodideReadyPromise;
  // Don't bother yet with this line, suppose our API is built in such a way:
  const { id, code } = event.data;
  console.log("Received message", id, code );

  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    await self.pyodide.loadPackagesFromImports(code);
    let results = await self.pyodide.runPythonAsync(code);
    results = results.toString()

    
    console.log( results )
    self.postMessage({ results, id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};