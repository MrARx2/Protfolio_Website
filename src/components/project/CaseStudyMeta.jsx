import React from "react";

export default function CaseStudyMeta({ project }) {
  const fields = project.type === "modeling"
    ? [["Duration", project.time], ["Software", project.software], ["Rendered in", project.render]]
    : project.type === "scene"
      ? [["Duration", project.time], ["Engine", project.engine]]
      : [["Role", project.role || "Programmer"], ["Team", project.team ? `${project.team} people` : null], ["Duration", project.time], ["Engine", project.engine]];
  const available = fields.filter(([, value]) => value);
  return <dl className="case-study-meta" data-fields={available.length} style={{ "--meta-columns": available.length }}>
    {available.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
  </dl>;
}
