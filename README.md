# Portfolio de Andres Lorente Martinez

Portfolio personal de desarrollador con interfaz tipo software creativo profesional,
graficos 3D en tiempo real, shaders GLSL personalizados, sistema de particulas reactivo
y animaciones cinematograficas.

---

## Tecnologias utilizadas

### Framework base
- **Next.js 16** (App Router) - Framework React con SSR y optimizacion automatica
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estatico para mayor robustez

### 3D y renderizado
- **Three.js** - Motor de graficos 3D WebGL
- **React Three Fiber** - Wrapper declarativo de Three.js para React
- **@react-three/drei** - Helpers y abstracciones para R3F
- **GLSL Shaders personalizados** - Vertex y fragment shaders escritos a mano

### Animaciones
- **Motion (motion.dev)** - Animaciones declarativas de alto rendimiento
- **Lenis** - Smooth scroll cinematografico

### Estilos
- **TailwindCSS v4** - Utilidades CSS para layout
- **CSS Variables** - Sistema de design tokens personalizado
- **Glassmorphism** - Paneles translucidos con blur y bordes suaves

### Estado
- **Zustand** - Estado global ligero y reactivo

### Herramientas
- **ESLint** - Analisis estatico de codigo
- **Prettier** - Formateo automatico
- **Husky + lint-staged** - Git hooks para calidad de codigo

---

## Arquitectura del proyecto

```
src/
  app/
    layout.tsx                  # Layout raiz con fuentes y metadata
    page.tsx                    # Pagina principal (carga dinamica sin SSR)
    globals.css                 # Variables CSS, glassmorphism, grid layout
  components/
    AppShell.tsx                # Shell principal - orquesta layout completo
    3d/
      SceneCanvas.tsx           # Canvas Three.js con lazy loading de escenas
      ParticleField.tsx         # Sistema de particulas con shaders GLSL
      HeroMesh.tsx              # Malla icosaedro con displacement procedural
      scenes/
        HeroScene.tsx           # Escena principal (malla + particulas + luces)
        PlaygroundScene.tsx     # Escena del laboratorio interactivo
    ui/
      TopBar.tsx                # Barra superior tipo aplicacion
      Sidebar.tsx               # Navegacion lateral con iconos (desktop)
      MobileNav.tsx             # Navegacion inferior (movil)
      InspectorPanel.tsx        # Panel inspector derecho con propiedades
      StatusBar.tsx             # Barra de estado inferior
      LoadingScreen.tsx         # Pantalla de carga cinematografica
      Workspace.tsx             # Area de contenido con smooth scroll
      sections/
        HeroSection.tsx         # Seccion hero con nombre y CTAs
        AboutSection.tsx        # Seccion sobre mi, experiencia, skills
        ProjectsSection.tsx     # Proyectos como modulos expandibles
        PlaygroundSection.tsx   # Laboratorio visual interactivo
        ContactSection.tsx      # Informacion de contacto
  hooks/
    useMousePosition.ts         # Posicion del cursor normalizada
    useMobileDetect.ts          # Deteccion de dispositivo movil
    useSmoothScroll.ts          # Inicializacion de Lenis smooth scroll
  state/
    store.ts                    # Estado global Zustand
  types/
    glsl.d.ts                   # Declaraciones de tipos para GLSL
```

---

## Instalacion

```bash
git clone <url-del-repositorio>
cd portfolio-andres
npm install
npm run dev
```

## Scripts disponibles

| Script          | Descripcion                                    |
|-----------------|------------------------------------------------|
| `npm run dev`   | Inicia el servidor de desarrollo con Turbopack |
| `npm run build` | Genera la build de produccion optimizada       |
| `npm run start` | Inicia el servidor de produccion               |
| `npm run lint`  | Ejecuta ESLint para analisis de codigo         |

## Despliegue con Docker

```bash
docker build -t portfolio-andres .
docker compose up -d
```

La aplicacion estara disponible en el puerto 80 a traves de Nginx.

---

## Autor

**Andres Lorente Martinez** - Software Engineer

- Email: andres@cabletea.com
- GitHub: https://github.com/Andresmartineez6
- LinkedIn: https://linkedin.com/in/AndresLorenteMartinez
