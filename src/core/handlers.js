import Swal from "sweetalert2";
import { editDrawer, rowRender, rowUi, toase, url } from "./function";
import { courseEditForm, courseForm, rwoGroup } from "./selector";


export const courseFormHandler = (even) => {
    even.preventDefault();
    console.log("u smited")
    const formData = new FormData(courseForm);
    const jsonData = JSON.stringify({
        title: formData.get("course_title"),
        short_name: formData.get("short_name"),
        fee: formData.get("course_fee"),
    })

    console.log(jsonData)
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    //dusable form
    courseForm.querySelector("button").toggleAttribute("disabled")

    fetch(url("/courses"), {
        method: "POST",
        headers: myHeader,
        body: jsonData
    }).then(res => res.json()).then((json) => {
        courseForm.querySelector("button").toggleAttribute("disabled");
        rwoGroup.append(rowUi(json));
        courseForm.reset();
        toase("Course creating is successful")
    })
}

export const rowGroupHandler = (event) => {
    console.log("I am del")
    if (event.target.classList.contains("row-del")) {
        console.log("I am exactly del")
        const currentRow = event.target.closest("tr");
        const currentRowId = currentRow.getAttribute("course-id")

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                event.target.toggleAttribute("disabled")
                fetch(url("/courses/" + currentRowId), { method: "DELETE" }).then(res => {
                    if (res.status === 204) {
                        toase("Course is beeing deleted")
                        currentRow.remove();

                    }
                })

            }
        });


    } else if (event.target.classList.contains("row-edit")) {
        console.log("I am edit")
        event.target.toggleAttribute("disabled")
        const currentRow = event.target.closest("tr")
        const currentRowId = currentRow.getAttribute("course-id")
        fetch(url("/courses/" + currentRowId)).then((res) => res.json()).then((json) => {
            console.log("I am json")
            courseEditForm.querySelector("#edit_course_id").value = json.id
            courseEditForm.querySelector("#edit_course_title").value = json.title
            courseEditForm.querySelector("#edit_short_name").value = json.short_name
            courseEditForm.querySelector("#edit_course_fee").value = json.fee
            editDrawer.show()
            event.target.toggleAttribute("disabled")
        })

    }
}

export const upDateFormHandler = (event) => {
    event.preventDefault();
    console.log("I update")
    courseEditForm.querySelector("button").toggleAttribute("disabled");

    //id
    //url
    //header
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    //body
    const formData = new FormData(courseEditForm)
    const currentId = formData.get("edit_course_id")

    const jsonData = JSON.stringify({
        title: formData.get("edit_course_title"),
        short_name: formData.get("edit_short_name"),
        fee: formData.get("edit_course_fee")
    });
    //method
    fetch(url("/courses/" + currentId), {
        method: "PUT",
        headers: myHeader,
        body: jsonData
    }).then((res) => res.json()).then(json => {
        console.log(json)
        courseEditForm.querySelector("button").toggleAttribute("disabled");

        courseEditForm.reset();
        editDrawer.hide();

        const currentRow = rwoGroup.querySelector(`tr[course-id='${json.id}']`)
        console.log(currentRow)
        currentRow.querySelector(".row-title").innerText = json.title
        currentRow.querySelector(".row-short").innerText = json.short_name
        currentRow.querySelector(".row-fee").innerText = json.fee

    })
}

export const editCellHandler = (event) => {
    if (event.target.classList.contains("cell-editable")) {
        console.log(event.target)
        const currentCell = event.target;
        const currentText = currentCell.innerText;
        const currentCellColum = currentCell.getAttribute("cell-col")
        currentCell.innerText = ""
        const input = document.createElement("input")
        input.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
        input.value = currentText
        currentCell.append(input)
        input.focus();

        input.addEventListener("blur", () => {

            const newValue = input.value
            currentCell.innerText = newValue

            const myHeader = new Headers();
            myHeader.append("Content-Type", "application/json");

            const updateData = {};
            updateData[currentCellColum] = newValue;

            const jsonData = JSON.stringify(updateData)


            const currenRow = event.target.closest("tr");
            const currentRowId = currenRow.getAttribute("course-id")
            fetch(url("/courses/" + currentRowId), {
                method: "PATCH",
                headers: myHeader,
                body: jsonData,
            }).then((res) => res.json()).then(json => console.log(json))
        })
    }
}

//search
export const searchInputHandler = (event) => {

    fetch(url("/courses?title[like]=" + event.target.value))
        .then((res) => res.json())
        .then((json) =>
        {
           if(json.length){
               rowRender(json)            
           }else{toase("There is no course form");
                rwoGroup.innerHTML=`<tr><td clospan='5' class="text-center px-6 py-4 text-center">There is no course <a href="http://${location.host}">Browse all</a></td></tr>`
        }
        }
        )}
        //     event.target.previousElementSibling.innerHtml = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
//   </svg>
//   `;