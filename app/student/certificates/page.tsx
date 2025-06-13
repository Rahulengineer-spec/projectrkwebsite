'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Award } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issueDate: string | null;
  course: string;
  grade: string | null;
  certificateUrl: string | null;
  status: 'ISSUED' | 'IN_PROGRESS';
  instructor: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/student/certificates');
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ISSUED':
        return 'bg-green-500';
      case 'IN_PROGRESS':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Certificates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map(certificate => (
          <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{certificate.title}</CardTitle>
                <Badge className={getStatusColor(certificate.status)}>
                  {certificate.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Course: {certificate.course}</span>
                </div>
                {certificate.grade && (
                  <div className="text-gray-600">
                    Grade: <span className="font-semibold">{certificate.grade}</span>
                  </div>
                )}
                <div className="text-gray-600">
                  Instructor: {certificate.instructor}
                </div>
                {certificate.issueDate && (
                  <div className="text-gray-600">
                    Issued on:{' '}
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </div>
                )}
                {certificate.certificateUrl && (
                  <Button
                    className="w-full mt-4"
                    onClick={() => {
                      if (certificate.certificateUrl) {
                        window.open(certificate.certificateUrl, '_blank');
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 