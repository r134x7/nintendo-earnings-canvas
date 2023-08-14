import { waitFor, ThreadGenerator, SimpleSignal, loop, DEFAULT, Direction, all, createRef, createSignal, slideTransition, Vector2, Reference } from "@motion-canvas/core";
import { type View2D, Rect, Txt } from "@motion-canvas/2d";

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

export function contextYoY(value: number | string | never[]): string {

    switch (typeof value) {
        case "string":
            // string percentages only
            return (Number(value.slice(0, -1)) > 0)
                ? "increase year-over-year"
                : "decrease year-over-year"

        case "number":
            return (value > 0)
                ? "increase year-over-year"
                : "decrease year-over-year"
    
        default:
            return "ERROR"
    }
}

export function quarterLabel(value: "1" | "2" | "3" | "4"): string {

    switch (value) {
        case "1":
            return "first quarter";

        case "2":
            return "second quarter";

        case "3":
            return "third quarter";

        case "4":
            return "fourth quarter";
    
        default:
            return "ERROR";
    }
}

export function* dataLoop(linesLength: number, text: string, textBoxLength: number, textSpeed: number, endDelay: number, textSignal: SimpleSignal<string, void>, numberSignal: SimpleSignal<number, void>,) {

    yield* loop(
        linesLength,
        i => textBlock(text, textBoxLength, textSignal, numberSignal, textSpeed, endDelay)
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)


}

export function* setBar(view: View2D, bar: Reference<Rect>, value: Reference<Txt>, xBarPosition: number, yBarPosition: number, barWidth: number, barHeight: number, barColour: string, xTextPosition: number, yTextPosition: number, textValue: string, timing: number) {

    view.add(
        <>
            <Rect 
                ref={bar}
                width={barWidth}
                fill={barColour}
                x={xBarPosition}
            />
            <Txt 
                ref={value}
                text={""}
                fill={"white"}
                x={xTextPosition}
            />
        </>
    )

    yield* all (
        bar().height(barHeight, timing),
        bar().y(yBarPosition, timing),
        value().y(yTextPosition, timing),
        value().text(textValue, timing),
    ) 
}