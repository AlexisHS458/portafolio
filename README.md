# Portafolio personal (plantilla)

Portafolio web en React + Vite con soporte multiidioma (ES, EN, PT), tema claro/oscuro, secciones de sobre mí, experiencia, proyectos, pruebas técnicas y contacto.

## Cómo usarlo como plantilla

1. **Clonar o hacer fork del repositorio**
   ```bash
   git clone https://github.com/TU-USUARIO/portafolio.git
   cd portafolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Personalizar** siguiendo la [Guía de personalización](#guía-de-personalización) más abajo.

5. **Build para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```

## Guía de personalización

Todo el texto y datos personales se cambian desde los archivos de idioma, sin tocar (casi) el código.

### 1. Datos personales y hero

- **Archivos:** `src/i18n/locales/es.json`, `en.json`, `pt.json`
- **Claves:**
  - `meta.title` y `meta.description` → SEO y pestaña del navegador
  - `hero.heyIm` → "Hola, soy [Tu nombre]"
  - `hero.typewriter1`, `typewriter2`, `typewriter3` → frases del typewriter
  - `hero.intro`, `highlights` → texto de presentación

### 2. Sobre mí

- **Archivos:** mismos JSON
- **Claves:** `about.paragraph1`, `paragraph2`, `paragraph3`
- **Habilidades:** en `src/About.tsx` está el array `skillsByTab` (tecnologías, herramientas, habilidades). Puedes editar los `items` de cada categoría.

### 3. Experiencia laboral

- **Archivos:** `src/i18n/locales/*.json`
- **Claves:** `experience.job1`, `job2`, `job3`, `job4` (cada uno con `company`, `role`, `period`, `description`)
- Para **ocultar** un trabajo: deja `company` en `""`.
- Para **más de 4 trabajos:** en `src/Experience.tsx` añade `"job5"` (etc.) al array `EXPERIENCE_IDS` y en cada JSON añade el objeto `experience.job5` con los mismos campos.

### 4. Proyectos

- **Datos:** `src/Projects.tsx` → array `PROJECTS_LIST` (id, image, siteLink, githubLink, tags).
- **Textos:** en los JSON, dentro de `projects.[id]` → `title`, `technologies`, `description` (por ejemplo `projects.codisa.title`).
- **Imágenes:** añade tus PNG/JPG en `src/Images/` e impórtalas en `Projects.tsx`. Usa el mismo `id` en la lista y en los JSON.
- **Filtros:** los `tags` deben ser uno o más de: `"vue"`, `"react"`, `"next"`, `"nuxt"`, `"liquid"`. Los chips se generan a partir de `technologies` (separadas por ` · `).
- **“Imagen representativa”:** si quieres el pie bajo la imagen solo en algunos proyectos, en `Projects.tsx` mantén la condición `proj.id === "fintechBackoffice" || proj.id === "roadStats"` y cambia los ids por los tuyos, o añade más.

### 5. Pruebas técnicas

- **Datos:** `src/TechnicalTests.tsx` → array `TECHNICAL_TESTS_LIST` (misma estructura que proyectos).
- **Textos:** se reutilizan `projects.[id]` de los JSON (por ejemplo `projects.todo`, `projects.ecommerce`). Crea entradas nuevas en `projects` si añades proyectos solo para esta sección.
- **Traducciones de la sección:** `technicalTests.title` y `technicalTests.subtitle` en los JSON.

### 6. Contacto

- **Textos:** en los JSON, `contact.*` (título, texto, placeholders, mensajes de éxito/error).
- **Envío del formulario:** en `src/Contact.tsx` está la lógica de envío (por ejemplo con Formspree o tu backend). Cambia la URL o el método según tu servicio.

### 7. CV y redes

- **CV:** sustituye el archivo `src/Images/CV.pdf` por tu PDF. El botón “CV” del nav ya lo enlaza.
- **LinkedIn / GitHub:** en `src/Navbar.tsx` y en el menú móvil busca las URLs `linkedin.com/in/...` y `github.com/...` y reemplázalas por las tuyas.

### 8. Idiomas

- Por defecto hay **es**, **en** y **pt**. Para añadir otro idioma:
  - Crea `src/i18n/locales/xx.json` (copiando uno existente y traduciendo).
  - En `src/i18n/index.ts` añade el idioma a `resources` y a `supportedLanguages` (si usas selector en el nav).

### 9. Colores y tema

- Los estilos usan variables CSS (por ejemplo `--accent-color`, `--background`, `--text-primary`). Búscalas en `src/CSS Files/App.css` o en los archivos de cada sección para ajustar tema claro/oscuro a tu gusto.

## Estructura del proyecto

```
src/
├── i18n/locales/     # es.json, en.json, pt.json (todo el texto)
├── Images/           # Imágenes de proyectos + CV.pdf
├── CSS Files/        # Estilos por sección
├── About.tsx
├── Experience.tsx
├── Projects.tsx
├── TechnicalTests.tsx
├── Contact.tsx
├── Navbar.tsx
├── Footer.tsx
└── App.tsx
```

## Requisitos

- Node.js (versión indicada en `package.json`: `engines.node`)
- npm o yarn
