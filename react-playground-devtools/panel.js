// Get references to DOM elements
const formatBtn = document.getElementById('format');
const sampleBtn = document.getElementById('sample');
const runBtn = document.getElementById('run');
const status = document.getElementById('status');
const iframeWrap = document.getElementById('iframeWrap');

let view; // Define view in outer scope

// Initialize CodeMirror editor
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Dynamically import CodeMirror modules
        const { EditorView, basicSetup, EditorState, javascript, oneDark } = await import('./lib/codemirror-bundle.js');

        // Initialize CodeMirror editor
        let view = new EditorView({
            state: EditorState.create({
                doc: `// Write your React component here...
export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2>React Playground</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}`,
                extensions: [
                    basicSetup,
                    javascript({ jsx: true }),
                    oneDark,
                    EditorView.lineWrapping,
                    EditorState.tabSize.of(2),
                    EditorView.editable.of(true),
                    EditorState.allowMultipleSelections.of(true),
                    EditorView.focusChangeEffect.of(view => {
                        view.focus();
                        return null;
                    }),
                    EditorView.theme({
                        "&": { height: "300px" },
                        ".cm-scroller": { overflow: "auto" }
                    })
                ]
            }),
            parent: document.getElementById("editor")
        });
        // Make editor instance available globally
        window.editor = view;

        // Focus the editor
        view.focus();

        // Set up status message
        status.textContent = 'Editor ready';
    } catch (err) {
        console.error('Initialization failed:', err);
        status.textContent = 'Failed to initialize editor: ' + err.message;
    }
});

// Format code using Prettier
function formatCode() {
    try {
        const code = editor.value;
        const formatted = prettier.format(code, {
            parser: "babel",
            plugins: prettierPlugins,
            semi: true,
            singleQuote: true,
            trailingComma: "all",
            printWidth: 80,
            tabWidth: 2,
            bracketSpacing: true,
            jsxBracketSameLine: false,
        });
        editor.value = formatted;
        status.textContent = 'Code formatted';
    } catch (err) {
        console.error('Formatting failed:', err);
        status.textContent = 'Formatting failed: ' + err.message;
    }
}

// Add format button handler
formatBtn.onclick = formatCode;

// Check dependency versions and sources
async function checkVersions() {
    try {
        // Determine if we're using local or CDN versions
        const isUsingLocal = {
            babel: !Babel.version.includes('latest'),
            react: !React.version.includes('latest')
        };

        // Get latest versions from npm
        const [babelRes, reactRes] = await Promise.all([
            fetch('https://registry.npmjs.org/@babel/standalone/latest'),
            fetch('https://registry.npmjs.org/react/latest')
        ]);
        const babelData = await babelRes.json();
        const reactData = await reactRes.json();

        // Current versions
        const currentBabel = Babel.version;
        const currentReact = React.version;

        // Prepare status message
        const statusParts = [];

        // Add source information
        statusParts.push(`Using ${isUsingLocal.babel ? 'local' : 'CDN'} Babel`);
        statusParts.push(`Using ${isUsingLocal.react ? 'local' : 'CDN'} React`);

        // Check for updates
        if (babelData.version !== currentBabel || reactData.version !== currentReact) {
            console.log(`Updates available:
                Babel ${currentBabel} → ${babelData.version} (${isUsingLocal.babel ? 'local' : 'CDN'})
                React ${currentReact} → ${reactData.version} (${isUsingLocal.react ? 'local' : 'CDN'})
            `);
            statusParts.push('Updates available');
        }

        status.textContent = statusParts.join(' | ');
    } catch (err) {
        console.error('Version check failed:', err);
        status.textContent = 'Using offline versions';
    }
}

// Check versions when the panel loads
setTimeout(checkVersions, 1000); // Slight delay to ensure dependencies are loaded

const SAMPLES = {
    counter: `export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2>Counter Example</h2>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{ 
          padding: '8px 16px',
          backgroundColor: '#61dafb',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
}`,
    todo: `export default function TodoList() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), id: Date.now() }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2>Todo List</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          style={{ padding: '8px', marginRight: '8px' }}
          placeholder="Add a new todo"
        />
        <button 
          onClick={addTodo}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              marginBottom: '8px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px'
            }}
          >
            {todo.text}
            <button 
              onClick={() => removeTodo(todo.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`
};

let currentSampleIndex = 0;
const samplesList = Object.values(SAMPLES);

sampleBtn.onclick = () => {
    try {
        // Get the next sample in rotation
        const sample = samplesList[currentSampleIndex];

        // Create a transaction to replace the entire content
        let transaction = view.state.update({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: sample
            }
        });

        // Apply the transaction
        view.dispatch(transaction);

        // Move to next sample for next click
        currentSampleIndex = (currentSampleIndex + 1) % samplesList.length;

        // Focus the editor
        view.focus();

        // Update status
        status.textContent = 'Sample code inserted!';
    } catch (err) {
        console.error('Failed to insert sample:', err);
        status.textContent = 'Failed to insert sample code';
    }
};        // Create sandboxed iframe (no allow-same-origin -> stricter isolation)
const iframe = document.createElement('iframe');
iframe.id = 'playground_iframe';
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.sandbox = 'allow-scripts'; // allow scripts only
// set src to packaged iframe page via runtime URL
iframe.src = chrome.runtime.getURL('iframe.html');
iframeWrap.appendChild(iframe);

// helper to send code to iframe
function postToIframe(message) {
    // targetOrigin set to chrome-extension origin for safety
    const targetOrigin = new URL(iframe.src).origin;
    iframe.contentWindow.postMessage(message, targetOrigin);
}

runBtn.onclick = () => {
    status.textContent = 'Compiling...';
    try {
        const userCode = editor.value || '';
        // Transform JSX -> JS (ES module style). We keep 'presets: ["react"]'.
        const res = Babel.transform(userCode, { presets: ['react'] });
        const compiled = res.code;

        // Send compiled code to iframe for execution
        postToIframe({ type: 'RUN_COMPILED', compiled });

        status.textContent = 'Sent to sandbox.';
    } catch (e) {
        console.error(e);
        status.textContent = 'Compile error: ' + e.message;
    }
};

// Optional: show errors posted back from iframe
window.addEventListener('message', (ev) => {
    // ensure message from our iframe origin
    if (ev.source === iframe.contentWindow && ev.data && ev.data.type) {
        if (ev.data.type === 'EXEC_SUCCESS') status.textContent = 'Executed OK';
        if (ev.data.type === 'EXEC_ERROR') status.textContent = 'Runtime error: ' + ev.data.error;
    }
});
