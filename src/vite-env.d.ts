/// <reference types="vite/client" />

type TmPrediction = {
  className: string;
  probability: number;
};

type TmModel = {
  getTotalClasses: () => number;
  predict: (input: HTMLImageElement) => Promise<TmPrediction[]>;
};

declare global {
  interface Window {
    tmImage: {
      load: (modelUrl: string, metadataUrl: string) => Promise<TmModel>;
    };
  }
}

export {};
