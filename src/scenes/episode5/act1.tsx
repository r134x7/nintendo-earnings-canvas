import { makeScene2D, Img, Circle, Line, Rect, Txt, Polygon } from "@motion-canvas/2d";
import { Direction, all, createRef, createSignal, slideTransition, waitFor, loop, DEFAULT, Vector2, chain, Reference, Logger, createRefMap, createRefArray, range } from "@motion-canvas/core";

import { textBlock, contextYoY, quarterLabel, dataLoop, setBar, setLabel, moveBar, moveLabel} from "../../utils/designs";

import boxCharacter from "../../newAssets/boxboy1a.svg";
import circleCharacter from "../../newAssets/circleboy1a.svg";

export default makeScene2D(function* (view) {

    const textAnimate = {
        textBoxLength: 54,
        textSpeed: 0.05,
        endDelay: 1.5
    }

    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();

    const box1 = createRef<Rect>();
    const box2 = createRef<Rect>();
    const circle1 = createRef<Circle>();
    const circle2 = createRef<Circle>();

    const portrait1 = createRef<Rect>(); 

    const portraitRef = createRef<Img>();

    const characterRefs = [
        createRef<Img>(),
        createRef<Img>(),
    ];

    view.add(
        <Rect 
            ref={portrait1}
            padding={10}
            radius={15}
            fill={"white"}
            layout
            y={250}
            x={200}
            // height={100}
            // width={100}
            scale={3}

        >
            <Rect fill={"black"}>
            <Img
                ref={portraitRef}            
                src={boxCharacter}
                margin={5}
            />
            </Rect>
        </Rect>
    ) 

    view.add(
            <Img 
                ref={characterRefs[0]}
                src={boxCharacter}
            /> 
    )

    view.add(
            <Img 
                ref={characterRefs[1]}
                src={circleCharacter}
                x={2000}
            /> 
    )

    // const barsMap = createRefMap<Rect>();
    // const valuesMap = createRefMap<Txt>();

    // const colourMap = createRefMap<Rect>();
    // const colourLabels = createRefMap<Txt>();

    // const titleLabel = createRef<Txt>();

    // const polygons = createRefMap<Polygon>();

    // const polygonXpos = [700, 500, -100, 100, -500, -700]

    // // for some reason I couldn't have these view.adds run together.
    // view.add(
    //     <>
    //     {range(18).map((elem, index) => (
    //         <>
    //         <Rect ref={barsMap[index]} />
    //         <Txt ref={valuesMap[index]} />
    //         </>
    //     ))}
    //     </>
    // )

    // view.add(
    //     <>
    //         <Txt ref={titleLabel} />
    //     </>
    // )

    // view.add(
    //     <>
    //     {range(2).map((elem, index) => (
    //         <>
    //         <Rect ref={colourMap[index]} />
    //         <Txt ref={colourLabels[index]} />
    //         </>
    //     ))}
    //     </>
    // )

    // view.add(
    //     <>
    //     {range(6).map((elem, index) => (
    //         <>
    //         <Polygon 
    //             ref={polygons[index]} 
    //             rotation={60}
    //             x={polygonXpos[index]}
    //             sides={3}
    //             size={100}
    //             fill={"orange"}
    //             y={-2000}
    //         />
    //         </>
    //     ))}
    //     </>
    // )

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    // const defaultY = [-150, -150, -100];
    // const defaultHeight = [300, 300, 200];
    // const defaultValueHeight = -40;

    const lines = new Map<number, string>();

    lines.set(lines.size, "It's so convenient being able to read books digitally. I like reading books so much because I can gain knowledge on a subject, or I can enjoy a story. If I can't afford books, there's a place where I can borrow them for free. Yes.")

    lines.set(lines.size, "Hey you! Yes, you, I've got an idea that will revolutionize the world of digital books.");

    lines.set(lines.size, "Oh really?");

    lines.set(lines.size, "Yes, it's called Web3 Reading.");

    lines.set(lines.size, "Oh no...");

    lines.set(lines.size, "Oh, yes! With Web3 Reading, you can now take objects you've read in your books and put them onto the blockchain! Here, look at my NFT of Citizen Kane's Cane.");

    lines.set(lines.size, "What do you do with it?");

    lines.set(lines.size, "I can sell the NFT to you and you can have your favorite characters using Citizen Kane's Cane. Look! Now when Sherlock Holmes points his finger at someone...");
    
    lines.set(lines.size, "“Sherlock Holmes points his finger [and Citizen Kane's Cane] at the culprit!”");

    lines.set(lines.size, "Wow!");

    lines.set(lines.size, "...");

    lines.set(lines.size, "Wow!");
    
    lines.set(lines.size, "Does Citizen Kane's Cane affect the outcome of the story?");

    lines.set(lines.size, "No.");

    lines.set(lines.size, "Does it have any other use?");

    lines.set(lines.size, "Yes it does. An NFT is an asset, that means when it goes up in value. You can sell it to someone else for a profit!");

    lines.set(lines.size, "Okay, how much is your Citizen Kane's Cane?");

    lines.set(lines.size, "I can sell you my Citizen Kane's Cane for the low price of $1,999.");

    lines.set(lines.size, "I think I'm good.");

    lines.set(lines.size, "You like reading books but you're not making money out of it. Don't you want to make money from the things you enjoy? If you purchase it, its value could skyrocket a year from now!");

    lines.set(lines.size, "If I purchase your NFT, I have to convince someone else that an NFT is something they can't live without, like owning a home. Is there anything else Web3 Reading can do?");

    lines.set(lines.size, "I'm glad you asked, I invested in a company where their employees write stories using Web3 Reading technology. When they complete the story, the community who purchased NFTs can access a sandbox where they can create their own stories using the company's characters and settings.");

    lines.set(lines.size, "Does the community have ownership of any IP they create?");

    lines.set(lines.size, "I can't answer that.");

    lines.set(lines.size, "Is the community allowed to create anything using the company's IP which may negatively affect the reputation of the IP Owner?");

    lines.set(lines.size, "Oh, look at the time, I have to go now. My planet needs me.");

    // lines.set(lines.size, ``);

    // yield* slideTransition(Direction.Right);

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

    // yield* chain(
    //     audioBox().x(0, 3),
    //     waitFor(3),
    //     audioBox().x(2000, 2),
    // )

    
    yield* all(
        portrait1().x(-750, 1),
        characterRefs[0]().x(-70, 1)
    )
    
    yield* dataLoop(lines.get(0).length, lines.get(0), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(2.1)
    portraitRef().src(circleCharacter)
    yield* all(
        characterRefs[1]().x(70,1),
        dataLoop(lines.get(1).length, lines.get(1), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)
    )
    
    yield* waitFor(1.5)
    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(2).length, lines.get(2), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(0.8)
    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(3).length, lines.get(3), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(4).length, lines.get(4), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(5).length, lines.get(5), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(2.5)
    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(6).length, lines.get(6), textAnimate.textBoxLength, textAnimate.textSpeed, 1, textSignal, numberSignal)

    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(7).length, lines.get(7), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* dataLoop(lines.get(8).length, lines.get(8), textAnimate.textBoxLength, textAnimate.textSpeed, 1.2, textSignal, numberSignal)

    // yield* waitFor(1)
    yield* dataLoop(lines.get(9).length, lines.get(9), textAnimate.textBoxLength, textAnimate.textSpeed, 0.5, textSignal, numberSignal)

    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(10).length, lines.get(10), textAnimate.textBoxLength, textAnimate.textSpeed, 0.8, textSignal, numberSignal)

    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(11).length, lines.get(11), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(3)
    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(12).length, lines.get(12), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)


    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(13).length, lines.get(13), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(14).length, lines.get(14), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)

    yield* waitFor(1)
    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(15).length, lines.get(15), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(0.8)
    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(16).length, lines.get(16), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)

    yield* waitFor(0.8)
    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(17).length, lines.get(17), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(2)
    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(18).length, lines.get(18), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)

    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(19).length, lines.get(19), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(20).length, lines.get(20), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)

    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(21).length, lines.get(21), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    yield* waitFor(1)
    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(22).length, lines.get(22), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)

    yield* waitFor(1)
    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(23).length, lines.get(23), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    portraitRef().src(boxCharacter)
    yield* dataLoop(lines.get(24).length, lines.get(24), textAnimate.textBoxLength, textAnimate.textSpeed, 1.0, textSignal, numberSignal)

    portraitRef().src(circleCharacter)
    yield* dataLoop(lines.get(25).length, lines.get(25), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)

    // yield* waitFor(1)
    yield* characterRefs[1]().y(-2000, 3)
    // yield* loop(
    //     lines.size,
    //     i => dataLoop(lines.get(i).length, lines.get(i), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)
    // );

    // yield* audioBox().x(0,3);
    // yield* nameBox().x();

    // yield* loop(
    //     6,
    //     i => dataLoop(lines.get(i + 3).length, lines.get(i + 3), textAnimate.textBoxLength, textAnimate.textSpeed, textAnimate.endDelay, textSignal, numberSignal)
    // );
})