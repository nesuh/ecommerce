import Jwt from "jsonwebtoken";

export const generatedAuthToken = (id: string) => {
    // Ensure that JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    return Jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    }); // Remove the comma here
};
