import { addDays, startOfWeek, endOfWeek } from 'date-fns';

const TOTAL_DAYS = 6;

export function getDatesForNextTwoWeeks() {
    const startDate = new Date();
    const endDate = addDays(startDate, TOTAL_DAYS);
    const dates = [];
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
        dates.push({
            fullDate: date,
            day: date.toLocaleString('en-US', { weekday: 'short' }),
            date: date.getDate(),
        });
    }
    return dates;
}

