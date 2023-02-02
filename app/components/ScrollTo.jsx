import { ArrowDown } from 'lucide-react';

export default function ScrollTo({targetID}) {
  return (
    <a class="scroll-to js-scroll-to" href="#{targetID}"><ArrowDown /></a>
  )
}