export default function UseSumCardValues({ array }: { array: string[] }) {
  let soma = 0;
  let aceCount = 0;

  for (let index in array) {
    const value = array[index];

    if (value === "ACE") {
      soma += 11;
      aceCount++;
    } else if (["KING", "QUEEN", "JACK"].includes(value)) {
      soma += 10;
    } else {
      soma += parseInt(value);
    }

    while (soma > 21 && aceCount > 0) {
      soma -= 10;
      aceCount--;
    }
  }

  return soma;
}
