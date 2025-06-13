'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Plus, Check } from 'lucide-react';

interface BillingData {
  currentPlan: {
    id: string;
    name: string;
    price: number;
    billingCycle: string;
    features: string[];
    nextBillingDate: string;
  };
  paymentHistory: {
    id: string;
    amount: number;
    date: string;
    status: string;
    description: string;
  }[];
  paymentMethods: {
    id: string;
    type: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
  }[];
  invoices: {
    id: string;
    number: string;
    amount: number;
    date: string;
    status: string;
    downloadUrl: string;
  }[];
}

export default function BillingPage() {
  const [billingData, setBillingData] = useState<BillingData | null>(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await fetch('/api/student/billing');
        const data = await response.json();
        setBillingData(data);
      } catch (error) {
        console.error('Error fetching billing data:', error);
      }
    };

    fetchBillingData();
  }, []);

  if (!billingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Billing & Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{billingData.currentPlan.name}</h3>
                <Badge variant="secondary">
                  {billingData.currentPlan.billingCycle}
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                ${billingData.currentPlan.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </div>
              <div className="space-y-2">
                {billingData.currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Next billing date:{' '}
                {new Date(billingData.currentPlan.nextBillingDate).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Payment Methods</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingData.paymentMethods.map(method => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="w-6 h-6 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        {method.type} ending in {method.last4}
                      </div>
                      <div className="text-sm text-gray-500">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </div>
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingData.paymentHistory.map(payment => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{payment.description}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${payment.amount}</div>
                    <Badge
                      className={
                        payment.status === 'PAID' ? 'bg-green-500' : 'bg-yellow-500'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingData.invoices.map(invoice => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">Invoice {invoice.number}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">${invoice.amount}</div>
                      <Badge
                        className={
                          invoice.status === 'PAID' ? 'bg-green-500' : 'bg-yellow-500'
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(invoice.downloadUrl, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 