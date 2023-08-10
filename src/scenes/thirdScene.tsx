import { makeScene2D, Img, Rect, Txt } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT } from "@motion-canvas/core";

import { textBlock } from "./opening";

import avatarA from "../assets/episode1/avatar1a.svg";
import avatarB from "../assets/episode1/avatar1b.svg";

export default makeScene2D(function* (view) {

    const ref = createRef<Img>();
    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();

    const bars = [
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
    ];

    const values = [
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
    ];

    const labels = [
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
    ];

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const lines = new Map<number, string>();
    
    lines.set(lines.size, "Consolidated Sales Information")
    lines.set(lines.size, "The Mobile, IP related income, etc. sales information for the first quarter was ¥31,857M. A +190.11% increase year-over-year. (Includes income from smart-device content and royalty income). The Super Mario Bros. Movie is cited as a reason for the increase.")
    lines.set(lines.size, "Fiscal Year Million-Seller Titles")
    lines.set(lines.size, "The Legend of Zelda: Tears of the Kingdom for the first quarter had 3.26M units in Japan and 15.26M units Overseas. The Global fiscal year and life-to-date figure is 18.51M units")
    lines.set(lines.size, "Mario Kart 8 Deluxe for the first quarter had 0.19M units in Japan and 1.48M units Overseas. The Global fiscal year figure is 1.67M units and the global life-to-date figure is 55.46M units")

    view.add(
        <Img 
            ref={ref}
            src={avatarA}
        />
    )

    yield* slideTransition(Direction.Left);

    yield* all(
        ref().x(-800, 1),
        ref().y(300, 1)
    )
    yield* waitFor(1)

    yield* slideTransition(Direction.Left);

    ref().fill("white")
    yield* waitFor(2)
    ref().src(avatarB)
    yield* ref().scale(2, 1)
    yield* waitFor(2)
    ref().src(avatarA)
    yield* waitFor(2)

    view.add(
        <Rect 
            ref={textBox}
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

    view.add(
        <>
            <Txt 
                ref={values[0]}
                text={""}
                fill={"white"}
                x={-200}
                textWrap={"pre"}
            />
        </> 
    )
    
    yield* all (
        values[0]().y(-340, 1),
        values[0]().text("Cumulative Sales:     ¥8,310,917M", 1),
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(2).length,
        i => textBlock(lines.get(2), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Txt 
                ref={values[1]}
                text={""}
                fill={"white"}
                x={-200}
                textWrap={"pre"}
            />
        </> 
    )
    
    yield* all (
        values[1]().y(-240, 1),
        values[1]().x(-140, 1),
        values[1]().text("Cumulative Hardware Units:    129.53M", 1),
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

    view.add(
        <>
            <Txt 
                ref={values[2]}
                text={""}
                fill={"white"}
                x={-200}
                textWrap={"pre"}
            />
        </> 
    )
    
    yield* all (
        values[2]().y(-140, 1),
        values[2]().x(-60, 1),
        values[2]().text("Cumulative Sales Per Hardware Unit:   ¥64,162", 1),
    )

    yield* waitFor(2)
    values[0]().remove()
    values[1]().remove()
    values[2]().remove()

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(4).length,
        i => textBlock(lines.get(4), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[3]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-700}
            />
            <Txt 
                ref={values[3]}
                text={""}
                fill={"white"}
                x={-700}
            />
            <Txt 
                ref={labels[3]}
                text={""}
                fill={"white"}
                x={-700}
            />
        </>
    )

    yield* all (
        bars[3]().height(300, 1),
        bars[3]().y(-150,1),
        values[3]().y(-330, 1),
        values[3]().text("3.91M", 1),
        labels[3]().y(60, 1),
        labels[3]().text("Switch Hardware\nTotal", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(5).length,
    //     i => textBlock(lines.get(5), 40, textSignal, numberSignal, 0.07, 2)
    // )

    // view.add(
    //     <>
    //         <Rect 
    //             ref={bars[4]}
    //             height={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={-400}
    //         />
    //         <Txt 
    //             ref={values[4]}
    //             text={""}
    //             fill={"white"}
    //             x={-400}
    //         />
    //         <Txt 
    //             ref={labels[4]}
    //             text={""}
    //             fill={"white"}
    //             x={-400}
    //         />
    //     </>
    // )

    // yield* all (
    //     bars[4]().height(300 * 0.16, 1),
    //     bars[4]().y(-150 * 0.16,1),
    //     values[4]().y(-330 * 0.25, 1),
    //     values[4]().text("0.64M", 1),
    //     labels[4]().y(60, 1),
    //     labels[4]().text("Switch", 1),
    // ) 

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(6).length,
    //     i => textBlock(lines.get(6), 40, textSignal, numberSignal, 0.07, 2)
    // )

    // view.add(
    //     <>
    //         <Rect 
    //             ref={bars[5]}
    //             height={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={-100}
    //         />
    //         <Txt 
    //             ref={values[5]}
    //             text={""}
    //             fill={"white"}
    //             x={-100}
    //         />
    //         <Txt 
    //             ref={labels[5]}
    //             text={""}
    //             fill={"white"}
    //             x={-100}
    //         />
    //     </>
    // )

    // yield* all (
    //     bars[5]().height(300 * 0.72, 1),
    //     bars[5]().y(-150 * 0.72,1),
    //     values[5]().y(-330 * 0.72, 1),
    //     values[5]().text("2.83M", 1),
    //     labels[5]().y(60, 1),
    //     labels[5]().text("Switch OLED\nModel", 1),
    // ) 

    // yield* ref().x(-650,1)
    // ref().src(avatarB)
    // yield* ref().x(-800,1)
    // ref().src(avatarA)

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // view.add(
    //     <>
    //         <Rect 
    //             ref={bars[6]}
    //             height={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={200}
    //         />
    //         <Txt 
    //             ref={values[6]}
    //             text={""}
    //             fill={"white"}
    //             x={200}
    //         />
    //         <Txt 
    //             ref={labels[6]}
    //             text={""}
    //             fill={"white"}
    //             x={200}
    //         />
    //     </>
    // )

    // yield* all (
    //     bars[6]().height(300 * 0.11, 1),
    //     bars[6]().y(-150 * 0.11,1),
    //     values[6]().y(-330 * 0.18, 1),
    //     values[6]().text("0.43M", 1),
    //     labels[6]().y(60, 1),
    //     labels[6]().text("Switch Lite", 1),
    // ) 

    // yield* loop(
    //     lines.get(7).length,
    //     i => textBlock(lines.get(7), 40, textSignal, numberSignal, 0.07, 2)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(8).length,
    //     i => textBlock(lines.get(8), 40, textSignal, numberSignal, 0.07, 2)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(9).length,
    //     i => textBlock(lines.get(9), 40, textSignal, numberSignal, 0.07, 2)
    // )

    yield* waitFor(4)
})