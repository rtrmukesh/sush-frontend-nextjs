import { ImageResponse } from 'next/og'

export const size = {
  width: 192, 
  height: 192,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,                 
          fontWeight: '900',
          background: '#0b0303',         
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffffff',
          borderRadius: '20%',           
          textShadow: '2px 2px 5px rgba(0,0,0,0.6)',
        }}
      >
        Ms
      </div>
    ),
    {
      ...size,
    }
  )
}
