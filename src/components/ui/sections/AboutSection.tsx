"use client";
import { motion } from "motion/react";
import GithubPacman from "@/components/ui/GithubPacman";
import TechStack3D from "@/components/ui/TechStack3D";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

function Panel({ title, children, delay = 0, color = "var(--border-medium)" }: {
  title: string; children: React.ReactNode; delay?: number; color?: string;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass-panel glass-panel-hover p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.7 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)" }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider ml-1" style={{ color: "var(--text-muted)" }}>
          {title}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section className="min-h-screen px-4 md:px-6 py-20 flex flex-col gap-8">
      <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-2 mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>01 / Sobre Mi</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Perfil Profesional
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="bio.txt" delay={0.1} color="#64d2ff">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Soy un programador especializado en el desarrollo de software. Tengo habilidades tanto en el desarrollo del lado del cliente como del servidor.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Soy capaz de trabajar de forma independiente y en equipo, entregando proyectos de alta calidad dentro de los plazos establecidos. Estoy constantemente actualizandome y aprendiendo nuevas tecnologias.
          </p>
        </Panel>

        <Panel title="experiencia.log" delay={0.15} color="#5ac8fa">
          {[
            { role: "Desarrollador Web — WordPress", company: "ImpulsaTelecom S.L, Baza (Granada)", period: "Jul 2023 — Sep 2024", desc: "Desarrollo de paginas Web con WordPress usando el Constructor Divi." },
            { role: "Fundador y CEO", company: "Cabletea S.L, Baza (Granada)", period: "Jun 2024", desc: "Fundacion y creacion de empresa teleoperadora de fibra y movil." },
            { role: "Programador Junior / Gestor de proyectos", company: "BeeBit Solutions S.L, Granada", period: "Sep 2024 — Dic 2024", desc: "Desarrollo web de un gestor de proyectos." },
          ].map((exp, i) => (
            <div key={i} className="flex flex-col gap-1 py-2.5" style={i > 0 ? { borderTop: "1px solid var(--border-subtle)" } : {}}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{exp.role}</h4>
                  <span className="text-xs" style={{ color: "var(--accent-primary)" }}>{exp.company}</span>
                </div>
                <span className="text-[10px] font-mono whitespace-nowrap px-2 py-0.5 rounded" style={{ color: "var(--text-muted)", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)" }}>{exp.period}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{exp.desc}</p>
            </div>
          ))}
        </Panel>

        <Panel title="educacion.md" delay={0.2} color="#ffd60a">
          {[
            { title: "Desarrollo Back-End con Node.js", place: "Escuela Arte Granada", status: "En progreso" },
            { title: "Curso superior de Diseno y desarrollo web", place: "Escuela Arte Granada", status: "En progreso" },
            { title: "Desarrollo de Aplicaciones Web", place: "Escuela Arte Granada", status: "2024" },
            { title: "Desarrollo de aplicaciones con Python", place: "Escuela Arte Granada", status: "2022" },
            { title: "Bachillerato Cientifico Tecnologico", place: "I.E.S Jose de Mora, Baza", status: "2022" },
          ].map((edu) => (
            <div key={edu.title} className="flex items-start justify-between gap-2 py-2">
              <div>
                <h4 className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{edu.title}</h4>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{edu.place}</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0" style={{
                background: edu.status === "En progreso" ? "var(--accent-glow)" : "var(--bg-glass)",
                color: edu.status === "En progreso" ? "var(--accent-primary)" : "var(--text-muted)",
                border: `1px solid ${edu.status === "En progreso" ? "var(--border-accent)" : "var(--border-subtle)"}`,
              }}>{edu.status}</span>
            </div>
          ))}
        </Panel>

        <Panel title="soft-skills.yml" delay={0.25}>
          <div className="flex flex-col gap-2">
            {[
              { emoji: "📚", text: "Aprendizaje continuo y mentalidad de crecimiento" },
              { emoji: "🤝", text: "Trabajo en equipo y buena comunicacion" },
              { emoji: "💡", text: "Pasion real por la tecnologia" },
              { emoji: "🎯", text: "Responsabilidad y autonomia" },
              { emoji: "⚡", text: "Alta disponibilidad y compromiso" },
            ].map((skill) => (
              <div key={skill.text} className="flex items-center gap-3 py-1">
                <span className="text-sm">{skill.emoji}</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{skill.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Idiomas</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>Espanol</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "var(--accent-glow)", color: "var(--accent-primary)", border: "1px solid var(--border-accent)" }}>Nativo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>Ingles</span>
              <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>Intermedio</span>
            </div>
          </div>
        </Panel>
      </div>

      {/* Tech Stack 3D */}
      <TechStack3D />

      {/* GitHub Pacman Contribution Graph */}
      <GithubPacman />
    </section>
  );
}
