"use client";
import { useRef, useCallback } from "react";
import { motion } from "motion/react";

const contacts = [
  { label: "Email", value: "andres@cabletea.com", href: "mailto:andres@cabletea.com",
    icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
  { label: "Telefono", value: "+34 636 60 85 69", href: "tel:+34636608569",
    icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
  { label: "GitHub", value: "Andresmartineez6", href: "https://github.com/Andresmartineez6",
    icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
  { label: "LinkedIn", value: "Andres Lorente Martinez", href: "https://linkedin.com/in/AndresLorenteMartinez",
    icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" },
];

function ContactCard({ contact, index }: { contact: typeof contacts[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <a ref={cardRef} href={contact.href}
        target={contact.href.startsWith("http") ? "_blank" : undefined}
        rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card glass-panel flex items-center gap-4 p-4 no-underline group"
        style={{ textDecoration: "none", display: "flex" }}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={contact.icon} /></svg>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{contact.label}</span>
          <span className="text-[13px] font-medium truncate">{contact.value}</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: "var(--text-muted)" }}>
          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <section className="min-h-screen px-4 md:px-6 py-24 flex flex-col gap-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-3">
        <span className="section-label">04 / Contacto</span>
        <h2 className="section-title">Conectemos</h2>
        <p className="text-[13px] max-w-md" style={{ color: "var(--text-secondary)" }}>
          Disponible para nuevos proyectos y oportunidades. No dudes en contactarme.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        {contacts.map((c, i) => <ContactCard key={c.label} contact={c} index={i} />)}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }} className="mt-20 flex flex-col items-center gap-4">
        <p className="text-[10px] font-mono tracking-wider" style={{ color: "var(--text-muted)" }}>
          Next.js · Three.js · GLSL · Motion · TailwindCSS
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-green)" }} />
          <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>Disponible para trabajar</span>
        </div>
      </motion.div>
    </section>
  );
}
