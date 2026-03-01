import { useState, useEffect, useRef, Suspense, lazy, memo, useCallback, useMemo } from "react";
import { ChatBot } from "@/components/ChatBot";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "@/components/Typewriter";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { Code2, Palette, Smartphone, Globe, Mail, Phone, Github, Linkedin, ExternalLink, ChevronDown, Menu, X, MapPin, Calendar, Award, Briefcase, GraduationCap, Send, Sparkles, Zap, Star, Brain, Download, ArrowRight, MousePointerClick, Quote, CheckCircle2, Loader2, User, MessageSquare } from "lucide-react";

import udacityGenaiCert from "@/assets/udacity-genai-certificate.avif";
import udemyPythonMlCert from "@/assets/udemy-python-ml-certificate.avif";
import udemyUiuxCert from "@/assets/udemy-uiux-certificate.avif";
import nptelCloudCert from "@/assets/nptel-cloud-certificate.avif";
import newtonPythonCert from "@/assets/newton-python-certificate.avif";
import deloitteCert from "@/assets/deloitte-certificate.avif";
import intelCert from "@/assets/intel-certificate.avif";
import internpeCert from "@/assets/internpe-certificate.png";

const Hero3D = lazy(() => import("@/components/Hero3D"));

// ===== 7. ANIMATED LOADING SCREEN =====
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'assembling' | 'filling' | 'done'>('assembling');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setPhase('done');
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    if (progress > 30) setPhase('filling');
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Logo assembly animation */}
      <div className="relative mb-8">
        <motion.span
          className="text-6xl sm:text-7xl font-serif font-bold text-gradient select-none inline-block"
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          P
        </motion.span>
        <motion.span
          className="text-6xl sm:text-7xl font-serif font-bold text-gradient select-none inline-block"
          initial={{ opacity: 0, y: -40, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          T
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-tech-blue to-tech-emerald rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        className="text-muted-foreground text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {progress}%
      </motion.p>
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// ===== Modern Animation Variants =====
const smoothEase = "easeOut" as const;

const blurFadeUp = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: smoothEase } },
};

const blurFadeLeft = {
  hidden: { opacity: 0, filter: "blur(8px)", x: -40 },
  visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.6, ease: smoothEase } },
};

const blurFadeRight = {
  hidden: { opacity: 0, filter: "blur(8px)", x: 40 },
  visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.6, ease: smoothEase } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const scaleBlur = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: smoothEase } },
};

// ===== 2. INTERACTIVE CURSOR =====
const InteractiveCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, button, [role="button"], .cursor-expand');
      if (link) {
        setIsHovering(true);
        setHoverText(link.getAttribute('data-cursor-text') || "");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, button, [role="button"], .cursor-expand');
      if (link) {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer glow ring */}
      <div
        ref={cursorRef}
        className={`cursor-ring hidden md:flex items-center justify-center ${isHovering ? 'cursor-ring-expanded' : ''}`}
      >
        {hoverText && <span className="text-[10px] font-medium text-primary">{hoverText}</span>}
      </div>
      {/* Inner dot */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
    </>
  );
};

// Spotlight Card Component
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
};

// ===== 3. HOVER CARD REVEAL (B&W → Color, social links slide) =====
const HoverRevealCard = ({ icon, title, description, color, socials }: { 
  icon: React.ReactNode; title: string; description: string; color: string; 
  socials?: { icon: React.ReactNode; href: string }[];
}) => {
  return (
    <SpotlightCard className="rounded-2xl bg-card h-full group">
      <motion.div
        className="p-6 sm:p-8 text-center relative z-10 h-full flex flex-col"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {/* Icon with grayscale→color on hover */}
        <div className={`mx-auto mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-primary grayscale group-hover:grayscale-0 transition-all duration-300`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
        
        {/* Social links slide up on hover */}
        {socials && (
          <div className="overflow-hidden">
            <motion.div
              className="flex justify-center gap-3 mt-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>
        )}
      </motion.div>
    </SpotlightCard>
  );
};

// Counter Animation Hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as any, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return { count, ref };
};

// Animated Section with story-driven background
const AnimatedSection = ({ children, id, className, bgColor }: { children: React.ReactNode; id: string; className?: string; bgColor?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {children}
    </motion.section>
  );
};

// Skill Marquee
const SkillMarquee = memo(({ items }: { items: string[] }) => (
  <div className="overflow-hidden py-4">
    <div className="marquee-track">
      {[...items, ...items].map((skill, i) => (
        <span key={i} className="skill-badge whitespace-nowrap press-effect cursor-default">{skill}</span>
      ))}
    </div>
  </div>
));

// ===== 18. TESTIMONIAL SLIDER =====
const testimonials = [
  { name: "Rajesh Kumar", role: "CEO, TechStartup", quote: "Piyush delivered an exceptional website that exceeded our expectations. His attention to detail and creative approach made all the difference.", avatar: "RK" },
  { name: "Ananya Sharma", role: "Product Manager", quote: "Working with Piyush was a fantastic experience. He understood our vision perfectly and translated it into a beautiful, functional product.", avatar: "AS" },
  { name: "Vikram Singh", role: "Founder, DesignCo", quote: "The quality of work and professionalism is outstanding. Piyush has a rare combination of technical skill and design sensibility.", avatar: "VS" },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Quote className="h-10 w-10 text-primary/20 mx-auto mb-6" />
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-6 italic">
            "{testimonials[current].quote}"
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-tech-purple flex items-center justify-center text-primary-foreground font-bold text-sm">
              {testimonials[current].avatar}
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">{testimonials[current].name}</p>
              <p className="text-muted-foreground text-xs">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Star rating animation */}
      <div className="flex justify-center gap-1 mt-6">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={`${current}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
          >
            <Star className="h-4 w-4 fill-tech-amber text-tech-amber" />
          </motion.div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

// ===== 6. CONTACT FORM WITH MICRO-INTERACTIONS =====
const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [shakeField, setShakeField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email.includes('@')) {
      setShakeField('email');
      setTimeout(() => setShakeField(null), 600);
      return;
    }
    if (!formData.name) {
      setShakeField('name');
      setTimeout(() => setShakeField(null), 600);
      return;
    }

    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
      {/* Name field with floating label */}
      {(['name', 'email'] as const).map(field => (
        <div key={field} className={`relative ${shakeField === field ? 'form-shake' : ''}`}>
          <input
            type={field === 'email' ? 'email' : 'text'}
            value={formData[field]}
            onChange={e => setFormData(d => ({ ...d, [field]: e.target.value }))}
            onFocus={() => setFocusedField(field)}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            placeholder={field}
            id={field}
          />
          <label
            htmlFor={field}
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === field || formData[field]
                ? '-top-2.5 text-xs text-primary bg-card px-1'
                : 'top-3 text-sm text-muted-foreground'
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
        </div>
      ))}

      {/* Message textarea */}
      <div className="relative">
        <textarea
          value={formData.message}
          onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          rows={4}
          className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
          placeholder="message"
          id="message"
        />
        <label
          htmlFor="message"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            focusedField === 'message' || formData.message
              ? '-top-2.5 text-xs text-primary bg-card px-1'
              : 'top-3 text-sm text-muted-foreground'
          }`}
        >
          Message
        </label>
      </div>

      {/* Submit button with state transitions */}
      <motion.button
        type="submit"
        disabled={formState !== 'idle'}
        className="w-full py-3 rounded-xl font-semibold text-primary-foreground bg-gradient-to-r from-primary to-tech-purple shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 relative overflow-hidden"
        whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
        whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
      >
        <AnimatePresence mode="wait">
          {formState === 'idle' && (
            <motion.span key="idle" className="flex items-center justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Send className="h-4 w-4" /> Send Message
            </motion.span>
          )}
          {formState === 'sending' && (
            <motion.span key="sending" className="flex items-center justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </motion.span>
          )}
          {formState === 'sent' && (
            <motion.span key="sent" className="flex items-center justify-center gap-2" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <CheckCircle2 className="h-4 w-4" /> Sent!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
};

const OptimizedPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // ===== 1. HERO PARALLAX - foreground & background at different speeds =====
  const heroParallaxBg = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroParallaxFg = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // ===== 11. STORY-DRIVEN SCROLL - section bg changes =====
  const sectionBgProgress = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [
    'hsl(var(--background))',
    'hsl(var(--background))',
    'hsl(var(--section-bg))',
    'hsl(var(--background))',
    'hsl(var(--section-bg))',
    'hsl(var(--background))',
  ]);

  useSmoothScroll();

  // Counter hooks
  const yearsCounter = useCounter(2);
  const projectsCounter = useCounter(15);
  const clientsCounter = useCounter(5);

  const navigation = useMemo(() => [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Experience", href: "experience" },
    { name: "Skills", href: "skills" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "Testimonials", href: "testimonials" },
    { name: "Certificates", href: "certificates" },
    { name: "Internships", href: "internships" },
    { name: "Contact", href: "contact" },
  ], []);

  const allSkills = useMemo(() => ["C++", "C", "Python", "MATLAB", "HTML", "CSS", "JavaScript", "React", "MERN Stack", "Git", "GitHub", "Frontend Dev", "Backend Dev", "UI/UX Design", "AI & ML", "DSA"], []);

  const skills = useMemo(() => [
    { category: "Languages", items: ["C++", "C", "Python", "MATLAB", "HTML", "CSS", "JavaScript"], icon: <Code2 className="h-6 w-6" /> },
    { category: "Frameworks", items: ["React", "MERN Stack", "Git", "GitHub"], icon: <Globe className="h-6 w-6" /> },
    { category: "Expertise", items: ["Frontend Development", "Backend Development", "UI/UX Design", "AI & ML", "DSA", "OS", "CN", "Compiler Design"], icon: <Brain className="h-6 w-6" /> },
  ], []);

  const services = useMemo(() => [
    { icon: <Palette className="h-7 w-7" />, title: "UI/UX Design", description: "Creating intuitive and visually appealing user interfaces that enhance user experience and drive engagement.", color: "from-primary/20 to-tech-purple/20" },
    { icon: <Code2 className="h-7 w-7" />, title: "Frontend Development", description: "Building responsive and interactive web applications using modern frameworks like React and cutting-edge technologies.", color: "from-tech-blue/20 to-primary/20" },
    { icon: <Brain className="h-7 w-7" />, title: "AI/ML & Data Analytics", description: "Developing intelligent solutions using machine learning algorithms and providing data-driven insights.", color: "from-tech-emerald/20 to-tech-blue/20" },
    { icon: <Globe className="h-7 w-7" />, title: "Backend Development", description: "Developing robust server-side applications with secure APIs and efficient database management systems.", color: "from-tech-purple/20 to-tech-emerald/20" },
    { icon: <Smartphone className="h-7 w-7" />, title: "Full Stack Development", description: "End-to-end web development solutions combining frontend and backend technologies.", color: "from-primary/20 to-accent/20" },
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
    <>
      {/* ===== 7. LOADING SCREEN ===== */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-background noise-overlay relative">
        {/* ===== 2. INTERACTIVE CURSOR ===== */}
        <InteractiveCursor />

        {/* ===== 17. SCROLL PROGRESS INDICATOR ===== */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-tech-blue to-tech-emerald z-[60] origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* ===== 15. NAVIGATION WITH STAGGER ANIMATIONS ===== */}
        <motion.nav
          className="fixed top-0 w-full z-50 transition-all duration-300"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: scrollY > 50 ? 'hsl(var(--background) / 0.85)' : 'transparent',
            backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'none',
            borderBottom: scrollY > 50 ? '1px solid hsl(var(--border) / 0.5)' : '1px solid transparent',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <motion.div
                className="font-bold text-lg tracking-tight cursor-pointer hover-underline"
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-gradient">Piyush Thakur</span>
              </motion.div>

              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item, i) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 relative ${
                      activeSection === item.href
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute inset-0 bg-primary rounded-full"
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* ===== 15. HAMBURGER → X ANIMATION ===== */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border/50 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-4 pt-2 pb-4 space-y-1">
                  {navigation.map((item, i) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all press-effect ${
                        activeSection === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* ===== 1. HERO SECTION WITH SCROLL-LINKED PARALLAX ===== */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background parallax layer (moves slower) */}
          <motion.div className="absolute inset-0 opacity-40" style={{ y: heroParallaxBg }}>
            <Suspense fallback={<LoadingSpinner />}>
              <Hero3D />
            </Suspense>
          </motion.div>

          {/* Aurora Background */}
          <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: heroParallaxBg }}>
            <div className="aurora-bg absolute inset-0" />
            <motion.div
              className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[150px]"
              animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-tech-blue/12 blur-[130px]"
              animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-tech-emerald/8 blur-[100px]"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="mesh-gradient absolute inset-0 opacity-30" />
          </motion.div>

          {/* Foreground content (moves faster - tied to scroll) */}
          <motion.div
            className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20"
            style={{ y: heroParallaxFg, opacity: heroOpacity, scale: heroScale }}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              >
                <div className="space-y-6">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <span className="text-accent text-sm font-medium">Available for Freelance</span>
                  </motion.div>

                  {/* ===== 14. KINETIC TYPOGRAPHY ===== */}
                  <motion.h1
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    {"Hi, I'm ".split('').map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.6 + i * 0.04, type: "spring", stiffness: 200 }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                    <br />
                    <span className="text-shimmer relative kinetic-text">
                      {"Piyush Thakur".split('').map((char, i) => (
                        <motion.span
                          key={i}
                          className="inline-block cursor-default kinetic-letter"
                          initial={{ opacity: 0, y: 30, scale: 0.5 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.9 + i * 0.05, type: "spring", stiffness: 300, damping: 15 }}
                          whileHover={{ y: -8, scale: 1.15, color: 'hsl(var(--tech-blue))' }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                      <motion.span
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-tech-blue to-tech-emerald rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                      />
                    </span>
                  </motion.h1>

                  <motion.div
                    className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground min-h-[3rem]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Typewriter texts={["UI/UX Designer", "Web Developer", "Full Stack Developer", "Problem Solver"]} speed={100} deleteSpeed={50} pauseDuration={2000} />
                  </motion.div>

                  <motion.p
                    className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Passionate about creating digital experiences that matter. Specializing in full-stack development, AI/ML, and data analytics.
                  </motion.p>
                </div>

                {/* Animated Counters */}
                <motion.div
                  className="grid grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {[
                    { ref: yearsCounter.ref, count: yearsCounter.count, suffix: "+", label: "Years Exp." },
                    { ref: projectsCounter.ref, count: projectsCounter.count, suffix: "+", label: "Projects" },
                    { ref: clientsCounter.ref, count: clientsCounter.count, suffix: "+", label: "Clients" },
                  ].map((stat, i) => (
                    <div key={i} ref={stat.ref as any} className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-gradient tabular-nums">
                        {stat.count}{stat.suffix}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* ===== 4. ANIMATED CTA BUTTONS ===== */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={() => scrollToSection("projects")}
                      className="bg-gradient-to-r from-primary to-tech-purple text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow group cta-breathing relative overflow-hidden"
                      data-cursor-text="View"
                    >
                      {/* Shimmer sweep */}
                      <span className="cta-shimmer" />
                      <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse relative z-10" />
                      <span className="relative z-10">View My Work</span>
                      <motion.span
                        className="relative z-10"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      variant="outline"
                      className="px-8 py-6 text-base font-semibold rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      data-cursor-text="Contact"
                    >
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Let's Talk
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="flex justify-center lg:justify-end relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
              >
                <div className="relative w-72 sm:w-80 lg:w-96">
                  <div className="aspect-square relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-tech-purple to-tech-emerald p-[3px]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-primary via-tech-purple to-tech-emerald flex items-center justify-center overflow-hidden">
                          <span className="text-6xl sm:text-7xl font-serif font-bold text-primary-foreground select-none">PT</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating icons */}
                    {[
                      { icon: <Code2 className="h-5 w-5 text-primary" />, pos: "-top-4 -right-4", delay: 0 },
                      { icon: <Palette className="h-5 w-5 text-accent" />, pos: "top-1/2 -left-6 -translate-y-1/2", delay: 1 },
                      { icon: <Brain className="h-5 w-5 text-tech-emerald" />, pos: "-bottom-4 left-1/2 -translate-x-1/2", delay: 2 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className={`absolute ${item.pos} p-3 rounded-2xl bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                      >
                        {item.icon}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('about')}
          >
            <span className="text-xs text-muted-foreground font-medium">Scroll</span>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </section>

        {/* ===== 12. SPLIT-SCREEN ABOUT SECTION ===== */}
        <AnimatedSection id="about" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">About Me</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">My Journey</h2>
            </motion.div>

            {/* Split-screen: left slides up, right slides down */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center split-screen-container">
              <motion.div
                className="space-y-6"
                variants={blurFadeLeft}
                whileInView={{ y: 0 }}
                initial={{ y: 40 }}
                transition={{ duration: 0.8 }}
              >
                <SpotlightCard className="rounded-2xl p-8 bg-card">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Star className="h-5 w-5 text-primary" />
                      Who I Am
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      I'm a passionate B.Tech student at JUIT Solan with a deep love for technology and innovation.
                      My journey in programming began with curiosity and has evolved into expertise across
                      multiple domains including web development, AI/ML, and data analytics.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      I believe in creating digital solutions that not only solve problems but also enhance user experiences.
                      My approach combines technical excellence with creative design thinking.
                    </p>
                  </div>
                </SpotlightCard>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <GraduationCap className="h-6 w-6 text-primary" />, title: "Education", desc: "B.Tech at JUIT Solan" },
                    { icon: <MapPin className="h-6 w-6 text-primary" />, title: "Location", desc: "Himachal Pradesh" },
                  ].map((item, i) => (
                    <motion.div key={i} variants={scaleBlur}>
                      <SpotlightCard className="rounded-2xl p-6 bg-card text-center">
                        <div className="relative z-10">
                          <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">{item.icon}</div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative flex justify-center"
                variants={blurFadeRight}
                whileInView={{ y: 0 }}
                initial={{ y: -40 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-72 sm:w-80 aspect-square relative">
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-tech-purple to-tech-emerald p-[2px]"
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
                      <div className="w-4/5 h-4/5 rounded-3xl bg-gradient-to-br from-primary via-tech-purple to-tech-emerald flex items-center justify-center overflow-hidden">
                        <span className="text-7xl sm:text-8xl font-serif font-bold text-primary-foreground select-none">PT</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* ===== 16. TIMELINE EXPERIENCE SECTION ===== */}
        <AnimatedSection id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Career</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">Experience</h2>
            </motion.div>

            {/* Timeline with animated drawing line */}
            <div className="relative max-w-3xl mx-auto">
              {/* Animated timeline line */}
              <motion.div
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-tech-blue to-tech-emerald origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              <motion.div className="space-y-12" variants={staggerContainer}>
                {[
                  { title: "Frontend Developer", company: "Freelance", period: "2022 – Present", desc: "Developed responsive web applications using React, JavaScript, and modern CSS frameworks. Collaborated with clients to create user-friendly interfaces.", icon: <Briefcase className="h-5 w-5" /> },
                  { title: "Web Development Intern", company: "Various Companies", period: "2023", desc: "Gained hands-on experience in full-stack development, working with MERN stack technologies and contributing to real-world projects.", icon: <Code2 className="h-5 w-5" /> },
                  { title: "B.Tech Student", company: "JUIT Solan", period: "2021 – Present", desc: "Pursuing Bachelor's in Technology with focus on Computer Science. Active participation in coding competitions and tech communities.", icon: <GraduationCap className="h-5 w-5" /> },
                ].map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={i % 2 === 0 ? blurFadeLeft : blurFadeRight}
                    className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline dot with pulse */}
                    <motion.div
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
                    >
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                    </motion.div>

                    {/* Card */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <SpotlightCard className="rounded-2xl bg-card">
                        <motion.div
                          className="p-6 relative z-10"
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">{exp.icon}</div>
                            <span className="text-xs text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full">{exp.period}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
                          <p className="text-primary text-sm font-medium mb-2">{exp.company}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{exp.desc}</p>
                        </motion.div>
                      </SpotlightCard>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* ===== SKILLS SECTION ===== */}
        <AnimatedSection id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-8">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Expertise</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">Skills & Tech Stack</h2>
            </motion.div>

            {/* ===== 8. MARQUEE / INFINITE SCROLL ===== */}
            <motion.div variants={blurFadeUp} className="mb-12">
              <SkillMarquee items={allSkills} />
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainer}>
              {skills.map((cat, i) => (
                <motion.div key={i} variants={scaleBlur}>
                  <SpotlightCard className="rounded-2xl bg-card h-full">
                    <div className="p-6 sm:p-8 relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">{cat.icon}</div>
                        <h3 className="text-lg font-bold">{cat.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((skill, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="press-effect"
                          >
                            <Badge className="skill-badge text-xs">{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== 3. SERVICES WITH HOVER CARD REVEAL ===== */}
        <AnimatedSection id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">What I Do</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">Services</h2>
            </motion.div>

            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
              {services.map((service, i) => (
                <motion.div key={i} variants={scaleBlur}>
                  <HoverRevealCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    color={service.color}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== 10. PROJECTS WITH ANIMATED SHOWCASES ===== */}
        <AnimatedSection id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Portfolio</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">Featured Projects</h2>
            </motion.div>

            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
              {[
                { icon: <Globe className="h-10 w-10 text-primary-foreground" />, gradient: "from-primary to-tech-blue", title: "GMR & Associates", desc: "Professional CA firm website with modern design, service listings, and client portal.", tags: ["React", "UI/UX", "Tailwind"], building: true },
                { icon: <Globe className="h-10 w-10 text-primary-foreground" />, gradient: "from-tech-blue to-accent", title: "E-Commerce Platform", desc: "Full-stack e-commerce solution built with MERN stack.", tags: ["React", "Node.js", "MongoDB"] },
                { icon: <Brain className="h-10 w-10 text-primary-foreground" />, gradient: "from-tech-emerald to-accent", title: "AI Data Analytics", desc: "Machine learning dashboard for data visualization.", tags: ["Python", "ML", "React"] },
                { icon: <Smartphone className="h-10 w-10 text-primary-foreground" />, gradient: "from-tech-purple to-primary", title: "Mobile App UI", desc: "Modern mobile app design with smooth animations.", tags: ["UI/UX", "Figma", "React Native"] },
              ].map((project, i) => (
                <motion.div key={i} variants={scaleBlur} className="h-full">
                  <SpotlightCard className="rounded-2xl bg-card h-full">
                    <motion.div
                      className="p-5 sm:p-6 h-full flex flex-col relative z-10"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* ===== 9/10. PRODUCT SHOWCASE - icon "opens" on hover ===== */}
                      <div className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-xl mb-5 flex items-center justify-center overflow-hidden group/project relative`}>
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          {project.icon}
                        </motion.div>
                        {/* Animated product "deconstruct" overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover/project:opacity-100 transition-opacity duration-500" />
                        <motion.div
                          className="absolute bottom-2 left-2 right-2 text-[10px] text-primary-foreground/80 font-mono opacity-0 group-hover/project:opacity-100 transition-opacity duration-500"
                          initial={false}
                        >
                          {'<'}{project.tags[0]} {'/>'} 
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        {(project as any).building && (
                          <Badge className="bg-tech-emerald/15 text-tech-emerald border-tech-emerald/20 text-[10px] px-2">Building</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">{project.desc}</p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {project.tags.map((tag, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full rounded-xl hover:bg-primary hover:text-primary-foreground transition-all text-sm press-effect" data-cursor-text="Open">
                        <ExternalLink className="h-3.5 w-3.5 mr-2" />
                        {(project as any).building ? "Coming Soon" : "View Project"}
                      </Button>
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={blurFadeUp} className="mt-14 text-center">
              <motion.a
                href="https://github.com/27Piyush27?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-tech-purple text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all press-effect"
                data-cursor-text="GitHub"
              >
                <Github className="h-5 w-5" />
                Explore All on GitHub
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== 18. TESTIMONIALS SECTION ===== */}
        <AnimatedSection id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Feedback</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">What People Say</h2>
            </motion.div>

            <motion.div variants={blurFadeUp}>
              <SpotlightCard className="rounded-2xl bg-card p-8 sm:p-12">
                <div className="relative z-10">
                  <TestimonialSlider />
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== CERTIFICATES SECTION ===== */}
        <AnimatedSection id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Credentials</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">Certifications</h2>
              <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Industry-recognized credentials that validate my expertise.</p>
            </motion.div>

            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
              {[
                { src: udacityGenaiCert, title: "Generative AI", issuer: "Udacity", file: "udacity-genai-certificate.avif" },
                { src: udemyPythonMlCert, title: "Python & Machine Learning", issuer: "Udemy", file: "udemy-python-ml-certificate.avif" },
                { src: udemyUiuxCert, title: "UI/UX Design", issuer: "Udemy", file: "udemy-uiux-certificate.avif" },
                { src: nptelCloudCert, title: "Cloud Computing", issuer: "NPTEL", file: "nptel-cloud-certificate.avif" },
                { src: newtonPythonCert, title: "Python Programming", issuer: "Newton School", file: "newton-python-certificate.avif" },
                { src: deloitteCert, title: "Business Analytics", issuer: "Deloitte", file: "deloitte-certificate.avif" },
              ].map((cert, i) => (
                <motion.div key={i} variants={scaleBlur}>
                  <SpotlightCard className="rounded-2xl bg-card overflow-hidden">
                    <motion.div
                      className="relative z-10"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* B&W → Color on hover */}
                      <div className="relative overflow-hidden group">
                        <motion.img
                          src={cert.src}
                          alt={cert.title}
                          className="w-full h-44 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          loading="lazy"
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold mb-1">{cert.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{cert.issuer}</p>
                        <a href={cert.src} download={cert.file} className="block">
                          <Button variant="outline" className="w-full rounded-xl text-sm press-effect">
                            <Download className="h-3.5 w-3.5 mr-2" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== INTERNSHIPS SECTION ===== */}
        <AnimatedSection id="internships" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={blurFadeUp} className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Industry Experience</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-gradient">Internships</h2>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainer}>
              {[
                { src: intelCert, company: "Intel Corporation", role: "Software Development Intern", period: "Summer 2023", desc: "Worked on optimizing software performance and contributing to Intel's development tools. Gained experience in low-level programming and hardware-software integration.", file: "intel-certificate.avif" },
                { src: internpeCert, company: "InternPe", role: "Web Development Intern", period: "Winter 2023", desc: "Developed responsive web applications using modern frameworks. Collaborated with cross-functional teams to deliver high-quality digital solutions.", file: "internpe-certificate.png" },
              ].map((intern, i) => (
                <motion.div key={i} variants={blurFadeUp}>
                  <SpotlightCard className="rounded-2xl bg-card">
                    <motion.div
                      className="p-6 sm:p-8 relative z-10"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-5">
                        <motion.img
                          src={intern.src}
                          alt={intern.company}
                          className="w-14 h-14 object-cover rounded-xl border border-border"
                          loading="lazy"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold mb-1">{intern.role}</h3>
                          <p className="text-primary text-sm font-medium mb-1">{intern.company}</p>
                          <p className="text-muted-foreground text-xs mb-3 flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {intern.period}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{intern.desc}</p>
                          <a href={intern.src} download={intern.file}>
                            <Button variant="outline" size="sm" className="rounded-xl text-xs press-effect">
                              <Download className="h-3.5 w-3.5 mr-1.5" />
                              Certificate
                            </Button>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== 6. CONTACT WITH FORM MICRO-INTERACTIONS ===== */}
        <AnimatedSection id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={blurFadeUp}>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-gradient">Let's Work Together</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-12">
                Ready to bring your ideas to life? Let's discuss your next project and create something amazing.
              </p>
            </motion.div>

            <motion.div className="grid sm:grid-cols-3 gap-4 mb-12" variants={staggerContainer}>
              {[
                { icon: <Mail className="h-6 w-6" />, title: "Email", value: "27piyushthakur27@gmail.com" },
                { icon: <Phone className="h-6 w-6" />, title: "Phone", value: "+91 8580630951" },
                { icon: <MapPin className="h-6 w-6" />, title: "Location", value: "JUIT Solan, HP" },
              ].map((c, i) => (
                <motion.div key={i} variants={scaleBlur}>
                  <SpotlightCard className="rounded-2xl bg-card">
                    <motion.div
                      className="p-6 text-center relative z-10"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{c.icon}</div>
                      <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                      <p className="text-muted-foreground text-xs">{c.value}</p>
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact form with micro-interactions */}
            <motion.div variants={blurFadeUp}>
              <ContactForm />
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row justify-center gap-4 mt-8" variants={blurFadeUp}>
              <motion.a href="mailto:27piyushthakur27@gmail.com" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button className="bg-gradient-to-r from-primary to-tech-purple text-primary-foreground px-8 py-5 rounded-xl font-semibold shadow-lg hover:shadow-xl press-effect">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Email
                </Button>
              </motion.a>
              <motion.a href="https://linkedin.com/in/piyush-thakur-952364296" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="px-8 py-5 rounded-xl font-semibold border-2 hover:border-primary/50 hover:bg-primary/5 press-effect">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </Button>
              </motion.a>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ===== 20. FOOTER REVEAL ANIMATION ===== */}
        <motion.footer
          className="relative py-16 px-4 border-t border-border/50 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Reveal background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-3xl sm:text-4xl font-bold text-gradient mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's Create Something Amazing
            </motion.h3>
            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              © 2026 Piyush Thakur. Crafted with passion and attention to detail.
            </motion.p>

            {/* Social links with stagger */}
            <motion.div
              className="flex justify-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: <Github className="h-5 w-5" />, href: "https://github.com/27Piyush27" },
                { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/piyush-thakur-952364296" },
                { icon: <Mail className="h-5 w-5" />, href: "mailto:27piyushthakur27@gmail.com" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={scaleBlur}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.footer>

        <ChatBot />
      </div>
    </>
  );
};

export default OptimizedPortfolio;
