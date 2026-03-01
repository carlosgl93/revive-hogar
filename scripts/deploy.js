#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';





const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const envFile = path.join(projectRoot, '.env');
const envBackup = path.join(projectRoot, '.env.backup');

const PRODUCTION_ENV = {
  VITE_ENV: 'production',
  VITE_FIREBASE_FUNCTIONS_URL: 'https://us-central1-revive-hogar.cloudfunctions.net',
};

function readEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .reduce((acc, line) => {
      const [key, ...valueParts] = line.split('=');
      acc[key] = valueParts.join('=');
      return acc;
    }, {});
}

function writeEnv(filePath, envVars) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const updated = lines.map(line => {
    if (!line || line.startsWith('#')) return line;
    const key = line.split('=')[0];
    return envVars.hasOwnProperty(key) ? `${key}=${envVars[key]}` : line;
  });
  fs.writeFileSync(filePath, updated.join('\n'));
}

async function deploy() {
  try {
    console.log('\n📦 Preparing for production deployment...\n');

    // Backup current .env
    console.log('💾 Backing up current .env...');
    fs.copyFileSync(envFile, envBackup);

    // Update .env with production values
    console.log('🔧 Updating .env with production configuration...');
    writeEnv(envFile, PRODUCTION_ENV);

    // Build
    console.log('\n🏗️  Building for production...\n');
    execSync('pnpm run build', { stdio: 'inherit', cwd: projectRoot });

    // Deploy
    console.log('\n🚀 Deploying to Firebase...\n');
    execSync('firebase deploy', { stdio: 'inherit', cwd: projectRoot });

    console.log('\n✅ Deployment successful!\n');

  } catch (error) {
    console.error('\n❌ Deployment failed!\n');
    throw error;
  } finally {
    // Restore original .env
    if (fs.existsSync(envBackup)) {
      console.log('\n🔄 Restoring development .env...');
      fs.copyFileSync(envBackup, envFile);
      fs.unlinkSync(envBackup);
      console.log('✨ Done!\n');
    }
  }
}

deploy().catch(err => {
  process.exit(1);
});