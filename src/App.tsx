/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Menu, X, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Github, Award, BookOpen } from 'lucide-react';
import { useState, useRef } from 'react';

// --- Components ---

const ProjectCard = ({ title, category, image, description, stack, index }: { title: string, category: string, image: string, description: string, stack: string, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer flex flex-col gap-4"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 rounded-lg">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-display font-bold uppercase leading-none mb-1">{title}</h3>
            <p className="text-gray-500 text-sm font-medium">{category}</p>
          </div>
          <div className="flex gap-2">
             {/* Tech stack badges could go here if needed, but keeping it clean */}
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{description}</p>
        <p className="text-xs font-mono text-gray-400 mt-1">{stack}</p>
      </div>
    </motion.div>
  );
};

const EducationItem = ({ year, title, institution, grade }: { year: string, title: string, institution: string, grade?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-t border-gray-200 group hover:bg-gray-50 transition-colors px-4 md:px-0"
    >
      <span className="font-mono text-gray-400 text-sm pt-2 min-w-[100px]">{year}</span>
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-display font-bold uppercase mb-2 group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
        <p className="text-gray-600">{institution}</p>
      </div>
      {grade && (
        <div className="md:w-1/6 text-right">
          <span className="font-mono font-bold text-black bg-gray-100 px-3 py-1 rounded-full text-sm">{grade}</span>
        </div>
      )}
    </motion.div>
  );
};

const SkillTag = ({ name }: { name: string }) => (
  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">
    {name}
  </span>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const containerRef = useRef(null);
  
  const projects = [
    { 
      title: "EDURISE", 
      category: "Main Project", 
      description: "E-learning platform with Gamification. An interactive platform for learners to access courses, complete lessons, and enhance their skills.", 
      stack: "Node.js | MySQL | HTML | CSS | JS",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      title: "Attendance System", 
      category: "Mini Project", 
      description: "Student Attendance Management System used to record the attendance of students and create reports.", 
      stack: "PHP | MySQL | HTML | CSS | Bootstrap",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      title: "IoT Attendance", 
      category: "IoT Project", 
      description: "Student Attendance Marking System integrated with Arduino sensors and RFID technology.", 
      stack: "Arduino | RFID | IoT",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" 
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <header className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <a href="#" className="pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-transparent hover:border-black/10 transition-all">
          <span className="text-2xl font-bold tracking-tight font-display">Akshai.</span>
        </a>

        {/* Desktop Pill Navigation */}
        <nav className="hidden md:flex pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-white border border-black rounded-full p-1.5 shadow-lg items-center gap-1">
          {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
              onClick={() => setActiveTab(item)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === item
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden pointer-events-auto p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden flex flex-col"
        >
          <div className="flex flex-col gap-8 text-4xl font-display font-bold uppercase">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#education" onClick={() => setIsMenuOpen(false)}>Education</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
          <div className="mt-auto mb-12">
             <a href="mailto:akshai293@gmail.com" className="text-lg font-sans underline">akshai293@gmail.com</a>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-12 px-4 md:px-12">
        
        <div className="flex-1 flex flex-col justify-center items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6 flex items-center gap-2 text-gray-500 font-medium"
          >
            <span className="text-xl">👋</span>
            <span>Hello, I'm Akshai Raj.</span>
          </motion.div>

          <div className="relative text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center leading-[0.85] tracking-tighter"
            >
              <span className="font-display font-bold text-[14vw] md:text-[10rem] lg:text-[11rem] text-black relative z-10">
                SOFTWARE
              </span>
              <span className="font-display font-bold text-[14vw] md:text-[10rem] lg:text-[11rem] text-transparent relative z-0 flex items-center gap-4 md:gap-8"
                style={{ WebkitTextStroke: '1px black' }}
              >
                DEVELOPER
                <motion.div 
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="w-10 h-10 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center text-white"
                >
                  <ArrowUpRight className="w-5 h-5 md:w-10 md:h-10" />
                </motion.div>
              </span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl text-center mt-8 text-gray-600 leading-relaxed"
          >
            I seek challenging opportunities where I can fully use my skills for the success of the organization using new technologies and continuously delivering innovative, high-impact solutions.
          </motion.p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-end md:items-center border-t border-gray-200 pt-8 mt-12">
          <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <MapPin size={16} />
            Nandhanam Koodal P. O, Pathanamthitta
          </div>
          <div className="flex gap-8 mt-6 md:mt-0 opacity-60">
             <span className="font-mono font-bold text-lg">C++</span>
             <span className="font-mono font-bold text-lg">Python</span>
             <span className="font-mono font-bold text-lg">SQL</span>
             <span className="font-mono font-bold text-lg">React</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase">Academic<br/>Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 md:px-12 bg-gray-50 rounded-t-[3rem] mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">My Journey</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mt-4">Education</h2>
          </div>

          <div className="flex flex-col">
            <EducationItem 
              year="2025 - 2027" 
              title="Master of Computer Applications" 
              institution="Amal Jyothi College of Engineering" 
            />
            <EducationItem 
              year="2022 - 2025" 
              title="Bachelor of Computer Applications" 
              institution="Sahodharan Ayyapan Smaraka Sndp Yogam College, Konni" 
              grade="70%"
            />
            <EducationItem 
              year="2020 - 2022" 
              title="Plus Two (Biology Science)" 
              institution="Government Vocational Higher Secondary School, Kalanjoor" 
              grade="89%"
            />
            <EducationItem 
              year="2019 - 2020" 
              title="Tenth Standard" 
              institution="Republican Vocational Higher Secondary School, Konni" 
              grade="98%"
            />
          </div>
        </div>
      </section>

      {/* Skills & Achievements Section */}
      <section id="skills" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Skills */}
          <div>
            <h3 className="text-3xl font-display font-bold uppercase mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8" /> Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3 mb-12">
              <SkillTag name="C" />
              <SkillTag name="C++" />
              <SkillTag name="C#" />
              <SkillTag name="Python" />
              <SkillTag name="SQL" />
              <SkillTag name="Software Development" />
              <SkillTag name="HTML/CSS" />
              <SkillTag name="JavaScript" />
              <SkillTag name="Bootstrap" />
              <SkillTag name="PHP" />
              <SkillTag name="Node.js" />
            </div>

            <h3 className="text-3xl font-display font-bold uppercase mb-8">Languages</h3>
            <div className="flex flex-wrap gap-3 mb-12">
              <SkillTag name="English" />
              <SkillTag name="Malayalam" />
              <SkillTag name="Hindi" />
              <SkillTag name="Tamil" />
            </div>

            <h3 className="text-3xl font-display font-bold uppercase mb-8">Hobbies</h3>
            <div className="flex flex-wrap gap-3">
              <SkillTag name="Travelling" />
              <SkillTag name="Sports" />
              <SkillTag name="Music" />
              <SkillTag name="Cooking" />
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div>
            <h3 className="text-3xl font-display font-bold uppercase mb-8 flex items-center gap-3">
              <Award className="w-8 h-8" /> Achievements
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700">Participated in <strong>NASA Space Hackathon (2025)</strong></p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700">Shortlisted in college level for <strong>Smart India Hackathon</strong></p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700"><strong>1st Prize</strong> in District level quiz competition (World Water Day)</p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700"><strong>1st Runner Up</strong> in IoT project submission (College Level)</p>
              </li>
            </ul>

            <h3 className="text-3xl font-display font-bold uppercase mb-8 mt-12">Certifications</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700">Generative AI Foundations | <strong>AWS Academy</strong></p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700">Computer Architecture | <strong>Saylor Academy</strong></p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700">Python Datatypes | <strong>Infosys Springboard</strong></p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                <p className="text-gray-700">30 Days Spoken English & Life Skills | <strong>Unxt Foundation (Infosys)</strong></p>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-black text-white pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem]">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-8">Get In Touch</p>
          <a 
            href="mailto:akshai293@gmail.com" 
            className="font-display font-bold text-[8vw] md:text-[6rem] leading-none hover:text-gray-300 transition-colors break-all"
          >
            AKSHAI293@GMAIL.COM
          </a>
          
          <div className="flex flex-col md:flex-row gap-8 mt-12 mb-24 items-center">
            <a href="tel:9526248762" className="flex items-center gap-3 text-xl hover:text-gray-300 transition-colors">
              <Phone size={24} /> 9526248762
            </a>
            <div className="flex items-center gap-3 text-xl text-gray-400">
              <MapPin size={24} /> Pathanamthitta, Kerala
            </div>
          </div>

          <div className="flex gap-6 mb-12">
            <a href="#" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="#" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="#" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-8 text-sm font-medium text-gray-500">
          <p>© 2026 Akshai Raj. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="text-gray-600">Designed with React & Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


