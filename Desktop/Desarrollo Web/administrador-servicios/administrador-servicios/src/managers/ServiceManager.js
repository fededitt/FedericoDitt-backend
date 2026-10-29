
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

const servicesPath = join(
  currentDirectory,
  '../data/services.json'
);

const initialServices = JSON.parse(
  readFileSync(servicesPath, 'utf-8')
);

const requiredFields = [
  'name',
  'description',
  'duration',
  'price',
  'category',
  'available'
];

export default class ServiceManager {
  constructor() {
    this.services = initialServices.map(service => ({ ...service }));

    this.nextId = this.services.reduce(
      (maxId, service) => Math.max(maxId, service.id),
      0
    ) + 1;
  }

  getServices() {
    return this.services;
  }

  getServiceById(id) {
    return this.services.find(service => service.id === Number(id)) ?? null;
  }

  addService(serviceData) {
    if (!serviceData || typeof serviceData !== 'object' || Array.isArray(serviceData)) {
      throw new Error('Los datos del servicio deben ser un objeto válido.');
    }

    const missingFields = requiredFields.filter(field =>
      !Object.hasOwn(serviceData, field) ||
      serviceData[field] === null ||
      serviceData[field] === undefined ||
      serviceData[field] === ''
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Faltan campos obligatorios: ${missingFields.join(', ')}`
      );
    }

    if (
      typeof serviceData.name !== 'string' ||
      typeof serviceData.description !== 'string' ||
      typeof serviceData.category !== 'string' ||
      !serviceData.name.trim() ||
      !serviceData.description.trim() ||
      !serviceData.category.trim()
    ) {
      throw new Error(
        'name, description y category deben ser textos no vacíos.'
      );
    }

    if (
      !Number.isFinite(serviceData.duration) ||
      serviceData.duration <= 0 ||
      !Number.isFinite(serviceData.price) ||
      serviceData.price < 0 ||
      typeof serviceData.available !== 'boolean'
    ) {
      throw new Error(
        'duration debe ser positivo, price no puede ser negativo y available debe ser booleano.'
      );
    }

    const newService = {
      id: this.nextId++,
      name: serviceData.name.trim(),
      description: serviceData.description.trim(),
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category.trim(),
      available: serviceData.available
    };

    this.services.push(newService);

    return newService;
  }

  updateService(id, updatedData) {
    const service = this.getServiceById(id);

    if (!service) {
      return null;
    }

    if (
      !updatedData ||
      typeof updatedData !== 'object' ||
      Array.isArray(updatedData)
    ) {
      throw new Error('Los datos de actualización deben ser un objeto válido.');
    }

    if (Object.hasOwn(updatedData, 'id')) {
      throw new Error('No está permitido modificar el id del servicio.');
    }

    const invalidFields = Object.keys(updatedData).filter(
      field => !requiredFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new Error(
        `Campos no permitidos: ${invalidFields.join(', ')}`
      );
    }

    const candidate = { ...service, ...updatedData };

    const missingFields = requiredFields.filter(field =>
      candidate[field] === null ||
      candidate[field] === undefined ||
      candidate[field] === ''
    );

    if (missingFields.length > 0) {
      throw new Error(
        `El servicio debe conservar todos sus campos: ${missingFields.join(', ')}`
      );
    }

    if (
      typeof candidate.name !== 'string' ||
      typeof candidate.description !== 'string' ||
      typeof candidate.category !== 'string' ||
      !candidate.name.trim() ||
      !candidate.description.trim() ||
      !candidate.category.trim() ||
      !Number.isFinite(candidate.duration) ||
      candidate.duration <= 0 ||
      !Number.isFinite(candidate.price) ||
      candidate.price < 0 ||
      typeof candidate.available !== 'boolean'
    ) {
      throw new Error('Los datos del servicio contienen valores inválidos.');
    }

    Object.assign(service, {
      ...candidate,
      name: candidate.name.trim(),
      description: candidate.description.trim(),
      category: candidate.category.trim()
    });

    return service;
  }

  deleteService(id) {
    const index = this.services.findIndex(
      service => service.id === Number(id)
    );

    if (index === -1) {
      return null;
    }

    return this.services.splice(index, 1)[0];
  }
}



