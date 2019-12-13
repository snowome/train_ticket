import {useCallback} from 'react'
import {timeStrampFormatYMD} from "../common/js/util.js";

export default function useNav(departDate, prevDate, nextDate, dispatch) {
    const isPrevDisabled = timeStrampFormatYMD(departDate) <= timeStrampFormatYMD()
    const isNextDisabled = timeStrampFormatYMD(departDate) - timeStrampFormatYMD() > 20 * 86400 * 1000
    const prev = useCallback(() => {
        if (isPrevDisabled) {
            return
        }
        dispatch(prevDate())
    }, [isPrevDisabled, dispatch, prevDate])
    const next = useCallback(() => {
        if (isNextDisabled) {
            return
        }
        dispatch(nextDate())
    }, [isNextDisabled, dispatch, nextDate])

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next
    }
}
