import { faker } from '@faker-js/faker'
// import User from './interfaces/User';
import { UserServices } from './services/userServices';
import { connectDB } from './db';

const NUM_USERS = 20;

connectDB().catch(err => console.log(err));

const run = async () => {
    const createdUsers = [];

    for (let i = 0; i < NUM_USERS; i++) {
        const userData = {
            name: faker.person.firstName(),
            userName: faker.internet.userName(),
            image: 'image',
            incorporatedOn: '01-01-24',
            jobDesk: faker.lorem.sentence(4),
            schedule: 'Monday - Friday',
            phone: faker.phone.number(),
            status: 'Available',
            role: faker.person.jobTitle(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        const newUser = await UserServices.addUser(userData);
        createdUsers.push(newUser);
    }

}

run();