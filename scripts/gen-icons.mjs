import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function generateIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#1A6B6B'
  const radius = size * 0.2
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.lineTo(size - radius, 0)
  ctx.quadraticCurveTo(size, 0, size, radius)
  ctx.lineTo(size, size - radius)
  ctx.quadraticCurveTo(size, size, size - radius, size)
  ctx.lineTo(radius, size)
  ctx.quadraticCurveTo(0, size, 0, size - radius)
  ctx.lineTo(0, radius)
  ctx.quadraticCurveTo(0, 0, radius, 0)
  ctx.closePath()
  ctx.fill()

  // Text "YB"
  ctx.fillStyle = '#FFFFFF'
  ctx.font = `bold ${size * 0.38}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('YB', size / 2, size / 2)

  return canvas.toBuffer('image/png')
}

try {
  writeFileSync(join(__dirname, '../public/icon-192.png'), generateIcon(192))
  writeFileSync(join(__dirname, '../public/icon-512.png'), generateIcon(512))
  console.log('Icons generated successfully')
} catch (e) {
  console.log('canvas not available, skipping icon generation:', e.message)
}
