import { CreateUserInput } from './dto/create-user.input';

let mockData = [
    {
        id: 84364,
        username: "name",
        picture: "http://example.com",
        firstname: "nobody",
        lastname: "knows",
        email: "nobody@example.com",
        country: "United States",
        campus: "Unicorns 4 Lyfe",
    },
]


export const mockUsersRepository = {
    create: (createUserInput: CreateUserInput) => {
        mockData.push(createUserInput);
        return (createUserInput);
    },
    upsert: (createUserInput: CreateUserInput, check: [string]) => {
        if (check[0] != 'id') {
            return null;
        }
        return (createUserInput);
    },
    find: () => {
        return mockData;
    },
}
