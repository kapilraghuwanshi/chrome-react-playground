# React Playground DevTools

A Chrome DevTools extension that provides a secure, sandboxed React playground for experimenting with React components directly in your browser's developer tools. Write, compile, and test React components in an isolated environment without affecting the inspected page.

Built with ❤️ by [Tech Monk-Kapil](https://github.com/kapilraghuwanshi)

## Features

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

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/kapilraghuwanshi/chrome-react-playground.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the `react-playground-devtools` directory

## Usage

1. Open Chrome DevTools (F12 or Right-click > Inspect)
2. Look for the "React Playground" tab
3. Write your React component in the editor
4. Click "Run" to see it render
5. Use "Insert Sample" for a quick demo component

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

## Development

The extension uses a security-focused modular structure:

- `manifest.json` - Extension configuration
- `devtools.html/js` - DevTools integration
- `panel.html/js` - Playground UI and logic
- `content.js` - Page integration
- `vendor/` - Local dependency files

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# chrome-react-playground
