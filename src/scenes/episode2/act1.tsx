import { makeScene2D, Img, Circle, Rect, Txt } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT } from "@motion-canvas/core";

import { textBlock, contextYoY, quarterLabel } from "../../utils/designs";
import {
   date,
   dataLastFY,
   dataThisFY,
   header, 
   opMargin,
   percentagesThisFY,
} from "../../../data/capcom_fy3_2024";

import { printValuePrimitive, numberType } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/general_earnings_logic";
import { extractValue } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/sales_per_software_unit_cml"


import avatarA from "../../newAssets/avatar1a.svg";
import avatarB from "../../newAssets/avatar1b.svg";
import spider from "../../newAssets/spider3Final.svg"

export default makeScene2D(function* (view) {

    const ref = createRef<Img>();
    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();

    const imageRefs = [
        createRef<Img>(),
        createRef<Img>(),
    ];

    const barRefs = [
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
        createRef<Rect>(),
    ];

    const valueRefs = [
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
    ]

    const labelRefs = [
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
    ]

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const lines = new Map<number, string>();

    lines.set(lines.size, "Note: M = Million (or rather 10^6). The following are linked in the description: Data sources, Motion Canvas, soundtracks, Install Base Forum, ggx2ac + archives (webpage).")
    lines.set(lines.size, `The following data comes from my webpage and may contain errors. This video covers the 1st Quarter (Apr-Jun) earnings release of ${header.companyName} for the fiscal year ending March 2024 (${header.fiscalYear}) and, the Capcom Platinum Titles ${date}`)
    lines.set(lines.size, `${header.title}`)
    lines.set(lines.size, `${header.companyName}'s consolidated net sales for the ${quarterLabel("1")} was ${extractValue(dataThisFY.get(0).Q1QtrValue)} (${extractValue(percentagesThisFY.get(0).Q1QtrValue)} ${contextYoY(extractValue(percentagesThisFY.get(0).Q1QtrValue))})`)
    lines.set(lines.size, "Nintendo's consolidated net sales for the first quarter was ¥461,341M (+50.05 increase year-over-year).")
    lines.set(lines.size, "Nintendo's consolidated operating income for the first quarter was ¥185,441M (+82.44% increase year-over-year).")
    lines.set(lines.size, "Nintendo's operating margin for the first quarter was 40.2%.")
    lines.set(lines.size, "Nintendo's consolidated net income for the first quarter was ¥181,019M (+52.14% increase year-over-year).")
    lines.set(lines.size, "Nintendo's net sales, operating income and net income all broke historical records leading to them having the most profitable first quarter ever.")

    view.add(
        <Img 
            ref={ref}
            src={spider}
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
    ref().src(spider)
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
    ref().src(spider)
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
    ref().src(spider)
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
                minHeight={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-500}
            />
            <Txt 
                ref={value1}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Txt 
                ref={xValue1}
                text={""}
                fill={"white"}
                x={-500}
            />
        </>
    )
    
    yield* all (
        bar1().height(300, 1),
        bar1().y(-150, 1),
        value1().y(-340, 1),
        xValue1().y(40, 1),
        value1().text("¥461,341M", 1),
        xValue1().text("Net Sales", 1),
        // textBox().y(350, 1)
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(4).length,
        i => textBlock(lines.get(4), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bar2}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-200}
            />
            <Txt 
                ref={value2}
                text={""}
                fill={"white"}
                x={-200}
            />
            <Txt 
                ref={xValue2}
                text={""}
                fill={"white"}
                x={-200}
            />
        </>
    )

    yield* all (
        bar2().height(120, 1),
        bar2().y(-60,1),
        value2().y(-160, 1),
        xValue2().y(60, 1),
        value2().text("¥185,441M", 1),
        xValue2().text("Operating\nIncome", 1),
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
                ref={bar3}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={100}
            />
            <Txt 
                ref={value3}
                text={""}
                fill={"white"}
                x={100}
            />
            <Txt 
                ref={xValue3}
                text={""}
                fill={"white"}
                x={100}
            />
        </>
    )

    yield* all (
        bar3().height(117, 1),
        bar3().y(-57,1),
        value3().y(-157, 1),
        xValue3().y(57, 1),
        value3().text("¥181,019M", 1),
        xValue3().text("Net\nIncome", 1),
    ) 

    yield* ref().x(-650,1)
    ref().src(spider)
    yield* ref().x(-800,1)
    ref().src(avatarA)

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(7).length,
        i => textBlock(lines.get(7), 40, textSignal, numberSignal, 0.07, 2)
    )

    // yield* waitFor(2)
})