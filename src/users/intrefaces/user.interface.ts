export interface IUserCreationAttrs{
    login: string;
    firstName: string;
    lastName: string;
}
export interface IUserUpdateAttrs extends IUserCreationAttrs{
    isActive: boolean;
}

export interface IUser extends IUserCreationAttrs, IUserCreationAttrs{
    isActive: boolean;
}
