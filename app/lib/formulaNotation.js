export const FORMULA_PATTERN=/(\^\([^()]*\)|\^(?:\d+|[A-Za-z])(?![\p{L}\d_/]|[.,]\d)|(?<![\w^/]|\d[.,])\d+\/\d+(?![\p{L}\d_/√(]|[.,]\d)|√\([^()]+\)|√(?:[A-Za-zΔσ][A-Za-z0-9_]*|\d+)(?![\w(]|[.,]\d|[²³¹⁰-⁹]))/gu;
export const formattedParts=value=>String(value).split(FORMULA_PATTERN).filter((_,index)=>index%2);
