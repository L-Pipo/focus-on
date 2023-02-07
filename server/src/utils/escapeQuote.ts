export function escapeQuote(potentiallyQuoted: string): string {
  if (potentiallyQuoted.indexOf("'") !== -1) {
    let index = potentiallyQuoted.indexOf("'");
    let firstSubStr = potentiallyQuoted.substring(0, index);
    let secSubStr = potentiallyQuoted.substring(index);
    potentiallyQuoted = firstSubStr + "\\" + secSubStr;
  }
  return potentiallyQuoted;
}
