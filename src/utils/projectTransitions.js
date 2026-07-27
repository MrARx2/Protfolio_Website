export function projectTransitionName(project, part) {
  const safeId = String(project?.id || "project")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `project-${safeId}-${part}`;
}

export function projectTransitionStyle(project, part, enabled = true) {
  return enabled ? { viewTransitionName: projectTransitionName(project, part) } : undefined;
}
