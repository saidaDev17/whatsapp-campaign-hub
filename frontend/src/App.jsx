import React, { useState } from 'react';

function App() {
  const [campana, setCampana] = useState({ nombre: '', mensaje: '' });
  const [estadoEnvio, setEstadoEnvio] = useState('');

  // Estados simulados que se alimentarían del Webhook en tiempo real
  const metricas = {
    enviados: 1000,
    entregados: 950,
    leidos: 720,
    fallidos: 50
  };

  // Cálculos de porcentajes para las barras de progreso
  const pctEntregados = (metricas.entregados / metricas.enviados) * 100;
  const pctLeidos = (metricas.leidos / metricas.enviados) * 100;

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!campana.nombre || !campana.mensaje) {
      alert('Por favor, completa todos los campos de la campaña.');
      return;
    }
    setEstadoEnvio('Encolando mensajes masivos en Redis...');
    
    setTimeout(() => {
      setEstadoEnvio(' ¡Campaña enviada con éxito a la cola de procesamiento Celery!');
    }, 1500);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      {/* Encabezado Principal */}
      <header style={{ backgroundColor: '#075e54', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}> Hub de Campañas Masivas — WhatsApp Cloud API</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Panel de Administración</p>
      </header>

      {/* COMPONENTE NUEVO: Dashboard de Métricas en Tiempo Real */}
      <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#075e54', marginTop: 0, borderBottom: '2px solid #ece5dd', paddingBottom: '10px' }}> Dashboard de Métricas (Consumo de Webhook en Vivo)</h2>
        
        {/* Tarjetas de Indicadores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '6px', textAlign: 'center', borderLeft: '5px solid #25d366' }}>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', display: 'block' }}>TOTAL ENVIADOS</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#075e54' }}>{metricas.enviados}</span>
          </div>
          <div style={{ backgroundColor: '#e1f5fe', padding: '15px', borderRadius: '6px', textAlign: 'center', borderLeft: '5px solid #0288d1' }}>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', display: 'block' }}>ENTREGADOS</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0288d1' }}>{metricas.entregados} ({pctEntregados.toFixed(1)}%)</span>
          </div>
          <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '6px', textAlign: 'center', borderLeft: '5px solid #ff9800' }}>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', display: 'block' }}>LEÍDOS (APERTURA)</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9800' }}>{metricas.leidos} ({pctLeidos.toFixed(1)}%)</span>
          </div>
          <div style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '6px', textAlign: 'center', borderLeft: '5px solid #e53935' }}>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', display: 'block' }}>FALLIDOS</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53935' }}>{metricas.fallidos}</span>
          </div>
        </div>

        {/* Gráficas de Barras Visuales */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Tasa de Entrega Global:</span>
            <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '10px', height: '15px', marginTop: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${pctEntregados}%`, backgroundColor: '#0288d1', height: '100%', transition: 'width 0.5s ease-in-out' }}></div>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Tasa de Lectura (Engagement):</span>
            <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '10px', height: '15px', marginTop: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${pctLeidos}%`, backgroundColor: '#ff9800', height: '100%', transition: 'width 0.5s ease-in-out' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenedores Inferiores */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* MÓDULO 1: Creador de Campañas */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#075e54', marginTop: 0, borderBottom: '2px solid #ece5dd', paddingBottom: '10px' }}> Crear Nueva Campaña</h2>
          <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Nombre de la Campaña:</label>
              <input 
                type="text" 
                placeholder="Ej: Promoción Día de la Madre" 
                value={campana.nombre}
                onChange={(e) => setCampana({ ...campana, nombre: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Mensaje de WhatsApp (Plantilla):</label>
              <textarea 
                rows="5" 
                placeholder="Escribe el texto que recibirán tus clientes..." 
                value={campana.mensaje}
                onChange={(e) => setCampana({ ...campana, mensaje: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#25d366', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: 'background 0.3s' }}>
               Lanzar Campaña Masiva
            </button>
          </form>
          {estadoEnvio && (
            <div style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', backgroundColor: '#e1f5fe', color: '#0288d1', fontWeight: 'bold', textAlign: 'center' }}>
              {estadoEnvio}
            </div>
          )}
        </div>

        {/* Módulo 2: Vista de Contactos con Carga CSV */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#075e54', marginTop: 0, borderBottom: '2px solid #ece5dd', paddingBottom: '10px' }}> Audiencia (PostgreSQL)</h2>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px dashed #075e54' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#075e54' }}> Cargar Contactos Masivamente (.CSV / .XLSX):</label>
            <input 
              type="file" 
              accept=".csv, .xlsx"
              onChange={(e) => {
                if(e.target.files.length > 0) {
                  alert(` ¡Archivo "${e.target.files[0].name}" detectado con éxito! Simulando la inyección de 500 contactos de prueba en PostgreSQL...`);
                }
              }}
              style={{ width: '100%', padding: '5px' }}
            />
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Sube tu lista de clientes para procesar envíos en bloque usando Redis.</p>
          </div>

          <p style={{ color: '#666', fontSize: '14px' }}>Contactos listos para recibir la campaña:</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Nombre</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Teléfono</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Saida Requez (Tú)</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Celular Verificado</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}><span style={{ color: '#25d366', fontWeight: 'bold' }}>● Activo</span></td>
              </tr>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Beatriz Torres</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Contacto Prototipo</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}><span style={{ color: '#25d366', fontWeight: 'bold' }}>● Activo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
