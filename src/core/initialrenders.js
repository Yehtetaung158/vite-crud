import { rowRender, url } from "./function";

const initialrenders =()=>{
    fetch(url("/courses")).then((res) =>res.json()).then(json=> rowRender(json));
    console.log("ini")
}

export default initialrenders;