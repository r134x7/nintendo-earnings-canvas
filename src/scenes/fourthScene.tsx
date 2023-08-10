import { makeScene2D, Img, Rect, Txt, Circle } from "@motion-canvas/2d";
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

    const sectors = [
        createRef<Circle>(),
        createRef<Circle>(),
        createRef<Circle>(),
        createRef<Circle>(),
    ]

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const lines = new Map<number, string>();
    
    lines.set(lines.size, "Top Selling Titles: Nintendo Switch")
    lines.set(lines.size, "Mario Kart 8 Deluxe shipped/downloads was 1.67M units in the first quarter. Life-to-date was at 55.46M units.")
    lines.set(lines.size, "Animal Crossing: New Horizons shipped/downloads was 0.58M units in the first quarter. Life-to-date was at 42.79M units.")
    lines.set(lines.size, "Super Smash Bros. Ultimate shipped/downloads was 0.68M units in the first quarter. Life-to-date was at 31.77M units.")
    lines.set(lines.size, "The Legend of Zelda: Breath of the Wild shipped/downloads was 0.84M units in the first quarter. Life-to-date was at 30.65M units.")
    lines.set(lines.size, "Super Mario Odyssey shipped/downloads was 0.68M units in the first quarter. Life-to-date was at 26.44M units.")
    lines.set(lines.size, "Pokémon Sword/Pokémon Shield shipped/downloads was 0.1M units in the first quarter. Life-to-date was at 25.92M units.")
    lines.set(lines.size, "Pokémon Scarlet/Pokémon Violet shipped/downloads was 0.56M units in the first quarter. Life-to-date was at 22.66M units.")
    lines.set(lines.size, "Super Mario Party shipped/downloads was 0.25M units in the first quarter. Life-to-date was at 19.39M units.")
    lines.set(lines.size, "The Legend of Zelda: Tears of the Kingdom shipped/downloads was 18.51M units in the first quarter. Life-to-date was at 18.51M units.")
    lines.set(lines.size, "New Super Mario Bros. U Deluxe shipped/downloads was 0.76M units in the first quarter. Life-to-date was at 16.17M units.")

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

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(2).length,
        i => textBlock(lines.get(2), 40, textSignal, numberSignal, 0.07, 2)
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
            <Rect 
                ref={bars[0]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-500}
            />
            <Txt 
                ref={values[0]}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Txt 
                ref={labels[0]}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Circle 
                ref={sectors[0]}
                size={200}
                fill={"rgba(0, 255, 255, .80)"}
                startAngle={0}
                closed={true}
                y={-150}
            />
            <Circle 
                ref={sectors[1]}
                size={200}
                fill={"rgba(255, 0, 0, .80)"}
                startAngle={295}
                closed={true}
                y={-150}
            />
            <Txt 
                ref={values[1]}
                text={""}
                fill={"white"}
                y={-330}
            />
            <Txt 
                ref={labels[1]}
                text={""}
                fill={"white"}
                y={20}
            />
        </>
    )
    
    yield* all (
        bars[0]().height(300, 1),
        bars[0]().y(-150,1),
        values[0]().y(-330, 1),
        values[0]().text("18.51M", 1),
        labels[0]().y(60, 1),
        labels[0]().text("Global LTD", 1),
        sectors[0]().endAngle(295, 1),
        sectors[1]().endAngle(360, 1),
        values[1]().text("Japan: 3.26M\nOverseas: 15.26M", 1),
        labels[1]().text("Japan: 17.6%\nOverseas: 82.4%", 1),
        textBox().y(300, 1),
    ) 

    yield* waitFor(2)

    textSignal(DEFAULT)
    numberSignal(DEFAULT)
    textBox().y(250)

    bars[0]().remove()
    values[0]().remove()
    labels[0]().remove()
    sectors[0]().remove()
    sectors[1]().remove()
    values[1]().remove()
    labels[1]().remove()

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
                fill={"rgba(0, 255, 255, .80)"}
                x={-500}
            />
            <Txt 
                ref={values[1]}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Txt 
                ref={labels[1]}
                text={""}
                fill={"white"}
                x={-500}
            />
            <Rect 
                ref={bars[2]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-200}
            />
            <Txt 
                ref={values[2]}
                text={""}
                fill={"white"}
                x={-200}
            />
            <Txt 
                ref={labels[2]}
                text={""}
                fill={"white"}
                x={-200}
            />
            <Circle 
                ref={sectors[2]}
                size={200}
                fill={"rgba(0, 255, 255, .80)"}
                startAngle={0}
                closed={true}
                y={-150}
                x={200}
            />
            <Circle 
                ref={sectors[3]}
                size={200}
                fill={"rgba(255, 0, 0, .80)"}
                startAngle={319}
                closed={true}
                y={-150}
                x={200}
            />
            <Txt 
                ref={values[3]}
                text={""}
                fill={"white"}
                y={-330}
                x={200}
            />
            <Txt 
                ref={labels[3]}
                text={""}
                fill={"white"}
                y={20}
                x={200}
            />
        </>
    )
    
    yield* all (
        bars[1]().height(300, 1),
        bars[1]().y(-150,1),
        values[1]().y(-330, 1),
        values[1]().text("55.46M", 1),
        labels[1]().y(60, 1),
        labels[1]().text("Global LTD", 1),
        bars[2]().height(300 * .03, 1),
        bars[2]().y(-150 * .03,1),
        values[2]().y(-330 * .1, 1),
        values[2]().text("1.67M", 1),
        labels[2]().y(60, 1),
        labels[2]().text("Global FY", 1),
        sectors[2]().endAngle(319, 1),
        sectors[3]().endAngle(360, 1),
        values[3]().text("Japan: 0.19M\nOverseas: 1.48M", 1),
        labels[3]().text("Japan: 11.4%\nOverseas: 88.6%", 1),
        textBox().y(300, 1),
    ) 

    yield* waitFor(4)
})