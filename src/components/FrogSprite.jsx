import { useEffect, useRef } from 'react';

export default function FrogSprite({ src, alt, className = 'w-24 h-24' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      
      const w = Math.floor(img.width / 2);
      const h = Math.floor(img.height / 2);
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);

      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      const visited = new Uint8Array(w * h);
      const stack = [];

    
      const isWhiteBg = (idx) => {
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        return r > 220 && g > 220 && b > 220;
      };

      for (let x = 0; x < w; x++) stack.push([x, 0], [x, h - 1]);
      for (let y = 0; y < h; y++) stack.push([0, y], [w - 1, y]);

      while (stack.length > 0) {
        const [x, y] = stack.pop();
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const pos = y * w + x;
        if (visited[pos]) continue;
        visited[pos] = 1;

        const idx = pos * 4;
        if (isWhiteBg(idx)) {
          data[idx + 3] = 0;
          stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      className={className}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
