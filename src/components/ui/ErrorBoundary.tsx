'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface ErrorBoundaryProps {
  children:  ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error:    Error | null;
}

// ─────────────────────────────────────────────
// ErrorBoundary — محافظت از Three.js Canvas
// اگه GPU/WebGL کرش کرد، سایت کامل کار می‌کنه
// ─────────────────────────────────────────────

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]:', error.message);
      console.error('[Stack]:', info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          // ✅ fallback: dark bg — canvas نیست ولی سایت کار می‌کنه
          <div
            className="fixed inset-0 bg-[#050505]"
            style={{ zIndex: 0, pointerEvents: 'none' }}
          />
        )
      );
    }

    return this.props.children;
  }
}
