'use client'
import { useState } from 'react';
import { Card,  Button, Input, Textarea, CardBody } from '@nextui-org/react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission (e.g., send to an API)
    alert(`Message sent from ${name}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Card className="w-full max-w-4xl shadow-lg mb-8">
        <CardBody>
          <h2 className="text-xl md:text-4xl font-bold text-center mb-4">Contact Us</h2>
          <p className="mb-4 text-center">
            If you have any questions or inquiries, please fill out the form below or reach out to us at traveltrove@gmail.com.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Input
              label="Name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Textarea
              label="Message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" color="primary">Send Message</Button>
          </form>
        </CardBody>
      </Card>

      <Card className="w-full max-w-4xl shadow-lg mb-8">
        <CardBody>
          <h4 className="mb-4">Contact Details</h4>
          <p>Email: <a href="mailto:contact@example.com" className="text-blue-600"> traveltrove@gmail.com </a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-blue-600">+1 (234) 567-890</a></p>
          <p>Address: 123 Main St, Anytown, USA</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUs;
