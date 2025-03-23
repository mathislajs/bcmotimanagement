export const ROLES = {
  ROADWORK_REQUEST: [
    '1091880282325516401', // MVRP Leadership
    '1101640513351847966', // MVRP Manager
    '1082047462119854140', // Leadership Team
    '1082047459506786385', // Operational Manager
    '1258114766551912578', // IT Department
  ],
  GROUP_SHIFT: [
    '1091880282325516401', // MVRP Leadership
    '1101640513351847966', // MVRP Manager
    '1082047462119854140', // Leadership Team
    '1082047463646572574', // Supervisor Group
    '1258114766551912578', // IT Department
  ],
} as const;

export type RoleId = typeof ROLES[keyof typeof ROLES];
