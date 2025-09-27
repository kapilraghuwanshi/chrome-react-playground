// CodeMirror 6 imports and setup
import { EditorView, basicSetup } from "https://cdn.skypack.dev/@codemirror/basic-setup"
import { EditorState } from "https://cdn.skypack.dev/@codemirror/state"
import { javascript } from "https://cdn.skypack.dev/@codemirror/lang-javascript"
import { oneDark } from "https://cdn.skypack.dev/@codemirror/theme-one-dark"

// Create auto-focus extension
const autoFocus = EditorView.domEventHandlers({
    // Focus the editor when it's mounted
    focus: (event, view) => {
        view.focus();
        return true;
    }
});

// Export for use in main panel
export { EditorView, basicSetup, EditorState, javascript, oneDark, autoFocus };