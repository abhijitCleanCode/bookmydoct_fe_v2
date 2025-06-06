import Link from "next/link"
import { FaInstagram, FaLinkedin, FaMailBulk, FaMapMarked, FaPhone } from "react-icons/fa"
import { FaMapLocation } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-zinc-900 to-black text-zinc-200">
      

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6 grid ">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">BookMyDoct</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Revolutionizing healthcare access through our innovative online booking platform. Making medical care more
              accessible, one appointment at a time.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/in/sudarshan-nath-mazumdar-574968225" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://www.instagram.com/bookmydoct" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-2 inline-block">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/aboutUs" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-2 inline-block">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/login/clinic" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-2 inline-block">
                  Login Clinic/Hospital
                </Link>
              </li>
              <li>
                <Link href="/register/clinic" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-2 inline-block">
                  Register Clinic/Hospital
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <FaMailBulk className="h-5 w-5" />
                <a href="mailto:bookmydoct@gmail.com" className="hover:text-white transition-colors">
                  bookmydoct@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaPhone className="h-5 w-5" />
                <a href="tel:+919957052223" className="hover:text-white transition-colors">
                  +91 9957052223
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <FaMapLocation className="h-5 w-5 mt-1" />
                <address className="not-italic">
                  RamKrishna Nagar,<br />
                  Karimganj (Sribhumi),<br />
                  Assam, 788166
                </address>
              </li>
            </ul>
          </div>

          {/*map*/}
          <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaMapMarked className="h-5 w-5" />
                  Our Location
              </h2>
              <div className="relative w-full  rounded-lg overflow-hidden">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14512.43941957939!2d92.44640519727069!3d24.585404699754207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751df43b60e0653%3A0x9c86c41afb2eb6e8!2sRamkrishna%20Nagar%2C%20Assam%20788166!5e0!3m2!1sen!2sin!4v1731062342805!5m2!1sen!2sin" width={"100%"} height={"100%"}></iframe>
              </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} BookMyDoct. All rights reserved.</p>
          <div className="flex space-x-6">
            
              <li>
                <Link href="/termsAndConditions" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-1 inline-block"
>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacyPolicy" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-1 inline-block"
>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refundPolicy" className="text-gray-400 hover:text-white transition-all duration-1000 hover:translate-x-1 inline-block"
>
                  Refund Policy
                </Link>
              </li>
          </div>
        </div>
      </div>
    </footer>
  )
}

