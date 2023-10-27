import indent from "./indent.js";

const listContent = ['A', 'B', 'C'].join('\n');

console.log(listContent);
/*
A
B
C
*/

console.log(['List', indent(listContent)].join('\n'));
/*
List
  A 
  B 
  C
*/
