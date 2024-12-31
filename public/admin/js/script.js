// Bộ lọc
const boxFilter = document.querySelector("[box-filter]");
if (boxFilter) {
    let url = new URL(location.href);

    boxFilter.addEventListener("change", () => {
        const value = boxFilter.value;
        if (value) {
            url.searchParams.set("status", value);
        }
        else {
            url.searchParams.delete("status");
        }
        location.href = url.href;
    })

    // Hiển thị trạng thái mặc định
    const currentStatus = url.searchParams.get("status");
    if (currentStatus) {
        boxFilter.value = currentStatus;
    }
}
// Hết bộ lọc

// Tìm kiếm
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
    let url = new URL(location.href);

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = formSearch.keyword.value;
        if (value) {
            url.searchParams.set("keyword", value);
        }
        else {
            url.searchParams.delete("keyword");
        }

        location.href = url.href;
    })

    // Hiển thị từ khóa mặc định
    const valueCurrent = url.searchParams.get("keyword");
    if (valueCurrent) {
        formSearch.keyword.value = valueCurrent;
    }
}
// Hết Tìm kiếm

// Phân trang
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
    let url = new URL(location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            if (page) {
                url.searchParams.set("page", page);
            }
            else {
                url.searchParams.delete("page");
            }

            location.href = url.href;
        })
    });

    // Hiển thị trang mặc định
    const pageCurrent = url.searchParams.get("page") || 1;
    const buttonCurrent = document.querySelector(`[button-pagination="${pageCurrent}"]`);
    if (buttonCurrent) {
        buttonCurrent.parentNode.classList.add("active")
    }
}
// Hết Phân trang

// Đổi trạng thái 1 sản phẩm
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("item-id");
            const statusChange = button.getAttribute("button-change-status");
            const path = button.getAttribute("data-path");

            const data = {
                id: itemId,
                status: statusChange
            };

            fetch(path, {
                method: "PATCH",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code == "success") {
                        location.reload();
                    }
                })
        })
    })
}
// Hết Đổi trạng thái 1 sản phẩm

// Đổi trạng thái nhiều bản ghi
const formChangeMulti = document.querySelector("[form-change-multi ]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();

        const path = formChangeMulti.getAttribute("data-path");
        const status = formChangeMulti.status.value;

        if(status == "delete"){
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm?");

            if(!isConfirm) return;
        }

        const ids = [];
        const listInputChangeChecked = document.querySelectorAll("[input-change]:checked");
        listInputChangeChecked.forEach((input) => {
            const id = input.getAttribute("input-change");
            ids.push(id);
        })

        const data = {
            ids: ids,
            status: status
        }

        fetch(path, {
            method: "PATCH",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == "success") {
                    location.reload();
                }
            })
    })
}
// Hết Đổi trạng thái nhiều bản ghi

// Xóa mềm 1 sản phẩm
const listButtonDelete = document.querySelectorAll("[button-delete]");
if (listButtonDelete.length > 0) {
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
            if (isConfirm) {
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");

                fetch(path, {
                    method: "PATCH",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == "success") {
                            location.reload();
                        }
                    })
            }
        })
    })
}
// Hết Xóa mềm 1 sản phẩm

// Trang Thùng 
// 1. Xóa vĩnh viễn 1 sản phẩm
const listButtonDeleteDestroy = document.querySelectorAll("[button-delete-destroy]");
if (listButtonDeleteDestroy.length > 0) {
    listButtonDeleteDestroy.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa vĩnh viễn?");
            if (isConfirm) {
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");

                fetch(path, {
                    method: "DELETE",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == "success") {
                            location.reload();
                        }
                    })
            }
        })
    })
}

// 2. Khôi phục 1 sản phẩm
const listButtonDeleteRestore = document.querySelectorAll("[button-delete-restore]");
if (listButtonDeleteRestore.length > 0) {
    listButtonDeleteRestore.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn khôi phục sản phẩm này không?");
            if (isConfirm) {
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");

                fetch(path, {
                    method: "PATCH",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == "success") {
                            location.reload();
                        }
                    })
            }
        })
    })
}
// Hết Trang Thùng rác

// Đổi vị trí
const listInputPosition = document.querySelectorAll("[input-position]");
if(listInputPosition.length > 0){
    listInputPosition.forEach(input => {
        input.addEventListener("change", () => {
            const position = parseInt(input.value);
            const path = input.getAttribute("data-path");
            const id = input.getAttribute("item-id");

            fetch(path, {
                method: "PATCH",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    position: position
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code == "success") {
                        location.reload();
                    }
                })
        })
    })
}
// Hết Đổi vị trí


// alert-message
const alertMessage = document.querySelector("[alert-message]");
if(alertMessage){
    setTimeout(() => {
        alertMessage.style.display = "none";
    }, 3000)
}
// End alert-message

// Preview ảnh
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    const btnPreview = uploadImage.querySelector("[btn-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
            btnPreview.style.display="inline-block";
        }
    })

    // Xóa Preview ảnh
    if(btnPreview){
        btnPreview.addEventListener("click", (event) => {
            event.preventDefault();

            uploadImagePreview.src="";
            uploadImageInput.value="";
            btnPreview.style.display="none";
        })
    }
    // Hết Xóa Preview ảnh
}
// Hết Preview ảnh

// Sắp xếp
const sortSelect = document.querySelector("[sort-select]");
if(sortSelect){
    let url = new URL(location.href);

    sortSelect.addEventListener("change", () => {
        const value = sortSelect.value;
        if(value){
            const [sortKey, sortValue] = value.split("-");

            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
        }
        else{
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
        }

        location.href = url.href;
    })

    const sortKeyCurrent = url.searchParams.get("sortKey");
    const sortValueCurrent = url.searchParams.get("sortValue");
    if(sortKeyCurrent && sortValueCurrent){
        sortSelect.value=`${sortKeyCurrent}-${sortValueCurrent}`;
    }
}
// Hết Sắp xếp

// Phân quyền
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        const dataFinal = [];
        
        const listElementRoleId = document.querySelectorAll("[role-id]");

        listElementRoleId.forEach(elementRoleId => {
            const roleId = elementRoleId.getAttribute("role-id");

            const permissions = [];

            const listInputChecked = document.querySelectorAll(`input[data-id="${roleId}"]:checked`);

            listInputChecked.forEach(input => {
                const tr = input.closest("tr[data-name]");
                const name = tr.getAttribute("data-name");
                permissions.push(name);
            });

            dataFinal.push({
                id: roleId,
                permissions: permissions
            });
        })

        const path = buttonSubmit.getAttribute("data-path");

        console.log(path);

        fetch(path, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFinal)
        })
            .then(res => res.json())
            .then(data => {
                if(data.code="success"){
                    location.reload();
                }
            })
    })

    // Hiển thị mặc định
    let dataPermissions = tablePermissions.getAttribute("table-permissions");
    dataPermissions = JSON.parse(dataPermissions);
    dataPermissions.forEach(item => {
        item.permissions.forEach(permission => {
            const input = document.querySelector(`tr[data-name="${permission}"] input[data-id="${item._id}"]`);
            input.checked = true;
        })
    })
}
// Hết Phân quyền


