import { makeScene2D, Img, Circle, Line, Rect, Txt, Polygon } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2, chain, Reference, Logger, createRefMap, range } from "@motion-canvas/core";

import { contextYoY, quarterLabel, dataLoop, setBar, setLabel, moveBar} from "../../utils/designs";
import {
   date,
   header,
   platinumTitlesProcessed
} from "../../../data/capcom_fy3_2024";

import { printValuePrimitive, numberType, quickRatio, quickYoYCalculate } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/general_earnings_logic";
import { extractValue } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/sales_per_software_unit_cml"

import spider from "../../newAssets/spider3Final.svg"

export default makeScene2D(function* (view) {

    console.log(platinumTitlesProcessed);

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

    const polygonXpos = [700, 500, -100, 100, -500, -700]

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

    const defaultY = [-150, -150, -100];
    const defaultHeight = [300, 300, 200];
    const defaultValueHeight = -40;

    const lines = new Map<number, string>();

    const printValues = new Map<number, { quarter: string, cumulative: string }>();

    // const printLastFYValues = new Map<number, { quarter: string, cumulative: string }>();

    // const printYoYPercentages = new Map<number, { quarter: string, cumulative: string }>();

    const thisFYQuickRatio = new Map<number, { quarter: number, cumulative: number }>();

    // const lastFYQuickRatio = new Map<number, { quarter: number, cumulative: number }>();

    platinumTitlesProcessed.map((elem, index, array) => {

        printValues.set(index,
            {
                quarter: printValuePrimitive(elem.quarter.value, numberType("Million"), "None"),
                cumulative: printValuePrimitive(elem.cumulative.value, numberType("Million"), "None"),
            }
        )
         
        // printLastFYValues.set(index,
        //     {
        //         quarter: printValuePrimitive(extractValue(elem.dataLastFY.get(0).Q1QtrValue) as number, numberType("Million"), "¥"),
        //         cumulative: printValuePrimitive(extractValue(elem.dataLastFY.get(1).Q1QtrValue) as number, numberType("Million"), "None"),
        //     }
        // )

        // printYoYPercentages.set(index,
        //     {
        //         quarter: printValuePrimitive((quickYoYCalculate(extractValue(elem.dataThisFY.get(0).Q1QtrValue) as number, extractValue(elem.dataLastFY.get(0).Q1QtrValue) as number, 2)), numberType("None"), "+%"),
        //         cumulative: printValuePrimitive((quickYoYCalculate(extractValue(elem.dataThisFY.get(1).Q1QtrValue) as number, extractValue(elem.dataLastFY.get(1).Q1QtrValue) as number, 2)), numberType("None"), "+%"),
        //         salesPerSoftwareUnit: printValuePrimitive((quickYoYCalculate(extractValue(elem.dataThisFY.get(2).Q1QtrValue) as number, extractValue(elem.dataLastFY.get(2).Q1QtrValue) as number, 2)), numberType("None"), "+%"),
        //     }
        // )

        thisFYQuickRatio.set(index,
            {
                quarter: (quickRatio(elem.quarter.value, elem.cumulative.value, 2) / 100),
                cumulative: (quickRatio(elem.cumulative.value, elem.cumulative.value, 2) / 100),
            }
        )

        // lastFYQuickRatio.set(index,
        //     {
        //         quarter: (quickRatio((extractValue(elem.dataLastFY.get(0).Q1QtrValue) as number), (extractValue(array[0].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
        //         cumulative: (quickRatio((extractValue(elem.dataLastFY.get(1).Q1QtrValue) as number), (extractValue(array[0].dataThisFY.get(1).Q1QtrValue) as number), 2) / 100),
        //     }
        // )
            
    })


    lines.set(lines.size, `Fiscal Year Platinum Titles, ${date}`)

    platinumTitlesProcessed.map((elem, index, array) => {
        lines.set(lines.size,
            `${elem.cumulative.title} for ${elem.cumulative.platforms} released on ${elem.cumulative.releaseDate} had shipped units/downloads of ${elem.quarter.value} for the ${quarterLabel("1")}. Cumulative units are at ${elem.cumulative.value}. ${elem.cumulative.miscellaneous ?? ""}`
            )
    })

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

    function keyPick(i: number) {
        switch (i) {
            case 0:
               return "sales" 

            case 1:
                return "units"

            case 2:
                return "salesPerSoftwareUnit"
        
            default:
                return "sales"
        }
    }

    yield* loop(
        platinumTitlesProcessed.length / 3,
        i => chain(

            dataLoop(lines.get(i*3+1).length, lines.get(i*3+1), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal),

            all(
                moveBar(barsMap[`${i*6}`], valuesMap[`${i*6}`], -500, defaultY[i], 100, defaultHeight[i] * thisFYQuickRatio.get(0)[`${keyPick(i)}`], "rgba(0, 255, 255, .80)", -500, -defaultHeight[i] -40, printValues.get(0)[`${keyPick(i)}`], 1),

                moveBar(barsMap[`${i*6+1}`], valuesMap[`${i*6+1}`], -700, defaultY[i] * lastFYQuickRatio.get(0)[`${keyPick(i)}`], 100, defaultHeight[i] * lastFYQuickRatio.get(0)[`${keyPick(i)}`], "rgba(75, 0, 130, .80)", -700, -defaultHeight[i] * lastFYQuickRatio.get(0)[`${keyPick(i)}`] - 40, printLastFYValues.get(0)[`${keyPick(i)}`], 1),

                moveBar(colourMap["0"], colourLabels["0"], -600, -500, 80, 40, "rgba(0, 255, 255, .80)", -300, -500, "1st Quarter FY3/2024", 1),

                moveBar(colourMap["1"], colourLabels["1"], 100, -500, 80, 40, "rgba(75, 0, 130, .80)", 400, -500, "1st Quarter FY3/2023", 1),

                setLabel(view, createRef<Txt>(), -600, 40, "Package & Digital", 1)
            ),
        
             dataLoop(lines.get(i*3+2).length, lines.get(i*3+2), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,),
        
             all(
                moveBar(barsMap[`${i*6+2}`], valuesMap[`${i*6+2}`], 100, defaultY[i] * thisFYQuickRatio.get(1)[`${keyPick(i)}`], 100, defaultHeight[i] * thisFYQuickRatio.get(1)[`${keyPick(i)}`], "rgba(0, 255, 255, .80)", 100, -defaultHeight[i] * thisFYQuickRatio.get(1)[`${keyPick(i)}`] -40, printValues.get(1)[`${keyPick(i)}`], 1),
        
                moveBar(barsMap[`${i*6+3}`], valuesMap[`${i*6+3}`], -100, defaultY[i] * lastFYQuickRatio.get(1)[`${keyPick(i)}`], 100, defaultHeight[i] * lastFYQuickRatio.get(1)[`${keyPick(i)}`], "rgba(75, 0, 130, .80)", -100, -defaultHeight[i] * lastFYQuickRatio.get(1)[`${keyPick(i)}`] - 40, printLastFYValues.get(1)[`${keyPick(i)}`], 1),
        
                setLabel(view, createRef<Txt>(), 0, 40, "Package", 1)
            ),
        
             dataLoop(lines.get(i*3+3).length, lines.get(i*3+3), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,),
        
             all(
                moveBar(barsMap[`${i*6+4}`], valuesMap[`${i*6+4}`], 700, defaultY[i] * thisFYQuickRatio.get(2)[`${keyPick(i)}`], 100, defaultHeight[i] * thisFYQuickRatio.get(2)[`${keyPick(i)}`], "rgba(0, 255, 255, .80)", 700, -defaultHeight[i] * thisFYQuickRatio.get(2)[`${keyPick(i)}`] -40, printValues.get(2)[`${keyPick(i)}`], 1),
        
                moveBar(barsMap[`${i*6+5}`], valuesMap[`${i*6+5}`], 500, defaultY[i] * lastFYQuickRatio.get(2)[`${keyPick(i)}`], 100, defaultHeight[i] * lastFYQuickRatio.get(2)[`${keyPick(i)}`], "rgba(75, 0, 130, .80)", 500, -defaultHeight[i] * lastFYQuickRatio.get(2)[`${keyPick(i)}`] - 40, printLastFYValues.get(2)[`${keyPick(i)}`], 1),
        
                setLabel(view, createRef<Txt>(), 600, 40, "Digital", 1)
            ),

            // (i === 2
            //     ? all( 
            //     ...barsMap.mapRefs(elem => elem.maxHeight(400, 1)),
            //     ...valuesMap.mapRefs(elem => elem.maxHeight(400, 1)))
            //     : all()
            // ),

            waitFor(4),

            all( 
                ...barsMap.mapRefs(elem => elem.y(-2000, 2.9)),
                ...valuesMap.mapRefs(elem => elem.y(-2000, 2.9)),
                ...polygons.mapRefs(elem => elem.y(40, 0).to(-2000, 3)),
            ),

        ),
    )

    // yield* dataLoop(lines.get(10).length, lines.get(10), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal),

    yield* waitFor(4)
})