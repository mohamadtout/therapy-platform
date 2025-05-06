"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Apply RTL direction to HTML element when language is Arabic
  useEffect(() => {
    const htmlElement = document.documentElement
    
    if (language === "ar") {
      htmlElement.setAttribute("dir", "rtl")
      htmlElement.setAttribute("lang", "ar")
    } else {
      htmlElement.setAttribute("dir", "ltr")
      htmlElement.setAttribute("lang", "en")
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 