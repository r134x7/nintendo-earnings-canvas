import { makeScene2D, Img, Circle, Line, Rect, Txt } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2, chain, Reference, Logger, createRefMap } from "@motion-canvas/core";

import { textBlock, contextYoY, quarterLabel, dataLoop, setBar, setLabel, moveNodes, removeChildrenInLoop } from "../../utils/designs";
import {
   date,
   header,
   capcomSales
} from "../../../data/capcom_fy3_2024";

import { printValuePrimitive, numberType, quickRatio, quickYoYCalculate } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/utils/general_earnings_logic";
import { extractValue } from "../../../../../nintendo-earnings-data-and-other-video-game-companies/webpage_v2/src/data/generalTables/sales_per_software_unit_cml"

import spider from "../../newAssets/spider3Final.svg"

export default makeScene2D(function* (view) {

    const textAnimate = {
        textBoxLength: 54,
        textSpeed: 0.07,
        endDelay: 4
    }

    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();
    const webLine = createRef<Line>();

    const bars = new Map<number, Reference<Rect>[]>();
    const barValues = new Map<number, Reference<Txt>[]>();

    const barsMap = createRefMap<Rect>();

    for (let index = 0; index < capcomSales.length; index++) {

            bars.set(bars.size, Array(6).fill(createRef<Rect>()))
            barValues.set(barValues.size, Array(6).fill(createRef<Txt>()))
    }

    const imageRefs = [
        createRef<Img>(),
        createRef<Img>(),
    ];

    const labelRefs = [
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
        createRef<Txt>(),
    ]

    const colourRefs = [
        createRef<Txt>(),
        createRef<Txt>(),
    ]

    const colourBoxRefs = [
        createRef<Rect>(),
        createRef<Rect>(),
    ]

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const defaultY = -150;
    const defaultHeight = 300;
    const defaultValueHeight = -40;

    const lines = new Map<number, string>();

    const printValues = new Map<number, { sales: string, units: string, salesPerSoftwareUnit: string }>();

    const printLastFYValues = new Map<number, { sales: string, units: string, salesPerSoftwareUnit: string }>();

    const printYoYPercentages = new Map<number, { sales: string, units: string, salesPerSoftwareUnit: string }>();

    const thisFYQuickRatio = new Map<number, { sales: number, units: number, salesPerSoftwareUnit: number }>();

    const lastFYQuickRatio = new Map<number, { sales: number, units: number, salesPerSoftwareUnit: number }>();

    capcomSales.map((elem, index, array) => {

        printValues.set(index,
            {
                sales: printValuePrimitive(extractValue(elem.dataThisFY.get(0).Q1QtrValue) as number, numberType("Million"), "¥"),
                units: printValuePrimitive(extractValue(elem.dataThisFY.get(1).Q1QtrValue) as number, numberType("Million"), "None"),
                salesPerSoftwareUnit: printValuePrimitive(extractValue(elem.dataThisFY.get(2).Q1QtrValue) as number, numberType("None"), "¥"),
            }
        )
         

        printLastFYValues.set(index,
            {
                sales: printValuePrimitive(extractValue(elem.dataLastFY.get(0).Q1QtrValue) as number, numberType("Million"), "¥"),
                units: printValuePrimitive(extractValue(elem.dataLastFY.get(1).Q1QtrValue) as number, numberType("Million"), "None"),
                salesPerSoftwareUnit: printValuePrimitive(extractValue(elem.dataLastFY.get(2).Q1QtrValue) as number, numberType("None"), "¥"),
            }
        )

        printYoYPercentages.set(index,
            {
                sales: printValuePrimitive((quickYoYCalculate(extractValue(elem.dataThisFY.get(0).Q1QtrValue) as number, extractValue(elem.dataLastFY.get(0).Q1QtrValue) as number, 2)), numberType("None"), "+%"),
                units: printValuePrimitive((quickYoYCalculate(extractValue(elem.dataThisFY.get(1).Q1QtrValue) as number, extractValue(elem.dataLastFY.get(1).Q1QtrValue) as number, 2)), numberType("None"), "+%"),
                salesPerSoftwareUnit: printValuePrimitive((quickYoYCalculate(extractValue(elem.dataThisFY.get(2).Q1QtrValue) as number, extractValue(elem.dataLastFY.get(2).Q1QtrValue) as number, 2)), numberType("None"), "+%"),
            }
        )

        thisFYQuickRatio.set(index,
            {
                sales: (quickRatio((extractValue(elem.dataThisFY.get(0).Q1QtrValue) as number), (extractValue(array[0].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
                units: (quickRatio((extractValue(elem.dataThisFY.get(1).Q1QtrValue) as number), (extractValue(array[1].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
                salesPerSoftwareUnit: (quickRatio((extractValue(elem.dataThisFY.get(2).Q1QtrValue) as number), (extractValue(array[1].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
            }
        )

        lastFYQuickRatio.set(index,
            {
                sales: (quickRatio((extractValue(elem.dataLastFY.get(0).Q1QtrValue) as number), (extractValue(array[0].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
                units: (quickRatio((extractValue(elem.dataLastFY.get(1).Q1QtrValue) as number), (extractValue(array[1].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
                salesPerSoftwareUnit: (quickRatio((extractValue(elem.dataLastFY.get(2).Q1QtrValue) as number), (extractValue(array[1].dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
            }
        )
            
    })


    lines.set(lines.size, "Sales Per Software Unit")

    lines.set(lines.size, `Capcom's software sales from ${capcomSales[0].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(0).sales} (${printYoYPercentages.get(0).sales} ${contextYoY(printYoYPercentages.get(0).sales)})`)

    lines.set(lines.size, `Capcom's software sales from ${capcomSales[1].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(1).sales} (${printYoYPercentages.get(1).sales} ${contextYoY(printYoYPercentages.get(1).sales)})`)

    lines.set(lines.size, `Capcom's software sales from ${capcomSales[2].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(2).sales} (${printYoYPercentages.get(2).sales} ${contextYoY(printYoYPercentages.get(2).sales)})`)

    lines.set(lines.size, `Capcom's software units from ${capcomSales[0].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(0).units} (${printYoYPercentages.get(0).units} ${contextYoY(printYoYPercentages.get(0).units)})`)

    lines.set(lines.size, `Capcom's software units from ${capcomSales[1].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(1).units} (${printYoYPercentages.get(1).units} ${contextYoY(printYoYPercentages.get(1).units)})`)

    lines.set(lines.size, `Capcom's software units from ${capcomSales[2].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(2).units} (${printYoYPercentages.get(2).units} ${contextYoY(printYoYPercentages.get(2).units)})`)

    lines.set(lines.size, `Capcom's sales per software unit from ${capcomSales[0].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(0).salesPerSoftwareUnit} (${printYoYPercentages.get(0).salesPerSoftwareUnit} ${contextYoY(printYoYPercentages.get(0).salesPerSoftwareUnit)})`)

    lines.set(lines.size, `Capcom's sales per software unit from ${capcomSales[1].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(1).salesPerSoftwareUnit} (${printYoYPercentages.get(1).salesPerSoftwareUnit} ${contextYoY(printYoYPercentages.get(1).salesPerSoftwareUnit)})`)

    lines.set(lines.size, `Capcom's sales per software unit from ${capcomSales[2].dataThisFY.get(0).name} for the ${quarterLabel("1")} was ${printValues.get(2).salesPerSoftwareUnit} (${printYoYPercentages.get(2).salesPerSoftwareUnit} ${contextYoY(printYoYPercentages.get(2).salesPerSoftwareUnit)})`)
    // lines.set(lines.size, "Capom's operating income and net income broke historical records leading to them having the most profitable first quarter ever.")

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

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    yield* imageRefs[1]().rotation(0, 1).to(720, 1)

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    yield* dataLoop(lines.get(0).length, lines.get(0), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)


    yield* loop(
        capcomSales.length,
        i => chain(

             dataLoop(lines.get(1).length, lines.get(1), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal),

             all(
                setBar(view, barsMap[i], barValues.get(i)[0], -500, defaultY, 100, defaultHeight * thisFYQuickRatio.get(0).sales, "rgba(0, 255, 255, .80)", -500, -340, printValues.get(0).sales, 1),

                setBar(view, barsMap[i+10], barValues.get(i)[1], -700, defaultY * lastFYQuickRatio.get(0).sales, 100, defaultHeight * lastFYQuickRatio.get(0).sales, "rgba(75, 0, 130, .80)", -700, -defaultHeight * lastFYQuickRatio.get(0).sales - 40, printLastFYValues.get(0).sales, 1),

                setBar(view, createRef<Rect>(), createRef<Txt>(), -600, -500, 80, 40, "rgba(0, 255, 255, .80)", -300, -500, "1st Quarter FY3/2024", 1),

                setBar(view, createRef<Rect>(), createRef<Txt>(), 100, -500, 80, 40, "rgba(75, 0, 130, .80)", 400, -500, "1st Quarter FY3/2023", 1),

                setLabel(view, createRef<Txt>(), -600, 40, "Package & Digital", 1)
            ),
        
             dataLoop(lines.get(2).length, lines.get(2), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,),
        
             all(
                setBar(view, barsMap[i+20], barValues.get(i)[2], 100, defaultY * thisFYQuickRatio.get(1).sales, 100, defaultHeight * thisFYQuickRatio.get(1).sales, "rgba(0, 255, 255, .80)", 100, -defaultHeight * thisFYQuickRatio.get(1).sales -40, printValues.get(1).sales, 1),
        
                setBar(view, barsMap[i+30], barValues.get(i)[3], -100, defaultY * lastFYQuickRatio.get(1).sales, 100, defaultHeight * lastFYQuickRatio.get(1).sales, "rgba(75, 0, 130, .80)", -100, -defaultHeight * lastFYQuickRatio.get(1).sales - 40, printLastFYValues.get(1).sales, 1),
        
                setLabel(view, createRef<Txt>(), 0, 40, "Package", 1)
            ),
        
             dataLoop(lines.get(3).length, lines.get(3), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,),
        
             all(
                setBar(view, barsMap[i+40], barValues.get(i)[4], 700, defaultY * thisFYQuickRatio.get(2).sales, 100, defaultHeight * thisFYQuickRatio.get(2).sales, "rgba(0, 255, 255, .80)", 700, -defaultHeight * thisFYQuickRatio.get(2).sales -40, printValues.get(2).sales, 1),
        
                setBar(view, barsMap[i+50], barValues.get(i)[5], 500, defaultY * lastFYQuickRatio.get(2).sales, 100, defaultHeight * lastFYQuickRatio.get(2).sales, "rgba(75, 0, 130, .80)", 500, -defaultHeight * lastFYQuickRatio.get(2).sales - 40, printLastFYValues.get(2).sales, 1),
        
                setLabel(view, createRef<Txt>(), 600, 40, "Digital", 1)
            ),

            waitFor(4),

            // all( ...barsMap.mapRefs(elem => elem.y(2000, 1)))
            // all(
            //     barsMap.a.y(-2000, 1),
            //     bars.get(i)[1]().y(-2000, 1),
            //     bars.get(i)[2]().y(-2000, 1),
            //     bars.get(i)[3]().y(-2000, 1),
            //     bars.get(i)[4]().y(-2000, 1),
            //     bars.get(i)[5]().y(-2000, 1),
            // )

            // loop(
            //     bars.get(i).length,
            //     j => bars.get(i)[j]().y(-2000, 1)
            // )
        ),
    )

    yield* all( ...barsMap.mapRefs(elem => elem.y(-2000, 1)))

            
    yield* waitFor(3)

    // yield* dataLoop(lines.get(1).length, lines.get(1), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,)

    // yield* all(
    //     setBar(view, createRef<Rect>(), createRef<Txt>(), -500, defaultY, 100, defaultHeight * thisFYQuickRatio.get(0).sales, "rgba(0, 255, 255, .80)", -500, -340, printValues.get(0).sales, 1),
    //     setBar(view, createRef<Rect>(), createRef<Txt>(), -700, defaultY * lastFYQuickRatio.get(0).sales, 100, defaultHeight * lastFYQuickRatio.get(0).sales, "rgba(75, 0, 130, .80)", -700, -defaultHeight * lastFYQuickRatio.get(0).sales - 40, printLastFYValues.get(0).sales, 1),
    //     setBar(view, createRef<Rect>(), createRef<Txt>(), -600, -500, 80, 40, "rgba(0, 255, 255, .80)", -300, -500, "1st Quarter FY3/2024", 1),
    //     setBar(view, createRef<Rect>(), createRef<Txt>(), 100, -500, 80, 40, "rgba(75, 0, 130, .80)", 400, -500, "1st Quarter FY3/2023", 1),
    //     setLabel(view, createRef<Txt>(), -600, 40, "Package & Digital", 1)
    // )

    // yield* dataLoop(lines.get(2).length, lines.get(2), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,)

    // yield* all(
    //     setBar(view, createRef<Rect>(), createRef<Txt>(), 100, defaultY * thisFYQuickRatio.get(1).sales, 100, defaultHeight * thisFYQuickRatio.get(1).sales, "rgba(0, 255, 255, .80)", 100, -defaultHeight * thisFYQuickRatio.get(1).sales -40, printValues.get(1).sales, 1),

    //     setBar(view, createRef<Rect>(), createRef<Txt>(), -100, defaultY * lastFYQuickRatio.get(1).sales, 100, defaultHeight * lastFYQuickRatio.get(1).sales, "rgba(75, 0, 130, .80)", -100, -defaultHeight * lastFYQuickRatio.get(1).sales - 40, printLastFYValues.get(1).sales, 1),

    //     setLabel(view, createRef<Txt>(), 0, 40, "Package", 1)
    // )

    // yield* dataLoop(lines.get(3).length, lines.get(3), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal,)

    // yield* all(
    //     setBar(view, createRef<Rect>(), createRef<Txt>(), 700, defaultY * thisFYQuickRatio.get(2).sales, 100, defaultHeight * thisFYQuickRatio.get(2).sales, "rgba(0, 255, 255, .80)", 700, -defaultHeight * thisFYQuickRatio.get(2).sales -40, printValues.get(2).sales, 1),

    //     setBar(view, createRef<Rect>(), createRef<Txt>(), 500, defaultY * lastFYQuickRatio.get(2).sales, 100, defaultHeight * lastFYQuickRatio.get(2).sales, "rgba(75, 0, 130, .80)", 500, -defaultHeight * lastFYQuickRatio.get(2).sales - 40, printLastFYValues.get(2).sales, 1),

    //     setLabel(view, createRef<Txt>(), 600, 40, "Digital", 1)
    // )

    // yield* loop(
    //     lines.get(1).length,
    //     i => textBlock(lines.get(1), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(2).length,
    //     i => textBlock(lines.get(2), lines.get(2).length + 1, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* imageRefs[1]().rotation(0, 1)

    // yield* loop(
    //     lines.get(3).length,
    //     i => textBlock(lines.get(3), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // // const scale = 100;

    // view.add(
    //     <>
            // <Rect 
    //             ref={barRefs[0]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={-500}
    //         />
    //         <Txt 
    //             ref={valueRefs[0]}
    //             text={""}
    //             fill={"white"}
    //             x={-500}
    //         />
    //         <Txt 
    //             ref={labelRefs[0]}
    //             text={""}
    //             fill={"white"}
    //             x={-600}
    //         />
    //         <Rect 
    //             ref={barRefs[1]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(75, 0, 130, .80)"}
    //             x={-700}
    //         />
    //         <Txt 
    //             ref={valueRefs[1]}
    //             text={""}
    //             fill={"white"}
    //             x={-700}
    //         />
    //         <Rect 
    //             ref={colourBoxRefs[0]}
    //             height={40}
    //             width={80}
    //             fill={"rgba(0, 255, 255, .80)"}
    //         />
    //         <Txt 
    //             ref={colourRefs[0]}
    //             text={""}
    //             fill={"white"}
    //         />
    //         <Rect 
    //             ref={colourBoxRefs[1]}
    //             height={40}
    //             width={80}
    //             fill={"rgba(75, 0, 130, .80)"}
    //         />
    //         <Txt 
    //             ref={colourRefs[1]}
    //             text={""}
    //             fill={"white"}
    //         />
    //     </>
    // )

    // const defaultBarHeight = {
    //     netSales: 300,
    //     operatingIncome: 300 * (quickRatio((extractValue(dataThisFY.get(1).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     netIncome: 300 * (quickRatio((extractValue(dataThisFY.get(2).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     opMargin: 300 * ((extractValue(opMargin.get(0).Q1QtrValue)  as number) / 100)
    // };

    // const lastFYBarHeight = {
    //     netSales: defaultBarHeight.netSales * (quickRatio((extractValue(dataLastFY.get(0).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     operatingIncome: defaultBarHeight.operatingIncome * (quickRatio((extractValue(dataThisFY.get(1).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     netIncome: defaultBarHeight.netIncome * (quickRatio((extractValue(dataThisFY.get(2).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     opMargin: 300 * (quickRatio(extractValue(dataLastFY.get(1).Q1QtrValue) as number, extractValue(dataLastFY.get(0).Q1QtrValue) as number, 2) / 100)
    // }
    
    // const defaultBarY= {
    //     netSales: -150,
    //     operatingIncome: -150 * (quickRatio((extractValue(dataThisFY.get(1).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     netIncome: -150 * (quickRatio((extractValue(dataThisFY.get(2).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     opMargin: -150 * ((extractValue(opMargin.get(0).Q1QtrValue)  as number) / 100)
    // };

    // const lastFYBarY = {
    //     netSales: defaultBarY.netSales * (quickRatio((extractValue(dataLastFY.get(0).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     operatingIncome: defaultBarY.operatingIncome * (quickRatio((extractValue(dataThisFY.get(1).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     netIncome: defaultBarY.netIncome * (quickRatio((extractValue(dataThisFY.get(2).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100),
    //     opMargin: -150 * (quickRatio(extractValue(dataLastFY.get(1).Q1QtrValue) as number, extractValue(dataLastFY.get(0).Q1QtrValue) as number, 2) / 100)
    // }

    // const defaultValueHeight = {
    //     netSales: -defaultBarHeight.netSales -40,
    //     operatingIncome: -defaultBarHeight.operatingIncome -40,
    //     netIncome: -defaultBarHeight.netIncome -40,
    //     opMargin: -defaultBarHeight.opMargin -40,
    // };

    // const lastFYValueHeight = {
    //     netSales: -defaultBarHeight.netSales * (quickRatio((extractValue(dataLastFY.get(0).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100) -40,
    //     operatingIncome: -defaultBarHeight.operatingIncome * (quickRatio((extractValue(dataThisFY.get(1).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100) -40,
    //     netIncome: -defaultBarHeight.netIncome * (quickRatio((extractValue(dataThisFY.get(2).Q1QtrValue) as number), (extractValue(dataThisFY.get(0).Q1QtrValue) as number), 2) / 100) -40,
    //     opMargin: -defaultBarHeight.netSales * (quickRatio(extractValue(dataLastFY.get(1).Q1QtrValue) as number, extractValue(dataLastFY.get(0).Q1QtrValue) as number, 2) / 100) -40,
    // }

    // yield* all (
    //     barRefs[0]().height(defaultBarHeight.netSales, 1),
    //     barRefs[0]().y(defaultBarY.netSales, 1),
    //     valueRefs[0]().y(defaultValueHeight.netSales, 1),
    //     valueRefs[0]().text(printValues.netSales, 1),
    //     labelRefs[0]().y(40, 1),
    //     labelRefs[0]().text("Net Sales", 1),
    //     barRefs[1]().height(lastFYBarHeight.netSales, 1),
    //     barRefs[1]().y(lastFYBarY.netSales, 1),
    //     valueRefs[1]().y(lastFYValueHeight.netSales, 1),
    //     valueRefs[1]().text(printLastFYValues.netSales, 1),
    //     colourBoxRefs[0]().x(-600, 1),
    //     colourBoxRefs[0]().y(-500, 1),
    //     colourBoxRefs[1]().x(100, 1),
    //     colourBoxRefs[1]().y(-500, 1),
    //     colourRefs[0]().text("1st Quarter FY3/2024", 1),
    //     colourRefs[1]().text("1st Quarter FY3/2023", 1),
    //     colourRefs[0]().x(-300, 1),
    //     colourRefs[0]().y(-500, 1),
    //     colourRefs[1]().x(400, 1),
    //     colourRefs[1]().y(-500, 1),
    // ) 

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(4).length,
    //     i => textBlock(lines.get(4), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // view.add(
    //     <>
    //         <Rect 
    //             ref={barRefs[2]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={-100}
    //         />
    //         <Txt 
    //             ref={valueRefs[2]}
    //             text={""}
    //             fill={"white"}
    //             x={-100}
    //         />
    //         <Txt 
    //             ref={labelRefs[1]}
    //             text={""}
    //             fill={"white"}
    //             x={-200}
    //         />
    //         <Rect 
    //             ref={barRefs[3]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(75, 0, 130, .80)"}
    //             x={-300}
    //         />
    //         <Txt 
    //             ref={valueRefs[3]}
    //             text={""}
    //             fill={"white"}
    //             x={-300}
    //         />
    //     </>
    // )

    // yield* all (
    //     barRefs[2]().height(defaultBarHeight.operatingIncome, 1),
    //     barRefs[2]().y(defaultBarY.operatingIncome, 1),
    //     valueRefs[2]().y(defaultValueHeight.operatingIncome, 1),
    //     valueRefs[2]().text(printValues.operatingIncome, 1),
    //     labelRefs[1]().y(40, 1),
    //     labelRefs[1]().text("Operating Income", 1),
    //     barRefs[3]().height(lastFYBarHeight.operatingIncome, 1),
    //     barRefs[3]().y(lastFYBarY.operatingIncome, 1),
    //     valueRefs[3]().y(lastFYValueHeight.operatingIncome, 1),
    //     valueRefs[3]().text(printLastFYValues.operatingIncome, 1),
    // ) 

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(5).length,
    //     i => textBlock(lines.get(5), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    // view.add(
    //     <>
    //         <Rect 
    //             ref={barRefs[4]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={300}
    //         />
    //         <Txt 
    //             ref={valueRefs[4]}
    //             text={""}
    //             fill={"white"}
    //             x={300}
    //         />
    //         <Txt 
    //             ref={labelRefs[2]}
    //             text={""}
    //             fill={"white"}
    //             x={200}
    //         />
    //         <Rect 
    //             ref={barRefs[5]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(75, 0, 130, .80)"}
    //             x={100}
    //         />
    //         <Txt 
    //             ref={valueRefs[5]}
    //             text={""}
    //             fill={"white"}
    //             x={100}
    //         />
    //     </>
    // )

    // yield* all (
    //     barRefs[4]().height(defaultBarHeight.opMargin, 1),
    //     barRefs[4]().y(defaultBarY.opMargin, 1),
    //     valueRefs[4]().y(defaultValueHeight.opMargin, 1),
    //     valueRefs[4]().text(printValues.opMargin, 1),
    //     labelRefs[2]().y(40, 1),
    //     labelRefs[2]().text("Operating Margin", 1),
    //     barRefs[5]().height(lastFYBarHeight.opMargin, 1),
    //     barRefs[5]().y(lastFYBarY.opMargin, 1),
    //     valueRefs[5]().y(lastFYValueHeight.opMargin, 1),
    //     valueRefs[5]().text(printLastFYValues.opMargin, 1),
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
    //             ref={barRefs[6]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(0, 255, 255, .80)"}
    //             x={700}
    //         />
    //         <Txt 
    //             ref={valueRefs[6]}
    //             text={""}
    //             fill={"white"}
    //             x={700}
    //         />
    //         <Txt 
    //             ref={labelRefs[3]}
    //             text={""}
    //             fill={"white"}
    //             x={600}
    //         />
    //         <Rect 
    //             ref={barRefs[7]}
    //             minHeight={0}
    //             width={100}
    //             fill={"rgba(75, 0, 130, .80)"}
    //             x={500}
    //         />
    //         <Txt 
    //             ref={valueRefs[7]}
    //             text={""}
    //             fill={"white"}
    //             x={500}
    //         />
    //     </>
    // )

    // yield* all (
    //     barRefs[6]().height(defaultBarHeight.netIncome, 1),
    //     barRefs[6]().y(defaultBarY.netIncome, 1),
    //     valueRefs[6]().y(defaultValueHeight.netIncome, 1),
    //     valueRefs[6]().text(printValues.netIncome, 1),
    //     labelRefs[3]().y(40, 1),
    //     labelRefs[3]().text("Net Income", 1),
    //     barRefs[7]().height(lastFYBarHeight.netIncome, 1),
    //     barRefs[7]().y(lastFYBarY.netIncome, 1),
    //     valueRefs[7]().y(lastFYValueHeight.netIncome, 1),
    //     valueRefs[7]().text(printLastFYValues.netIncome, 1),
    // ) 

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)
    
    // yield* loop(
    //     lines.get(7).length,
    //     i => textBlock(lines.get(7), textAnimate.textBoxLength, textSignal, numberSignal, textAnimate.textSpeed, textAnimate.endDelay)
    // )

    yield* waitFor(2)
})