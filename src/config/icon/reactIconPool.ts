import { bs } from "./bs";
import { gr } from "./gr";
import { md } from "./md";
import { ri } from "./ri";

export const reactIconPool = [...bs, ...ri, ...md, ...gr] as ReactIconModel[];

export interface ReactIconModel {
  value: string;
}
