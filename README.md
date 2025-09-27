# React ## ✨ Features

### 🎯 Core Features

- Live React component playground in Chrome DevTools
- Real-time JSX compilation with Babel
- Local and CDN dependency support
- Offline-first with CDN fallback
- Automatic dependency version checking
- Sandboxed execution environment

### 🎨 New UI Features

- Professional VS Code-like code editor (CodeMirror 6)
- One Dark Pro theme for better coding experience
- Syntax highlighting for JSX/React
- Line numbers and active line highlighting
- Auto-indentation and bracket matching
- Custom scrollbars and modern UI elements
- Code formatting support

### ⚡ Enhanced Experience

- Available in regular DevTools and New Tab
- Custom React components playground theme
- Format code button for clean code
- Sample React components with Hooks
- Real-time error feedback
- Responsive preview window

### 🛠️ Developer Experience

- Code folding support
- Multiple font options (JetBrains Mono, Fira Code)
- Customizable tab size
- Line wrapping
- Selection highlighting
- Built-in error handlingnd DevTools

A Chrome DevTools extension that provides a secure, sandboxed React playground for experimenting with React components directly in your browser's developer tools. Write, compile, and test React components in an isolated environment without affecting the inspected page.

Built with ❤️ by [Tech Monk-Kapil](https://github.com/kapilraghuwanshi)

![React Playground DevTools](icons/icon128.png)

## ✨ Features

- Live React component playground in Chrome DevTools
- Real-time JSX compilation
- Local and CDN dependency support
- Offline-first with CDN fallback
- Automatic dependency version checking
- Sandboxed execution environment

### ✅ What's Allowed

- Writing and testing React components in an isolated sandbox
- Real-time JSX compilation within the DevTools panel
- Rendering components in a secure, sandboxed iframe
- Local dependency usage with CDN fallback
- Version checking and dependency management

### ❌ What's Not Allowed

- Direct code injection into visited websites
- Access to the main page's DOM or JavaScript context
- Execution of arbitrary code outside the sandbox
- Access to sensitive browser APIs without justification
- Collection or transmission of user code or data

### 🔒 Security Features

1. **Sandboxed Execution**:

   - All code runs in an isolated iframe
   - No access to the parent window or main page
   - Prevents interference with visited sites

2. **Safe Compilation Process**:

   ```
   User Input (JSX) → Babel Compilation → Sandboxed Execution → Isolated Render
   ```

3. **Dependency Management**:
   - Local vendor files for offline security
   - Controlled CDN fallback
   - Version consistency enforcement
   - No arbitrary package loading

## 🚀 Installation

1. Clone this repository or download ZIP

```bash
git clone https://github.com/yourusername/react-playground-devtools.git
```

2. Open Chrome Extensions page

   - Navigate to `chrome://extensions/`
   - Or use Menu → More Tools → Extensions

3. Enable Developer Mode

   - Toggle switch in top right corner

4. Load the Extension
   - Click "Load unpacked extension..."
   - Select the extension directory

## 📝 Usage

1. Access the Playground

   - Open Chrome DevTools (F12 or Cmd+Opt+I)
   - Click on "React Playground" tab
   - Or use "New Tab" version

2. Write React Components

   - Use professional code editor
   - Real-time JSX compilation
   - Syntax highlighting support

3. Preview Changes

   - See live updates in preview pane
   - Error feedback in real-time
   - Format code with one click

4. Manage Dependencies
   - Add local/CDN dependencies
   - Automatic version checking
   - Offline-first functionality

## Dependencies and Security

### Core Dependencies

- React (local + CDN fallback)
- React DOM (local + CDN fallback)
- Babel Standalone (local + CDN fallback)

### Dependency Security

- **Offline-First**: Local vendor files ensure security and reliability
- **Version Control**: Strict version management prevents unexpected updates
- **Controlled Updates**: Manual verification of new dependency versions
- **CDN Fallback**: Secure HTTPS connections to trusted CDNs only
- **Integrity Checks**: SHA-384 hash verification for CDN resources

## Technical Architecture

### Component Flow

```
DevTools Panel → JSX Editor → Babel Compilation → Sandboxed iframe → Isolated Rendering
```

### Security Layers

1. **Input Layer** (DevTools Panel)

   - User writes JSX in isolated editor
   - No access to main page context

2. **Compilation Layer** (In-Memory)

   - Babel transforms JSX to JS
   - Runs in DevTools context
   - No persistent storage of code

3. **Execution Layer** (Sandbox)

   - Isolated iframe environment
   - No host page access
   - Limited DOM permissions

4. **Rendering Layer** (Contained)
   - Components render in sandbox only
   - No external DOM manipulation
   - Clean unmount on updates

## 🛠️ Development

### Built With

- 🔧 Chrome Extension APIs (Manifest V3)
- ⚛️ React & ReactDOM (Latest versions)
- 🎯 Babel Standalone for JSX compilation
- 📝 CodeMirror 6 for professional editing
- 🎨 VS Code One Dark Pro theme
- 🔒 Sandboxed execution environment
- 🌐 Local/CDN dependency management

### Editor Features

- Syntax highlighting (JSX/React)
- Code folding
- Auto-indentation
- Multiple font options
- Line numbers
- Active line highlight
- Custom scrollbars
- Selection highlighting
- Error handling
- Format on demand

### Security

- Sandboxed code execution
- Secure dependency loading
- Error boundary implementation
- Safe preview rendering

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Creator

Created by [Your Name] with ❤️ for the React community

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# chrome-react-playground
