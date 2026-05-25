import { put } from '@vercel/blob'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

const PUBLIC_DIR = join(process.cwd(), 'public')
const PROMPTS_DIR = join(PUBLIC_DIR, 'prompts')

async function uploadExistingImages() {
  console.log('Starting image migration to Vercel Blob...')

  try {
    const files = await readdir(PROMPTS_DIR)
    const imageFiles = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp'))

    console.log(`Found ${imageFiles.length} images to upload`)

    const results = []

    for (const file of imageFiles) {
      const filePath = join(PROMPTS_DIR, file)
      const fileBuffer = await readFile(filePath)
      const fileBlob = new File([fileBuffer], file, { type: 'image/png' })

      const filename = `prompts/${file}`
      console.log(`Uploading ${filename}...`)

      try {
        const blob = await put(filename, fileBlob, {
          access: 'public',
        })

        results.push({
          original: file,
          url: blob.url,
          filename: `/prompts/${file}`
        })

        console.log(`✓ Uploaded ${file} -> ${blob.url}`)
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error)
      }
    }

    console.log('\n=== Migration Summary ===')
    console.log(`Total: ${imageFiles.length}`)
    console.log(`Success: ${results.length}`)
    console.log(`Failed: ${imageFiles.length - results.length}`)

    console.log('\n=== Update your seed.ts with these URLs ===')
    console.log('Copy the URLs below into your prisma/seed.ts file:\n')

    results.forEach(r => {
      console.log(`// ${r.original}`)
      console.log(`{ url: '${r.url}', model: 'DALL-E 3' },`)
    })

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

uploadExistingImages()
