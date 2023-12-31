import { Txt, makeScene2D, Rect } from "@motion-canvas/2d";

import { createRef, createSignal, DEFAULT, waitFor, all, tween, Thread, ThreadGenerator, SimpleSignal, delay, loop, sequence, chain } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const loading = "Loading...";

    const openingText = "Welcome to the animation of ggx2ac + archives: Nintendo earnings data and other video game companies";

    const openingTextSignal = createSignal("");
    const numberSignal = createSignal(0);

    const getText = createRef<Txt>();

    const textBox = createRef<Rect>();

    view.add(
        <Rect 
            padding={10}
            radius={15}
            fill={"white"}
            layout
        >
            <Rect fill={"black"}>
            <Txt
                fontFamily={"Consolas"}
                ref={getText}
                text={() => `${openingTextSignal()}`}
                textWrap={"pre"}
                fill={"white"}
                marginLeft={16}
                marginRight={16}
            />
            </Rect>
        </Rect>
    )

    yield* loop(
        loading.length,
        i => textBlock(loading, 10, openingTextSignal, numberSignal, 0.07, 0.5)
    )

    openingTextSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        loading.length,
        i => textBlock(loading, 10, openingTextSignal, numberSignal, 0.07, 0.5)
    )
    yield* waitFor(0.5)

    openingTextSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        openingText.length,
        i => textBlock(openingText, 40, openingTextSignal, numberSignal, 0.07, 2)
    )

})

function* singleLineMessage(text: string, getSignal: SimpleSignal<string, void>, getIndex: SimpleSignal<number, void>, delay: number): ThreadGenerator {
    yield* waitFor(delay)

    const charRange = text.slice(0, getIndex() + 1)

    getSignal((charRange + " ".repeat(text.length - charRange.length)))

    getIndex(getIndex() + 1)

    if (text.length === getIndex()) {
        yield* waitFor(2)
    }
}

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