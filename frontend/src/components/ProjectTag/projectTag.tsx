import React from "react";
import { Tag } from "../../models/tag";
import "./projectTag.scss";

interface ProjectTagProps {
  tag: Tag;
}

export default function ProjectTag({ tag }: ProjectTagProps) {
  return <div className="project-tag">{tag.name}</div>;
}
