import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MessageSquare, Clock, MapPin } from "lucide-react";

const HelpSupport = () => {
  const faqs = [
    {
      question: "How do I register for VIT Mess?",
      answer: "You can register by clicking the 'Register Student' button on the home page and filling out the registration form with your VIT student details."
    },
    {
      question: "What are the mess timings?",
      answer: "Main Mess: Breakfast (7:00-9:00 AM), Lunch (12:00-2:00 PM), Dinner (7:00-9:00 PM). Anna Mess follows similar timings."
    },
    {
      question: "How do I submit mess feedback?",
      answer: "You can submit feedback through the feedback form in the 'Feedback' section. We value your input and review all submissions."
    },
    {
      question: "What are the mess payment options?",
      answer: "We accept various payment methods including online transfers, cash payments, and digital wallets. Payment details are available in the registration process."
    },
    {
      question: "How can I report mess-related issues?",
      answer: "You can report issues through the feedback form or contact our mess support team directly through the contact information provided."
    },
    {
      question: "What are the different mess facilities?",
      answer: "VIT Vellore has multiple mess facilities including Main Mess, Anna Mess, and various food courts across the campus."
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VIT Mess Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">mess.support@vit.ac.in</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 416 220 2122</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon-Sun: 7:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">VIT University, Vellore - 632014</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Quick Support</h3>
              <p className="text-sm text-muted-foreground">
                Need immediate assistance with mess-related queries? Our support team is here to help you.
              </p>
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport; 