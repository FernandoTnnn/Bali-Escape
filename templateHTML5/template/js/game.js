setGame("1200x600");
game.folder = "assets";

// file gambar yang dipakai dalam game
var gambar = {
    logo: "image.png",
    startBtn: "tombolStart.png",
    cover: "cover.jpg",
    playBtn: "btn-play.png",
    maxBtn: "maxBtn.png",
    minBtn: "minBtn.png",
    idle: "Idle.png",
    run: "Run.png",
    jump: "Jump.png",
    fall: "Fall.png",
    hit: "Hit.png",
    tileset: "terrain.png",
    bg: "bg.png",
    item1: "Strawberry.png",
    item2: "Kiwi.png",
    musuh1Idle: "enemy1Idle.png",
    musuh1Run: "enemy1Run.png",
    musuh1Hit: "enemy1Hit.png",
    bendera: "Flag.png"
};

// file suara yang dipakai dalam game
var suara = {};

loading(gambar, suara, startScreen);

function startScreen() {    
    hapusLayar("#67d2d6");
    tampilkanGambar(dataGambar.logo, 600, 250);
    var startBtn = tombol(dataGambar.startBtn, 600, 550);
    if (tekan(startBtn)) {
        jalankan(halamanCover);
    }
}

function halamanCover() {
    hapusLayar("#67d2d6");
    gambarFull(dataGambar.cover);
    var playBtn = tombol(dataGambar.playBtn, 1100, 500);
    if (tekan(playBtn)) {
        setAwal();
        jalankan(gameLoop);
    }    
    resizeBtn(1150,50);
}

function setAwal() {
    game.hero = setSprite(dataGambar.idle, 32, 32);
    game.hero.animDiam = dataGambar.idle;
    game.hero.animLompat = dataGambar.jump;
    game.hero.animJalan = dataGambar.run;
    game.hero.animJatuh = dataGambar.fall;
    game.hero.animMati = dataGambar.hit;
    game.skalaSprite = 2;
    setPlatform(this["map_" + game.level], dataGambar.tileset, 32, game.hero);
    game.gameOver = ulangiPermainan;

    // setItem
    setPlatformItem(1, dataGambar.item1);
    setPlatformItem(2, dataGambar.item2);

    // setMusuh
    var musuh1 = {};
    musuh1.animDiam = dataGambar.musuh1Idle;
    musuh1.animJalan = dataGambar.musuh1Run;
    musuh1.animMati = dataGambar.musuh1Hit;
    setPlatformEnemy(1, musuh1);

    // setTrigger
    setPlatformTrigger(1, dataGambar.bendera);
}

function ulangiPermainan() {
    game.aktif = true;
    setAwal();
    jalankan(gameLoop);
}

function gameLoop() {
    hapusLayar("#9c9695");

    // Mengurangi kecepatan gerakan karakter
    if (game.kanan) {
        gerakLevel(game.hero, 3, 0);  // Horizontal gerakan kanan lambat
    } else if (game.kiri) {
        gerakLevel(game.hero, -3, 0);  // Horizontal gerakan kiri lambat
    }
    if (game.atas) {
        gerakLevel(game.hero, 0, -10);  // Gerakan lompat lebih lambat
    }
    
    latar(dataGambar.bg, 0, 0.5);
    buatLevel();
    cekItem();
    teks(game.score, 40, 60, "Calibri-bold-20pt-left-biru");
}

function cekItem() {
    if (game.itemID > 0) {
        tambahScore(10);
        game.itemID = 0;
    }
    if (game.triggerID == 1) {
        game.triggerID = 0;
        game.aktif = false;
        game.level+1;

        // Cek level dan muat peta yang sesuai
        if (game.level == 1) {
            setPlatform(map_2.js, dataGambar.tileset, 32, game.hero); // Pindah ke map_2
        } else if (game.level == 1) {
            setPlatform(map_1.js, dataGambar.tileset, 32, game.hero); // Kembali ke map_1
        }

        // Set delay untuk transisi peta
        setTimeout(ulangiPermainan, 1000); // Tunggu 1 detik sebelum memulai ulang permainan
    }
}

