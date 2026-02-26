import { useState, useEffect, useRef, Suspense, lazy, memo, useCallback, useMemo } from "react";
import { ChatBot } from "@/components/ChatBot";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/Typewriter";
import { LazyImage } from "@/components/LazyImage";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { Code2, Palette, Smartphone, Globe, Mail, Phone, Github, Linkedin, ExternalLink, ChevronDown, Menu, X, MapPin, Calendar, Award, Briefcase, GraduationCap, Send, Sparkles, Zap, Star, Brain, Download } from "lucide-react";

// Import certificate assets for proper bundling
import udacityGenaiCert from "@/assets/udacity-genai-certificate.avif";
import udemyPythonMlCert from "@/assets/udemy-python-ml-certificate.avif";
import udemyUiuxCert from "@/assets/udemy-uiux-certificate.avif";
import nptelCloudCert from "@/assets/nptel-cloud-certificate.avif";
import newtonPythonCert from "@/assets/newton-python-certificate.avif";
import deloitteCert from "@/assets/deloitte-certificate.avif";
import intelCert from "@/assets/intel-certificate.avif";
import internpeCert from "@/assets/internpe-certificate.png";

// Lazy load heavy components
const Hero3D = lazy(() => import("@/components/Hero3D"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Animation variants
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Reusable animated section wrapper
const AnimatedSection = ({ children, id, className }: { children: React.ReactNode; id: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
};

const OptimizedPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigationRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useSmoothScroll();

  const navigation = useMemo(() => [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Experience", href: "experience" },
    { name: "Skills", href: "skills" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "Certificates", href: "certificates" },
    { name: "Internships", href: "internships" },
    { name: "Contact", href: "contact" },
  ], []);

  const skills = useMemo(() => [
    { category: "Languages", items: ["C++", "C", "Python", "MATLAB", "HTML", "CSS", "JavaScript"] },
    { category: "Frameworks", items: ["React", "MERN Stack", "Git", "GitHub"] },
    { category: "Expertise", items: ["Frontend Development", "Backend Development", "UI/UX Design", "AI & ML", "DSA", "OS", "CN", "Compiler Design"] },
  ], []);

  const services = useMemo(() => [
    { icon: <Palette className="h-8 w-8" />, title: "UI/UX Design", description: "Creating intuitive and visually appealing user interfaces that enhance user experience and drive engagement." },
    { icon: <Code2 className="h-8 w-8" />, title: "Frontend Development", description: "Building responsive and interactive web applications using modern frameworks like React and cutting-edge technologies." },
    { icon: <Brain className="h-8 w-8" />, title: "AI/ML & Data Analytics", description: "Developing intelligent solutions using machine learning algorithms and providing data-driven insights for informed decision making." },
    { icon: <Globe className="h-8 w-8" />, title: "Backend Development", description: "Developing robust server-side applications with secure APIs and efficient database management systems." },
    { icon: <Smartphone className="h-8 w-8" />, title: "Full Stack Development", description: "End-to-end web development solutions combining frontend and backend technologies for complete digital products." },
  ], []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.pageYOffset);
          if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                  setActiveSection(entry.target.id);
                }
              });
            }, { threshold: [0.5], rootMargin: '-50px 0px' });
            navigation.forEach(({ href }) => {
              const el = document.getElementById(href);
              if (el) observerRef.current?.observe(el);
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, [navigation]);

  return (
    <div className="min-h-screen bg-background liquid-background">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-tech-purple to-tech-emerald z-[60] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(9)].map((_, i) => <div key={i} className="floating-bubble" />)}
      </div>

      {/* Navigation */}
      <motion.nav
        ref={navigationRef}
        className="fixed top-0 w-full bg-background/90 backdrop-blur-xl z-50 border-b border-border"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ boxShadow: scrollY > 50 ? '0 1px 0 rgba(0,0,0,0.08)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <motion.div
              className="font-semibold text-lg tracking-tight cursor-pointer"
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Piyush Thakur
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {navigation.map((item, i) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-xs font-medium tracking-wide transition-colors duration-200 relative ${activeSection === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-primary transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item, i) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left transition-colors"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="absolute inset-0 opacity-20">
          <Suspense fallback={<LoadingSpinner />}>
            <Hero3D />
          </Suspense>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full section-padding pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              <div className="liquid-glass rounded-2xl p-8 space-y-6 liquid-wave">
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                    <span className="text-accent font-medium">Available for Freelance</span>
                  </motion.div>

                  <motion.h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Hi, I'm <span className="text-primary">Piyush Thakur</span>
                  </motion.h1>

                  <motion.div
                    className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground min-h-[3rem]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Typewriter texts={["UI/UX Designer", "Web Developer", "Full Stack Developer", "Problem Solver"]} speed={100} deleteSpeed={50} pauseDuration={2000} />
                  </motion.div>
                </div>

                <motion.p
                  className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Passionate about creating digital experiences that matter. Currently pursuing B.Tech at JUIT Solan,
                  I specialize in full-stack development, AI/ML, and data analytics.
                </motion.p>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 py-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { value: "2+", label: "Years Experience" },
                    { value: "15+", label: "Projects Done" },
                    { value: "5+", label: "Happy Clients" },
                  ].map((stat, i) => (
                    <motion.div key={i} className="text-center" variants={scaleUp}>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Button onClick={() => scrollToSection("projects")} className="liquid-button liquid-ripple text-primary-foreground px-8 py-4 text-lg font-semibold group">
                      <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                      View My Work
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Button onClick={() => scrollToSection("contact")} variant="outline" className="liquid-card border-2 border-primary/30 hover:border-primary px-8 py-4 text-lg font-semibold group liquid-ripple">
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Let's Talk
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Avatar */}
            <motion.div
              className="flex justify-center lg:justify-end relative"
              initial={{ opacity: 0, x: 80, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
            >
              <div className="relative w-full max-w-lg">
                <div className="aspect-square relative">
                  <motion.div
                    className="absolute inset-0 rounded-full gradient-bg p-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center shadow-elegant">
                      <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-br from-primary via-tech-purple to-tech-emerald flex items-center justify-center text-white relative overflow-hidden">
                        <span className="relative z-10 text-6xl font-serif font-bold">PT</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -top-8 -right-8 p-4 glass-card rounded-2xl"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Code2 className="h-8 w-8 text-primary" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -left-10 p-4 glass-card rounded-2xl"
                    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Palette className="h-8 w-8 text-accent" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 p-4 glass-card rounded-2xl"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <Brain className="h-8 w-8 text-tech-emerald" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <AnimatedSection id="about" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-16 text-center text-gradient">About Me</motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div className="space-y-8" variants={fadeLeft}>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Star className="h-6 w-6 text-primary" />
                  My Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm a passionate B.Tech student at JUIT Solan with a deep love for technology and innovation.
                  My journey in the world of programming began with curiosity and has evolved into expertise across
                  multiple domains including web development, AI/ML, and data analytics.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in creating digital solutions that not only solve problems but also enhance user experiences.
                  My approach combines technical excellence with creative design thinking.
                </p>
              </div>

              <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer}>
                <motion.div variants={scaleUp}>
                  <Card className="glass-card p-6 text-center">
                    <GraduationCap className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p className="text-sm text-muted-foreground">B.Tech at JUIT Solan</p>
                  </Card>
                </motion.div>
                <motion.div variants={scaleUp}>
                  <Card className="glass-card p-6 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">Himachal Pradesh</p>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="relative" variants={fadeRight}>
              <div className="aspect-square relative">
                <motion.div
                  className="absolute inset-0 rounded-2xl gradient-bg p-1"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center shadow-elegant">
                    <div className="w-4/5 h-4/5 rounded-2xl bg-gradient-to-br from-primary via-tech-purple to-tech-emerald flex items-center justify-center text-white relative overflow-hidden">
                      <span className="relative z-10 text-8xl font-serif font-bold">PT</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience" className="section-padding bg-section-bg">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-16 text-center text-gradient">Experience</motion.h2>

          <motion.div className="space-y-8" variants={staggerContainer}>
            {[
              { title: "Frontend Developer", company: "Freelance • 2022 - Present", desc: "Developed responsive web applications using React, JavaScript, and modern CSS frameworks. Collaborated with clients to create user-friendly interfaces and optimize user experiences.", icon: <Briefcase className="h-8 w-8 text-primary" /> },
              { title: "Web Development Intern", company: "Various Companies • 2023", desc: "Gained hands-on experience in full-stack development, working with MERN stack technologies and contributing to real-world projects.", icon: <Code2 className="h-8 w-8 text-primary" /> },
            ].map((exp, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                  <Card className="glass-card p-8 transition-shadow hover:shadow-elegant">
                    <div className="flex items-start gap-6">
                      <motion.div
                        className="p-3 rounded-full bg-primary/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {exp.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                        <p className="text-primary font-medium mb-2">{exp.company}</p>
                        <p className="text-muted-foreground leading-relaxed">{exp.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-16 text-center text-gradient">Skills & Expertise</motion.h2>

          <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer}>
            {skills.map((skillCategory, index) => (
              <motion.div key={index} variants={scaleUp}>
                <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                  <Card className="glass-card p-8 transition-shadow hover:shadow-elegant">
                    <h3 className="text-xl font-bold mb-6 text-center">{skillCategory.category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge className="skill-badge">{skill}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection id="services" className="section-padding bg-section-bg">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-16 text-center text-gradient">Services</motion.h2>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
            {services.map((service, index) => (
              <motion.div key={index} variants={scaleUp}>
                <motion.div whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeOut" } }}>
                  <Card className="glass-card p-8 text-center transition-shadow hover:shadow-elegant group">
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {service.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-16 text-center text-gradient">Featured Projects</motion.h2>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
            {[
              { icon: <Globe className="h-12 w-12 text-white" />, gradient: "from-primary to-tech-blue", title: "GMR & Associates", desc: "Professional CA firm website with modern design, service listings, and client portal for GMR and Associates", tags: ["React", "UI/UX", "Tailwind"], building: true },
              { icon: <Globe className="h-12 w-12 text-white" />, gradient: "from-tech-blue to-accent", title: "E-Commerce Platform", desc: "Full-stack e-commerce solution built with MERN stack", tags: ["React", "Node.js", "MongoDB"] },
              { icon: <Brain className="h-12 w-12 text-white" />, gradient: "from-tech-emerald to-accent", title: "AI Data Analytics", desc: "Machine learning dashboard for data visualization", tags: ["Python", "ML", "React"] },
              { icon: <Smartphone className="h-12 w-12 text-white" />, gradient: "from-tech-purple to-primary", title: "Mobile App UI", desc: "Modern mobile app design with smooth animations", tags: ["UI/UX", "Figma", "React Native"] },
            ].map((project, index) => (
              <motion.div key={index} variants={scaleUp}>
                <motion.div
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  className="h-full"
                >
                  <Card className="glass-card p-6 h-full group transition-shadow hover:shadow-elegant">
                    <motion.div
                      className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-lg mb-6 flex items-center justify-center overflow-hidden`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.icon}
                    </motion.div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {(project as any).building && <Badge className="bg-tech-emerald/20 text-tech-emerald border-tech-emerald/30 text-xs">In Progress</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">{project.desc}</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {(project as any).building ? "Coming Soon" : "View Project"}
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-16 text-center"
          >
            <motion.a
              href="https://github.com/27Piyush27?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-tech-purple text-primary-foreground font-semibold text-lg shadow-elegant transition-all"
            >
              <Github className="h-6 w-6" />
              <span>Explore All Projects on GitHub</span>
              <ExternalLink className="h-5 w-5" />
            </motion.a>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-sm">
              View source code, contributions & more repositories
            </motion.p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Certificates Section */}
      <AnimatedSection id="certificates" className="section-padding bg-section-bg">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-center text-gradient">Certifications</motion.h2>
          <motion.p variants={fadeUp} className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Industry-recognized credentials that validate my expertise.</motion.p>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
            {[
              { src: udacityGenaiCert, title: "Generative AI", issuer: "Udacity", file: "udacity-genai-certificate.avif" },
              { src: udemyPythonMlCert, title: "Python & Machine Learning", issuer: "Udemy", file: "udemy-python-ml-certificate.avif" },
              { src: udemyUiuxCert, title: "UI/UX Design", issuer: "Udemy", file: "udemy-uiux-certificate.avif" },
              { src: nptelCloudCert, title: "Cloud Computing", issuer: "NPTEL", file: "nptel-cloud-certificate.avif" },
              { src: newtonPythonCert, title: "Python Programming", issuer: "Newton School", file: "newton-python-certificate.avif" },
              { src: deloitteCert, title: "Business Analytics", issuer: "Deloitte", file: "deloitte-certificate.avif" },
            ].map((cert, index) => (
              <motion.div key={index} variants={scaleUp}>
                <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                  <Card className="glass-card overflow-hidden group transition-shadow hover:shadow-elegant">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={cert.src}
                        alt={cert.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{cert.issuer}</p>
                      <a href={cert.src} download={cert.file} className="inline-block w-full">
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Internships Section */}
      <AnimatedSection id="internships" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-center text-gradient">Internships</motion.h2>
          <motion.p variants={fadeUp} className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Hands-on industry experience that shaped my professional growth.</motion.p>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerContainer}>
            {[
              { src: intelCert, company: "Intel Corporation", role: "Software Development Intern", period: "Summer 2023", desc: "Worked on optimizing software performance and contributing to Intel's development tools. Gained experience in low-level programming and hardware-software integration.", file: "intel-certificate.avif" },
              { src: internpeCert, company: "InternPe", role: "Web Development Intern", period: "Winter 2023", desc: "Developed responsive web applications using modern frameworks. Collaborated with cross-functional teams to deliver high-quality digital solutions.", file: "internpe-certificate.png" },
            ].map((intern, index) => (
              <motion.div key={index} variants={fadeUp}>
                <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                  <Card className="glass-card p-8 transition-shadow hover:shadow-elegant">
                    <div className="flex items-start gap-6">
                      <motion.img
                        src={intern.src}
                        alt={intern.company}
                        className="w-16 h-16 object-cover rounded-xl"
                        loading="lazy"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{intern.role}</h3>
                        <p className="text-primary font-medium mb-2">{intern.company}</p>
                        <p className="text-muted-foreground text-sm mb-4 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {intern.period}
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">{intern.desc}</p>
                        <a href={intern.src} download={intern.file}>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Certificate
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="section-padding bg-section-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-gradient">Get In Touch</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </motion.p>

          <motion.div className="grid md:grid-cols-3 gap-8 mb-12" variants={staggerContainer}>
            {[
              { icon: <Mail className="h-8 w-8" />, title: "Email", value: "27piyushthakur27@gmail.com" },
              { icon: <Phone className="h-8 w-8" />, title: "Phone", value: "+91 8580630951" },
              { icon: <MapPin className="h-8 w-8" />, title: "Location", value: "JUIT Solan, Himachal Pradesh" },
            ].map((contact, i) => (
              <motion.div key={i} variants={scaleUp}>
                <motion.div whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}>
                  <Card className="glass-card p-6 text-center group transition-shadow hover:shadow-elegant">
                    <motion.div
                      className="mx-auto mb-4 text-primary"
                      whileHover={{ rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <h3 className="font-semibold mb-2">{contact.title}</h3>
                    <p className="text-muted-foreground text-sm">{contact.value}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="flex justify-center gap-6" variants={fadeUp}>
            <motion.a href="mailto:27piyushthakur27@gmail.com" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button className="btn-modern px-8 py-4 text-lg font-semibold">
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </Button>
            </motion.a>
            <motion.a href="https://linkedin.com/in/piyush-thakur-952364296" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" className="glass-enhanced px-8 py-4 text-lg font-semibold">
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>
      <ChatBot />
    </div>
  );
};

export default OptimizedPortfolio;
