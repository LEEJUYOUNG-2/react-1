import reactLoge from "./assets/react.svg"
import viteLoge from "./assets/vite.svg"
import Child from "./ChildComp"

export default function ParentComp() {
    return (
        <>
            <ChildComp 
             imageInfo ={
                {
                    src:viteLogo,
                    alt:"vite",
                }
             }
             width={200}
             height={200}
            />
            <ChildComp 
             imageInfo ={
                {
                    src:reactLogo,
                    alt:"React1",
                }
             }
             width={100}
             height={100}
            />
        </>
    )
}