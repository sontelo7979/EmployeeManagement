enum UserRole {
  Administrator = "Administrator",
  Manager = "Manager",
  Employee = "Employee",
}
export interface IUser {
  userID: string;
  username: string;
  fullname: string;
  role: UserRole;
  phoneNumber: string;
  address: string;
  positionId: string | null;
  positionName: string | null;
  departmentId: string | null;
  departmentName: string | null;
  basicSalary: number;
  isActive: boolean;
  isDeleted: boolean;
  imageUrl: string | null;
}

export const mapUserRoleToNumber = (role: UserRole): number => {
  switch (role) {
    case UserRole.Administrator:
      return 1;
    case UserRole.Manager:
      return 2;
    case UserRole.Employee:
      return 3;
    default:
      return 0; // Unknown role
  }
};
