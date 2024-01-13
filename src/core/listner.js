
import { debounce } from "lodash";
import { courseFormHandler, editCellHandler, rowGroupHandler, searchInputHandler, upDateFormHandler } from "./handlers";
import { courseEditForm, courseForm, rwoGroup, searchInput } from "./selector";

const listner=()=>{
   courseForm.addEventListener("submit",courseFormHandler)
   rwoGroup.addEventListener("click",rowGroupHandler)
   courseEditForm.addEventListener("submit",upDateFormHandler)
   rwoGroup.addEventListener("dblclick",editCellHandler)
   searchInput.addEventListener("keyup",debounce(searchInputHandler,500))
}

export default listner;