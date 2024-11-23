import moment from 'moment'

const convertTime = (_startTime, _endTime) => {
    const startTime = moment(_startTime, 'hh:mm A');
    const endTime = moment(_endTime, 'hh:mm A');

    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.hours();
    const minutes = duration.minutes();

    return (
        `${hours} hours ${minutes} minutes`
    )
}

export default convertTime