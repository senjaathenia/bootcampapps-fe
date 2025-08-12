"use server";

import { Session, Assignment, Course, DashboardStats } from "../schema";

export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    totalSessions: 24,
    completedAssignments: 18,
    activeCourses: 6,
  };
}

export async function getSessions(): Promise<Session[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    {
      id: "1",
      title: "Implementasi html css dan js",
      course: "Basic Html Css Javascript Pemula",
      mentor: "Aditya Kunto",
      date: "2025-08-21",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut eros tempor pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec convallis facilisis mauris, at nisl varius imperdiet. Phasellus aliquam consectetur iaculis. Nunc tempor posuere lacus, ac tempor dolor lobortis cursus. Praesent volutpat faucibus ligula nec tristique. Maecenas turpis nibh, euismod sed lacinia quis, volutpat quis ligula. Pellentesque quis finibus dolor. Donec id vehicula risus, vitae consectetur augue.",
    },
    {
      id: "2",
      title: "Implementasi html css dan js",
      course: "Basic Html Css Javascript Pemula",
      mentor: "Aditya Kunto",
      date: "2025-08-21",
      description:
        "Ut pellentesque est condimentum sem vestibulum mollis. Aenean commodo laoreet quam et consequat. Pellentesque elementum leo eleifend nisl cursus, ac malesuada lacus pulvinar. Nam vestibulum mi at neque pulvinar, in faucibus elit consequat. Morbi vel sagittis neque, placerat ornare lectus. Mauris interdum, quam at tempus cursus, sem velit feugiat ex, ut pellentesque augue massa nec magna. Aliquam sodales arcu sit amet mauris feugiat, sed hendrerit magna laoreet. Sed nec dolor quis massa condimentum feugiat. Nulla nec congue dolor. Etiam sit amet ornare ex. Duis blandit augue sit amet viverra aliquam. Vestibulum rhoncus et lacus malesuada faucibus.",
    },
    {
      id: "3",
      title: "Implementasi html css dan js react",
      course: "Basic Html Css Javascript Pemula",
      mentor: "Aditya Kunto",
      date: "2025-08-21",
      description:
        "Vestibulum sed tristique quam. Praesent tincidunt velit in lorem euismod, ut aliquet justo scelerisque. Sed tempor dolor a metus blandit, a maximus magna auctor. Fusce vulputate pretium odio, eget sagittis odor vehicula ut. Vestibulum quis dapibus odio. Aliquam sodales arcu sit amet mauris sodales, ut gravida libero rhoncus. Curabitur venenatis rhoncus leo quis convallis. Donec sit amet hendrerit dui. Phasellus neque mi, feugiat nec eros et, consequat elementum nulla.",
    },
    {
      id: "4",
      title: "Advanced React Concepts",
      course: "React Development Bootcamp",
      mentor: "Sarah Johnson",
      date: "2025-08-22",
      description:
        "Deep dive into advanced React concepts including hooks, context API, and performance optimization techniques.",
    },
    {
      id: "5",
      title: "Database Design Fundamentals",
      course: "Backend Development",
      mentor: "Michael Chen",
      date: "2025-08-23",
      description:
        "Learn the principles of database design, normalization, and SQL optimization for scalable applications.",
    },
  ];
}

export async function getAssignments(): Promise<Assignment[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return [
    {
      id: "1",
      title: "Membuat Black Box Testing",
      description: "Fundamental QA",
      dueDate: "2025-08-01",
      status: "graded",
    },
    {
      id: "2",
      title: "Membuat Halaman HTML CSS",
      description: "Basic Html Css Javascript Pemula",
      dueDate: "2025-08-01",
      status: "not_reviewed",
    },
    {
      id: "3",
      title: "Membuat Unit Testing",
      description: "Fundamental QA",
      dueDate: "2025-08-01",
      status: "not_uploaded",
    },
  ];
}

export async function getCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 180));

  return [
    {
      id: "1",
      title: "Fundamental QA",
      instructor: "QA Teams",
      startDate: "2025-08-01",
      progress: 75,
    },
    {
      id: "2",
      title: "Basic Html Css Javascript Pemula",
      instructor: "Aditya Kunto",
      startDate: "2025-08-01",
      progress: 60,
    },
  ];
}
