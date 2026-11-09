import { Isotipo } from "@/components/ui/Logo";

/**
 * Pantalla de carga inicial:
 * 1. Isotipo en escala de grises que se llena de color mientras carga la página.
 * 2. Al terminar (load + fuentes, mínimo ~1.4 s) el color se completa y el logo se desvanece.
 * 3. Dos paneles se abren como cortinas hacia los lados y aparece la web.
 *
 * Se controla con un script inline (no espera a React) y clases en <html>:
 *   .js → .intro-progress → .intro-done → .intro-open → .intro-gone
 * Sin JavaScript no se muestra. Con prefers-reduced-motion solo hace un fundido.
 */

const MIN_MS = 1400; // tiempo mínimo para que se lea el llenado de color
const FAILSAFE_MS = 7000; // si algo falla, se abre igual

export const introScript = `(function(){var d=document.documentElement;d.classList.add('js');
var t0=Date.now(),done=false;
function finish(){if(done)return;done=true;d.classList.add('intro-done');
setTimeout(function(){d.classList.add('intro-open');setTimeout(function(){d.classList.add('intro-gone')},1000)},450)}
requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('intro-progress')})});
var w=[new Promise(function(r){if(document.readyState==='complete')r();else addEventListener('load',function(){r()},{once:true})})];
if(document.fonts&&document.fonts.ready)w.push(document.fonts.ready);
Promise.all(w).then(function(){setTimeout(finish,Math.max(0,${MIN_MS}-(Date.now()-t0)))},finish);
setTimeout(finish,${FAILSAFE_MS});})();`;

export function IntroCurtain() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panel intro-panel-left" />
      <div className="intro-panel intro-panel-right" />

      <div className="intro-mark">
        <div className="intro-glow" />
        <div className="relative size-24 sm:size-28">
          {/* Capa en blanco y negro */}
          <Isotipo size={112} className="intro-gray absolute inset-0 size-full" />
          {/* Capa a color que se revela de abajo hacia arriba */}
          <div className="intro-fill">
            <div className="intro-fill-inner">
              <Isotipo size={112} priority className="size-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
