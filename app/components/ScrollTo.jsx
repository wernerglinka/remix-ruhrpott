import { ArrowDown } from 'lucide-react';

export const ScrollTo = function({targetID}) {
  return (
    <a className="scroll-to js-scroll-to" href="#{targetID}"><ArrowDown /></a>
  )
}