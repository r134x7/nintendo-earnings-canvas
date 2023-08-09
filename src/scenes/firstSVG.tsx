import { makeScene2D, Img, Circle, Rect, Txt } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT } from "@motion-canvas/core";

import { textBlock } from "./opening";

import robot from "../assets/episode1/firstDrawing.svg"
import avatarA from "../assets/episode1/avatar1a.svg";
import avatarB from "../assets/episode1/avatar1b.svg";

export default makeScene2D(function* (view) {

    const ref = createRef<Img>();
    const getText = createRef<Txt>();

    const bar1 = createRef<Rect>();
    const bar2 = createRef<Rect>();
    const value1 = createRef<Txt>();
    const value2 = createRef<Txt>();

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const lines = new Map<number, string>();

    lines.set(lines.size, "This, is an avatar and I am bad at drawing.")
    lines.set(lines.size, "The following data from my webpage (link in the description) covers the 1st Quarter earnings release of Nintendo for the fiscal year ending March 2024 (FY3/2024).")
    lines.set(lines.size, "Consolidated Operating Results.")
    lines.set(lines.size, "Nintendo's consolidated net sales for the first quarter was ¥461,341M. A +50.05 increase year-over-year.")

    view.add(
        <Img 
            ref={ref}
            src={avatarA}
        />
    )

    yield* slideTransition(Direction.Right);

    yield* all(
        ref().x(-800, 1),
        ref().y(300, 1)
    )
    yield* waitFor(1)

    yield* slideTransition(Direction.Right);

    ref().fill("white")
    yield* waitFor(2)
    ref().src(avatarB)
    yield* ref().scale(2, 1)
    yield* waitFor(2)
    ref().src(avatarA)
    yield* waitFor(2)

    view.add(
        <Rect 
            padding={10}
            radius={15}
            fill={"white"}
            layout
            y={250}
        >
            <Rect fill={"black"}>
            <Txt
                fontFamily={"Consolas"}
                ref={getText}
                text={() => `${textSignal()}`}
                textWrap={"pre"}
                fill={"white"}
                marginLeft={16}
                marginRight={16}
            />
            </Rect>
        </Rect>
    )

    yield* loop(
        lines.get(0).length,
        i => textBlock(lines.get(0), 40, textSignal, numberSignal, 0.07, 2)
    )

    yield* ref().x(-650,1)
    ref().src(avatarB)
    yield* ref().x(-800,1)
    ref().src(avatarA)

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(1).length,
        i => textBlock(lines.get(1), 40, textSignal, numberSignal, 0.07, 2)
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(2).length,
        i => textBlock(lines.get(2), lines.get(2).length + 1, textSignal, numberSignal, 0.07, 2)
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* ref().x(-650,1)
    ref().src(avatarB)
    yield* ref().x(-800,1)
    ref().src(avatarA)

    yield* loop(
        lines.get(3).length,
        i => textBlock(lines.get(3), 40, textSignal, numberSignal, 0.07, 2)
    )

    const scale = 100;

    view.add(
        <>
            <Rect 
                ref={bar1}
                height={0}
                width={100}
                fill={"red"}
                x={-500}
            />
            <Txt 
                ref={value1}
                text={""}
                fill={"white"}
                x={-500}
            />
        </>
    )
    
    const netSalesFY = 461341;
    const netSalesLY = 307460;

    // yield* bar1().height(50, 1)
    yield* all (
        bar1().height(300, 1),
        value1().height(400, 1),
        value1().text("¥461,341M", 1),
    ) 

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    yield* waitFor(8)
})