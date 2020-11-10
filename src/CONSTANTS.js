const LINKS = {
    "akeos": {
      "spotify": "https://spoti.fi/2T3NWyJ",
      "soundcloud": "https://soundcloud.com/akeos",
      "instagram": "https://www.instagram.com/akeos_",
      "twitter": "https://twitter.com/akeos_",
      "facebook": "https://bit.ly/2YmyF1X",
    },
    "neonix": {
      "spotify": "https://spoti.fi/2KeRR9t",
      "soundcloud": "https://soundcloud.com/neonixdub",
      "instagram": "https://www.instagram.com/neonixdub/",
      "twitter": "https://twitter.com/Neonixdub",
      "facebook": "https://www.facebook.com/Neonixdub/",
    },
    "rattrix": {
      "spotify": "https://spoti.fi/33btmkH",
      "soundcloud": "https://soundcloud.com/rattrix",
      "instagram": "https://www.instagram.com/rattrix/",
      "twitter": "https://twitter.com/Rattrix",
      "facebook": "https://www.facebook.com/Rattrix/",
    },
    "syzy": {
      "spotify": "https://spoti.fi/3gcE418",
      "soundcloud": "https://soundcloud.com/syzymusic",
      "instagram": "https://www.instagram.com/syzymusic/",
      "twitter": "https://twitter.com/syzymusic",
      "facebook": "https://bit.ly/2yjf86M",
    },
    "trollphace": {
      "spotify": "https://spoti.fi/2yHCWxN",
      "soundcloud": "https://soundcloud.com/trollphace",
      "instagram": "https://www.instagram.com/trollphace/",
      "twitter": "https://twitter.com/TrollPhaceMusic",
      "facebook": "https://www.facebook.com/TrollPhace/",
    }
}

const MUSIC = {
    "akeos": "https://soundcloud.com/akeos/dermacrush",
    "neonix": "https://soundcloud.com/bassrush/neonix-dead-face",
    "rattrix": "https://soundcloud.com/rattrix/sets/organic-riddim-vip-out-now",
    "syzy": "https://soundcloud.com/syzymusic/sunshine",
    "trollphace": "https://soundcloud.com/yogitrf/yogi-feat-pusha-t-burial-skrillex-trollphace-remix",
}

const MEDIA_TYPE =  {
    CAROUSEL:  0,
    VIDEO: 1,
    IMAGE: 2,
}

function Source(src) {
    this.src = src;
}

const MEDIA = {
    "akeos": {
        type: MEDIA_TYPE.VIDEO,
        sources: [
            new Source("/MEDIA/akeos1.mp4"),
        ]
    },
    "neonix": {
        type: MEDIA_TYPE.VIDEO,
        sources: [
            new Source("/MEDIA/neonix1.mp4"),
        ],
    },
    "rattrix": {
        type: MEDIA_TYPE.VIDEO,
        sources: [
            new Source("/MEDIA/rattrix1.mp4"),
        ],
    },
    "syzy": {
        type: MEDIA_TYPE.IMAGE,
        sources: [
            new Source("/MEDIA/syzy1.jpg"),
        ],
    },
    "trollphace": {
        type: MEDIA_TYPE.IMAGE,
        sources: [
            new Source("/MEDIA/trollphace1.png"),
        ],
    },
} 

const ARTISTS = Object.keys(LINKS); 

export { ARTISTS, LINKS, MEDIA, MEDIA_TYPE, MUSIC }
