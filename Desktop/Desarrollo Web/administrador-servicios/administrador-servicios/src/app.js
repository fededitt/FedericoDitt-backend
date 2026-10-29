
import { env } from './config/env.config.js';
import ServiceManager from './managers/ServiceManager.js';

const serviceManager = new ServiceManager();

console.log('Administrador de servicios iniciado.');
console.log(`Entorno: ${env.nodeEnv}`);
console.log(`Puerto configurado: ${env.port}`);

console.log('\nServicios disponibles en el sistema:');
console.log(serviceManager.getServices());

console.log('\nConsulta del servicio con ID 2:');
console.log(serviceManager.getServiceById(2));
