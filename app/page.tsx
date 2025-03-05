"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, FileCode2, Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [heroRef, aboutRef, experienceRef, skillsRef, projectsRef, contactRef]
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setMobileMenuOpen(false)
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const skills = [
    { name: "Selenium", icon: <FileCode2 className="h-5 w-5" />, level: 90 },
    { name: "JavaScript", icon: <Code className="h-5 w-5" />, level: 80 },
    { name: "Android Testing", icon: <Code className="h-5 w-5" />, level: 75 },
    { name: "JIRA", icon: <FileCode2 className="h-5 w-5" />, level: 95 },
    { name: "Postman", icon: <FileCode2 className="h-5 w-5" />, level: 85 },
    { name: "Git", icon: <Github className="h-5 w-5" />, level: 80 },
    { name: "CI/CD", icon: <FileCode2 className="h-5 w-5" />, level: 70 },
    { name: "SQL", icon: <FileCode2 className="h-5 w-5" />, level: 75 },
    { name: "Agile", icon: <FileCode2 className="h-5 w-5" />, level: 90 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Ashwin Adhikari
            </motion.div>
            <div className="hidden md:flex space-x-4">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(eval(`${item.toLowerCase()}Ref`))}
                  className={`text-sm ${
                    activeSection === item.toLowerCase() ? "text-purple-400" : "text-gray-300"
                  } hover:text-purple-400 transition-colors`}
                >
                  {item}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-40 md:hidden"
        >
          <div className="container mx-auto px-4 py-4">
            {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => scrollToSection(eval(`${item.toLowerCase()}Ref`))}
                className="block w-full text-left py-2 text-gray-300 hover:text-purple-400 transition-colors"
              >
                {item}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900/20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Ashwin Adhikari
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">Software QA Engineer</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Ensuring software quality through innovative testing strategies and automation.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => scrollToSection(contactRef)} className="bg-purple-600 hover:bg-purple-700">
                  Contact Me
                </Button>
                <Button  onClick={() => scrollToSection(projectsRef)}
                  variant="outline"
                  className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                  View Projects
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div style={{ scale }} className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="url(#gradient)" strokeWidth="4" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="url(#gradient)" strokeWidth="4" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="url(#gradient)" strokeWidth="4" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="url(#gradient)" strokeWidth="4" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="/ashwin.png?height=400&width=400"
                  alt="Ashwin Adhikari"
                  className="rounded-full w-64 h-64 mx-auto border-4 border-purple-600 shadow-lg shadow-purple-500/50"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-300 mb-4">
                  With 2 years of experience in software quality assurance, I've developed a keen eye for detail and a
                  passion for delivering high-quality software products. My expertise spans both manual and automated
                  testing, with a focus on creating efficient and effective test strategies.
                </p>
                <p className="text-gray-300 mb-4">
                  I believe in the power of continuous learning and staying updated with the latest testing
                  methodologies and tools. My goal is to contribute to the development of robust, user-friendly software
                  that exceeds client expectations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-600">Test Automation</Badge>
                  <Badge className="bg-pink-600">API Testing</Badge>
                  <Badge className="bg-indigo-600">Performance Testing</Badge>
                  <Badge className="bg-blue-600">Agile Methodologies</Badge>
                  <Badge className="bg-purple-600">Mobile App Testing</Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={experienceRef} className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Work Experience
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600"></div>
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-4 h-4 rounded-full bg-purple-600"></div>
                  <Card className="w-full md:w-5/12 ml-auto bg-gray-800 border-purple-600">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-purple-400">Associate QA Engineer</h3>
                      <p className="text-gray-400 mb-2">Dish Media Network | Dec 2023 - Present</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Developed and maintained automated test scripts using Selenium and Cypress</li>
                        <li>Performed API testing using Postman and Python requests library</li>
                        <li>
                          Collaborated with developers to identify and resolve issues early in the development cycle
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-4 h-4 rounded-full bg-pink-600"></div>
                  <Card className="w-full md:w-5/12 mr-auto bg-gray-800 border-pink-600">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-pink-400">Software QA </h3>
                      <p className="text-gray-400 mb-2">Cerotid  Inc. | March 2023 - Dec 2023</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Executed manual test cases for web applications</li>
                        <li>Documented and reported bugs using JIRA</li>
                        <li>Assisted in creating test documentation including test plans and test cases</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative"
                  >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-4 h-4 rounded-full bg-purple-600"></div>
                <Card className="w-full md:w-5/12 ml-auto bg-gray-800 border-purple-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-purple-400">Senior Consultant Team Manager</h3>
                    <p className="text-gray-400 mb-2">Cerotid Inc. | Jan 2022 - Feb 2024</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Led a team of 20+ consultants, driving strategic initiatives and enhancing team performance through mentorship, training, and process optimization.
                  
                    </li>
                        <li>Successfully managed consulting projects, ensuring on-time delivery, client satisfaction, and measurable business impact across industries such as Health Sector and IT Consulting Firm.

                        </li>
                        <li>Implemented data-driven strategies that improved efficiency by 75%, optimized workflows, and enhanced client ROI through analytics and performance tracking.
            
                        </li>
                      </ul>
                      </CardContent>
                      </Card>

                    </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-900 border-purple-600">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-3 bg-purple-600 rounded-full">{skill.icon}</div>
                        <h3 className="text-xl font-bold text-purple-400">{skill.name}</h3>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-2 bg-gray-700"
                        indicatorColor="bg-gradient-to-r from-purple-400 to-pink-600"
                      />
                      <p className="mt-2 text-right text-gray-400">{skill.level}%</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800 border-purple-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-purple-400">E-commerce Test Automation Framework</h3>
                    <p className="text-gray-300 mb-4">
                      Developed a comprehensive test automation framework for an e-commerce platform using Selenium and
                      JavaScript.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-purple-600">Selenium</Badge>
                      <Badge className="bg-pink-600">JavaScript</Badge>
                      <Badge className="bg-indigo-600">Jenkins</Badge>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                    >
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800 border-pink-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-pink-400">API Testing Suite</h3>
                    <p className="text-gray-300 mb-4">
                      Created an automated API testing suite using Postman and Newman for a financial services
                      application.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-purple-600">Postman</Badge>
                      <Badge className="bg-pink-600">Newman</Badge>
                      <Badge className="bg-indigo-600">GitHub Actions</Badge>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white"
                    >
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900 border-purple-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-purple-400">Contact Information</h3>
                    <div className="space-y-4">
                      <a href="mailto:adhihkariashwin965@gmail.com" className="flex items-center">
                        <Mail className="h-5 w-5 text-purple-400 mr-2" />
                        <span className="text-gray-300">adhikariashwin965@gmail.com</span>
                      </a>
                      <div className="flex items-center">
                        <Linkedin className="h-5 w-5 text-purple-400 mr-2" />
                        <a href="www.linkedin.com/in/ashwin-adhikari-9066b8182/" className="text-gray-300 hover:text-purple-400">
                         Linkedln
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Github className="h-5 w-5 text-purple-400 mr-2" />
                        <a href="https://github.com/ashwinadhi?tab=repositories" className="text-gray-300 hover:text-purple-400">
                        Github
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900 border-pink-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-pink-400">Send a Message</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          placeholder="Your Email"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white resize-none"
                          placeholder="Your Message"
                        ></textarea>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Ashwin Adhikari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

