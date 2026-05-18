import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample prompts
  const cyberpunk = await prisma.prompt.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Cyberpunk City at Night',
      content: 'A futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, flying cars, holographic billboards, dramatic perspective, cinematic lighting, highly detailed, 8K',
      description: 'Create stunning cyberpunk cityscapes with this detailed prompt',
      category: 'Sci-Fi',
      status: 'APPROVED',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1575197886478-274d1e1d3c27?w=800',
            model: 'DALL-E 3',
          },
          {
            url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800',
            model: 'Midjourney v6',
          },
        ],
      },
    },
  })

  const forest = await prisma.prompt.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Magical Forest Portal',
      content: 'An enchanted forest with a glowing mystical portal, fireflies, ancient trees with bioluminescent plants, ethereal atmosphere, fantasy art, detailed textures',
      description: 'Magical fantasy scenes with glowing elements',
      category: 'Fantasy',
      status: 'APPROVED',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1518173946687-a4c036bc2b2f?w=800',
            model: 'DALL-E 3',
          },
          {
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
            model: 'Stable Diffusion XL',
          },
        ],
      },
    },
  })

  const steampunk = await prisma.prompt.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      title: 'Steampunk Portrait',
      content: 'Victorian era steampunk portrait, brass gears, steam pipes, goggles, intricate clockwork mechanisms, sepia tones with copper highlights, detailed facial features',
      description: 'Victorian steampunk aesthetic with mechanical elements',
      category: 'Steampunk',
      status: 'APPROVED',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800',
            model: 'Midjourney v6',
          },
        ],
      },
    },
  })

  const abstract = await prisma.prompt.upsert({
    where: { id: '4' },
    update: {},
    create: {
      id: '4',
      title: 'Abstract Liquid Art',
      content: 'Colorful abstract liquid art, swirling iridescent fluids, oil and water mixture, macro photography, vibrant colors, smooth gradients, hypnotic patterns',
      description: 'Mesmerizing abstract liquid compositions',
      category: 'Abstract',
      status: 'APPROVED',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800',
            model: 'DALL-E 3',
          },
          {
            url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800',
            model: 'Stable Diffusion XL',
          },
        ],
      },
    },
  })

  const japanese = await prisma.prompt.upsert({
    where: { id: '5' },
    update: {},
    create: {
      id: '5',
      title: 'Japanese Garden at Sunrise',
      content: 'Traditional Japanese garden at sunrise, cherry blossoms falling, koi pond with lily pads, torii gate in background, misty atmosphere, golden hour lighting, serene',
      description: 'Peaceful Japanese landscapes with natural beauty',
      category: 'Nature',
      status: 'APPROVED',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=800',
            model: 'Midjourney v6',
          },
        ],
      },
    },
  })

  const synthwave = await prisma.prompt.upsert({
    where: { id: '6' },
    update: {},
    create: {
      id: '6',
      title: 'Retro Synthwave Scene',
      content: '80s synthwave aesthetic, retro grid landscape, purple and pink neon sky, palm tree silhouettes, vintage computer graphics style, nostalgic VHS atmosphere',
      description: 'Classic 80s retro-futuristic synthwave vibes',
      category: 'Retro',
      status: 'APPROVED',
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
            model: 'DALL-E 3',
          },
          {
            url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800',
            model: 'Stable Diffusion XL',
          },
        ],
      },
    },
  })

  console.log({ cyberpunk, forest, steampunk, abstract, japanese, synthwave })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
