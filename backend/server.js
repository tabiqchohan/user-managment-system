const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const errorHandler = require('./middleware/errorHandler');

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable cross-origin requests
app.use(express.json({ limit: '10mb' })); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    next(error);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email
      }
    });

    res.json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (error.code === 'P2025') {
      // Record not found
      return res.status(404).json({ error: 'User not found' });
    }
    next(error);
  }
});

app.patch('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validation - at least one field must be provided
    if (!name && !email) {
      return res.status(400).json({ error: 'At least one field (name or email) must be provided' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email })
      }
    });

    res.json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (error.code === 'P2025') {
      // Record not found
      return res.status(404).json({ error: 'User not found' });
    }
    next(error);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.status(204).send(); // No content
  } catch (error) {
    if (error.code === 'P2025') {
      // Record not found
      return res.status(404).json({ error: 'User not found' });
    }
    next(error);
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;