
import c from './c.svg'
import cpp from './cpp.svg'
import java from './java.svg'
import python from './python.svg'
import javascript from './javascript.svg'

const LangIcon = ({ lang, height }) => {
    if(lang === 'c')    return <img height={height} src={c} />
    if(lang === 'cpp')    return <img height={height} src={cpp} />
    if(lang === 'java')    return <img height={height} src={java} />
    if(lang === 'javascript')    return <img height={height} src={javascript} />
    if(lang === 'python')    return <img height={height} src={python} />
    else return <>Kissu Nai</>
}

export default LangIcon