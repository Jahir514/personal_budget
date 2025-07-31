// import { connect, disconnect, connection } from 'mongoose'
// import { MongoMemoryServer } from 'mongodb-memory-server'
// import Supplier from '../model/supplier.model'

// let mongoServer: MongoMemoryServer

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create()
//   const uri = mongoServer.getUri()
//   await connect(uri)
// })

// afterAll(async () => {
//   await disconnect()
//   await mongoServer.stop()
// })

// afterEach(async () => {
//   // Clear all data after each test
//   const collections = connection.collections
//   for (const key in collections) {
//     await collections[key].deleteMany({})
//   }
// })

// describe('Supplier Model', () => {
//   it('should create and save a supplier successfully', async () => {
//     const user = new Supplier({ name: 'Kazi & kazi Tea', serialNo: 1000, contact: { phone: ['01745632541', '01963123456'], address: 'Uttara, Dhaka' } })
//     const savedUser = await user.save()

//     expect(savedUser._id).toBeDefined()
//     expect(savedUser.name).toBe('Kazi & kazi Tea')
//     expect(savedUser.serialNo).toBe(1000)
//   })

//   it('should fail validation without required fields', async () => {
//     const user = new Supplier({}) // Missing required fields

//     try {
//       await user.save()
//     } catch (error: any) {
//       expect(error).toBeInstanceOf(Error)
//       expect(error.errors.name).toBeDefined()
//       expect(error.errors.email).toBeDefined()
//     }
//   })
// })

import request from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, disconnect, connection } from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connect(uri);
});

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Supplier API', () => {
  it('should create a supplier', async () => {
    const response = await request(app)
      .post('/supplier')
      .send({ name: 'Supplier One', serialNo: 1006, contact: { phone: ['01745632541', '01963123456'], address: 'Uttara, Dhaka' } });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Supplier One');
    expect(response.body.contact).toBe({ phone: ['01745632541', '01963123456'], address: 'Uttara, Dhaka' });
  });

  it('should return validation error for missing fields', async () => {
    const response = await request(app).post('/supplier').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
