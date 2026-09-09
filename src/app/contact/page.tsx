"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@techvault.com",
    sub: "We reply within 4 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+94 77 123 4567",
    sub: "Mon–Sat, 9am–8pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "TechVault HQ, Colombo",
    sub: "Sri Lanka",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Wire this up to your actual submit handler / API route.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 900);
  };

  return (
    <div className="relative flex flex-col min-h-screen pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-24 left-1/4 w-72 h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative container mx-auto max-w-6xl">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-5">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or need assistance? Our support team is here to help you 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-5">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="clay-card p-6 rounded-2xl flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent text-primary-foreground flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
                  <method.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-bold text-foreground">{method.title}</h4>
                  <p className="text-foreground/90 font-medium mt-0.5">{method.detail}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{method.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Support hours card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="clay-card p-6 rounded-2xl flex items-center gap-5 bg-primary/[0.04]"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-foreground">Live Chat Support</h4>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Average response time under 2 minutes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="clay-card p-6 md:p-8 rounded-4xl"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  className="w-full p-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all min-h-30 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="w-full h-12 text-base rounded-xl"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSubmitted ? (
                    <motion.span
                      key="sent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}