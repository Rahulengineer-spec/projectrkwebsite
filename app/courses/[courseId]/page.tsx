import { CourseStructuredData } from '@/components/structured-data'
import { Metadata } from 'next'

interface CoursePageProps {
  params: {
    id: string
  }
}

// Generate metadata for the course page
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  // Fetch course data here
  const course = {
    title: 'Example Course',
    description: 'This is an example course description',
    image: '/course-image.jpg',
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [
        {
          url: course.image,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [course.image],
    },
  }
}

export default function CoursePage({ params }: { params: { id: string } }) {
  // Fetch course data here
  const course = {
    name: 'Example Course',
    description: 'This is an example course description',
    provider: {
      name: 'RK Institution',
      url: 'https://your-domain.com',
    },
    url: `https://your-domain.com/courses/${params.id}`,
    image: '/course-image.jpg',
  }

  return (
    <>
      <CourseStructuredData data={course} />
      {/* Your course page content */}
    </>
  )
} 