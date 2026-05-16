# LaParada — Dashboard Interno

Dashboard financiero en tiempo real para el equipo de **LaParada**, conectado directamente a Google Sheets vía Apps Script.

## ✨ Funcionalidades

- **Resumen general** — KPIs totales: ingresos, utilidad neta, margen promedio, movimientos recientes
- **Eventos** — Cards por evento con drill-down a P&L completo, transacciones y gastos por persona
- **Comparativa** — Gráfico y tabla comparativa entre eventos seleccionados
- **Movimientos** — Todas las transacciones con búsqueda y filtros por evento y tipo

## 🛠 Stack

- React 18 (sin build step, via Babel standalone)
- Chart.js 4 para gráficos
- Google Apps Script como API de datos
- Datos en tiempo real desde Google Sheets

## 🚀 Deploy

### 1. Apps Script (API de datos)

1. Ir a [script.google.com](https://script.google.com) → Nuevo proyecto
2. Pegar el contenido de `Code.gs`
3. **Implementar → Nueva implementación → Aplicación web**
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier usuario**
4. Copiar la URL `/exec`
5. Pegarla en `index.html` donde dice `const API = '...'`

### 2. Netlify (frontend)

Arrastrar `index.html` a [app.netlify.com/drop](https://app.netlify.com/drop)

### 3. GitHub Pages (alternativa)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/laparada-dashboard.git
git push -u origin main
```

Luego en GitHub → Settings → Pages → Source: `main / root`

## 📊 Estructura de datos esperada (Google Sheets)

Cada Sheet debe tener:
- Tabla resumen con columnas: `SECCION | METRICA | VALOR | PORCENTAJE`
- Tabla de transacciones con: `CONCEPTO | VALOR | NOTAS | FECHA | TIPO | PERSONA ENCARGADA`
- Tabla de personas: `PERSONA ENCARGADA | TOTAL GASTOS`

## 🎨 Colores de marca

| Variable | Valor | Uso |
|----------|-------|-----|
| `--y` | `#F4C430` | Amarillo LaParada |
| `--bg` | `#0A0A08` | Fondo principal |
| `--g` | `#3DD68C` | Valores positivos |
| `--r` | `#F06449` | Valores negativos |

---

Desarrollado para LaParada Colombia 🇨🇴
