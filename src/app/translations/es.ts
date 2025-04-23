const translations = {
    themeSettings: {
        title: 'Preferencias de Diseño',
        subtitle: 'Personaliza y visualiza en tiempo real',
        theming: 'Temas',
        styleMode: 'Estilo (Modo)',
        language: 'Idioma',
        chooseLanguage: 'Elegir Idioma',
        cancel: 'Cancelar',
        applyChanges: 'Aplicar Cambios',
        changesSaved: '¡Cambios guardados con éxito!',
        errorSaving: 'Error al guardar preferencias',
        settingsReset: 'Configuración restablecida a los valores guardados',
        sessionNote: 'Los cambios se aplicarán a tu sesión actual',
        modes: {
            light: 'Claro',
            dark: 'Oscuro',
            auto: 'Automático'
        },
        languages: {
            english: 'Inglés',
            portuguese: 'Portugués',
            spanish: 'Español'
        }
    },
    navbar: {
        home: 'Inicio',
        projects: 'Proyectos',
        about: 'Sobre mí',
        contact: 'Contacto',
        login: 'Iniciar sesión',
        toggleMenu: 'Alternar menú'
    },
    home: {
        welcomeTitle: 'Bienvenido a la Página de Inicio',
        welcomeText: 'Esta es el área de contenido principal.'
    },
    projects: {
        title: 'Mis Proyectos',
        subtitle: 'Mira algunos de mis trabajos recientes',
        searchPlaceholder: 'Buscar proyectos...',
        filterAll: 'Todos',
        noProjectsFound: 'No se encontraron proyectos con los criterios seleccionados',
        resetFilters: 'Restablecer filtros',
        featured: 'Destacado',
        liveDemo: 'Demo en vivo',
        code: 'Código'
    },
    about: {
        title: 'Sobre Mí',
        subtitle: 'Conoce más sobre mí y mi experiencia',
        imageAlt: 'Micael Ribeiro',
        role: 'Desarrollador Full Stack',
        bio: {
            paragraph1: '¡Hola! Soy un apasionado desarrollador web de Madeira, Portugal, con una combinación de educación formal y experiencia autodidacta en la creación de aplicaciones web responsivas y dinámicas. Mi trayectoria combina aprendizaje estructurado con experiencia práctica en la construcción de proyectos del mundo real.',
            paragraph2: 'Mientras curso Ingeniería de Software, continúo expandiendo mis habilidades a través de proyectos personales y trabajo freelance. Me especializo en React y Next.js para desarrollo frontend, con creciente experiencia en tecnologías backend. Soy particularmente apasionado por crear experiencias de usuario intuitivas y escribir código limpio y mantenible.'
        },
        email: 'Email',
        location: 'Ubicación',
        availability: 'Disponibilidad',
        availabilityStatus: 'Freelance & Tiempo Parcial',
        downloadCV: 'Descargar CV',
        contactMe: 'Contáctame',
        tabs: {
            overview: 'Resumen',
            experience: 'Experiencia',
            education: 'Educación'
        },
        skills: {
            title: 'Mis Habilidades',
            frontend: 'Desarrollo Frontend',
            backend: 'Desarrollo Backend',
            tools: 'Herramientas & Tecnologías'
        },
        experience: {
            title: 'Experiencia Laboral',
            items: [
                {
                    title: 'Desarrollador Frontend',
                    company: 'Freelance',
                    period: '2021 - Presente',
                    description: 'Desarrollo de aplicaciones web responsivas y amigables utilizando tecnologías modernas como React, Next.js y Tailwind CSS.'
                },
                {
                    title: 'Prácticas en Desarrollo Web',
                    company: 'Empresa de Tecnología',
                    period: '2020 - 2021',
                    description: 'Asistí al equipo de desarrollo en la creación y mantenimiento de aplicaciones web, enfocándome en componentes de UI y diseño responsivo.'
                }
            ]
        },
        education: {
            title: 'Educación',
            items: [
                {
                    degree: 'Licenciatura en Ingeniería de Software',
                    institution: 'Universidad de Madeira',
                    period: '2018 - Presente',
                    description: 'Enfoque en desarrollo full-stack, algoritmos y principios de arquitectura de software.'
                },
                {
                    degree: 'Bootcamp de Desarrollo Web',
                    institution: 'Plataforma Online',
                    period: '2019',
                    description: 'Programa intensivo de 12 semanas cubriendo tecnologías y prácticas modernas de desarrollo web.'
                }
            ]
        }
    },
    contact: {
        title: 'Ponte en Contacto',
        subtitle: '¿Tienes alguna pregunta o quieres trabajar juntos? Discutamos tu próximo proyecto.',
        whyWorkWithMe: '¿Por Qué Trabajar Conmigo?',
        cards: {
            fastDelivery: {
                title: 'Entrega Rápida',
                description: 'Me enorgullezco de entregar proyectos a tiempo sin comprometer la calidad. Mi flujo de trabajo eficiente y habilidades de gestión de proyectos aseguran que tu proyecto pase del concepto a la finalización rápidamente.'
            },
            responsiveDesign: {
                title: 'Diseño Responsivo',
                description: 'Todos los proyectos se construyen con enfoque mobile-first, asegurando una visualización perfecta en todos los dispositivos. Creo experiencias que se adaptan a cualquier tamaño de pantalla, desde smartphones hasta monitores de escritorio.'
            },
            dedicatedSupport: {
                title: 'Soporte Dedicado',
                description: 'Ofrezco soporte continuo y mantenimiento para asegurar que tu proyecto siga funcionando sin problemas. Después del lanzamiento, proporciono soporte técnico, corrección de errores y actualizaciones regulares para mantener tu sitio seguro.'
            }
        },
        availability: {
            title: 'Disponibilidad Actual',
            status: 'Disponible para nuevos proyectos',
            startDate: 'Actualmente estoy aceptando nuevos proyectos a partir de',
            responseTime: 'Tiempo medio de respuesta:',
            hours: 'horas',
            preferredProjects: 'Proyectos Preferidos',
            projects: {
                webApps: 'Aplicaciones Web',
                ecommerce: 'Proyectos de E-commerce',
                frontend: 'Desarrollo Frontend',
                react: 'Proyectos React/Next.js'
            }
        },
        form: {
            title: 'Envíame un Mensaje',
            nameLabel: 'Tu Nombre',
            namePlaceholder: 'Ingresa tu nombre',
            emailLabel: 'Tu Email',
            emailPlaceholder: 'Ingresa tu email',
            subjectLabel: 'Asunto',
            subjectPlaceholder: 'Ingresa el asunto',
            messageLabel: 'Mensaje',
            messagePlaceholder: 'Ingresa tu mensaje',
            sendButton: 'Enviar Mensaje'
        },
        faq: {
            title: 'Preguntas Frecuentes',
            questions: [
                {
                    question: '¿Qué servicios ofreces?',
                    answer: 'Ofrezco servicios de desarrollo web incluyendo desarrollo frontend, diseño responsivo, soluciones de e-commerce, y mantenimiento y soporte continuo.'
                },
                {
                    question: '¿Cuánto cuestan tus servicios?',
                    answer: 'Los precios varían dependiendo del alcance del proyecto, complejidad y plazo. Ofrezco tarifas competitivas y proporcionaré un presupuesto detallado después de discutir tus requisitos específicos.'
                },
                {
                    question: '¿Cuánto tiempo toma un proyecto típico?',
                    answer: 'Los plazos de los proyectos varían según el alcance y la complejidad. Un sitio web simple puede tomar 2-4 semanas, mientras que las aplicaciones más complejas pueden tomar 2-3 meses o más. Proporcionaré una estimación de tiempo durante nuestra consulta.'
                },
                {
                    question: '¿Proporcionas soporte continuo después del lanzamiento?',
                    answer: 'Sí, ofrezco paquetes de mantenimiento y soporte continuos para asegurar que tu sitio permanezca seguro, actualizado y funcionando correctamente después del lanzamiento.'
                }
            ]
        },
        cta: {
            title: '¿Listo para comenzar tu proyecto?',
            subtitle: '¡Creemos algo increíble juntos!',
            button: 'Programar una Llamada'
        }
    },
    footer: {
        aboutMeTitle: 'Sobre Mí',
        aboutMeText: '¡Hola! Mi nombre es Micael Ribeiro y soy un desarrollador web apasionado por crear soluciones innovadoras y eficientes. Con experiencia en varias tecnologías, siempre estoy buscando nuevos desafíos para mejorar mis habilidades.',
        contactInfoTitle: 'Información de Contacto',
        address: 'Canhas, Funchal, Madeira',
        taxId: 'NIF:',
        quickLinksTitle: 'Enlaces Rápidos',
        links: {
            home: 'Inicio',
            projects: 'Proyectos',
            about: 'Sobre Mí',
            contact: 'Contacto',
            login: 'Iniciar sesión',
            privacyPolicy: 'Privacidad'
        },
        copyright: 'Micael Ribeiro · Diseño & Desarrollo Web · Madeira - Portugal'
    }
}

export default translations;