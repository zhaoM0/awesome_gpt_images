import { put } from '@vercel/blob'

export async function uploadImage(file: File | Blob, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
    })
    return { url: blob.url, error: null }
  } catch (error) {
    console.error('Upload error:', error)
    return { url: null, error: 'Failed to upload image' }
  }
}

export async function deleteImage(url: string) {
  try {
    // Extract the blob URL from the full URL
    await fetch(url, { method: 'DELETE' })
    return { error: null }
  } catch (error) {
    console.error('Delete error:', error)
    return { error: 'Failed to delete image' }
  }
}
