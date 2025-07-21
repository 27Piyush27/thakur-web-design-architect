import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Hero3D from "@/components/Hero3D";
import { Typewriter } from "@/components/Typewriter";
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Globe, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ChevronDown,
  Menu,
  X,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Send,
  Sparkles,
  Zap,
  Star
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "services", "projects", "certificates", "contact"];
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Experience", href: "experience" },
    { name: "Skills", href: "skills" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "Certificates", href: "certificates" },
    { name: "Contact", href: "contact" },
  ];

  const skills = [
    { category: "Languages", items: ["C++", "C", "Python", "MATLAB", "HTML", "CSS", "JavaScript"] },
    { category: "Frameworks", items: ["React", "MERN Stack", "Git", "GitHub"] },
    { category: "Expertise", items: ["Frontend Development", "Backend Development", "UI/UX Design", "AI & ML", "DSA", "OS", "CN", "Compiler Design"] }
  ];

  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing user interfaces that enhance user experience and drive engagement."
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Frontend Development", 
      description: "Building responsive and interactive web applications using modern frameworks like React and cutting-edge technologies."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Backend Development",
      description: "Developing robust server-side applications with secure APIs and efficient database management systems."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Full Stack Development",
      description: "End-to-end web development solutions combining frontend and backend technologies for complete digital products."
    }
  ];

  const projects = [
    {
      title: "House Price Prediction",
      description: "A machine learning model that estimates real estate prices based on various features like location, size, and amenities.",
      tech: ["Python", "ML", "Data Analysis"],
      image: "/api/placeholder/400/250"
    },
    {
      title: "E-commerce Website",
      description: "A fully functional online store with frontend and backend integration, featuring user authentication and payment processing.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl gradient-text">Piyush Thakur</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-primary"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full floating-1 hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/30 rounded-full floating-2 hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-tech-purple/25 rounded-full floating-3 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-tech-blue/20 rounded-full floating-1 hidden lg:block"></div>
        
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
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
                    <Typewriter 
                      texts={[
                        "UI/UX Designer",
                        "Web Developer",
                        "Full Stack Developer",
                        "Problem Solver"
                      ]}
                      speed={100}
                      deleteSpeed={50}
                      pauseDuration={2000}
                    />
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Passionate about creating digital experiences that matter. Currently pursuing B.Tech at JUIT Solan, 
                  I specialize in full-stack development and user-centered design.
                </p>
                
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
                
                {/* Enhanced Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => scrollToSection("projects")}
                    className="btn-modern text-primary-foreground px-8 py-4 text-lg font-semibold relative group"
                  >
                    <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    View My Work
                  </Button>
                  <a 
                    href="https://drive.google.com/uc?export=download&id=1gcZ50WLe_ma7z_c5RjtRgOrAytrw-yyu"
                    download="Piyush_Thakur_Resume.pdf"
                    className="inline-flex items-center justify-center glass-card border-2 border-accent/30 hover:border-accent px-8 py-4 text-lg font-semibold group rounded-md transition-all hover:scale-105"
                  >
                    <Star className="h-5 w-5 mr-2 group-hover:animate-spin" />
                    Download Resume
                  </a>
                  <Button 
                    onClick={() => scrollToSection("contact")}
                    variant="outline" 
                    className="glass-card border-2 border-primary/30 hover:border-primary px-8 py-4 text-lg font-semibold group"
                  >
                    <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Let's Talk
                  </Button>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-6 pt-4">
                  <span className="text-sm text-muted-foreground">Follow me:</span>
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
            </div>
            
            {/* Right Side - Enhanced Visual */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative">
                {/* Main Avatar Circle */}
                <div className="w-80 h-80 relative">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-tech-blue to-tech-purple p-1 floating-1">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      {/* Inner Avatar */}
                      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-tech-blue flex items-center justify-center text-white text-6xl font-bold relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <span className="relative z-10">PT</span>
                        {/* Animated Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Tech Icons */}
                  <div className="absolute -top-4 -right-4 p-3 glass-card rounded-full floating-2">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="absolute top-1/2 -left-6 p-3 glass-card rounded-full floating-3">
                    <Palette className="h-6 w-6 text-accent" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 p-3 glass-card rounded-full floating-1">
                    <Smartphone className="h-6 w-6 text-tech-purple" />
                  </div>
                  <div className="absolute top-1/4 -right-8 p-3 glass-card rounded-full floating-2">
                    <Star className="h-6 w-6 text-tech-blue" />
                  </div>
                </div>
                
                {/* Orbiting Elements */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-accent/80 rounded-full floating-1 opacity-80"></div>
                <div className="absolute bottom-12 left-4 w-8 h-8 bg-tech-purple/70 rounded-full floating-3 opacity-60"></div>
                <div className="absolute top-1/2 right-16 w-6 h-6 bg-primary/60 rounded-full floating-2 opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground mx-auto" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A passionate technologist with a strong foundation in computer science and a creative approach to problem-solving.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I am a UI/UX designer, web developer, and coder, currently in my 4th year pursuing B.Tech at 
                Jaypee University of Information Technology, Solan. I achieved 92% in Class 12 and 90% in Class 10 
                from MRA DAV Public School, Solan.
              </p>
              
              <p className="text-lg leading-relaxed">
                My journey in technology has been driven by curiosity and the desire to create meaningful digital experiences. 
                I combine technical expertise with creative design thinking to build solutions that not only work well but 
                also delight users.
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
      <section id="experience" className="section-padding">
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
            {skills.map((skillGroup, index) => (
              <Card key={index} className="p-6 card-hover">
                <h3 className="text-xl font-semibold mb-4 text-center">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
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
            {services.map((service, index) => (
              <Card key={index} className="p-6 card-hover text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Card>
            ))}
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
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-tech-blue/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/50">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </Card>
            ))}
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
                <img 
                  src="/src/assets/intel-certificate.avif" 
                  alt="Intel Digital India - AI for All Program Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                <img 
                  src="/src/assets/deloitte-certificate.avif" 
                  alt="Deloitte Data Analytics Job Simulation Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                <img 
                  src="/src/assets/newton-python-certificate.avif" 
                  alt="Newton School Python Course Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                <img 
                  src="/src/assets/nptel-cloud-certificate.avif" 
                  alt="NPTEL Cloud Computing Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                <img 
                  src="/src/assets/udacity-genai-certificate.avif" 
                  alt="Udacity Introducing Generative AI with AWS Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                <img 
                  src="/src/assets/udemy-python-ml-certificate.avif" 
                  alt="Udemy Python for Data Science and Machine Learning Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                <img 
                  src="/src/assets/udemy-uiux-certificate.avif" 
                  alt="Udemy UI/UX using Figma and Adobe XD Certificate"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Tell me about your project..."
                  ></textarea>
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
    </div>
  );
};

export default Portfolio;