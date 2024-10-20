import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import isRTL from "../utils/isRTL"


const useApplyDirection = () => {
    const { i18n } = useTranslation()
    useEffect(() => {
        const currentLanguage = i18n.language
        const direction = isRTL(currentLanguage) ? 'rtl' : 'ltr'
      
        document.documentElement.setAttribute('direction', direction)
        document.documentElement.setAttribute('lang', currentLanguage)
    }, [i18n.language])

}


export default useApplyDirection
