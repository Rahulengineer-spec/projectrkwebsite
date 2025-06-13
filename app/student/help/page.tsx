'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Mail, Phone, Clock, Plus } from 'lucide-react';

interface HelpData {
  faqs: {
    id: string;
    question: string;
    answer: string;
    category: string;
  }[];
  supportTickets: {
    id: string;
    title: string;
    status: 'OPEN' | 'RESOLVED';
    createdAt: string;
    lastUpdated: string;
    category: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    hours: string;
  };
}

export default function HelpPage() {
  const [helpData, setHelpData] = useState<HelpData | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const response = await fetch('/api/student/help');
        const data = await response.json();
        setHelpData(data);
      } catch (error) {
        console.error('Error fetching help data:', error);
      }
    };

    fetchHelpData();
  }, []);

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/student/help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      });

      if (response.ok) {
        setShowNewTicketForm(false);
        setNewTicket({ title: '', description: '', category: '' });
        // Refresh help data
        const updatedResponse = await fetch('/api/student/help');
        const updatedData = await updatedResponse.json();
        setHelpData(updatedData);
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  if (!helpData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{helpData.contactInfo.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{helpData.contactInfo.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Support Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{helpData.contactInfo.hours}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Support Tickets</h2>
        <Button onClick={() => setShowNewTicketForm(!showNewTicketForm)}>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {showNewTicketForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={newTicket.title}
                  onChange={e => setNewTicket({ ...newTicket, title: e.target.value })}
                  placeholder="Enter ticket title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  value={newTicket.category}
                  onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                  placeholder="Enter ticket category"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={newTicket.description}
                  onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Describe your issue in detail"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewTicketForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Ticket</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {helpData.supportTickets.map(ticket => (
          <Card key={ticket.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{ticket.title}</CardTitle>
                <Badge
                  className={
                    ticket.status === 'OPEN' ? 'bg-yellow-500' : 'bg-green-500'
                  }
                >
                  {ticket.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Category: {ticket.category}</span>
                <span>
                  Created: {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
                <span>
                  Last Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {helpData.faqs.map(faq => (
          <Card key={faq.id}>
            <CardHeader>
              <CardTitle className="text-xl">{faq.question}</CardTitle>
              <Badge variant="secondary">{faq.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 