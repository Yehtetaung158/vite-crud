import Swal from "sweetalert2";
import { basedUrl } from "./configs";
import { rowTemplate, rwoGroup } from "./selector"
import { Drawer } from "flowbite";


export const rowUi = ({ id, title, short_name, fee }) => {
    const row = rowTemplate.content.cloneNode(true);
    row.querySelector('tr').setAttribute('course-id',id)
    row.querySelector(".row-id").innerText = id;
    row.querySelector(".row-title").innerText = title;
    row.querySelector(".row-short").innerText = short_name;
    row.querySelector(".row-fee").innerText = fee;
    return row;
}

export const rowRender = (rows) => {
    rwoGroup.innerHTML = "";
    rows.forEach(row => rwoGroup.append(rowUi(row)))
}

export const url = (path) => {
    return basedUrl + path
}

export const toase=(message,icon='success')=>{
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon,
        title: message
      });
      
}

// set the drawer menu element
const $targetEl = document.getElementById('edit-drawer');

// options with default values
const options = {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
    onHide: () => {
        console.log('drawer is hidden');
    },
    onShow: () => {
        console.log('drawer is shown');
    },
    onToggle: () => {
        console.log('drawer has been toggled');
    },
};

// instance options object
const instanceOptions = {
  id: 'edit-drawer',
  override: true
};

export const editDrawer = new Drawer($targetEl, options, instanceOptions);

