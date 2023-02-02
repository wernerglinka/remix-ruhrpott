import { ArrowDown } from 'lucide-react';

export default function ScrollTo({targetID}) {
  return (
    <a className="scroll-to js-scroll-to" href="#{targetID}"><ArrowDown /></a>
  )
}