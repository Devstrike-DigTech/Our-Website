import ImageComponent from "@/components/ImageComponent";
import LandingHeader from "./sections/LandingHeader";



export default function Landing (){
    return(
        <div>
        <LandingHeader />
        <ImageComponent src={"/webdemo.png"} alt={""} />
        </div>
    );
}