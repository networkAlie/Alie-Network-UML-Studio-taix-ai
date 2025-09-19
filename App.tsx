
import React, { useState, useEffect, useCallback } from 'react';
import MermaidRenderer from './components/MermaidRenderer';
import Sidebar from './components/Sidebar';
import { DIAGRAMS } from './constants';
import type { Diagram } from './types';
import mermaid from 'mermaid';

// Helper to copy text to clipboard
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Helper to download SVG
const downloadSvg = (filename: string, svgContent: string): void => {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[\s/]/g, '_')}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


const MoonIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const SunIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);


export default function App() {
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram>(DIAGRAMS[0]);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string>('Copy Mermaid');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      flowchart: { htmlLabels: true, diagramPadding: 8 },
      sequence: { actorMargin: 30 },
    });
    
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleCopy = useCallback(() => {
    copyToClipboard(selectedDiagram.code).then(success => {
      if (success) {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Mermaid'), 2000);
      } else {
        setCopyStatus('Failed!');
        setTimeout(() => setCopyStatus('Copy Mermaid'), 2000);
      }
    });
  }, [selectedDiagram.code]);
  
  const handleExport = useCallback(() => {
    if (svgContent) {
      downloadSvg(selectedDiagram.title, svgContent);
    }
  }, [svgContent, selectedDiagram.title]);


  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-200">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Alie Network — UML Studio</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Live renderer for growth systems. Copy/export ready.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(prev => !prev)}
              className="flex items-center justify-center rounded-xl p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Toggle dark mode"
            >
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleCopy}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Copy Mermaid code"
            >
              {copyStatus}
            </button>
            <button
              onClick={handleExport}
              className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              title="Export SVG"
            >
              Export SVG
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:flex-row sm:px-6 lg:px-8">
        <Sidebar items={DIAGRAMS} currentId={selectedDiagram.id} onSelect={setSelectedDiagram} />

        <section className="flex w-full flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Diagram</div>
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">{selectedDiagram.title}</h2>
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-950">
              <MermaidRenderer key={selectedDiagram.id + (isDark ? '-dark': '-light')} code={selectedDiagram.code} onRender={setSvgContent} isDark={isDark} />
            </div>
          </div>

          <details className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <summary className="cursor-pointer text-sm font-semibold">Show Mermaid Source</summary>
            <pre className="mt-4 overflow-auto rounded-xl bg-gray-100 p-3 text-xs leading-relaxed text-gray-700 dark:bg-black/50 dark:text-gray-300"><code>{selectedDiagram.code}</code></pre>
          </details>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Alie Network • UML Studio. All rights reserved.</p>
        <p className="mt-1">Use #ad and DYOR disclosures where applicable.</p>
      </footer>
    </div>
  );
}
