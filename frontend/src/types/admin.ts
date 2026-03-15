// export interface Admin{
//     username: string;
//     email: string;
//     passwordHash: string;
//     role: 'superadmin' | 'moderator' | 'editor';
//     isActive: boolean;
//     createdAt: Date;
//     updatedAt: Date;
// }

export interface Admin{
    name:string,
    email:string,
    role:string
}

export interface RequestAdmin{
    email:string,
    password:string
}