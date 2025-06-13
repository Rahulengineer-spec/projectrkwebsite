'use client'

import { useEffect } from 'react'

interface OrganizationSchema {
  name: string
  url: string
  logo: string
  sameAs: string[]
}

interface CourseSchema {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  url: string
  image?: string
}

interface BreadcrumbSchema {
  items: {
    name: string
    url: string
  }[]
}

export function OrganizationStructuredData({ data }: { data: OrganizationSchema }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      logo: data.logo,
      sameAs: data.sameAs,
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
}

export function CourseStructuredData({ data }: { data: CourseSchema }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: data.provider.name,
        url: data.provider.url,
      },
      url: data.url,
      ...(data.image && { image: data.image }),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
}

export function BreadcrumbStructuredData({ data }: { data: BreadcrumbSchema }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
} 