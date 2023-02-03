import { ArrowDown } from 'lucide-react';
import { Link } from "@remix-run/react";

export default function ScrollTo({targetID}) {
  return (
    <Link className="scroll-to js-scroll-to" href="#{targetID}"><ArrowDown /></Link>
  )
}