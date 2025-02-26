/* eslint-disable prettier/prettier */
export class Organization {
  id: string;
  name: string;
  shortName: string;
  code: string;
}

export class User {
  userId: string;
  organization: Organization;
  permissions: string[];
  roleSystems: string[];
  applications: string[];
}

export class AccountDto {
  tenantId: number ;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  organizations: User[];
}

export class CurrentUserDto extends User {
  tenantId: number;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
export const Permissions = {
  CREATE_MANAGER: 'CREATE_MANAGER',
  CREATE_EMPLOYER: 'CREATE_EMPLOYER',
  VIEW_EMPLOYER: 'VIEW_EMPLOYER',
  // Add more permissions as needed
};
