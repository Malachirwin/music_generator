const { createCanvas } = require('canvas')
const fs = require("fs")
const drawTrebleClef = require('./drawTrebleClef')
const pageCount = process.argv[2] ? Math.max(parseInt(process.argv[2]), 1) : 1

console.log('\nInitilazing pdf\n')

const PIXELS_PER_INCH = 72
const width = 8.5 * PIXELS_PER_INCH
const height = 11 * PIXELS_PER_INCH
const canvas = createCanvas(width, height, 'pdf')

const ctx = canvas.getContext('2d')

bounds = {
  minX: 0,
  maxX: width,
  minY: 0,
  maxY: height,
}

const margin = 0.75 * PIXELS_PER_INCH
const lineHeight = 6
const lineWidth = 0.5
const titleHeight = 60
const titleWidth = 4 * PIXELS_PER_INCH

let currentHeight = bounds.minY + margin + titleHeight
ctx.lineWidth = lineWidth

ctx.beginPath()
ctx.moveTo(width / 2 - titleWidth / 2, currentHeight)
ctx.lineTo(width / 2 + titleWidth / 2, currentHeight)
ctx.stroke()

currentHeight += 50

const drawHorizontalLine = (startX, endX) => {
  ctx.beginPath()
  ctx.moveTo(startX, currentHeight)
  ctx.lineTo(endX, currentHeight)
  ctx.stroke()
}

const drawMusicScore = (startX, endX) => {
  if (currentHeight > height - margin) {
    ctx.addPage(width, height)
    currentHeight = bounds.minY + margin
  }

  const startingHeight = currentHeight
  for (let i = 1; i <= 5; i++) {
    drawHorizontalLine(startX, endX)
    currentHeight += lineHeight
  }
  currentHeight -= lineHeight
  ctx.beginPath()
  ctx.moveTo(startX, startingHeight - lineWidth / 2)
  ctx.lineTo(startX, currentHeight + lineWidth / 2)
  ctx.moveTo(endX, startingHeight - lineWidth / 2)
  ctx.lineTo(endX, currentHeight + lineWidth / 2)
  ctx.stroke()

  ctx.save()
  ctx.translate(startX - 2, currentHeight - 35)
  ctx.scale(0.3, 0.3)
  drawTrebleClef(ctx)
  ctx.restore()
}

console.log('Generating pages\n')

drawMusicScore(bounds.minX + margin + 40, bounds.maxX - margin)
for (let i = 1; i <= 7 + 10 * (pageCount - 1); i++) {
  currentHeight += 50
  drawMusicScore(bounds.minX + margin, bounds.maxX - margin)
}

console.log('Saving pdf\n')

const buffer = canvas.toBuffer('application/pdf')
fs.writeFileSync('./tmp/musicsheet.pdf', buffer)

console.log('Done! 🎉\n')
console.log('Music sheet can be found here: ./tmp/musicsheet.pdf\n')
