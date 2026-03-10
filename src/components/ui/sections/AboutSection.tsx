"use client";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function FloatingPanel({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay }}
      className="glass-panel glass-panel-hover p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-widest ml-2" style={{ color: "var(--text-muted)" }}>{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

function SkillTag({ name }: { name: string }) {
  return (
    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono transition-all duration-200 cursor-default"
      style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-glass)" }}>{name}</span>
  );
}

export default function AboutSection() {
  const languages = ["JavaScript", "TypeScript", "SQL", "PHP"];
  const tools = ["Figma", "Postman", "Mermaid", "GitHub", "Git", "Docker", "Node.js", "Swagger", "Husky", "ESLint", "Prettier", "Vitest", "Jest", "TailwindCSS", "Prisma", "PostgreSQL"];
  const concepts = ["Arquitectura hexagonal", "MVC", "Principios SOLID"];

  return (
    <section className="min-h-screen px-4 md:px-6 py-16 flex flex-col gap-6">
      <motion.div {...fadeUp} className="flex flex-col gap-2 mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--accent-primary)" }}>01 / Sobre Mi</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Perfil Profesional</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingPanel title="bio.txt" delay={0.1}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Soy un programador especializado en el desarrollo de software. Tengo habilidades tanto en el desarrollo del lado del cliente como del servidor. Soy capaz de trabajar de forma independiente y en equipo, entregando proyectos de alta calidad dentro de los plazos establecidos.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Estoy constantemente actualizandome y aprendiendo nuevas tecnologias para mantenerme al tanto de las ultimas tendencias en el desarrollo web.
          </p>
        </FloatingPanel>

        <FloatingPanel title="experiencia.log" delay={0.2}>
          {[
            { role: "Desarrollador Web - WordPress", company: "ImpulsaTelecom S.L, Baza (Granada)", period: "Jul 2023 - Sep 2024", desc: "Desarrollo de paginas Web con WordPress usando el Constructor Divi." },
            { role: "Fundador y CEO", company: "Cabletea S.L, Baza (Granada)", period: "Jun 2024", desc: "Fundacion y creacion de empresa teleoperadora de fibra y movil." },
            { role: "Programador Junior / Gestor de proyectos", company: "BeeBit Solutions S.L, Granada", period: "Sep 2024 - Dic 2024", desc: "Desarrollo web de un gestor de proyectos." },
          ].map((exp, i) => (
            <div key={i} className="flex flex-col gap-1.5 py-2" style={i > 0 ? { borderTop: "1px solid var(--border-subtle)" } : {}}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h4 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{exp.role}</h4>
                  <span className="text-xs" style={{ color: "var(--accent-primary)" }}>{exp.company}</span>
                </div>
                <span className="text-[10px] font-mono whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{exp.period}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{exp.desc}</p>
            </div>
          ))}
        </FloatingPanel>

        <FloatingPanel title="skills.json" delay={0.3}>
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Lenguajes</span>
              <div className="flex flex-wrap gap-1.5">{languages.map((s) => <SkillTag key={s} name={s} />)}</div>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Herramientas</span>
              <div className="flex flex-wrap gap-1.5">{tools.map((s) => <SkillTag key={s} name={s} />)}</div>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider mb-2 block" style={{ color: "var(--text-muted)" }}>Conceptos</span>
              <div className="flex flex-wrap gap-1.5">{concepts.map((s) => <SkillTag key={s} name={s} />)}</div>
            </div>
          </div>
        </FloatingPanel>

        <FloatingPanel title="educacion.md" delay={0.4}>
          {[
            { title: "Desarrollo Back-End con Node.js", place: "Escuela Arte Granada", status: "En progreso" },
            { title: "Curso superior de Diseno y desarrollo web", place: "Escuela Arte Granada", status: "En progreso" },
            { title: "Desarrollo de Aplicaciones Web", place: "Escuela Arte Granada", status: "2024" },
            { title: "Desarrollo de aplicaciones con Python", place: "Escuela Arte Granada", status: "2022" },
            { title: "Bachillerato Cientifico Tecnologico", place: "I.E.S Jose de Mora, Baza", status: "2022" },
          ].map((edu) => (
            <div key={edu.title} className="flex items-start justify-between gap-2 py-1.5">
              <div>
                <h4 className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{edu.title}</h4>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{edu.place}</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded whitespace-nowrap" style={{
                background: edu.status === "En progreso" ? "var(--accent-glow)" : "var(--bg-glass)",
                color: edu.status === "En progreso" ? "var(--accent-primary)" : "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
              }}>{edu.status}</span>
            </div>
          ))}
        </FloatingPanel>

        <FloatingPanel title="soft-skills.yml" delay={0.5}>
          {["Aprendizaje continuo y mentalidad de crecimiento", "Trabajo en equipo y buena comunicacion", "Pasion real por la tecnologia", "Responsabilidad y autonomia", "Alta disponibilidad y compromiso"].map((skill) => (
            <div key={skill} className="flex items-center gap-2 py-1">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent-primary)" }} />
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{skill}</span>
            </div>
          ))}
        </FloatingPanel>

        <FloatingPanel title="idiomas.config" delay={0.6}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>Espanol</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "var(--accent-glow)", color: "var(--accent-primary)", border: "1px solid var(--border-accent)" }}>Nativo</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>Ingles</span>
                <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>Intermedio</span>
              </div>
              <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>Escritura (Intermedio) / Comprension (Intermedio) / Expresion oral (Basico)</span>
            </div>
          </div>
        </FloatingPanel>
      </div>
    </section>
  );
}
