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
    ];

    const values = [
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
    ];

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const lines = new Map<number, string>();

    lines.set(lines.size, "Global Hardware/Software Units.")
    lines.set(lines.size, "The Nintendo Switch platform had cumulative (life-to-date) sales of ¥8,310,917M in the first quarter")
    lines.set(lines.size, "The cumulative (life-to-date) Nintendo Switch Hardware Total Units reached 129.53M units in the first quarter")
    lines.set(lines.size, "The cumulative (life-to-date) sales per hardware unit calculation results in ¥64,162 per hardware unit")
    lines.set(lines.size, "The shipments of the Nintendo Switch Hardware Total for the first quarter was 3.91M units. A +13.99% increase year-over-year. Life-To-Date: 129.53M units")
    lines.set(lines.size, "The shipments of the Nintendo Switch (model) for the first quarter was 0.64M units. A -51.52% decrease year-over-year. Life-To-Date: 90.23M units")
    lines.set(lines.size, "The shipments of the Nintendo Switch OLED Model for the first quarter was 2.83M units. A +86.18% increase year-over-year. Life-To-Date: 17.85M units")
    lines.set(lines.size, "The shipments of the Nintendo Switch Lite for the first quarter was 0.43M units. A -27.12% decrease year-over-year. Life-To-Date: 21.45M units")
    lines.set(lines.size, "The Nintendo Switch Software Total for the first quarter was 52.21M units. A +26.08% increase year-over-year. Life-To-Date: 1088.35M units")
    lines.set(lines.size, "Software sales units include both packaged and downloadable versions of software, and do not include download-only software or add-on  content.")

    view.add(
        <Img 
            ref={ref}
            src={avatarA}
        />
    )

    yield* slideTransition(Direction.Top);

    yield* all(
        ref().x(-800, 1),
        ref().y(300, 1)
    )
    yield* waitFor(1)

    yield* slideTransition(Direction.Top);

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
                ref={bars[1]}
                height={0}
                width={100}
                fill={"yellow"}
                x={-200}
            />
            <Txt 
                ref={values[1]}
                text={""}
                fill={"white"}
                x={-200}
            />
            <Txt 
                ref={labels[1]}
                text={""}
                fill={"white"}
                x={-200}
            />
        </>
    )

    yield* all (
        bars[1]().height(120, 1),
        bars[1]().y(-60,1),
        values[1]().y(-160, 1),
        values[1]().text("129.53M", 1),
        labels[1]().y(60, 1),
        labels[1]().text("Cumulative Hardware Units:    129.53M", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(5).length,
        i => textBlock(lines.get(5), 40, textSignal, numberSignal, 0.07, 2)
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(6).length,
        i => textBlock(lines.get(6), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[2]}
                height={0}
                width={100}
                fill={"green"}
                x={100}
            />
            <Txt 
                ref={values[2]}
                text={""}
                fill={"white"}
                x={100}
            />
            <Txt 
                ref={labels[2]}
                text={""}
                fill={"white"}
                x={100}
            />
        </>
    )

    yield* all (
        bars[2]().height(117, 1),
        bars[2]().y(-57,1),
        values[2]().y(-157, 1),
        values[2]().text("¥64,162", 1),
        labels[2]().y(57, 1),
        labels[2]().text("Cumulative Sales Per Hardware Unit:   ¥64,162", 1),
    ) 

    yield* ref().x(-650,1)
    ref().src(avatarB)
    yield* ref().x(-800,1)
    ref().src(avatarA)

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(7).length,
        i => textBlock(lines.get(7), 40, textSignal, numberSignal, 0.07, 2)
    )

    yield* waitFor(4)
})