import { waitFor, ThreadGenerator, SimpleSignal } from "@motion-canvas/core";

export function* textBlock(text: string, lineLength: number, getSignal: SimpleSignal<string, void>, getIndex: SimpleSignal<number, void>, delay: number, endDelay: number): ThreadGenerator {

    yield* waitFor(delay)

    const charRange = text.slice(0, getIndex() + 1)

    // const checkNewLines = Math.floor(text.length / (lineLength + 1));
    const checkNewLines = (text.length % lineLength === 0 && text.length > lineLength) 
        ? Math.floor(text.length / (lineLength))
        : Math.floor(text.length / (lineLength + 1));
    

    function makeTextBlock(getText: string, getLineLength: number, blockSize: number): string {

        const numberMap = new Map<number, string>();

        getText.split(" ").map((elem, index, array) => {

            let getSize = numberMap.size;

            if (getSize === 0) {
                numberMap.set(numberMap.size, elem)
            } else if ((numberMap.get(numberMap.size-1) + " " + elem).length < getLineLength) {
                numberMap.set(numberMap.size -1, numberMap.get(numberMap.size-1) + " " + elem)
            } else {
                numberMap.set(numberMap.size, elem)
            }      
        })

        for (let index = 0; index < blockSize; index++) {
            if (numberMap.size < blockSize + 1) {
                numberMap.set(numberMap.size, "")
            } 
        }
        
        numberMap.forEach((value, key, map) => {

            if (key === numberMap.size-1) {
                map.set(key, value + " ".repeat(getLineLength - value.length))
            } else {
                map.set(key, value + " ".repeat(getLineLength - value.length) + "\n")
            }
        })

        return [...numberMap.values()].join("")
    }

    const stringResult = makeTextBlock(charRange, lineLength, checkNewLines)

    getSignal(stringResult)

    getIndex(getIndex() + 1)

    if (text.length === getIndex()) {
        yield* waitFor(endDelay)
    }
}