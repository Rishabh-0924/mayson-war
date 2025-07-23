"use client"

import { ArrowLeft , Shield, Heart, Home, Sparkles, Users, Award, ArrowRight, Star, Zap, Rocket , X , Menu } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"


export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const observerRef = useRef<IntersectionObserver | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #3b82f6; }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)); }
        }
        @keyframes magnetic-pull {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-ripple { animation: ripple 0.6s ease-out; }
        .animate-typewriter { 
          animation: typewriter 3s steps(40, end), blink 0.75s step-end infinite;
          overflow: hidden;
          border-right: 2px solid #3b82f6;
          white-space: nowrap;
        }
        .animate-particle-float { animation: particle-float 4s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-magnetic { animation: magnetic-pull 0.3s ease-in-out; }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }

        .parallax-bg {
          transform: translateY(${scrollY * 0.1}px);
        }

        .glass-effect {
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
        }

        .text-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .border-gradient {
          border: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #3b82f6, #1d4ed8) border-box;
        }

        .cursor-trail {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease-out;
        }

        .magnetic-field {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          opacity: 0.6;
        }

        .floating-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .interactive-bg {
          background: radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                      rgba(59, 130, 246, 0.05), transparent 40%);
        }
      `}</style>

      {/* Interactive Background */}
      {/* Floating Particles */}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-cyan-100 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-sky-100 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-100 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header - Pure Black */}
      <header className="sticky top-0 z-50 bg-black shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white hover:text-blue-300 transition-all duration-300 group"
            >
              <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>

            <div className="flex items-center space-x-3 translate-x-20">
              <Shield className="h-8 w-8 text-blue-400" />
              {/* <div className="text-white text-xl font-bold">MAYSON</div> */}
              <Image
    src="/maysonb-logo.png"
    alt="Mayson Logo"
    width={120} // adjust width as needed
    height={40}
    className="object-contain"
  />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
  <Link
    href="/products"
    className="relative text-gray-300 hover:text-white transition-all duration-300 group font-medium"
  >
    Products
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/"
    className="relative text-gray-300 hover:text-white transition-all duration-300 group"
  >
    Warranty
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/about"
    className="relative text-blue-300 hover:text-white transition-all duration-300 group"
  >
    About Us
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>
</nav>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-blue-300 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <nav className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
              <Link
                href="/products"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 font-medium border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Warranty
              </Link>
              <a
                href="/about"
                className="block px-6 py-4 text-blue-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with advanced animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            id="hero-title"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible["hero-title"] ? "animate-slide-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl text-black md:text-7xl font-bold mb-1 tracking-tight ">
              MAYSON
            </h1>
          </div>
          <div
            id="hero-tagline"
            data-animate
            className={`transition-all duration-1000 delay-300 ${
              isVisible["hero-tagline"] ? "animate-scale-in" : "opacity-0 scale-90"
            }`}
          >
            <div className="relative inline-block group">
              {/* <div className="bg-blue rounded-full px-8 py-4 shadow-lg border border-blue-200 hover-lift"> */}
                
              {/* </div> */}
            </div>
          </div>
          <div
            id="hero-description"
            data-animate
            className={`transition-all duration-1000 delay-500 ${
              isVisible["hero-description"] ? "animate-slide-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300 p-8">
               At MAYSON—because life deserves better—we were born from one simple truth: quality should never be a gamble. Fed up with delicate, low-grade goods that promise much but deliver little, we set out to restore trust between Maker and buyer.

            </p>
          </div>
        </div>
      </section>

      {/* Story Section with parallax and animations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              id="story-content"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible["story-content"] ? "animate-slide-in-left" : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6 hover:text-black transition-colors duration-300">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <div className="hover-lift p-6 rounded-xl bg-white border-l-4 border-blue-500 group shadow-md">
                  <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
                  <p className="text-lg relative z-10">
                   Why must every decent tool feel like a roll of the dice?”
 Our frustration lit a fire. We vowed never to let customers feel fooled again—and MAYSON was born.

                  </p>
                </div>
                <div className="hover-lift p-6 rounded-xl bg-white border-l-4 border-green-500 group shadow-md">
                  <div className="absolute inset-0 bg-cyan-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
                  <p className="text-lg relative z-10">
                    At MAYSON, you’re more than a sale—you’re family. We stand by our products with straightforward warranties and real people on the line. Your insights drive our evolution, ensuring we never stray from our founding promise.
                  </p>
                </div>
                <div className="hover-lift p-6 rounded-xl bg-white border-l-4 border-purple-500 group shadow-md">
                  <div className="absolute inset-0 bg-sky-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
                  <p className="text-lg relative z-10">
                    We believe “premium” isn’t just a label; it’s a commitment. Every component is hand-picked for durability. Every assembly line is audited for precision. And every unit endures rigorous stress tests—because trust is earned, not declared.
                  </p>
                </div>
              </div>
            </div>
            <div
              id="story-visual"
              data-animate
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible["story-visual"] ? "animate-slide-in-right" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4  rounded-2xl blur opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-8 h-96 flex items-center justify-center hover-lift border border-gray-200">
                  <div className="text-center">
                    <div className="relative">
                      <Home className="h-24 w-24 text-blue-600 mx-auto mb-4 animate-float animate-glow-pulse" />
                    </div>
                    <p className="text-xl font-bold text-blue-700 mb-2">Making homes happier,</p>
                    <p className="text-xl font-bold text-blue-700">one innovation at a time</p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <Star className="h-6 w-6 text-blue-600 animate-bounce" style={{ animationDelay: "0s" }} />
                      <Star className="h-6 w-6 text-blue-600 animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <Star className="h-6 w-6 text-blue-600 animate-bounce" style={{ animationDelay: "0.4s" }} />
                      <Star className="h-6 w-6 text-blue-600 animate-bounce" style={{ animationDelay: "0.6s" }} />
                      <Star className="h-6 w-6 text-blue-600 animate-bounce" style={{ animationDelay: "0.8s" }} />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with staggered animations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-white"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            id="values-header"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible["values-header"] ? "animate-slide-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4 text-gradient">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              id="value-1"
              data-animate
              className={`transition-all duration-1000 delay-200 ${
                isVisible["value-1"] ? "animate-bounce-in" : "opacity-0 scale-75"
              }`}
            >
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-50 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300  -glow">
                    <Sparkles className="h-10 w-10 text-green-600 " />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                    Honesty
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
We do right by you, create products that last instead of relying on constant repairs, and listen—because your frustrations drive our innovation.                  </p>
                </div>
              </div>
            </div>
            <div
              id="value-2"
              data-animate
              className={`transition-all duration-1000 delay-400 ${
                isVisible["value-2"] ? "animate-bounce-in" : "opacity-0 scale-75"
              }`}
            >
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-blue-50 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ">
                    <Heart className="h-10 w-10 text-blue-600 " />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    Care
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Every product is crafted with genuine care for the people who will use it, ensuring that quality and
                    user experience are never compromised.
                  </p>
                </div>
              </div>
            </div>
            <div
              id="value-3"
              data-animate
              className={`transition-all duration-1000 delay-600 ${
                isVisible["value-3"] ? "animate-bounce-in" : "opacity-0 scale-75"
              }`}
            >
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-purple-50 hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ">
                    <Award className="h-10 w-10 text-purple-600 " />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    Excellence
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We set the highest standards for ourselves and our products, because we believe that life deserves
                    nothing less than excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with glass effect */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            id="mission-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible["mission-content"] ? "animate-scale-in" : "opacity-0 scale-90"
            }`}
          >
            <h2 className="text-5xl font-bold mb-8 text-white animate-glow-pulse">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-12 text-white/90">
              Our mission at MAYSON is to empower every home with thoughtfully curated essentials defined by uncompromising quality, radical transparency, and customer-centric simplicity—so that each purchase becomes a confident choice and every product stands the test of time.
            </p>
            <div className="glass-effect rounded-3xl p-8 inline-block hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-bounce animate-glow-pulse" />
                <p className="text-2xl font-bold text-white">
                  "Because every moment saved is a moment gained for living."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with enhanced styling */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            id="team-header"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible["team-header"] ? "animate-slide-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4 text-gradient">Dear MAYSON Family,</h2>
            <p className="text-xl text-gray-600">A passionate team united by the vision that life deserves better</p>
          </div>
          <div
            id="team-content"
            data-animate
            className={`transition-all duration-1000 delay-300 ${
              isVisible["team-content"] ? "animate-scale-in" : "opacity-0 scale-90"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-4  rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-12 text-center hover-lift border border-blue-100">
                <div className="relative">
                  <Users className="h-20 w-20 text-blue-600 mx-auto mb-8 animate-float " />
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-20 "></div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Built by Dreamers, For Dreamers</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  United by our passion for honest quality and simplicity, we stand together—our team crafting with care and our customers inspiring every step—to transform daily routines into moments of confidence and delight. Thank you for being the heart of our journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with interactive elements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            id="cta-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible["cta-content"] ? "animate-slide-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6 text-gradient">Ready to Experience Better?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Join thousands of families who have already discovered that life deserves better with MAYSON.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
  href="/products"
  className="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover-lift overflow-hidden animate-pulse-glow inline-block"
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <div className="relative z-10 flex items-center justify-center space-x-2">
    <Rocket className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
    <span>Explore Our Products</span>
    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
  </div>
</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}