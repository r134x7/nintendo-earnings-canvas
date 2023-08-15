import { makeScene2D, Img, Circle, Line, Rect, Txt, Polygon } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2, chain, Reference, Logger, createRefMap, range } from "@motion-canvas/core";

import { contextYoY, quarterLabel, dataLoop, setBar, setLabel, moveBar, moveLabel} from "../../utils/designs";
import {
   date,
   header,
   platinumTitlesProcessed
} from "../../../data/capcom_fy3_2024";

import { printValuePrimitive, numberType, quickRatio, quickYoYCalculate } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/general_earnings_logic";
import { extractValue } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/sales_per_software_unit_cml"

import spider from "../../newAssets/spider3Final.svg"

export default makeScene2D(function* (view) {

    // console.log(platinumTitlesProcessed);

    const textAnimate = {
        textBoxLength: 54,
        textSpeed: 0.07,
        endDelay: 4
    }
    
    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();
    const webLine = createRef<Line>();

    const barsMap = createRefMap<Rect>();
    const valuesMap = createRefMap<Txt>();

    const colourMap = createRefMap<Rect>();
    const colourLabels = createRefMap<Txt>();

    const labelsMap = createRefMap<Txt>();

    const polygons = createRefMap<Polygon>();

    const polygonXpos = [-500, -700, 100, -100, 700, 500]

    // for some reason I couldn't have these run together.
    view.add(
        <>
        {range(72).map((elem, index) => (
            <>
            <Rect ref={barsMap[index]} />
            <Txt ref={valuesMap[index]} />
            </>
        ))}
        </>
    )

    view.add(
        <>
        {range(36).map((elem, index) => (
            <>
            <Txt ref={labelsMap[index]} />
            </>
        ))}
        </>
    )

    view.add(
        <>
        {range(2).map((elem, index) => (
            <>
            <Rect ref={colourMap[index]} />
            <Txt ref={colourLabels[index]} />
            </>
        ))}
        </>
    )

    view.add(
        <>
        {range(6).map((elem, index) => (
            <>
            <Polygon 
                ref={polygons[index]} 
                rotation={60}
                x={polygonXpos[index]}
                sides={3}
                size={100}
                fill={"orange"}
                y={-2000}
            />
            </>
        ))}
        </>
    )

    const imageRefs = [
        createRef<Img>(),
        createRef<Img>(),
    ];

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const defaultY = -150; 
    const defaultHeight = 300;
    // const defaultY = [-150, -150, -100];
    // const defaultHeight = [300, 300, 200];
    const defaultValueHeight = -40;

    const lines = new Map<number, string>();


    lines.set(lines.size, "Final section")
    lines.set(lines.size, "To view all platinum titles with more in-depth data, head to ggx2ac + archives (webpage). For more video game sales topics to read, visit Install Base Forum. (Links in the video description)")

    yield* slideTransition(Direction.Right);

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

    yield* imageRefs[1]().rotation(0, 1).to(720, 1)

    yield* dataLoop(lines.get(0).length, lines.get(0), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* dataLoop(lines.get(1).length, lines.get(1), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)


    // yield* dataLoop(lines.get(10).length, lines.get(10), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal),

    yield* waitFor(6)
})