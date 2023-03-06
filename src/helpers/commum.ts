import moment from "moment"

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY')
}
