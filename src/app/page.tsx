import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProjects } from "./actions";
import AddProjectForm from "./AddProjectForm";
import ProjectList from "./ProjectList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const projects = await getProjects();

  return (
    <>
      <AddProjectForm />
      <ProjectList initialProjects={projects} />
    </>
  );
}
