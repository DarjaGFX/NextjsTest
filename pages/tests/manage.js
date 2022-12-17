import SidebarLinks from "../../components/SidebarLinks";
import TestCard from "../../components/TestCard";

export default function manage (){
  return (
    <div className="flex flex-row-reverse h-full w-full bg-neutral-100 flex-wrap justify-start items-start">
        {/* <div className="flex flex-col h-full bg-amber-50 border-l-2 w-1/3 items-center">
            <SidebarLinks href={"#"} text={""}/>
        </div> */}
        <TestCard test={{name: "EQ"}}/>
        <TestCard test={{name: "EQ"}}/>
        <TestCard test={{name: "EQ"}}/>
    </div>
  )
}
