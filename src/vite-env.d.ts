/// <reference types="vite/client" />
/// <reference types="react" />

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.pdf' {
  const value: string;
  export default value;
}

declare module 'react-scroll' {
  export interface LinkProps {
    to: string;
    smooth?: boolean;
    duration?: number;
    children: React.ReactNode;
    [key: string]: unknown;
  }
  
  export class Link extends React.Component<LinkProps> {}
}

declare module 'typewriter-effect/dist/core' {
  export interface TypewriterOptions {
    strings: string[];
    autoStart?: boolean;
    loop?: boolean;
    typeSpeed?: number;
    deleteSpeed?: number;
    [key: string]: unknown;
  }

  export default class Typewriter {
    constructor(element: HTMLElement | null, options: TypewriterOptions);
    stop(): void;
  }
}

