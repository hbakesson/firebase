import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProjects } from "./actions";
import AddProjectForm from "./AddProjectForm";
import ProjectList from "./ProjectList";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { q, status } = await searchParams;
  const projects = await getProjects(q, status);

  return (
    <>
      <AddProjectForm />
      <ProjectList initialProjects={projects} />
    </>
  );
}
