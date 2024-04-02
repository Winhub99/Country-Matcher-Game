
import { useState } from "react"
import "./Country.css"
type ButtonState = "SELECTED" | "WRONG" | "DEFAULT"
type Option = {
    value: string;
    state: ButtonState
}
const CountryCapitalGame = ({ data }: { data: Record<string, string> }) => {
    const countries = Object.keys(data)
    const capitals = Object.values(data)
    const [options, setOptions] = useState<Option[]>([...countries, ...capitals].sort(() => Math.random() - 0.5).map((value) => ({ value, state: "DEFAULT" })))
    const [prevSelected, setPrevSelected] = useState<Option>()
    return (
        <div className="container">
            <h2 className="heading">Match Country with Capital </h2>
            {(options.length === 0) ? (<h4 style={{fontSize:"36px",fontFamily:"sans-serif",color:"green"}}>Congratulations!</h4>) : ""}
            <div className="all-elements">
                {options.map((option) => (<button style={{padding:"10px 20px",margin:"10px", borderRadius:"5px", fontSize:"18px", fontFamily:"sans-serif",fontWeight:"500" }} className={option.state === "SELECTED" ? "selected" : option.state === "WRONG" ? "wrong" : ""}  onClick={() => {
                    if (!prevSelected) {
                        setPrevSelected(option)
                        setOptions(options.map(opt => opt === option ? { ...opt, state: "SELECTED" } : { ...opt, state: "DEFAULT" }))
                    } else {
                        if (option.value === data[prevSelected.value] || data[option.value] === prevSelected.value) {
                            setOptions(options.filter(opt => {
                                return !(opt.value === prevSelected.value || opt.value === option.value)
                            }))
                        } else {
                            setOptions(options.map(opt => {
                                return (opt.value === prevSelected.value || opt.value === option.value) ? { ...opt, state: "WRONG" } : opt
                            }))

                        }
                        console.log(options)
                        setPrevSelected(undefined)
                    }
                }}>{option.value}</button>))}
            </div>
        </div>
    )
}

const CountryCapital = () => {

    return (
        <>
            <CountryCapitalGame data={{
                "USA": "Washington, D.C.",
                "Canada": "Ottawa",
                "France": "Paris",
                "Germany": "Berlin",
                "Italy": "Rome",
                "United Kingdom": "London",
                "Japan": "Tokyo",
                "China": "Beijing",
                "India": "New Delhi",
                "Australia": "Canberra"
            }} />
        </>
    )
}
export default CountryCapital;