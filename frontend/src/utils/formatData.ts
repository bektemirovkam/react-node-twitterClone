// import { format } from 'date-fns';
import { ru } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance';

export const rangeDateFormat = (date: string): string => (
    formatDistance(new Date(date), new Date(), { locale: ru } )
)