// iframe.js
// Listen for compiled module code from parent (panel)
window.addEventListener('message', async (ev) => {
    // Basic validation: ensure message has expected shape
    const msg = ev.data;
    if (!msg || msg.type !== 'RUN_COMPILED') return;

    const compiled = msg.compiled || '';

    try {
        // Wrap compiled code to capture exports.default if present
        const moduleCode = `
      (function() {
        // provide React & ReactDOM as globals (already on window from vendor UMD)
        const React = window.React;
        const ReactDOM = window.ReactDOM;
        // user code:
        ${compiled}
        // expose exports (Babel's transform may have used "exports.default")
        return typeof exports !== 'undefined' ? exports.default : undefined;
      })();
    `;

        // Create a blob as a module and import it.
        // Note: Because sandboxed iframe may block dynamic import of blob in some cases,
        // we can use eval-like approach. But eval is not allowed by CSP normally.
        // Safer approach: create <script type="module"> with blob URL.
        const blob = new Blob([moduleCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        // create an async module script that imports the blob and mounts default export
        // We'll dynamically add a script tag of type=module
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
      import('${url}').then(mod => {
        const Comp = mod && mod.default ? mod.default : undefined;
        const root = document.getElementById('root');
        try {
          if (Comp) {
            if (window.ReactDOM && window.ReactDOM.createRoot) {
              // clear root
              root.innerHTML = '';
              window.ReactDOM.createRoot(root).render(window.React.createElement(Comp));
            } else if (window.ReactDOM) {
              root.innerHTML = '';
              window.ReactDOM.render(window.React.createElement(Comp), root);
            } else {
              root.textContent = 'ReactDOM not available';
            }
          } else {
            root.textContent = 'No default export component found or top-level code executed';
          }
          parent.postMessage({ type: 'EXEC_SUCCESS' }, '*');
        } catch (err) {
          parent.postMessage({ type: 'EXEC_ERROR', error: String(err) }, '*');
        } finally {
          URL.revokeObjectURL('${url}');
        }
      }).catch(err => {
        parent.postMessage({ type: 'EXEC_ERROR', error: String(err) }, '*');
      });
    `;
        document.body.appendChild(script);
    } catch (err) {
        parent.postMessage({ type: 'EXEC_ERROR', error: String(err) }, '*');
    }
});
