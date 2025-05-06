"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { appService } from "@/lib/api/api-services"

export default function Footer() {
  // Add mounting state to prevent hydration mismatches
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to open milestone tracker popup
  const openMilestonePopup = () => {
    // This assumes there's a milestone tracker popup trigger element with this data attribute
    const popupTrigger = document.querySelector('[data-milestone-popup="trigger"]');
    if (popupTrigger && 'click' in popupTrigger) {
      (popupTrigger as HTMLElement).click();
    }
  };

  const handleSubscribe = async () => {
    try {
      await appService.subscribe(email)
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      
    }
    
  }

  return (
    <footer className="bg-gray-50 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Operating Hours */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="[COMPANY] Logo"
                width={160}
                height={60}
                className="h-12 w-auto"
              />
            </Link>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Operating Hours</h3>
              <p className="text-sm text-gray-600">Monday to Saturday</p>
              <p className="text-sm text-gray-600">9 AM to 9 PM Beirut Time</p>
              <p className="text-sm text-gray-600">[COMPANY_PHONE]</p>
              <p className="text-sm text-gray-600">[COMPANY_CONTACT_EMAIL]</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                [COMPANY_ADDRESS]
              </p>
              <div 
                className="w-full h-48 mt-2 rounded-md overflow-hidden cursor-pointer relative"
                onClick={() => window.open("https://www.google.com/maps/place/Sahet+Al+Nour,+Tripoli/@34.4325771,35.8446734,15.13z/data=!4m6!3m5!1s0x1521f6aed8f67309:0x6cb19d1886ce519c!8m2!3d34.4347407!4d35.8360677!16s%2Fg%2F1vcmkzb2?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D", "_blank")}
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all">
                  <span className="text-transparent hover:text-white font-medium transition-all">View on Google Maps</span>
                </div> 
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12011.635687017208!2d35.844673354322516!3d34.4325771265727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f6aed8f67309%3A0x6cb19d1886ce519c!2sSahet%20Al%20Nour%2C%20Tripoli!5e0!3m2!1sen!2slb!4v1746534240926!5m2!1sen!2slb" 
                  className="w-full h-full border-0" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="[COMPANY] Location"
                  aria-label="Map showing [COMPANY] Global location"
                ></iframe>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <Link href="https://www.facebook.com/Onestiglobal" target="_blank" className="text-gray-400 hover:text-onesti-purple">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/onestiglobal/" target="_blank" className="text-gray-400 hover:text-onesti-purple">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/company/onesti-global/" target="_blank" className="text-gray-400 hover:text-onesti-purple">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Main Pages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-onesti-purple">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services & Tools */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services & Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/packages" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Therapy Packages
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Screening
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/milestone-tracker" className="text-sm text-gray-600 hover:text-onesti-purple">
                  Milestone Tracker
                </Link>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Our Newsletter</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  {mounted ? (
                    <Input 
                      type="email" 
                      placeholder="Enter Email" 
                      className="bg-white" 
                      id="footer-email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      suppressHydrationWarning
                    />
                  ) : (
                    <div className="h-10 w-full rounded-md border bg-white px-3 py-2 text-muted-foreground">
                      Enter Email
                    </div>
                  )}
                  <Button
                    className="bg-onesti-purple hover:bg-onesti-purple/90 text-white"
                    onClick={handleSubscribe}
                  >
                    Submit
                  </Button>
                </div>
                <div className={subscribed ? "text-green-600 text-sm font-medium" : "hidden text-green-600 text-sm font-medium"}>
                  Thank you for subscribing to our newsletter!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">Copyright © 2023 ONESTI. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-onesti-purple">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-onesti-purple">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

