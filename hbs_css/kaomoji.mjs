// kaomoji.mjs
export class Kaomoji {
    constructor(value, emotions) {
        this.value = value;
        this.emotions = emotions;
    }

    isEmotion(emotion) {
        return this.emotions.map(e => e.toLowerCase()).includes(emotion.toLowerCase());
    }
}

