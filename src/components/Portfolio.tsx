import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Hero3D from "@/components/Hero3D";
import { Typewriter } from "@/components/Typewriter";
import { Code2, Palette, Smartphone, Globe, Mail, Phone, Github, Linkedin, ExternalLink, ChevronDown, Menu, X, MapPin, Calendar, Award, Briefcase, GraduationCap, Send, Sparkles, Zap, Star, Brain } from "lucide-react";
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: "smooth"
    });
    setIsMenuOpen(false);
  };

  // Enhanced scroll handler with Apple-style smooth animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollY(scrollTop);

      // Section detection
      const sections = ["home", "about", "experience", "skills", "services", "projects", "certificates", "internships", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }

      // Animate elements on scroll
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('animate-in');
        }
      });

      // Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrollTop * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Magnetic effect for buttons
      const magneticElements = document.querySelectorAll('.magnetic-btn');
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - elementCenterX, 2) + Math.pow(e.clientY - elementCenterY, 2)
        );
        
        if (distance < 100) {
          const strength = (100 - distance) / 100;
          const deltaX = (e.clientX - elementCenterX) * strength * 0.3;
          const deltaY = (e.clientY - elementCenterY) * strength * 0.3;
          (element as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        } else {
          (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Initial scroll check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const navigation = [{
    name: "Home",
    href: "home"
  }, {
    name: "About",
    href: "about"
  }, {
    name: "Experience",
    href: "experience"
  }, {
    name: "Skills",
    href: "skills"
  }, {
    name: "Services",
    href: "services"
  }, {
    name: "Projects",
    href: "projects"
  }, {
    name: "Certificates",
    href: "certificates"
  }, {
    name: "Internships",
    href: "internships"
  }, {
    name: "Contact",
    href: "contact"
  }];
  const skills = [{
    category: "Languages",
    items: ["C++", "C", "Python", "MATLAB", "HTML", "CSS", "JavaScript"]
  }, {
    category: "Frameworks",
    items: ["React", "MERN Stack", "Git", "GitHub"]
  }, {
    category: "Expertise",
    items: ["Frontend Development", "Backend Development", "UI/UX Design", "AI & ML", "DSA", "OS", "CN", "Compiler Design"]
  }];
  const services = [{
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces that enhance user experience and drive engagement."
  }, {
    icon: <Code2 className="h-8 w-8" />,
    title: "Frontend Development",
    description: "Building responsive and interactive web applications using modern frameworks like React and cutting-edge technologies."
  }, {
    icon: <Brain className="h-8 w-8" />,
    title: "AI/ML & Data Analytics",
    description: "Developing intelligent solutions using machine learning algorithms and providing data-driven insights for informed decision making."
  }, {
    icon: <Globe className="h-8 w-8" />,
    title: "Backend Development",
    description: "Developing robust server-side applications with secure APIs and efficient database management systems."
  }, {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Full Stack Development",
    description: "End-to-end web development solutions combining frontend and backend technologies for complete digital products."
  }];
  const projects = [{
    title: "House Price Prediction",
    description: "A machine learning model that estimates real estate prices based on various features like location, size, and amenities.",
    tech: ["Python", "ML", "Data Analysis"],
    image: "/api/placeholder/400/250"
  }, {
    title: "E-commerce Website",
    description: "A fully functional online store with frontend and backend integration, featuring user authentication and payment processing.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "/api/placeholder/400/250"
  }];
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl gradient-text">Piyush Thakur</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map(item => <button key={item.name} onClick={() => scrollToSection(item.href)} className={`px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}`}>
                  {item.name}
                </button>)}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-muted-foreground hover:text-primary">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden bg-background border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => <button key={item.name} onClick={() => scrollToSection(item.href)} className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left">
                  {item.name}
                </button>)}
            </div>
          </div>}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background with Parallax */}
        <div className="absolute inset-0 gradient-bg opacity-10 parallax-bg" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
        
        {/* Enhanced Floating Elements with Parallax */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full parallax-element hidden lg:block" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/30 rounded-full parallax-element hidden lg:block" style={{ transform: `translateY(${scrollY * 0.4}px)` }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-tech-purple/25 rounded-full parallax-element hidden lg:block" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-tech-blue/20 rounded-full parallax-element hidden lg:block" style={{ transform: `translateY(${scrollY * 0.6}px)` }}></div>
        
        {/* 3D Background with Parallax */}
        <div className="absolute inset-0 opacity-30 parallax-bg" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <Hero3D />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full section-padding pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Glass Card with Content */}
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                    <span className="text-accent font-medium">Available for Freelance</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Hi, I'm{" "}
                    <span className="text-primary">Piyush Thakur</span>
                  </h1>
                  
                  <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground min-h-[3rem]">
                    <Typewriter texts={["UI/UX Designer", "Web Developer", "Full Stack Developer", "Problem Solver"]} speed={100} deleteSpeed={50} pauseDuration={2000} />
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">Passionate about creating digital experiences that matter. Currently pursuing B.Tech at JUIT Solan, I specialize in full-stack development,ai/ml,data analytic and user-centered design.</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Projects Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </div>
                
                {/* Enhanced Buttons with Apple-style animations */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => scrollToSection("projects")} className="btn-modern text-primary-foreground px-8 py-4 text-lg font-semibold relative group magnetic-btn">
                    <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    View My Work
                  </Button>
                  <a href="https://drive.google.com/uc?export=download&id=1gcZ50WLe_ma7z_c5RjtRgOrAytrw-yyu" download="Piyush_Thakur_Resume.pdf" className="inline-flex items-center justify-center glass-enhanced border-2 border-accent/30 hover:border-accent px-8 py-4 text-lg font-semibold group rounded-md magnetic-btn">
                    <Star className="h-5 w-5 mr-2 group-hover:animate-spin" />
                    Download Resume
                  </a>
                  <Button onClick={() => scrollToSection("contact")} variant="outline" className="glass-enhanced border-2 border-primary/30 hover:border-primary px-8 py-4 text-lg font-semibold group magnetic-btn">
                    <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Let's Talk
                  </Button>
                </div>
              
              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                <span className="text-sm font-medium text-muted-foreground">Connect with me:</span>
                <div className="flex gap-4">
                  <a 
                    href="mailto:27piyushthakur27@gmail.com" 
                    className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-all hover:scale-110 magnetic-btn group"
                  >
                    <Mail className="h-5 w-5 group-hover:animate-pulse" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/piyush-thakur-952364296" 
                    className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-all hover:scale-110 magnetic-btn group"
                  >
                    <Linkedin className="h-5 w-5 group-hover:animate-pulse" />
                  </a>
                  <a 
                    href="https://github.com/27Piyush27/piyush" 
                    className="p-3 glass-card rounded-full text-muted-foreground hover:text-primary transition-all hover:scale-110 magnetic-btn group"
                  >
                    <Github className="h-5 w-5 group-hover:animate-pulse" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Side - Enhanced 3D Visual */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-lg">
                {/* Main Avatar Circle with Modern Design */}
                <div className="aspect-square relative">
                  {/* Outer Ring with Gradient */}
                  <div className="absolute inset-0 rounded-full gradient-bg p-2 floating-1">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center shadow-elegant">
                      {/* Inner Avatar with Modern Typography */}
                      <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-br from-primary via-tech-purple to-tech-emerald flex items-center justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <span className="relative z-10 text-6xl font-serif font-bold">PT</span>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1500"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Tech Icons with Modern Styling */}
                  <div className="absolute -top-8 -right-8 p-4 glass-card rounded-2xl floating-2 shadow-elegant">
                    <Code2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute top-1/2 -left-10 p-4 glass-card rounded-2xl floating-3 shadow-elegant">
                    <Palette className="h-8 w-8 text-accent" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 p-4 glass-card rounded-2xl floating-1 shadow-elegant">
                    <Brain className="h-8 w-8 text-tech-emerald" />
                  </div>
                  <div className="absolute top-1/4 -right-12 p-4 glass-card rounded-2xl floating-2 shadow-elegant">
                    <Star className="h-8 w-8 text-tech-amber" />
                  </div>
                </div>
                
                {/* Ambient Elements */}
                <div className="absolute top-12 right-12 w-16 h-16 bg-gradient-to-br from-accent/40 to-tech-emerald/40 rounded-full floating-1 blur-sm"></div>
                <div className="absolute bottom-16 left-8 w-12 h-12 bg-gradient-to-br from-tech-amber/50 to-primary/50 rounded-full floating-3 blur-sm"></div>
                <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-tech-purple/40 to-tech-blue/40 rounded-full floating-2 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground mx-auto" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium">Discover More</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-section-bg animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-gradient">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
              Passionate about creating digital experiences that blend aesthetic beauty with functional excellence.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-balance">
                I am a UI/UX designer, web developer, and AI/ML enthusiast, currently in my 4th year pursuing 
                B.Tech at Jaypee University of Information Technology, Solan. I achieved 92% in Class 12 and 
                90% in Class 10 from MRA DAV Public School, Solan.
              </p>
              
              <p className="text-lg leading-relaxed text-balance">
                My journey in technology has been driven by curiosity and the desire to create meaningful 
                digital experiences. I combine technical expertise with creative design thinking to build 
                solutions that not only work seamlessly but also delight users at every interaction.
              </p>
              
              <p className="text-lg leading-relaxed text-balance">
                With expertise spanning from AI/ML algorithms to intuitive user interfaces, I bridge the 
                gap between complex technology and elegant user experiences.
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">B.Tech - Final Year</h4>
                    <p className="text-muted-foreground">Jaypee University of Information Technology, Solan</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Class 12 - 92%</h4>
                    <p className="text-muted-foreground">MRA DAV Public School, Solan</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Class 10 - 90%</h4>
                    <p className="text-muted-foreground">MRA DAV Public School, Solan</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-lg text-muted-foreground">
              Building expertise through diverse internships and freelance projects.
            </p>
          </div>
          
          <div className="space-y-8">
            <Card className="p-8 card-hover">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Web Development Intern</h3>
                  <p className="text-primary font-medium mb-2">Internee Organisation</p>
                  <p className="text-muted-foreground">
                    Gained hands-on experience in web development, working on real-world projects 
                    and collaborating with development teams.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 card-hover">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-tech-blue/10 rounded-lg">
                  <Code2 className="h-6 w-6 text-tech-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">AI Intern</h3>
                  <p className="text-tech-blue font-medium mb-2">Codec Technologies</p>
                  <p className="text-muted-foreground">
                    Explored artificial intelligence and machine learning technologies, 
                    working on innovative AI-driven solutions.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 card-hover">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Freelancer</h3>
                  <p className="text-accent font-medium mb-2">Independent</p>
                  <p className="text-muted-foreground">
                    Providing web design and development services to clients, delivering 
                    custom solutions tailored to their specific needs.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive toolkit for modern web development and design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => <Card key={index} className="p-6 card-hover">
                <h3 className="text-xl font-semibold mb-4 text-center">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => <Badge key={skillIndex} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>)}
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive digital solutions tailored to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => <Card key={index} className="p-6 card-hover text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              A showcase of my recent work and technical capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => <Card key={index} className="overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-tech-blue/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/50">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>)}
                  </div>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Certificates</h2>
            <p className="text-lg text-muted-foreground">
              Professional certifications and achievements in technology and data analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Intel Digital India Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-tech-blue/10 p-4">
                <img src="/src/assets/intel-certificate.avif" alt="Intel Digital India - AI for All Program Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">Intel Digital India</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI for All Program</h3>
                <p className="text-muted-foreground text-xs">
                  Comprehensive program covering artificial intelligence fundamentals and practical AI applications.
                </p>
              </div>
            </Card>

            {/* Deloitte Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-accent/10 to-tech-purple/10 p-4">
                <img src="/src/assets/deloitte-certificate.avif" alt="Deloitte Data Analytics Job Simulation Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">Deloitte</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Analytics Job Simulation</h3>
                <p className="text-muted-foreground text-xs">
                  Real-world data analytics experience through comprehensive job simulation program.
                </p>
              </div>
            </Card>

            {/* Newton School Python Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-tech-green/10 p-4">
                <img src="/src/assets/newton-python-certificate.avif" alt="Newton School Python Course Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">Newton School</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Python Course</h3>
                <p className="text-muted-foreground text-xs">
                  Comprehensive Python programming course covering fundamentals and advanced concepts.
                </p>
              </div>
            </Card>

            {/* NPTEL Cloud Computing Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-accent/10 to-primary/10 p-4">
                <img src="/src/assets/nptel-cloud-certificate.avif" alt="NPTEL Cloud Computing Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">NPTEL</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Cloud Computing</h3>
                <p className="text-muted-foreground text-xs">
                  Online certification covering cloud computing concepts and practical applications.
                </p>
              </div>
            </Card>

            {/* Udacity Generative AI Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-tech-blue/10 to-accent/10 p-4">
                <img src="/src/assets/udacity-genai-certificate.avif" alt="Udacity Introducing Generative AI with AWS Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">Udacity</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Generative AI with AWS</h3>
                <p className="text-muted-foreground text-xs">
                  Introduction to generative AI technologies and AWS implementation strategies.
                </p>
              </div>
            </Card>

            {/* Udemy Python ML Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-tech-purple/10 to-primary/10 p-4">
                <img src="/src/assets/udemy-python-ml-certificate.avif" alt="Udemy Python for Data Science and Machine Learning Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">Udemy</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Python for Data Science & ML</h3>
                <p className="text-muted-foreground text-xs">
                  Complete course covering Python for data science and machine learning applications.
                </p>
              </div>
            </Card>

            {/* Udemy UI/UX Certificate */}
            <Card className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-tech-green/10 to-tech-purple/10 p-4">
                <img src="/src/assets/udemy-uiux-certificate.avif" alt="Udemy UI/UX using Figma and Adobe XD Certificate" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">Udemy</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">UI/UX with Figma & Adobe XD</h3>
                <p className="text-muted-foreground text-xs">
                  User interface and experience design using Figma and Adobe XD tools.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="section-padding bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Internships</h2>
            <p className="text-lg text-muted-foreground">
              Professional internship experiences and practical learning achievements.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* InternPE Web Development Internship */}
            <Card className="overflow-hidden card-hover">
              <div className="h-64 bg-gradient-to-br from-primary/10 to-tech-blue/10 p-6">
                <img 
                  src="/src/assets/internpe-certificate.png" 
                  alt="InternPE Web Development Internship Certificate" 
                  className="w-full h-full object-contain rounded-lg shadow-lg" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className="text-sm">InternPE</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-3">Web Development Internship</h3>
                <p className="text-muted-foreground mb-4">
                  Completed comprehensive web development internship program focusing on modern web technologies, 
                  project development, and industry best practices.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://drive.google.com/file/d/1VgTUdpvAbYmmW3hHoPl3kKo-FsN8DN4X/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Button variant="outline" className="glass-card">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </a>
                  <a 
                    href="https://drive.google.com/uc?export=download&id=1VgTUdpvAbYmmW3hHoPl3kKo-FsN8DN4X"
                    download
                    className="inline-flex items-center"
                  >
                    <Button className="btn-modern text-primary-foreground">
                      <Award className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:27piyushthakur27@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      27piyushthakur27@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+918580630951" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 8580630951
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a href="https://linkedin.com/in/piyush-thakur-952364296" className="text-muted-foreground hover:text-primary transition-colors">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Github className="h-5 w-5 text-primary" />
                    <a href="https://github.com/27Piyush27/piyush" className="text-muted-foreground hover:text-primary transition-colors">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input type="text" id="name" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input type="email" id="email" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Tell me about your project..."></textarea>
                </div>
                <Button type="submit" className="btn-primary w-full text-primary-foreground">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              © 2024 Piyush Thakur. All rights reserved. Built with passion and modern web technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Portfolio;