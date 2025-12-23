"use client"
import React, { useEffect, useMemo, useState } from 'react'

// Helper that tries multiple candidate URLs for a single slide.
// This version preloads candidates and only renders the <img>
// once a valid candidate is found, avoiding flashes of broken images.
const SlideImage = ({ candidates = [], alt = '' }) => {
  const [pos, setPos] = useState(0)
  const [loadedSrc, setLoadedSrc] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const tryLoad = (i) => {
      if (!candidates || candidates.length === 0) return
      const test = new window.Image()
      test.onload = () => {
        if (cancelled) return
        setLoadedSrc(candidates[i])
        setIsLoading(false)
      }
      test.onerror = () => {
        if (cancelled) return
        if (i < candidates.length - 1) {
          tryLoad(i + 1)
        } else {
          // no valid candidate; ensure we don't render anything
          setLoadedSrc(null)
          setIsLoading(false)
        }
      }
      test.src = candidates[i]
    }

    // start trying from current pos
    tryLoad(pos)

    return () => {
      cancelled = true
    }
  }, [candidates, pos])

  return (
    <div className="flex items-center justify-center w-full h-full rounded-md bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      {loadedSrc ? (
        <img src={loadedSrc} alt={alt} className="object-contain w-full h-full" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-sm text-gray-400">
          <span className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" aria-hidden="true" />
          {!isLoading ? 'Image unavailable' : 'Loading image…'}
        </div>
      )}
    </div>
  )
}

const MainSection = () => {
  // For each slide, try both the expected folder and any accidentally-named folder
  // e.g. user created `b;ood_donation` by mistake — try that too.
  const prefixes = useMemo(() => ['/blood_donation', '/blood_donation'], [])

  // build candidate lists per slide (arrays of possible srcs)
  const slideCandidates = useMemo(() => {
    const slides = Array.from({ length: 7 }, (_, i) => {
      const idx = i + 1
      return prefixes.map((p) => `${p}/${idx}.jpg`)
    })
    // append single-source fallbacks as arrays too
    slides.push(['/Blood.png'])
    slides.push(['/BloodBg.png'])
    return slides
  }, [prefixes])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCandidates.length)
    }, 3000) // 3 seconds per image

    return () => clearInterval(timer)
  }, [slideCandidates.length])

  return (
    <section id="image-section" className="w-full px-4 py-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-xl rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / slideCandidates.length)}%)`, width: `${slideCandidates.length * 100}%` }}>
          {slideCandidates.map((candidates, i) => (
            <div key={i} style={{ width: `${100 / slideCandidates.length}%`, flexShrink: 0 }} className="h-72 md:h-[500px]">
              <SlideImage candidates={candidates} alt={`slide-${i}`} />
            </div>
          ))}
        </div>

        {/* dots (in normal flow, centered below images for simple scrolling) */}
        <div className="flex justify-center gap-2 mt-3" role="tablist" aria-label="Slide navigation">
          {slideCandidates.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MainSection
