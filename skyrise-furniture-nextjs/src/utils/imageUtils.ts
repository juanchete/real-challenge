// Generate a simple base64 blur placeholder
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Return a simple gray placeholder for SSR
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlMGUwZTAiLz48L3N2Zz4=';
  }
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a gradient for a more pleasant blur effect
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e8e8e8');
    gradient.addColorStop(1, '#f0f0f0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
}

// Simple shimmer placeholder
export const shimmerBlurDataURL = `data:image/svg+xml;base64,${Buffer.from(
  `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#e0e0e0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
      </linearGradient>
      <animate attributeName="x1" from="-100%" to="100%" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="x2" from="0%" to="200%" dur="1.5s" repeatCount="indefinite" />
    </defs>
    <rect width="400" height="400" fill="url(#shimmer)" />
  </svg>`
).toString('base64')}`;