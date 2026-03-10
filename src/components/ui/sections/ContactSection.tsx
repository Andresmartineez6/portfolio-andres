"use client";
import { motion } from "motion/react";

const contacts = [
  { label: "Email", value: "andres@cabletea.com", href: "mailto:andres@cabletea.com", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
  { label: "Telefono", value: "+34 636 60 85 69", href: "tel:+34636608569", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
  { label: "GitHub", value: "Andresmartineez6", href: "https://github.com/Andresmartineez6", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
  { label: "LinkedIn", value: "Andres Lorente Martinez", href: "https://linkedin.com/in/AndresLorenteMartinez", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" },
];

export default function ContactSection() {
  return (
    <section className="min-h-screen px-4 md:px-6 py-16 flex flex-col gap-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-2 mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>04 / Contacto</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Conectemos</h2>
        <p className="text-sm max-w-md" style={{ color: "var(--text-secondary)" }}>
          Estoy disponible para nuevos proyectos y oportunidades. No dudes en contactarme por cualquiera de estos canales.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        {contacts.map((contact, i) => (
          <motion.a key={contact.label} href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel glass-panel-hover p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 no-underline"
            style={{ textDecoration: "none" }}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ background: "var(--accent-glow)", color: "var(--accent-primary)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={contact.icon} /></svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{contact.label}</span>
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{contact.value}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto" style={{ color: "var(--text-muted)" }}>
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </motion.a>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }} className="mt-16 flex flex-col items-center gap-4 text-center">
        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Construido con Next.js, Three.js, GLSL Shaders y Motion</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>Disponible para trabajar</span>
        </div>
      </motion.div>
    </section>
  );
}
