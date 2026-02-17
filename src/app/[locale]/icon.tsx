import { ImageResponse } from 'next/og';

// تنظیمات تصویر
export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// تولید آیکون
export default function Icon() {
  return new ImageResponse(
    (
      // Image element
      <div
        style={{
          fontSize: 24,
          background: '#0B0B0C', // رنگ پس‌زمینه (Charcoal)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C7A56A', // رنگ متن (Gold)
          fontFamily: 'serif',
          borderRadius: '4px', // کمی گردی گوشه‌ها
          border: '1px solid #333',
        }}
      >
        S
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}