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
        createRef<Txt>(),
        createRef<Txt>(),
    ];

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

    yield* slideTransition(Direction.Bottom);

    yield* all(
        ref().x(-800, 1),
        ref().y(300, 1)
    )
    yield* waitFor(1)

    yield* slideTransition(Direction.Bottom);

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
            <Rect 
                ref={bars[0]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-800}
            />
            <Txt 
                ref={values[0]}
                text={""}
                fill={"white"}
                x={-800}
            />
            <Txt 
                ref={labels[0]}
                text={""}
                fill={"white"}
                x={-800}
            />
        </>
    )

    yield* all (
        bars[0]().height(300, 1),
        bars[0]().y(-150,1),
        values[0]().y(-330, 1),
        values[0]().text("55.46M", 1),
        labels[0]().y(60, 1),
        labels[0]().text("Mario Kart\n8 Deluxe", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(2).length,
        i => textBlock(lines.get(2), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[1]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-400}
            />
            <Txt 
                ref={values[1]}
                text={""}
                fill={"white"}
                x={-400}
            />
            <Txt 
                ref={labels[1]}
                text={""}
                fill={"white"}
                x={-400}
            />
        </>
    )

    yield* all (
        bars[1]().height(300 * .77, 1),
        bars[1]().y(-150 * .77,1),
        values[1]().y(-330 * .77, 1),
        values[1]().text("42.79M", 1),
        labels[1]().y(60, 1),
        labels[1]().text("Animal Crossing:\nNew Horizons", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(3).length,
        i => textBlock(lines.get(3), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[2]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={0}
            />
            <Txt 
                ref={values[2]}
                text={""}
                fill={"white"}
                x={0}
            />
            <Txt 
                ref={labels[2]}
                text={""}
                fill={"white"}
                x={0}
            />
        </>
    )

    yield* all (
        bars[2]().height(300 * .57, 1),
        bars[2]().y(-150 * .57,1),
        values[2]().y(-330 * .6, 1),
        values[2]().text("31.77M", 1),
        labels[2]().y(60, 1),
        labels[2]().text("Super Smash\nBros. Ultimate", 1),
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
                ref={bars[3]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={400}
            />
            <Txt 
                ref={values[3]}
                text={""}
                fill={"white"}
                x={400}
            />
            <Txt 
                ref={labels[3]}
                text={""}
                fill={"white"}
                x={400}
            />
        </>
    )

    yield* all (
        bars[3]().height(300 * .55, 1),
        bars[3]().y(-150 * .55,1),
        values[3]().y(-330 * .57, 1),
        values[3]().text("30.65M", 1),
        labels[3]().y(60, 1),
        labels[3]().text("The Legend of Zelda:\nBreath of the Wild", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(5).length,
        i => textBlock(lines.get(5), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[4]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={800}
            />
            <Txt 
                ref={values[4]}
                text={""}
                fill={"white"}
                x={800}
            />
            <Txt 
                ref={labels[4]}
                text={""}
                fill={"white"}
                x={800}
            />
        </>
    )

    yield* all (
        bars[4]().height(300 * .48, 1),
        bars[4]().y(-150 * .48,1),
        values[4]().y(-330 * .50, 1),
        values[4]().text("26.44M", 1),
        labels[4]().y(60, 1),
        labels[4]().text("Super Mario\nOdyssey", 1),
    ) 

    yield* waitFor(4)

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    bars[0]().remove()
    bars[1]().remove()
    bars[2]().remove()
    bars[3]().remove()
    bars[4]().remove()
    values[0]().remove()
    values[1]().remove()
    values[2]().remove()
    values[3]().remove()
    values[4]().remove()
    labels[0]().remove()
    labels[1]().remove()
    labels[2]().remove()
    labels[3]().remove()
    labels[4]().remove()

    yield* loop(
        lines.get(6).length,
        i => textBlock(lines.get(6), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[5]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-800}
            />
            <Txt 
                ref={values[5]}
                text={""}
                fill={"white"}
                x={-800}
            />
            <Txt 
                ref={labels[5]}
                text={""}
                fill={"white"}
                x={-750}
            />
        </>
    )

    yield* all (
        bars[5]().height(300 * .47, 1),
        bars[5]().y(-150 * .47,1),
        values[5]().y(-330 * .5, 1),
        values[5]().text("25.92M", 1),
        labels[5]().y(-250, 1),
        labels[5]().text("Pokémon Sword/\nPokémon Shield", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)
    yield* loop(
        lines.get(7).length,
        i => textBlock(lines.get(7), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[6]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={-400}
            />
            <Txt 
                ref={values[6]}
                text={""}
                fill={"white"}
                x={-400}
            />
            <Txt 
                ref={labels[6]}
                text={""}
                fill={"white"}
                x={-400}
            />
        </>
    )

    yield* all (
        bars[6]().height(300 * .41, 1),
        bars[6]().y(-150 * .41,1),
        values[6]().y(-330 * .45, 1),
        values[6]().text("22.66M", 1),
        labels[6]().y(60, 1),
        labels[6]().text("Pokémon Scarlet/\nPokémon Violet", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(8).length,
        i => textBlock(lines.get(8), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[7]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={0}
            />
            <Txt 
                ref={values[7]}
                text={""}
                fill={"white"}
                x={0}
            />
            <Txt 
                ref={labels[7]}
                text={""}
                fill={"white"}
                x={0}
            />
        </>
    )

    yield* all (
        bars[7]().height(300 * .35, 1),
        bars[7]().y(-150 * .35,1),
        values[7]().y(-330 * .4, 1),
        values[7]().text("19.39M", 1),
        labels[7]().y(60, 1),
        labels[7]().text("Super Mario\nParty", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)

    yield* loop(
        lines.get(9).length,
        i => textBlock(lines.get(9), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[8]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={400}
            />
            <Txt 
                ref={values[8]}
                text={""}
                fill={"white"}
                x={400}
            />
            <Txt 
                ref={labels[8]}
                text={""}
                fill={"white"}
                x={400}
            />
        </>
    )

    yield* all (
        bars[8]().height(300 * .33, 1),
        bars[8]().y(-150 * .33,1),
        values[8]().y(-330 * .35, 1),
        values[8]().text("18.51M", 1),
        labels[8]().y(-200, 1),
        labels[8]().text("The Legend of Zelda:\nTears of the Kingdom", 1),
    ) 

    textSignal(DEFAULT)
    numberSignal(DEFAULT)
    yield* loop(
        lines.get(10).length,
        i => textBlock(lines.get(10), 40, textSignal, numberSignal, 0.07, 2)
    )

    view.add(
        <>
            <Rect 
                ref={bars[9]}
                height={0}
                width={100}
                fill={"rgba(0, 255, 255, .80)"}
                x={800}
            />
            <Txt 
                ref={values[9]}
                text={""}
                fill={"white"}
                x={800}
            />
            <Txt 
                ref={labels[9]}
                text={""}
                fill={"white"}
                x={750}
            />
        </>
    )

    yield* all (
        bars[9]().height(300 * .29, 1),
        bars[9]().y(-150 * .29,1),
        values[9]().y(-330 * .32, 1),
        values[9]().text("16.17M", 1),
        labels[9]().y(60, 1),
        labels[9]().text("New Super Mario\nBros. U Deluxe", 1),
    ) 

    yield* waitFor(4)
})