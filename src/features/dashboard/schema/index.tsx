import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  course: z.string(),
  mentor: z.string(),
  date: z.string(),
  description: z.string().optional(),
});

export const AssignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  status: z.enum(["graded", "not_uploaded", "not_reviewed"]),
});

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  instructor: z.string(),
  startDate: z.string(),
  progress: z.number(),
});

export const DashboardStatsSchema = z.object({
  totalSessions: z.number(),
  completedAssignments: z.number(),
  activeCourses: z.number(),
});

export type Session = z.infer<typeof SessionSchema>;
export type Assignment = z.infer<typeof AssignmentSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
