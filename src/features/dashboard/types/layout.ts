export type UserRole = "student" | "admin" | "mentor";

export type LayoutVariant = "sidebar" | "modal" | "grid" | "stack";

export interface LayoutConfig {
  assignments: {
    variant: LayoutVariant;
    position?: "left" | "right" | "center";
    width?: string;
    className?: string;
    showInModal?: boolean;
  };
  courses: {
    variant: LayoutVariant;
    position?: "left" | "right" | "center";
    width?: string;
    className?: string;
    showInModal?: boolean;
  };
  sessions: {
    variant: LayoutVariant;
    position?: "main" | "secondary";
    className?: string;
  };
}

export const defaultLayouts: Record<UserRole, LayoutConfig> = {
  student: {
    assignments: {
      variant: "sidebar",
      position: "right",
      width: "w-80",
      className: "space-y-4",
    },
    courses: {
      variant: "sidebar",
      position: "right",
      width: "w-80",
    },
    sessions: {
      variant: "grid",
      position: "main",
      className: "flex-1",
    },
  },
  admin: {
    assignments: {
      variant: "modal",
      showInModal: true,
      className: "max-w-md",
    },
    courses: {
      variant: "modal",
      showInModal: true,
      className: "max-w-md",
    },
    sessions: {
      variant: "stack",
      position: "main",
      className: "w-full",
    },
  },
  mentor: {
    assignments: {
      variant: "modal",
      showInModal: true,
      className: "max-w-md",
    },
    courses: {
      variant: "modal",
      showInModal: true,
      className: "max-w-md",
    },
    sessions: {
      variant: "stack",
      position: "main",
      className: "w-full",
    },
  },
};
