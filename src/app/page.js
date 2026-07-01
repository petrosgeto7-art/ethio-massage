"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   ETHIO MASSAGE — Luxury House-to-House Massage
   Complete Next.js Page Component
   ═══════════════════════════════════════════════════════════════ */

// ── DATA ────────────────────────────────────────────────────────
const SERVICES = [
  { id: 1, icon: "🌿", name: "Swedish Massage", desc: "Gentle, flowing strokes to release tension, improve circulation, and promote deep relaxation.", price: "1,200 ETB", unit: "/60 min", bg: "url('/swedish_massage.png') center/cover" },
  { id: 2, icon: "💪", name: "Deep Tissue", desc: "Targets deep muscle layers to relieve chronic pain, muscle tension, and sports injuries.", price: "1,500 ETB", unit: "/60 min", bg: "url('/deep_tissue.png') center/cover" },
  { id: 3, icon: "🕯️", name: "Relaxation", desc: "A calming full-body massage designed to melt away stress and restore inner peace.", price: "1,000 ETB", unit: "/60 min", bg: "url('/hero-massage.png') center/cover" },
  { id: 4, icon: "⚡", name: "Sports Massage", desc: "Optimized for athletes — improves performance, prevents injury, and speeds recovery.", price: "1,600 ETB", unit: "/60 min", bg: "url('/sports_massage.png') center/cover" },
  { id: 5, icon: "❤️", name: "Couples Massage", desc: "Share a luxurious relaxation experience with your partner. Back-to-back sessions for perfect harmony.", price: "2,800 ETB", unit: "/couple", bg: "url('/couples_massage.png') center/cover" },
  { id: 6, icon: "🏠", name: "Home Service", desc: "I come directly to your home. Total privacy, maximum comfort in your personal space.", price: "1,200 ETB", unit: "+ travel", bg: "url('/home_service.png') center/cover" },
  { id: 7, icon: "🏨", name: "Hotel Massage", desc: "Luxury in-room massage at your hotel in Addis Ababa. Bring the spa experience to you.", price: "1,400 ETB", unit: "/60 min", bg: "url('/home_service.png') center/cover" },
  { id: 8, icon: "🌳", name: "Outdoor Massage", desc: "Garden, terrace, or open-air space — reconnect with nature during your massage.", price: "1,300 ETB", unit: "/60 min", bg: "url('/outdoor-massage.png') center/cover" },
  { id: 9, icon: "🪨", name: "Hot Stone Therapy", desc: "Smooth, heated stones are placed on the body to melt away tension, ease muscle stiffness, and increase circulation.", price: "1,800 ETB", unit: "/60 min", bg: "url('/spa_stones.png') center/cover" },
  { id: 10, icon: "🌺", name: "Aromatherapy", desc: "Combines the power of essential oils with soothing massage techniques to balance the mind, body, and spirit.", price: "1,400 ETB", unit: "/60 min", bg: "url('/hero-massage.png') center/cover" },
];

const THERAPISTS = [
  { name: "Professional Therapist", years: "5+", specialty: "Expert Massage Therapist", tags: ["Deep Tissue", "Swedish", "Sports"], rating: "5.0", available: true }
];

const TESTIMONIALS = [
  { text: "Absolutely amazing service! He came to my home and the massage was incredibly professional. I felt completely relaxed for days.", initials: "AT", name: "Abebe T.", role: "Business Executive · Bole" },
  { text: "I was skeptical at first but Ethio Massage exceeded all expectations. He was punctual, professional and incredibly skilled.", initials: "MK", name: "Meron K.", role: "Doctor · Kazanchis" },
  { text: "The best couples massage we've ever experienced. He set up everything perfectly in our living room. Truly a 5-star service!", initials: "DY", name: "Daniel Y.", role: "Software Engineer · CMC" },
  { text: "As an athlete, I need targeted deep tissue work. He knows exactly where to focus. My recovery time has improved dramatically.", initials: "TG", name: "Tigist G.", role: "Marathon Runner · Megenagna" },
  { text: "I book weekly sessions now. The convenience of having a professional massage at home after a long day is unmatched.", initials: "SM", name: "Solomon M.", role: "Entrepreneur · Sarbet" },
];

const GALLERY = [
  { alt: "Swedish massage", label: "Swedish Massage", emoji: "🌿", bg: "url('/swedish_massage.png') center/cover", span: "gi-1" },
  { alt: "Spa stones", label: "Hot Stones", emoji: "🪨", bg: "url('/spa_stones.png') center/cover", span: "gi-2" },
  { alt: "Home visit service", label: "Home Visit Service", emoji: "🏠", bg: "url('/home_service.png') center/cover", span: "gi-3" },
  { alt: "Aromatherapy", label: "Relaxation", emoji: "🕯️", bg: "url('/hero-massage.png') center/cover", span: "gi-4" },
  { alt: "Couples massage", label: "Couples Session", emoji: "💑", bg: "url('/couples_massage.png') center/cover", span: "gi-5" },
  { alt: "Outdoor massage", label: "Outdoor Experience", emoji: "🌳", bg: "url('/outdoor-massage.png') center/cover", span: "gi-6" },
  { alt: "Luxury standard", label: "Luxury Standard", emoji: "⭐", bg: "url('/hero-massage.png') center/cover", span: "gi-7" },
  { alt: "Deep Tissue", label: "Deep Tissue", emoji: "💪", bg: "url('/deep_tissue.png') center/cover", span: "gi-8" },
  { alt: "Sports Massage", label: "Sports Recovery", emoji: "⚡", bg: "url('/sports_massage.png') center/cover", span: "gi-9" },
];

const WHY = [
  { icon: "👩‍⚕️", title: "Certified Therapist", desc: "I hold professional certification and have years of hands-on experience." },
  { icon: "🚗", title: "I Come To You", desc: "Bet le bet service across Addis Ababa. Your home, hotel, or private space — I bring everything." },
  { icon: "⏰", title: "Flexible Scheduling", desc: "Book morning, afternoon, or evening sessions 7 days a week. Same-day often available." },
  { icon: "🔒", title: "Safe & Private", desc: "Your privacy is paramount. All sessions are 100% confidential in the comfort of your space." },
  { icon: "💳", title: "Easy Payment", desc: "Cash, Telebirr, or bank transfer. Pay conveniently at the end of your session." },
  { icon: "📍", title: "All Addis Ababa", desc: "Full coverage across all sub-cities. Wherever you are, Ethio Massage comes to you." },
];

// ── MAIN COMPONENT ──────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState({
    service: "", price: "", therapist: "", date: "", time: "",
    duration: "60", location: "", address: "", name: "", phone: "", notes: "",
  });
  const [confirmSummary, setConfirmSummary] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const trackRef = useRef(null);

  // Loading screen
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  // Theme initialization
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Auto-slide testimonials
  useEffect(() => {
    const slidesPerView = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;
    const total = TESTIMONIALS.length - slidesPerView + 1;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(total, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Slide the track
  useEffect(() => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector(".testimonial-card");
      if (card) {
        const w = card.offsetWidth + 14;
        trackRef.current.style.transform = `translateX(-${currentSlide * w}px)`;
      }
    }
  }, [currentSlide]);

  // Set today's date
  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  // ── BOOKING LOGIC ─────────────────────────────────────────────
  const goToStep = useCallback((step) => {
    if (step === 2 && !booking.service) { alert("Please select a service to continue."); return; }
    if (step === 3 && (!booking.date || !booking.time)) { alert("Please select both a date and time."); return; }
    if (step === 4 && (!booking.location || !booking.address.trim())) {
      if (!booking.location) alert("Please select a location type.");
      else alert("Please provide your full address.");
      return;
    }
    setBookingStep(step);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [booking]);

  const submitBooking = useCallback(() => {
    if (!booking.name.trim()) { alert("Please enter your full name."); return; }
    if (!booking.phone.trim()) { alert("Please enter your phone number."); return; }
    const msg = `Hello Ethio Massage! I'd like to book a massage session:

🌿 *Service:* ${booking.service} (${booking.price})
📅 *Date:* ${booking.date}
⏰ *Time:* ${booking.time}
⏱ *Duration:* ${booking.duration} minutes
📍 *Location:* ${booking.location}
🏠 *Address:* ${booking.address}

👤 *Name:* ${booking.name}
📱 *Phone:* ${booking.phone}
📝 *Notes:* ${booking.notes || "None"}

Please confirm my appointment. Thank you!`;
    setConfirmSummary(`${booking.service} on ${booking.date} at ${booking.time} · ${booking.location} service`);
    setShowConfirm(true);
    setTimeout(() => window.open(`https://wa.me/251953226886?text=${encodeURIComponent(msg)}`, "_blank"), 800);
  }, [booking]);

  const resetBooking = useCallback(() => {
    setBooking({ service: "", price: "", therapist: "", date: "", time: "", duration: "60", location: "", address: "", name: "", phone: "", notes: "" });
    setBookingStep(1);
    setShowConfirm(false);
  }, []);

  const slidesPerView = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;
  const totalSlides = Math.max(TESTIMONIALS.length - slidesPerView + 1, 1);

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <>
      {/* ═══ LOADING SCREEN ═══ */}
      <div className={`loading-screen${loading ? "" : " hidden"}`}>
        <img src="/logo_transparent.png" alt="Logo" style={{ width: '96px', height: '96px', marginBottom: '16px' }} />
        <div className="loader-logo">Ethio<span>Massage</span></div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
        <div className="loader-text">Luxury Wellness · Addis Ababa</div>
      </div>


      {/* ═══ TOP NAVBAR ═══ */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div className="hamburger" onClick={() => setMobileOpen(true)} style={{ zIndex: 10, width: '40px' }}>
            <span style={{ background: 'var(--dark)' }} />
            <span style={{ background: 'var(--dark)' }} />
            <span style={{ background: 'var(--dark)' }} />
          </div>
          <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo_transparent.png" alt="Ethio Massage Logo" style={{ width: '64px', height: '64px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--emerald)', fontSize: '26px', fontWeight: '600', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>Ethio<span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: '700' }}>Massage</span></div>
              <div style={{ fontSize: '9px', color: 'var(--text-mid)', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>Relax. Renew. Rejuvenate.</div>
            </div>
          </div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#testimonials">Reviews</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-cta">
            <a href="tel:+251953226886" className="nav-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +251 953 226 886
            </a>
            <a href="#booking" className="nav-book">Book Now</a>
            <button onClick={toggleTheme} className="theme-toggle" style={{ marginLeft: '12px', background: 'var(--warm-bg)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--warm-border)', color: 'var(--text)', transition: 'var(--transition)' }}>
              {theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          </div>
          <a href="tel:+251953226886" className="nav-contact-btn mobile-only" style={{ width: '40px', height: '40px', background: 'var(--emerald-mid)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(34,128,94,0.3)', transition: 'transform 0.2s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div className={`mobile-menu-backdrop ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} />
      
      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo_transparent.png" alt="Ethio Massage" style={{ width: '48px', height: '48px' }} />
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '24px', fontWeight: '300', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>
              Ethio<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Massage</span>
            </div>
          </div>
          <div className="mobile-close" onClick={() => setMobileOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        </div>
        
        <div className="drawer-divider" />
        <div className="drawer-label">Menu</div>
        
        <div className="mobile-drawer-links">
          <a href="#hero" onClick={() => setMobileOpen(false)}>
            <span className="nav-icon">🏠</span><span>Home</span><span className="arrow">›</span>
          </a>
          <a href="#services" className="active" onClick={() => setMobileOpen(false)}>
            <span className="nav-icon">🌿</span><span>Services</span><span className="arrow">›</span>
          </a>
          <a href="#booking" onClick={() => setMobileOpen(false)}>
            <span className="nav-icon">📅</span><span>Book Now</span><span className="arrow">›</span>
          </a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)}>
            <span className="nav-icon">⭐</span><span>Reviews</span><span className="arrow">›</span>
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            <span className="nav-icon">📞</span><span>Contact</span><span className="arrow">›</span>
          </a>
        </div>

        <div className="drawer-divider" />
        <div className="drawer-label">Reach Me</div>
        <div className="drawer-contact">
          <a href="tel:+251953226886" className="drawer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +251 953 226 886
          </a>
          <div className="drawer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Addis Ababa, Ethiopia
          </div>
        </div>

        <div className="mobile-drawer-footer">
          <a href="https://wa.me/251903433857" target="_blank" className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', padding: '14px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <div className="wa-text">
              <span>Book via</span>
              <span>WhatsApp</span>
            </div>
          </a>
        </div>
      </div>
      {/* ═══ HERO ═══ */}
      <section id="hero" className="hero">
        <div className="hero-bg-pattern">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-grid" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <div className="dot" /><span>Now Available in Addis Ababa</span><div className="dot" />
              </div>
              <h1 className="hero-title">
                <span style={{ display: "block" }}>Professional</span>
                <span style={{ display: "block" }}><em>Massage Therapy</em></span>
                <span style={{ display: "block" }}>at Your Door</span>
              </h1>
              <p className="hero-subtitle">
                Premium house-to-house massage delivered to your home, hotel, or private space in Addis Ababa. Your comfort, our priority — anywhere you are.
              </p>
              <div className="hero-buttons">
                <a href="#booking" className={theme === "dark" ? "btn-glow" : "btn-gold"}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Appointment
                </a>
                <a href="https://wa.me/251903433857?text=Hello%20Ethio%20Massage%2C%20I%20would%20like%20to%20book%20a%20massage%20session." target="_blank" className="btn-whatsapp">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <div className="wa-text">
                    <span>Book via</span>
                    <span>WhatsApp</span>
                  </div>
                </a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><div className="hero-stat-number">500+</div><div className="hero-stat-label">Happy Clients</div></div>
                <div className="hero-stat"><div className="hero-stat-number">5+</div><div className="hero-stat-label">Years Experience</div></div>
                <div className="hero-stat"><div className="hero-stat-number">4.9★</div><div className="hero-stat-label">Average Rating</div></div>
              </div>
            </div>
            <div className="hero-image-wrap">
              <div className="hero-image-card">
                <img
                  src="/hero-massage.png"
                  alt="Ethiopian massage therapist performing luxury massage therapy in Addis Ababa"
                />
                <div className="hero-image-overlay" />
              </div>
              <div className="hero-float-card hero-float-1">
                <div className="float-card-label">Next Available</div>
                <div className="float-card-value">Today</div>
                <div className="float-card-sub">● Open for Bookings</div>
              </div>
              <div className="hero-float-card hero-float-2">
                <div className="float-card-label">Client Satisfaction</div>
                <div className="float-card-value">98%</div>
                <div className="float-card-sub">★★★★★ Rated</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Explore</span>
          <div className="arrow" />
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="services">
        <div className="container">
          <div className="services-header reveal">
            <div className="section-label">What I Offer</div>
            <h2 className="section-title">Signature <span>Massage Services</span></h2>
            <div className="divider center" />
            <p className="section-subtitle" style={{ margin: "20px auto 0", textAlign: "center" }}>
              Handcrafted wellness experiences delivered to your preferred location — home, hotel, or outdoor space.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={s.id} className="service-card reveal" style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <div className="service-card-img" style={{ background: s.bg }}>
                  {!s.bg.includes('url') && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px" }}>
                      {s.icon}
                    </div>
                  )}
                  <div className="service-card-img-overlay" />
                  <div className="service-icon-wrap">{s.icon}</div>
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{s.name}</h3>
                  <p className="service-card-desc">{s.desc}</p>
                  <div className="service-card-footer">
                    <div className="service-price">{s.price} <small>{s.unit}</small></div>
                    <a href="#booking" className="service-book-btn">→</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Strip */}
          <div className="feature-strip reveal">
            <div className="feature-big">
              <div className="feature-big-bg" style={{ background: `url('/hero-massage.png') center/cover` }} />
              <div className="feature-big-overlay" />
              <div className="feature-big-content">
                <div className="feature-big-icon">🏠</div>
                <h3 className="feature-big-title">Indoor Massage</h3>
                <p className="feature-big-desc">I come to your home, apartment or hotel room — anywhere indoors.</p>
                <a href="#booking" className="btn-gold" style={{ padding: "12px 24px", fontSize: "13px" }}>Book Now →</a>
              </div>
            </div>
            <div className="feature-big">
              <div className="feature-big-bg" style={{ background: `url('/outdoor-massage.png') center/cover` }} />
              <div className="feature-big-overlay" style={{ background: "linear-gradient(180deg, rgba(10,46,33,0.3) 0%, rgba(201,168,76,0.2) 100%)" }} />
              <div className="feature-big-content">
                <div className="feature-big-icon">🌿</div>
                <h3 className="feature-big-title">Outdoor Massage</h3>
                <p className="feature-big-desc">Garden, terrace, rooftop — embrace nature with my outdoor service.</p>
                <a href="#booking" className="btn-gold" style={{ padding: "12px 24px", fontSize: "13px" }}>Book Now →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section id="why" className="why-section">
        <div className="hero-grid" />
        <div className="container">
          <div className="why-header reveal">
            <div className="section-label" style={{ color: "var(--gold)", justifyContent: "center" }}>My Promise</div>
            <h2 className="section-title">Why Choose <span>Ethio Massage?</span></h2>
            <div className="divider center" />
            <p className="section-subtitle" style={{ margin: "20px auto 0", textAlign: "center" }}>
              I am not just a massage therapist. I provide a luxury wellness experience that comes to you.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={i} className="why-card reveal" style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <div className="why-icon">{w.icon}</div>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THERAPISTS ═══ */}
      <section id="therapists" className="therapists">
        <div className="container">
          <div className="therapists-header">
            <div>
              <div className="section-label reveal-left">Meet Your Therapist</div>
              <h2 className="section-title reveal-left" style={{ transitionDelay: "0.1s" }}>Your Expert <span>Therapist</span></h2>
              <div className="divider reveal-left" style={{ transitionDelay: "0.2s" }} />
            </div>
          </div>
          <div className="therapists-grid" style={{ gridTemplateColumns: "1fr", maxWidth: "400px", margin: "0 auto" }}>
            {THERAPISTS.map((t, i) => (
              <div key={i} className="therapist-card reveal" style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <div className="therapist-img">
                  <img src="/therapist-portrait.png" alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="therapist-img-overlay" />
                  <div className="therapist-available" style={!t.available ? { background: "#f59e0b" } : {}}>
                    <div className="dot" /> {t.available ? "Available" : "Busy Today"}
                  </div>
                  <div className="therapist-name-overlay">{t.name}</div>
                </div>
                <div className="therapist-body">
                  <div className="therapist-meta">{t.years} years · {t.specialty}</div>
                  <div className="therapist-specialties">
                    {t.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <div className="therapist-footer">
                    <div className="therapist-rating"><span className="star">★★★★★</span> {t.rating}</div>
                    <a href="#booking" className="therapist-book">Book</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="gallery-header reveal">
            <div className="section-label">Visual Experience</div>
            <h2 className="section-title">A Glimpse of <span>Ethio Massage</span></h2>
            <div className="divider center" />
          </div>
          <div className="gallery-grid">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className={`gallery-item ${g.span} reveal`}
                style={{ transitionDelay: `${i * 0.05}s` }}
                onClick={() => setLightbox(g)}
              >
                <div style={{ position: "absolute", inset: 0, background: g.bg }} />
                {g.bg.includes('url') && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />}
                <div className="gallery-item-overlay" />
                <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  {!g.bg.includes('url') && <span style={{ fontSize: "48px", opacity: 0.4 }}>{g.emoji}</span>}
                  <span style={{ fontSize: "18px", fontFamily: "var(--font-heading)", color: "var(--white)", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox active" onClick={() => setLightbox(null)}>
          <div style={{ position: "relative", overflow: "hidden", width: "80%", maxWidth: "800px", aspectRatio: lightbox.bg.includes('url') ? "16/9" : "4/3", background: lightbox.bg, borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            {lightbox.bg.includes('url') && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)" }} />}
            {!lightbox.bg.includes('url') && <span style={{ fontSize: "80px" }}>{lightbox.emoji}</span>}
            <span style={{ position: "absolute", bottom: "30px", left: "40px", fontSize: "32px", fontFamily: "var(--font-heading)", color: "var(--white)", textShadow: "0 2px 8px rgba(0,0,0,0.8)", zIndex: 2 }}>{lightbox.label}</span>
          </div>
        </div>
      )}

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="testimonials-header reveal">
            <div className="section-label">Happy Clients</div>
            <h2 className="section-title">What My Clients <span>Say</span></h2>
            <div className="divider center" />
          </div>
          <div className="testimonials-slider">
            <div className="testimonials-track" ref={trackRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-quote">&ldquo;</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                      <div className="testimonial-stars"><span className="star">★★★★★</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="slider-controls">
            <button className="slider-btn" onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}>←</button>
            <div className="slider-dots">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <div key={i} className={`slider-dot${i === currentSlide ? " active" : ""}`} onClick={() => setCurrentSlide(i)} />
              ))}
            </div>
            <button className="slider-btn" onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}>→</button>
          </div>
        </div>
      </section>

      {/* ═══ BOOKING ═══ */}
      <section id="booking" className="booking">
        <div className="container">
          <div className="booking-header reveal">
            <div className="section-label" style={{ color: "var(--gold)", justifyContent: "center" }}>Reserve Your Session</div>
            <h2 className="section-title">Book Your <span>Appointment</span></h2>
            <div className="divider center" />
          </div>

          {/* Progress Steps */}
          <div className="booking-steps">
            {[{ n: 1, label: "Service" }, { n: 2, label: "Date & Time" }, { n: 3, label: "Location" }, { n: 4, label: "Confirm" }].map((s) => (
              <div key={s.n} className={`booking-step${bookingStep === s.n ? " active" : ""}${bookingStep > s.n || showConfirm ? " done" : ""}`}>
                <div className="booking-step-num">{bookingStep > s.n || showConfirm ? "✓" : s.n}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="booking-panels">
            {/* Step 1: Service */}
            {bookingStep === 1 && !showConfirm && (
              <div className="booking-panel active">
                <h3 className="panel-title">Choose Your Service</h3>
                <p className="panel-subtitle">Select the massage therapy that suits your needs.</p>
                <div className="service-options">
                  {SERVICES.slice(0, 6).map((s) => (
                    <div
                      key={s.id}
                      className={`service-option${booking.service === s.name ? " selected" : ""}`}
                      onClick={() => setBooking((b) => ({ ...b, service: s.name, price: s.price }))}
                    >
                      <div className="service-option-icon">{s.icon}</div>
                      <div className="service-option-name">{s.name}</div>
                      <div className="service-option-price">{s.price}</div>
                    </div>
                  ))}
                </div>
                <div className="panel-actions">
                  <button className="btn-gold" onClick={() => goToStep(2)}>Next Step →</button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {bookingStep === 2 && !showConfirm && (
              <div className="booking-panel active">
                <h3 className="panel-title">Pick Date & Time</h3>
                <p className="panel-subtitle">Choose when you want your massage session.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input type="date" className="form-input" min={todayStr} value={booking.date || todayStr} onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Time</label>
                    <input type="time" className="form-input" value={booking.time} onChange={(e) => setBooking((b) => ({ ...b, time: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <select className="form-select" value={booking.duration} onChange={(e) => setBooking((b) => ({ ...b, duration: e.target.value }))}>
                    <option value="60">60 Minutes</option>
                    <option value="90">90 Minutes</option>
                    <option value="120">120 Minutes (2 Hours)</option>
                  </select>
                </div>
                <div className="panel-actions">
                  <button className="btn-back" onClick={() => setBookingStep(1)}>← Back</button>
                  <button className="btn-gold" onClick={() => goToStep(3)}>Next Step →</button>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {bookingStep === 3 && !showConfirm && (
              <div className="booking-panel active">
                <h3 className="panel-title">Your Location</h3>
                <p className="panel-subtitle">Tell me where to deliver your wellness experience.</p>
                <div className="location-options">
                  {[{ icon: "🏠", name: "Home" }, { icon: "🏨", name: "Hotel" }, { icon: "🌳", name: "Outdoor" }].map((loc) => (
                    <div
                      key={loc.name}
                      className={`location-option${booking.location === loc.name ? " selected" : ""}`}
                      onClick={() => setBooking((b) => ({ ...b, location: loc.name }))}
                    >
                      <div className="location-option-icon">{loc.icon}</div>
                      <div className="location-option-name">{loc.name}</div>
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label className="form-label">Full Address / Location Details</label>
                  <textarea className="form-textarea" placeholder="e.g. Bole Road, near Edna Mall, Building 5, Apartment 302..." value={booking.address} onChange={(e) => setBooking((b) => ({ ...b, address: e.target.value }))} />
                </div>
                <div className="panel-actions">
                  <button className="btn-back" onClick={() => setBookingStep(2)}>← Back</button>
                  <button className="btn-gold" onClick={() => goToStep(4)}>Next Step →</button>
                </div>
              </div>
            )}

            {/* Step 4: Your Details */}
            {bookingStep === 4 && !showConfirm && (
              <div className="booking-panel active">
                <h3 className="panel-title">Your Details</h3>
                <p className="panel-subtitle">Almost done! Just a few more details.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Your full name" value={booking.name} onChange={(e) => setBooking((b) => ({ ...b, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" placeholder="09XX XXX XXX" value={booking.phone} onChange={(e) => setBooking((b) => ({ ...b, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Special Requests (Optional)</label>
                  <textarea className="form-textarea" placeholder="Any allergies, preferences, or special requests..." value={booking.notes} onChange={(e) => setBooking((b) => ({ ...b, notes: e.target.value }))} />
                </div>
                <div className="panel-actions">
                  <button className="btn-back" onClick={() => setBookingStep(3)}>← Back</button>
                  <button className="btn-gold" onClick={submitBooking}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Confirm & Book via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation */}
            {showConfirm && (
              <div className="booking-panel active confirm-panel">
                <div className="confirm-icon">✅</div>
                <h3 className="confirm-title">Booking Sent!</h3>
                <p className="confirm-subtitle">Your booking request has been sent via WhatsApp. I&apos;ll confirm your appointment shortly.</p>
                <div className="confirm-summary">{confirmSummary}</div>
                <br />
                <button className="btn-gold" onClick={resetBooking}>Book Another Session</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="services-header reveal">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Contact <span>Ethio Massage</span></h2>
            <div className="divider center" />
          </div>
          <div className="contact-grid">
            <div className="reveal-left">
              <div className="contact-card">
                <div className="contact-card-icon">📞</div>
                <div>
                  <div className="contact-card-title">Phone</div>
                  <div className="contact-card-value"><a href="tel:+251953226886">+251 953 226 886</a></div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">💬</div>
                <div>
                  <div className="contact-card-title">WhatsApp</div>
                  <div className="contact-card-value"><a href="https://wa.me/251903433857" target="_blank">Message me on WhatsApp</a></div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">📍</div>
                <div>
                  <div className="contact-card-title">Service Area</div>
                  <div className="contact-card-value">All sub-cities of Addis Ababa<br />House-to-house (bet le bet) service</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">⏰</div>
                <div>
                  <div className="contact-card-title">Hours</div>
                  <div className="contact-card-value">Monday – Sunday<br />8:00 AM – 10:00 PM</div>
                </div>
              </div>
            </div>
            <div className="contact-form-card reveal-right">
              <h3 className="contact-form-title">Send a Message</h3>
              <input type="text" className="contact-input" placeholder="Your Name" />
              <input type="email" className="contact-input" placeholder="Email Address" />
              <input type="tel" className="contact-input" placeholder="Phone Number" />
              <textarea className="contact-input contact-textarea" placeholder="Your Message..." />
              <button className="btn-submit" onClick={() => alert("Thank you! Your message has been sent. I will get back to you shortly.")}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="nav-logo" style={{ marginBottom: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="Ethio Massage" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            <div style={{ color: 'var(--white)', fontSize: '28px', fontWeight: '300', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>Ethio<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Massage</span></div>
          </div>
          <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0, marginTop: '10px' }}>
            © {new Date().getFullYear()} Ethio Massage. All rights reserved. Luxury massage therapy in Addis Ababa.
          </div>
        </div>
      </footer>

      {/* ═══ MOBILE BOTTOM NAVIGATION BAR ═══ */}
      <nav className="bottom-nav">
        <a href="#hero" className="bottom-nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </a>
        <a href="#services" className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v4" />
            <path d="M6.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
            <path d="M5 16l2 4" />
            <path d="M19 16l-2 4" />
          </svg>
          <span>Services</span>
        </a>
        <a href="#booking" className="bottom-nav-item nav-booking-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Booking</span>
        </a>
        <a href="#contact" className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Contact</span>
        </a>
      </nav>

      {/* Floating WhatsApp Button (Mobile only) */}
      <a href="https://wa.me/251903433857" target="_blank" className="floating-wa-btn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <div className="wa-text">
          <span>Book via</span>
          <span>WhatsApp</span>
        </div>
      </a>
    </>
  );
}
