"use client";
import { motion } from "motion/react";
import GithubPacman from "@/components/ui/GithubPacman";
import TechStack3D from "@/components/ui/TechStack3D";

const fadeUp = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
};

function Panel({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass-panel glass-panel-hover flex flex-col"
    >
      <div className="flex items-center px-5 py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{title}</span>
      </div>
      <div className="p-5 flex flex-col gap-3">{children}</div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section className="min-h-screen px-4 md:px-6 py-24 flex flex-col gap-10">
      <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-3">
        <span className="section-label">01 / Sobre Mi</span>
        <h2 className="section-title">Perfil Profesional</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="bio.txt" delay={0.05}>
          <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
            Soy un programador especializado en el desarrollo de software. Tengo habilidades tanto en el desarrollo del lado del cliente como del servidor. Soy capaz de trabajar de forma independiente y en equipo, entregando proyectos de alta calidad dentro de los plazos establecidos.
          </p>
          <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
            Estoy constantemente actualizandome y aprendiendo nuevas tecnologias para mantenerme al tanto de las ultimas tendencias en el desarrollo web.
          </p>
        </Panel>

        <Panel title="experiencia.log" delay={0.1}>
          {[
            { role: "Desarrollador Web — WordPress", company: "ImpulsaTelecom S.L, Baza (Granada)", period: "Jul 2023 — Sep 2024", desc: "Desarrollo de paginas Web con WordPress usando el Constructor Divi." },
            { role: "Fundador y CEO", company: "Cabletea S.L, Baza (Granada)", period: "Jun 2024", desc: "Fundacion y creacion de empresa teleoperadora de fibra y movil." },
            { role: "Programador Junior / Gestor de proyectos", company: "BeeBit Solutions S.L, Granada", period: "Sep 2024 — Dic 2024", desc: "Desarrollo web de un gestor de proyectos." },
          ].map((exp, i) => (
            <div key={i} className="flex flex-col gap-1.5 py-3" style={i > 0 ? { borderTop: "1px solid var(--border-subtle)" } : {}}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-[13px] font-semibold" style={{ letterSpacing: "-0.01em" }}>{exp.role}</h4>
                  <span className="text-[11px]" style={{ color: "var(--accent-primary)" }}>{exp.company}</span>
                </div>
                <span className="text-[9px] font-mono whitespace-nowrap px-2 py-1 rounded-md flex-shrink-0"
                  style={{ color: "var(--text-muted)", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)" }}>{exp.period}</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{exp.desc}</p>
            </div>
          ))}
        </Panel>

        <Panel title="educacion.md" delay={0.15}>
          {[
            { title: "Desarrollo Back-End con Node.js", place: "Escuela Arte Granada", badge: "En curso", active: true },
            { title: "Curso superior de Diseno y desarrollo web", place: "Escuela Arte Granada", badge: "En curso", active: true },
            { title: "Desarrollo de Aplicaciones Web", place: "Escuela Arte Granada", badge: "2024", active: false },
            { title: "Desarrollo de aplicaciones con Python", place: "Escuela Arte Granada", badge: "2022", active: false },
            { title: "Bachillerato Cientifico Tecnologico", place: "I.E.S Jose de Mora, Baza", badge: "2022", active: false },
          ].map((edu, i) => (
            <div key={edu.title} className="flex items-start justify-between gap-3 py-2" style={i > 0 ? { borderTop: "1px solid var(--border-subtle)" } : {}}>
              <div className="flex flex-col gap-0.5 min-w-0">
                <h4 className="text-[12px] font-medium" style={{ letterSpacing: "-0.01em" }}>{edu.title}</h4>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{edu.place}</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0"
                style={{
                  background: edu.active ? "var(--accent-glow)" : "var(--bg-glass)",
                  color: edu.active ? "var(--accent-primary)" : "var(--text-muted)",
                  border: `1px solid ${edu.active ? "var(--border-accent)" : "var(--border-subtle)"}`,
                }}>{edu.badge}</span>
            </div>
          ))}
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="soft-skills.yml" delay={0.2}>
            <div className="flex flex-col gap-2.5">
              {["Aprendizaje continuo y mentalidad de crecimiento", "Trabajo en equipo y buena comunicacion",
                "Pasion real por la tecnologia", "Responsabilidad y autonomia", "Alta disponibilidad y compromiso"].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent-primary)" }} />
                  <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{s}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="idiomas.config" delay={0.25}>
            <div className="flex items-center justify-between py-1">
              <span className="text-[12px] font-medium">Espanol</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-md"
                style={{ background: "var(--accent-glow)", color: "var(--accent-primary)", border: "1px solid var(--border-accent)" }}>Nativo</span>
            </div>
            <div className="flex items-center justify-between py-1" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <span className="text-[12px] font-medium">Ingles</span>
              <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>Intermedio</span>
            </div>
          </Panel>
        </div>
      </div>

      <TechStack3D />
      <GithubPacman />
    </section>
  );
}
