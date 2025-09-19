
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  code: string;
  onRender: (svg: string) => void;
  isDark: boolean;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ code, onRender, isDark }) => {
  const ref = useRef<HTMLDivElement>(null);
  const fullCode = `%%{init: {'theme': '${isDark ? 'dark' : 'default'}'}}%%\n${code}`;

  useEffect(() => {
    let active = true;
    if (ref.current) {
      try {
        const id = `mmd_${Math.random().toString(36).slice(2)}`;
        mermaid.render(id, fullCode).then(({ svg }) => {
          if (active && ref.current) {
            ref.current.innerHTML = svg;
            onRender(svg);
          }
        }).catch((err) => {
          if (active && ref.current) {
             ref.current.innerHTML = `<pre class='text-red-500 whitespace-pre-wrap'>Mermaid error: ${String(err)}\n\nCode:\n${code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</pre>`;
          }
        });
      } catch (err) {
         if (active && ref.current) {
            ref.current.innerHTML = `<pre class='text-red-500 whitespace-pre-wrap'>Mermaid syntax error: ${String(err)}</pre>`;
         }
      }
    }
    return () => {
      active = false;
    };
  }, [fullCode, code, onRender]);

  return <div ref={ref} className="w-full min-h-[200px] overflow-auto flex items-center justify-center" />;
};

export default MermaidRenderer;
