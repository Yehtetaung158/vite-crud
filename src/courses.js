import initialrenders from "./core/initialrenders";
import listner from "./core/listner";

class Course {
    init(){
        console.log("App start")
        initialrenders();
        listner();
    }
}

export default Course;