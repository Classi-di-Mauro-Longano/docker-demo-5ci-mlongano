const express = require('express');


const app = express();

// Configurazione da variabili d'ambiente con defaults
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

// === ROUTES ===

// Healthcheck endpoint (usato da Docker e load balancer)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0.0',
    description: 'REST API for task management',
    endpoints: {
      health: 'GET /health',
      tasks: {
        list: 'GET /tasks',
        get: 'GET /tasks/:id',
        create: 'POST /tasks',
        update: 'PUT /tasks/:id',
        patch: 'PATCH /tasks/:id',
        delete: 'DELETE /tasks/:id'
      }
    }
  });
});

app.post('/tasks', (req, res) => {

  // Placeholder per creare un task


  try {
    const { title, description = null, priority = 'medium' } = req.body;
    console.log(req.body);
    console.log(title, description, priority);

    const result = db.prepare(`
      INSERT INTO tasks (title, description, priority)
      VALUES (@title, @description, @priority)
    `).run({ title, description, priority });

    // Recupera il task appena creato per restituirlo completo
    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});


// ===== Initialise the Database =====
initializeDatabase();


const server = app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                    Task API Server                     ║
╠═══════════════════════════════════════════════════════╣
║  Status:      Running                                  ║
║  URL:         http://${HOST}:${PORT.toString().padEnd(32)}║
║  Environment: ${NODE_ENV.padEnd(40)}║
║  Process ID:  ${process.pid.toString().padEnd(40)}║
╚═══════════════════════════════════════════════════════╝
  `);
});

