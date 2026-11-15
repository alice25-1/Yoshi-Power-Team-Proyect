import { useEffect, useRef } from 'react';

export default function TransparentFrog({ src, alt, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      const visited = new Uint8Array(w * h);
      const stack = [];

      const isBg = (idx) => {
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        return r > 195 && g > 195 && b > 195 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25;
      };

      for (let x = 0; x < w; x++) {
        stack.push([x, 0], [x, h - 1]);
      }
      for (let y = 0; y < h; y++) {
        stack.push([0, y], [w - 1, y]);
      }

      while (stack.length > 0) {
        const [x, y] = stack.pop();
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const pos = y * w + x;
        if (visited[pos]) continue;
        visited[pos] = 1;

        const idx = pos * 4;
        if (isBg(idx)) {
          data[idx + 3] = 0;
          stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  return <canvas ref={canvasRef} aria-label={alt} className={className} />;
}
