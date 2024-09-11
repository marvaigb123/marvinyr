const allRoles = {
  ADMIN: ["VIEW_COURSE", "DELETE_COURSE"],
  AFFILIATOR: ["CREATE_LINK", "VIEW_COURSE"],
  AUTHOR: ["CREATE_COURSE"],
  USER: ["VIEW_COURSE", "PURCHASE_COURSE", "ADD_TO_CART"]
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(
  Object.entries(allRoles)
);
