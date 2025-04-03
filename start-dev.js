import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start backend server
const backend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
}); 