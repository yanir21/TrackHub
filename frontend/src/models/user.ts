export interface User {
    username: string;
    password: string;
    displayName: string;
    imageUrl?: String;
}

export interface UserAuth {
    username: string;
    displayName: string;
}
