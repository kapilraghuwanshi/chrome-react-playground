// Import and re-export CodeMirror modules
import { EditorView } from './codemirror-view.js';
import { basicSetup } from './codemirror-basic-setup.js';
import { EditorState } from './codemirror-state.js';
import { javascript } from './codemirror-lang-javascript.js';
import { oneDark } from './codemirror-theme-one-dark.js';

// Export everything needed for the editor
export {
    EditorView,
    basicSetup,
    EditorState,
    javascript,
    oneDark
};