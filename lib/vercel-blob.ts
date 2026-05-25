import { put } from '@vercel/blob'

export async function uploadImage(file: File, filename: string): Promise<string> {
  const blob = await put(filename, file, {
    access: 'public',
  })

  return blob.url
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const urls = await Promise.all(
    files.map(async (file) => {
      const filename = `prompts/${Date.now()}-${file.name}`
      return uploadImage(file, filename)
    })
  )

  return urls
}
