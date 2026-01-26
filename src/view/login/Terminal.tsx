"use client";

import { useState, useEffect, useRef } from "react";

export const dynamic = "force-dynamic";
export default function Terminal() {
  const [lines, setLines] = useState<string[]>(["TraceMode - user:"]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string | (() => void)> = {
    help: "Available commands: help, about, clear",
    about: "This is a fake CMD built with Next.js and React.",
    clear: () => setLines([]),
  };

  const handleCommand = () => {
    const command = inputValue.trim();
    const newLines = [...lines, `17lab\\anhdq> ${command}`];

    if (commands[command]) {
      const result =
        typeof commands[command] === "function"
          ? (commands[command] as () => void)()
          : newLines.push(commands[command] as string);
      setLines([...newLines]);
    } else {
      newLines.push(`Unknown command: ${command}`);
      setLines([...newLines]);
    }

    setInputValue("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  return (
    <div className="terminal-container" ref={terminalRef}>
      {lines.map((line, idx) => (
        <div key={idx} className="terminal-line">
          {line}
        </div>
      ))}
      <div className="terminal-input-line">
        <span className="prompt">17lab\anhdq&gt; </span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand();
            }
          }}
        />
      </div>
      <style jsx>{`
        .terminal-container {
          background-color: black;
          color: #00ff00;
          font-family: "Courier New", monospace;
          height: 100vh;
          padding: 20px;
          overflow-y: auto;
        }
        .terminal-line {
          white-space: pre-wrap;
        }
        .terminal-input-line {
          display: flex;
        }
        .prompt {
          white-space: pre;
        }
        .terminal-input {
          background: transparent;
          border: none;
          color: #00ff00;
          font-family: inherit;
          font-size: inherit;
          flex: 1;
          outline: none;
        }
      `}</style>
    </div>
  );
}
