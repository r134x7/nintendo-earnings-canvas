import { Txt, makeScene2D, Rect } from "@motion-canvas/2d";

import { createRef, createSignal, DEFAULT, waitFor, all, tween, Thread, ThreadGenerator, SimpleSignal, delay, loop, sequence, chain } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const openingText = "welcome to ggx2ac + archives and blah blah blah or other stuff";

    // const textBoxFill: string = Array(openingText.length).fill("").join();

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
                marginLeft={8}
                marginRight={8}
            />
            </Rect>
        </Rect>
    )

    yield* loop(
        openingText.length,
        // i => singleLineMessage(openingText, openingTextSignal, numberSignal, 0.17)
        i => textBlock(openingText, 40, openingTextSignal, numberSignal, 0.07)
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

function* textBlock(text: string, lineLength: number, getSignal: SimpleSignal<string, void>, getIndex: SimpleSignal<number, void>, delay: number): ThreadGenerator {

    yield* waitFor(delay)

    const charRange = text.slice(0, getIndex() + 1)

    // const newLines = "\n".repeat(text.length / lineLength)

    function makeTextBlock(getText: string, newLines: number, getLineLength: number): string {

        let newLineCheck = 0;

        const wordSplit = getText.split(" ")
            .reduce((acc, next, index, array) => {

                let nextCheck = acc + " " + next + " ";

                if (nextCheck.length > getLineLength) {
                    newLineCheck++
                    return acc + " " + next + "\n"
                } else if (array[index] === next) {

                    // console.log(next);
                    
                    let lastLine = acc.length + next.length;
                    
                    let repeatValue = ((getText.length + newLineCheck) - lastLine >= 0)
                        ? (getText.length + newLineCheck) - lastLine
                        : 0

                    // console.log(getText.length + newLineCheck - lastLine);
                    

                    // return acc + " " + next + " ".repeat((getText.length + newLineCheck) - lastLine)
                    return acc + " " + next + " ".repeat(repeatValue)
                } else {
                    return acc + " " + next
                }
            }, "")

        
        return wordSplit;
    }

    // const stringResult = makeTextBlock(charRange, Math.floor(text.length / lineLength), lineLength)
    const stringResult = makeTextBlock(charRange, Math.floor(text.length / lineLength), 30)

    // getSignal(charRange + " ".repeat(text.length - charRange.length) + newLines)
    getSignal(stringResult)

    /*
    ............          \n
                          \n

    ......................\n
                          \n
    */

    getIndex(getIndex() + 1)

    if (text.length === getIndex()) {
        yield* waitFor(2)
    }
}