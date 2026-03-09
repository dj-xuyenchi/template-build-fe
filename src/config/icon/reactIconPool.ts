import { bs } from "./bs";
import { md } from "./md";
import { ri } from "./ri";

export const reactIconPool = [...bs, ...ri, ...md] as ReactIconModel[];

export interface ReactIconModel {
  value: string;
}
