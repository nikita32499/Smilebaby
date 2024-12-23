import { useEffect } from 'react'

import { useState } from 'react'

export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false)

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = reject
        })
      })

      await Promise.all(promises)
      setImagesPreloaded(true)
    }

    preloadImages()
  }, [imageUrls])

  return imagesPreloaded
}