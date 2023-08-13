import { makeScene2D, Img, Circle, Line, Rect, Txt } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2 } from "@motion-canvas/core";

import { textBlock, contextYoY, quarterLabel } from "../../utils/designs";
import {
   date,
   dataLastFY,
   dataThisFY,
   header, 
   opMargin,
   percentagesThisFY,
} from "../../../data/capcom_fy3_2024";

import { printValuePrimitive, numberType, quickYoYCalculate } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/general_earnings_logic";
import { extractValue } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/sales_per_software_unit_cml"


import avatarA from "../../newAssets/avatar1a.svg";
import avatarB from "../../newAssets/avatar1b.svg";
import spider from "../../newAssets/spider3Final.svg"

export default makeScene2D(function* (view) {

    const textAnimate = {
        textBoxLength: 54,
        textSpeed: 0.07,
        endDelay: 2
    }

    const printValues = {
        netSales: printValuePrimitive(
        extractValue(dataThisFY.get(0).Q1QtrValue) as number,
        numberType("Million"),
        "¥"),
        operatingIncome: printValuePrimitive(
        extractValue(dataThisFY.get(1).Q1QtrValue) as number,
        numberType("Million"),
        "¥"),
        opMargin: printValuePrimitive(
        extractValue(opMargin.get(0).Q1QtrValue) as number,
        numberType("None"),
        "%"),
        netIncome: printValuePrimitive(
        extractValue(dataThisFY.get(2).Q1QtrValue) as number,
        numberType("Million"),
        "¥"),
    }

    const printLastFYValues = {
        netSales: printValuePrimitive(
        extractValue(dataLastFY.get(0).Q1QtrValue) as number,
        numberType("Million"),
        "¥"),
        operatingIncome: printValuePrimitive(
        extractValue(dataLastFY.get(1).Q1QtrValue) as number,
        numberType("Million"),
        "¥"),
        netIncome: printValuePrimitive(
        extractValue(dataLastFY.get(2).Q1QtrValue) as number,
        numberType("Million"),
        "¥"),
    }

    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();
    const webLine = createRef<Line>();

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
    lines.set(lines.size, `The following data comes from my webpage and may contain errors. This video covers the 1st Quarter (Apr-Jun) earnings release of ${header.companyName} for the fiscal year ending March 2024 (${header.fiscalYear}) and, the Capcom Platinum Titles ${date}.`)
    lines.set(lines.size, `${header.title}`)
    lines.set(lines.size, `${header.companyName}'s consolidated net sales for the ${quarterLabel("1")} was ${printValues.netSales} (${printValuePrimitive(
            extractValue(percentagesThisFY.get(0).Q1QtrValue) as number,
            numberType("None"),
            "+%"
            )} ${contextYoY(extractValue(percentagesThisFY.get(0).Q1QtrValue))})`)
    lines.set(lines.size, `${header.companyName}'s consolidated operating income for the ${quarterLabel("1")} was ${extractValue(dataThisFY.get(1).Q1QtrValue)} (${extractValue(percentagesThisFY.get(1).Q1QtrValue)} ${contextYoY(extractValue(percentagesThisFY.get(1).Q1QtrValue))})`)
    lines.set(lines.size, `${header.companyName}'s operating margin for the ${quarterLabel("1")} was ${extractValue(opMargin.get(0).Q1QtrValue)}`)
    lines.set(lines.size, `${header.companyName}'s consolidated net income for the ${quarterLabel("1")} was ${extractValue(dataThisFY.get(2).Q1QtrValue)} (${extractValue(percentagesThisFY.get(2).Q1QtrValue)} ${contextYoY(extractValue(percentagesThisFY.get(2).Q1QtrValue))})`)
    lines.set(lines.size, "Capom's operating income and net income broke historical records leading to them having the most profitable first quarter ever.")

    view.add(
        <Img 
            ref={imageRefs[0]}
            src={avatarA}
        />
    )

    yield* slideTransition(Direction.Right);

    yield* all(
        imageRefs[0]().x(-800, 1),
        imageRefs[0]().y(300, 1)
    )
    yield* waitFor(1)

    yield* slideTransition(Direction.Right);

    imageRefs[0]().fill("white")
    yield* waitFor(2)
    imageRefs[0]().src(avatarB)
    yield* imageRefs[0]().scale(2, 1)
    yield* waitFor(2)
    imageRefs[0]().src(avatarA)
    yield* imageRefs[0]().x(-500, 1)
    yield* waitFor(2)

    view.add(
        <>
            <Line 
                ref={webLine}
                stroke={"white"}
                lineWidth={8}
                points={[
                    Vector2.zero,
                    Vector2.up.scale(1)
                ]}
                x={-500}
                y={-1000}
            />
            <Img 
                ref={imageRefs[1]}
                src={spider}
                x={-500}
                y={-1000}

            /> 
        </>
    )
    
    yield* all(
        imageRefs[1]().y(-400, 2),
        webLine().y(-400, 2),
    ) 

    yield* waitFor(3)

    yield* all(
        imageRefs[1]().y(300, 1),
        webLine().y(-800, 1),
        webLine().points([Vector2.zero, Vector2.up.scale(1000)], 1)
    )

    yield* all(
        imageRefs[0]().x(0, 0.5).to(500, 0.5),
        imageRefs[0]().y(0, 0.5).to(800, 0.5),
        imageRefs[0]().rotation(1080, 1).to(-1080, 1),
    )

    yield* waitFor(2)

    yield* all(
        webLine().points([Vector2.zero, Vector2.up.scale(1)], 1),
        imageRefs[1]().rotation(90, 0.5).to(0, 1),
        imageRefs[1]().x(-750, 1),
    )

    yield* waitFor(2)


    view.add(
        <Rect 
            ref={textBox}
            padding={10}
            radius={15}
            fill={"white"}
            layout
            y={250}
            x={200}
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
        i => textBlock(lines.get(0), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    )

    yield* imageRefs[1]().rotation(0, 1).to(720, 1)

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(1).length,
        i => textBlock(lines.get(1), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(2).length,
        i => textBlock(lines.get(2), lines.get(2).length + 1, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    )

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* imageRefs[1]().rotation(0, 1)

    yield* loop(
        lines.get(3).length,
        i => textBlock(lines.get(3), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    )

    // const scale = 100;

    view.add(
        <>
            <Rect 
                ref={barRefs[0]}
                minHeight={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-500}
            />
            <Txt 
                ref={valueRefs[0]}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Txt 
                ref={labelRefs[0]}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Rect 
                ref={barRefs[1]}
                minHeight={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-700}
            />
            <Txt 
                ref={valueRefs[1]}
                text={""}
                fill={"white"}
                x={-700}
            />
        </>
    )

    const defaultBarHeight = 300;
    const defaultBarY= -150;
    const defaultValueHeight = -defaultBarHeight -40;

    const lastFYBarHeight = defaultBarHeight * (quickYoYCalculate((extractValue(dataThisFY.get(0).Q1QtrValue) as number), (extractValue(dataLastFY.get(0).Q1QtrValue) as number), 0) / 100) 
    const lastFYBarY = defaultBarY * (quickYoYCalculate((extractValue(dataThisFY.get(0).Q1QtrValue) as number), (extractValue(dataLastFY.get(0).Q1QtrValue) as number), 0) / 100);
    
    yield* all (
        barRefs[0]().height(defaultBarHeight, 1),
        barRefs[0]().y(defaultBarY, 1),
        valueRefs[0]().y(defaultValueHeight, 1),
        valueRefs[0]().text(printValues.netSales, 1),
        labelRefs[0]().y(40, 1),
        labelRefs[0]().text("Net Sales", 1),
        // textBox().y(350, 1)
        barRefs[1]().height(lastFYBarHeight, 1),
        barRefs[1]().y(lastFYBarY, 1),
        valueRefs[1]().y(defaultValueHeight, 1),
        valueRefs[1]().text(printLastFYValues.netSales, 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* waitFor(10)

    // yield* loop(
    //     lines.get(4).length,
    //     i => textBlock(lines.get(4), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // view.add(
    //     <>
    //         <Rect 
    //             ref={bar2}
    //             height={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={-200}
    //         />
    //         <Txt 
    //             ref={value2}
    //             text={""}
    //             fill={"white"}
    //             x={-200}
    //         />
    //         <Txt 
    //             ref={xValue2}
    //             text={""}
    //             fill={"white"}
    //             x={-200}
    //         />
    //     </>
    // )

    // yield* all (
    //     bar2().height(120, 1),
    //     bar2().y(-60,1),
    //     value2().y(-160, 1),
    //     xValue2().y(60, 1),
    //     value2().text("¥185,441M", 1),
    //     xValue2().text("Operating\nIncome", 1),
    // ) 

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(5).length,
    //     i => textBlock(lines.get(5), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(6).length,
    //     i => textBlock(lines.get(6), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // view.add(
    //     <>
    //         <Rect 
    //             ref={bar3}
    //             height={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={100}
    //         />
    //         <Txt 
    //             ref={value3}
    //             text={""}
    //             fill={"white"}
    //             x={100}
    //         />
    //         <Txt 
    //             ref={xValue3}
    //             text={""}
    //             fill={"white"}
    //             x={100}
    //         />
    //     </>
    // )

    // yield* all (
    //     bar3().height(117, 1),
    //     bar3().y(-57,1),
    //     value3().y(-157, 1),
    //     xValue3().y(57, 1),
    //     value3().text("¥181,019M", 1),
    //     xValue3().text("Net\nIncome", 1),
    // ) 

    // yield* ref().x(-650,1)
    // ref().src(spider)
    // yield* ref().x(-800,1)
    // ref().src(avatarA)

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(7).length,
    //     i => textBlock(lines.get(7), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // yield* waitFor(2)
})