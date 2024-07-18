import mockUsers from "../data/mockUsers";
import User from "../interfaces/user";

export class UserModel {

    static getUsers(): User[] {
        return mockUsers;
    }

    static getUser(id: string): User {
        const user = mockUsers.find(user => user.id === id);
        if (!user)
            throw new Error('No user found');
        return user;
    }

    static addUser(user: User): User {
        mockUsers.push(user);
        return user;
    }

    static removeUser(id: string): User[] {
        const updatedUsers = mockUsers.filter(user => user.id !== id);
        return updatedUsers;
    }

    static modifyUser(modifiedUser: User): User[] {
        const updatedUsers = mockUsers.map(User => 
            User.id === modifiedUser.id ? User = modifiedUser : User
        );
        return updatedUsers;
    }

  }