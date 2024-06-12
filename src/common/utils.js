import { COLORS } from "./constants";

export const getSeatColor = (status) => {
    let color = COLORS.gray;

    if (status === 'booked') {
        color = COLORS.black;
    } else if (status === 'selected') {
        color = COLORS.primary;
    }

    return color;
}