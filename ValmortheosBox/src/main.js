kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

const ui = add([
    fixed(),
]);

ui.add([
    text("Left click to add human, right click to add tree, 'r' for rain"),
    pos(12, 12),
]);

loadSprite("grassland", "assets/grassland_tiles.png", {
    sliceX: 32,
    sliceY: 32,
});

const level = [
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaaaaaa",
];

const levelConf = {
    width: 32,
    height: 32,
    pos: vec2(0, 0),
    "a": () => [
        sprite("grassland", { frame: 0 }),
        area(),
        solid(),
    ],
};

const gameLevel = addLevel(level, levelConf);

const player = add([
    sprite("grassland", { frame: 12 }),
    pos(100, 100),
    area(),
    solid(),
]);

const speed = 120;

onKeyDown("left", () => {
    player.move(-speed, 0);
});

onKeyDown("right", () => {
    player.move(speed, 0);
});

onKeyDown("up", () => {
    player.move(0, -speed);
});

onKeyDown("down", () => {
    player.move(0, speed);
});

player.onUpdate(() => {
    camPos(player.pos);
});

function addObject(obj, p) {
    add([
        sprite("grassland", { frame: obj }),
        pos(p),
        area(),
        solid(),
    ]);
}

onMousePress("left", () => {
    addObject(13, mousePos());
});

onMousePress("right", () => {
    addObject(2, mousePos());
});

onKeyPress("r", () => {
    loop(0.1, () => {
        add([
            text("v"),
            pos(rand(0, width()), 0),
            move(DOWN, 240),
            area(),
            "rain"
        ]);
    });
});
