import { makeScene2D, Img, Circle, Line, Rect, Txt, Polygon } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2, chain, Reference, Logger, createRefMap, createRefArray, range } from "@motion-canvas/core";

import { textBlock, contextYoY, quarterLabel, dataLoop, setBar, setLabel, moveBar, moveLabel} from "../../utils/designs";

export default makeScene2D(function* (view) {

    const getAudio = createRef<Txt>();
    const audioBox = createRef<Rect>();
    const audioText = "Song: Okami \"Celestial Winds from the East\"\nArtist: MkVaff\nSource: https://ocremix.org/"

    const textAnimate = {
        textBoxLength: 54,
        textSpeed: 0.03,
        endDelay: 1.5
    }

    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();

    const barsMap = createRefMap<Rect>();
    const valuesMap = createRefMap<Txt>();

    const colourMap = createRefMap<Rect>();
    const colourLabels = createRefMap<Txt>();

    const titleLabel = createRef<Txt>();

    const polygons = createRefMap<Polygon>();

    const polygonXpos = [700, 500, -100, 100, -500, -700]

    // for some reason I couldn't have these view.adds run together.
    view.add(
        <>
        {range(18).map((elem, index) => (
            <>
            <Rect ref={barsMap[index]} />
            <Txt ref={valuesMap[index]} />
            </>
        ))}
        </>
    )

    view.add(
        <>
            <Txt ref={titleLabel} />
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

    view.add(
        <Rect 
            ref={audioBox}
            padding={10}
            radius={15}
            fill={"white"}
            layout
            y={-350}
            x={2000}
        >
            <Rect fill={"black"}>
            <Txt
                fontFamily={"Consolas"}
                ref={getAudio}
                text={audioText}
                textWrap={"pre"}
                fill={"white"}
                marginLeft={16}
                marginRight={16}
            />
            </Rect>
        </Rect>
    )

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const defaultY = [-150, -150, -100];
    const defaultHeight = [300, 300, 200];
    const defaultValueHeight = -40;

    const lines = new Map<number, string>();

    lines.set(lines.size, "Note: M = Million (or rather 10^6). The following are linked in the video description: Data sources, Motion Canvas, OCRemix soundtracks, Install Base Forum, ggx2ac + archives (webpage).")

    lines.set(lines.size, `The following data comes from my webpage and may contain errors.`)

    lines.set(lines.size, `Every year, Sega Sammy releases their Integrated Report. The Integrated Report 2023 (Japanese version) which contains sales data up to the Fiscal Year Ending March 2023 (FY3/2023) has just been released.`);

    lines.set(lines.size, `Within a few weeks the English version of the Integrated Report will release and you might see your favourite gaming news aggregate put up the following headline: “Sonic the Hedgehog series reaches 1.66 Billion units!”`);

    lines.set(lines.size, `The problem is that the gaming news outlet you read from might not go into detail for how that number was reached and especially, how much of that number consists of sales from the Sonic the Hedgehog series on video game consoles/PC.`);

    lines.set(lines.size, `This gives the impression that Sonic the Hedgehog is the biggest video game IP ever, bigger than every Nintendo IP combined. It's not.`);

    lines.set(lines.size, `The numbers I reference will have links in the video description containing the source.`);

    lines.set(lines.size, `Sega Sammy's Integrated Report 2013, mentions that the Sonic the Hedgehog series has surpassed 70 million units worldwide, no further breakdown given.`);
 
    lines.set(lines.size, `In Sega Sammy's Integrated Report 2014, they created an IP section to show off the strength of their IP and the numbers they give are not just for games.`);

    lines.set(lines.size, `What they refer to as a Multifaceted Rollout in the report to show which areas their IP are used in, I will be referring to it as platforms.`);

    lines.set(lines.size, `From the Fiscal Year Ending March 2014 (FY3/2014), the Sonic the Hedgehog IP has been used in the following five platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Arcade Machines, and Toys. The cumulative units and downloads in FY3/2014 for the Sonic the Hedgehog IP is 80M. Life-To-Date is 150M.`);

    lines.set(lines.size, `Note: Packaged Games = Home Video Game Software, Digital Games refers to online/smartphone games. You will find this reading through the Integrated Report 2014. It is not clear if the Sonic the Hedgehog IP numbers from the previous FY came from only the Packaged Games platform.`);

    lines.set(lines.size, `The platform names will change over time as I put up the numbers. Amusement Arcade Machines will change to Amusement Machines. Packaged Games and Digital Games will be combined to form Consumer Games and will then be renamed to Video Games. Toys will be renamed to Toys, etc. Movies will be added as a platform in the Integrated Report 2022.`);

    lines.set(lines.size, `Integrated Report 2015: The Sonic the Hedgehog IP had cumulative units and downloads of 185M for FY3/2015. Life-To-Date: 335M. Platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Machines, Toys.`);

    lines.set(lines.size, `Integrated Report 2016: The Sonic the Hedgehog IP had cumulative units and downloads of 15M for FY3/2016. Life-To-Date: 350M. Platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Machines, Toys.`);

    lines.set(lines.size, `Integrated Report 2017: The Sonic the Hedgehog IP had cumulative units and downloads of 10M for FY3/2017. Life-To-Date: 360M. Platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Machines, Toys, etc.`);

    lines.set(lines.size, `Integrated Report 2018: A significant change occurred. Sega Sammy included downloads of free-to-play titles to their IP where applicable. In my opinion, downloading a title for free doesn’t clearly show that the IP is strong. To know the value of the IP it would be helpful to know the sales numbers and downloads from the free-to-play titles to then calculate a sales per free-to-play download figure.`);

    lines.set(lines.size, `The free-to-play downloads now end up being combined with the other units and downloads of the Sonic the Hedgehog IP. Cumulative units and downloads* (*including downloads of free-to-play titles) of 440M for FY3/2018. Life-To-Date: 800M. Platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Machines, Toys, etc.`);

    lines.set(lines.size, `Integrated Report 2019: The Sonic the Hedgehog IP had cumulative units and downloads* (*including downloads of free-to-play titles) of 120M for FY3/2019. Life-To-Date: 920M. Platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Machines, Toys, etc.`);

    lines.set(lines.size, `Integrated Report 2020: The Sonic the Hedgehog IP had cumulative units and downloads* (*including downloads of free-to-play titles) of 220M for FY3/2020. Life-To-Date: 1140M. Platforms: Pachislot and Pachinko Machines, Consumer Games, Amusement Machines, Toys, etc.`);

    lines.set(lines.size, `Integrated Report 2021: The Sonic the Hedgehog IP had cumulative units and downloads* (*including downloads of free-to-play titles) of 240M for FY3/2021. Life-To-Date: 1380M. Platforms: Pachislot and Pachinko Machines, Consumer Games, Amusement Machines, Toys, etc.`);

    lines.set(lines.size, `Integrated Report 2022: The Sonic the Hedgehog IP had cumulative units and downloads* (*including downloads of free-to-play titles) of 130M for FY3/2022. Life-To-Date: 1510M. Platforms: Pachislot and Pachinko Machines, Video Games, Movies, Amusement Machines, Toys, etc.`);

    lines.set(lines.size, `Integrated Report 2023: The Sonic the Hedgehog IP had cumulative units and downloads* (*including downloads of free-to-play titles) of 150M for FY3/2023. Life-To-Date: 1660M. Platforms: Pachislot and Pachinko Machines, Video Games, Movies, Amusement Machines, Toys, etc.`);

    // lines.set(lines.size, ``);

    yield* slideTransition(Direction.Right);

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
        8,
        i => dataLoop(lines.get(i).length, lines.get(i), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)
    );



})