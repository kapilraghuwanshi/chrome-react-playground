(async () => {
    try {
        const { EditorView, basicSetup, EditorState, javascript, oneDark } = await import('./lib/codemirror-bundle.js');
        // Initialize CodeMirror editor
        let view = new EditorView({
            state: EditorState.create({
                doc: `// Write your React component here...\nexport default function App() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>\n      <h2>React Playground</h2>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`,
                extensions: [
                    basicSetup,
                    javascript({ jsx: true }),
                    oneDark,
                    EditorView.lineWrapping,
                    EditorState.tabSize.of(2),
                    EditorView.editable.of(true),
                    EditorState.allowMultipleSelections.of(true),
                    EditorView.theme({
                        "&": { height: "300px" },
                        ".cm-scroller": { overflow: "auto" }
                    })
                ]
            }),
            parent: document.getElementById("editor")
        });

        // Make editor instance available
        window.editor = view;

        // Focus the editor
        view.focus();
    } catch (err) {
        console.error('Failed to initialize editor:', err);
    }
})();