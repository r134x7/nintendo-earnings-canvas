import { makeScene2D, Img, Circle, Line, Rect, Txt, Polygon } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2, chain, Reference, Logger, createRefMap, createRefArray, range } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const getAudio = createRef<Txt>();
    const audioBox = createRef<Rect>();
    const audioText = "Song: Okami \"Celestial Winds from the East\"\nArtist: MkVaff\nSource: https://ocremix.org/"

    const textAnimate = {
        textBoxLength: 54,
        textSpeed: 0.03,
        endDelay: 1
    }

    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();
    const webLine = createRef<Line>();

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

    lines.set(lines.size, "Inflation");

    lines.set(lines.size, `Every year, Sega Sammy releases their Integrated Report. The Integrated Report 2023 (Japanese version) which contains sales data up to the Fiscal Year Ending March 2023 (FY3/2023) has just been released.`);

    lines.set(lines.size, `Within a few weeks the English version of the Integrated Report will release and you might see on your favourite gaming news aggregate put up the following headline: “Sonic the Hedgehog series reaches 1.66 Billion units!”`);

    lines.set(lines.size, `The problem is that the gaming news outlet you read from might not go into detail for how that number was reached and especially, how much of that number consists of sales from the Sonic the Hedgehog series on video game consoles/PC.`);

    lines.set(lines.size, `This gives the impression that Sonic the Hedgehog is the biggest video game IP ever, bigger than every Nintendo IP combined. It's not.`);

    lines.set(lines.size, `The numbers I reference will have links in the video description containing the source.`);

    lines.set(lines.size, `Sega Sammy's Integrated Report 2013, mentions that the Sonic the Hedgehog series has surpassed 70 million units worldwide, no further breakdown.`);
 
    lines.set(lines.size, `In Sega Sammy's Integrated Report 2014, they created an IP section to show off the strength of their IP and the numbers they give are not just for games.`);

    lines.set(lines.size, `What they refer to as a Multifaceted Rollout in the report to show which areas their IP are used in, I will be referring to it as platforms.`);

    // lines.set(lines.size, ``);
    lines.set(lines.size, `From the Fiscal Year Ending March 2014 (FY3/2014), the Sonic the Hedgehog IP has been used in the following five platforms: Pachislot and Pachinko Machines, Digital Games, Packaged Games, Amusement Arcade Machines, and Toys. The cumulative units and downloads in FY3/2014 for the Sonic the Hedgehog IP is 80M. Life-To-Date is 150M.`);

    lines.set(lines.size, `The Life-To-Date number more than doubled once they expanded out the number of platforms the Sonic the Hedgehog IP is used in. Note: Packaged Games = Home Video Game Software, Digital Games refers to online/smartphone games. You will find this reading through the Integrated Report 2014. That means the Sonic the Hedgehog IP numbers the previous FY came from the Packaged Games platform and then in FY3/2014 they expanded it to the rest.`);

    lines.set(lines.size, `The platform names will change over time as I put up the numbers but the Sonic the Hedgehog IP has been used in all of them. Amusement Arcade Machines will change to Amusement Machines. Packaged Games and Digital Games will be combined to form Consumer Games and will then be renamed to Video Games. Toys will be renamed to Toys, etc. Movies will be added as a platform in the Integrated Report 2022.`);

    lines.set(lines.size, ``);


})