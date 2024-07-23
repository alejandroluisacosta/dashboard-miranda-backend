import { faker } from '@faker-js/faker'
import User from './interfaces/User';
import { UserServices } from './services/userServices';

const NUM_USERS = 20;

const run = async () => {
    const createdUsers = [];

    for (let i = 0; i < NUM_USERS; i++) {
        const userData: User = {
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
            id: '0',
        }
        const newUser = await UserServices.addUser(userData);
        createdUsers.push(newUser);
    }

}

run();