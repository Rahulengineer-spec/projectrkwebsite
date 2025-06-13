import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://rkinstitution.com"),
  title: {
    default: "Blog - Latest Articles and Resources | RK INSTITUTION",
    template: "%s | RK INSTITUTION Blog"
  },
  description: "Explore our latest articles, tutorials, and educational resources. Stay updated with the latest trends in online learning and education technology.",
  keywords: [
    "online education",
    "e-learning",
    "educational resources",
    "study tips",
    "learning technology",
    "career development",
    "student resources",
    "educational blog",
    "RK INSTITUTION blog",
    "online learning tips"
  ],
  authors: [{ name: "RK INSTITUTION Team" }],
  creator: "RK INSTITUTION",
  publisher: "RK INSTITUTION",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rkinstitution.com/blog",
    siteName: "RK INSTITUTION Blog",
    title: "Blog - Latest Articles and Resources | RK INSTITUTION",
    description: "Explore our latest articles, tutorials, and educational resources. Stay updated with the latest trends in online learning and education technology.",
    images: [
      {
        url: "/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "RK INSTITUTION Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Latest Articles and Resources | RK INSTITUTION",
    description: "Explore our latest articles, tutorials, and educational resources. Stay updated with the latest trends in online learning and education technology.",
    images: ["/images/blog-twitter.jpg"],
    creator: "@rkinstitution",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
