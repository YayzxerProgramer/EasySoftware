import { useEffect, useRef } from 'react';
import './ProximamenteEasySoftware.css';

export default function ProximamenteEasySoftware() {
  const referenciaCanvas = useRef(null);

  useEffect(() => {
    const canvas = referenciaCanvas.current;
    const contexto = canvas.getContext('2d');
    let ancho, alto, nodos, idAnimacion;

    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function redimensionar() {
      ancho = canvas.width = window.innerWidth;
      alto = canvas.height = window.innerHeight;
      const cantidad = Math.min(60, Math.floor((ancho * alto) / 22000));
      nodos = Array.from({ length: cantidad }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function dibujarFrame() {
      contexto.clearRect(0, 0, ancho, alto);
      contexto.fillStyle = 'rgba(55,138,221,0.55)';

      for (const nodo of nodos) {
        if (!movimientoReducido) {
          nodo.x += nodo.vx;
          nodo.y += nodo.vy;
          if (nodo.x < 0 || nodo.x > ancho) nodo.vx *= -1;
          if (nodo.y < 0 || nodo.y > alto) nodo.vy *= -1;
        }
        contexto.beginPath();
        contexto.arc(nodo.x, nodo.y, 1.6, 0, Math.PI * 2);
        contexto.fill();
      }

      for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
          const nodoA = nodos[i], nodoB = nodos[j];
          const dx = nodoA.x - nodoB.x, dy = nodoA.y - nodoB.y;
          const distancia = Math.sqrt(dx * dx + dy * dy);
          if (distancia < 140) {
            contexto.strokeStyle = `rgba(24,95,165,${0.35 * (1 - distancia / 140)})`;
            contexto.lineWidth = 0.6;
            contexto.beginPath();
            contexto.moveTo(nodoA.x, nodoA.y);
            contexto.lineTo(nodoB.x, nodoB.y);
            contexto.stroke();
          }
        }
      }

      idAnimacion = requestAnimationFrame(dibujarFrame);
    }

    redimensionar();
    dibujarFrame();
    window.addEventListener('resize', redimensionar);

    return () => {
      window.removeEventListener('resize', redimensionar);
      cancelAnimationFrame(idAnimacion);
    };
  }, []);

  return (
    <div className="proximamente">
      <canvas ref={referenciaCanvas} className="proximamente__red" />

      <div className="proximamente__contenedor">
        <span className="proximamente__etiqueta">
          <span className="proximamente__punto" /> En construcción
        </span>

        <h1 className="proximamente__titulo">
          EasySoftware<span className="proximamente__cursor" />
        </h1>

        <p className="proximamente__descripcion">
          Estamos construyendo la base. Software a medida, sistemas de gestión
          y automatizaciones para negocios que necesitan resolver, no solo
          digitalizar.
        </p>

        <a className="proximamente__contacto" href="mailto:contacto@easysoftware.dev">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16v16H4z" />
            <path d="m4 6 8 7 8-7" />
          </svg>
          contacto@easysoftware.dev
        </a>

        <footer className="proximamente__pie">
          EasySoftware &middot; Cartagena, Colombia
        </footer>
      </div>
    </div>
  );
}
