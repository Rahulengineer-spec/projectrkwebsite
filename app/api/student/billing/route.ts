import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock billing data
  const mockBillingData = {
    currentPlan: {
      id: '1',
      name: 'Premium Plan',
      price: 99.99,
      billingCycle: 'MONTHLY',
      features: [
        'Unlimited Course Access',
        'Live Classes',
        'Certificate Generation',
        'Priority Support',
      ],
      nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    paymentHistory: [
      {
        id: '1',
        amount: 99.99,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PAID',
        description: 'Monthly Subscription - Premium Plan',
      },
      {
        id: '2',
        amount: 99.99,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PAID',
        description: 'Monthly Subscription - Premium Plan',
      },
    ],
    paymentMethods: [
      {
        id: '1',
        type: 'CREDIT_CARD',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2024,
        isDefault: true,
      },
    ],
    invoices: [
      {
        id: '1',
        number: 'INV-2024-001',
        amount: 99.99,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PAID',
        downloadUrl: 'https://example.com/invoices/inv-2024-001.pdf',
      },
      {
        id: '2',
        number: 'INV-2024-002',
        amount: 99.99,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PAID',
        downloadUrl: 'https://example.com/invoices/inv-2024-002.pdf',
      },
    ],
  };

  return NextResponse.json(mockBillingData);
}

export async function POST(request: Request) {
  // Mock successful payment method addition
  return NextResponse.json({ success: true, id: '2' });
}

export async function PATCH(request: Request) {
  // Mock successful plan update
  return NextResponse.json({ success: true });
} 