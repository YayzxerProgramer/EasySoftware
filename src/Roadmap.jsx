import './Roadmap.css';

const HITOS = [
  {
    id: 'hito-1',
    estado: 'completado',
    titulo: 'TODO: título del hito completado',
    descripcion: 'TODO: una línea explicando qué se logró.',
    fecha: 'TODO: mes y año',
  },
  {
    id: 'hito-2',
    estado: 'en-progreso',
    titulo: 'TODO: título del hito en curso',
    descripcion: 'TODO: una línea del trabajo actual.',
    fecha: 'TODO: fecha objetivo',
  },
  {
    id: 'hito-3',
    estado: 'pendiente',
    titulo: 'TODO: título del próximo hito',
    descripcion: 'TODO: una línea del plan a futuro.',
    fecha: 'TODO: por definir',
  },
];

const ETIQUETA_ESTADO = {
  completado: 'completado',
  'en-progreso': 'en progreso',
  pendiente: 'pendiente',
};

function Icono({ estado }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (estado === 'completado') {
    return (
      <svg {...props}>
        <path d="M5 12l5 5L20 7" />
      </svg>
    );
  }
  if (estado === 'en-progreso') {
    return (
      <svg {...props} strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  return (
    <svg {...props} strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export default function Roadmap() {
  return (
    <section className="roadmap" aria-labelledby="roadmap-titulo">
      <h2 id="roadmap-titulo" className="roadmap__titulo">
        Hoja de ruta
      </h2>
      <ol className="roadmap__lista">
        {HITOS.map((h) => (
          <li
            key={h.id}
            className={`roadmap__hito roadmap__hito--${h.estado}`}
            aria-label={`${h.titulo}: ${ETIQUETA_ESTADO[h.estado]}`}
          >
            <span className="roadmap__icono" aria-hidden="true">
              <Icono estado={h.estado} />
            </span>
            <div className="roadmap__texto">
              <span className="roadmap__hito-titulo">{h.titulo}</span>
              <span className="roadmap__hito-desc">{h.descripcion}</span>
            </div>
            <span className="roadmap__fecha">{h.fecha}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
