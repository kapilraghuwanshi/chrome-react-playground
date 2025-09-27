# React Playground DevTools

A Chrome DevTools extension that provides a live React playground for experimenting with React components directly in your browser's developer tools.

## Features

- Live React component playground in Chrome DevTools
- Real-time JSX compilation
- Local and CDN dependency support
- Offline-first with CDN fallback
- Automatic dependency version checking
- Sandboxed execution environment

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

## Dependencies

- React (local + CDN fallback)
- React DOM (local + CDN fallback)
- Babel Standalone (local + CDN fallback)

## Development

The extension uses a modular structure:

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

Custom Chrome DevTools panel that behaves like a mini JSX/React playground

But downloading and including it in your vendor directory is the most reliable approach since:

It works offline
Ensures version consistency
Makes the extension self-contained
Prevents issues with CDN availability

Local Sandbox Execution

Instead of injecting user code into any website, you create an isolated sandboxed iframe inside your DevTools panel.

The React code is compiled (using something like Babel standalone) and rendered only inside that sandbox, not inside other websites.

This way, you’re not tampering with the host page → much safer.

🔑 Safer Architecture for Approval

DevTools panel → user writes JSX.

Compile JSX → JS using Babel (in-memory).

Run inside iframe sandbox (not touching the visited site).

Render React component into that iframe’s DOM.

What is not allowed?

If your extension executes arbitrary JSX directly into the current page context (like eval inside user’s visited site).

If it tries to access sensitive APIs without justification.

If it doesn’t clearly declare what happens with user-provided code.
