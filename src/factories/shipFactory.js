const ship = (length) => {
    var hits = 0;

    const getLength = () => {
        return length;
    }
    const getHits = () => {
        return hits;
    }

    const hit = () => {
        hits += 1;
    }

    const isSunk = () => {
        return (hits >= length);
    }

    return {getLength, getHits, hit, isSunk};
}

export default ship;