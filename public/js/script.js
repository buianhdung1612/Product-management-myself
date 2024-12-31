// alert-message
const alertMessage = document.querySelector("[alert-message]");
if(alertMessage){
    setTimeout(() => {
        alertMessage.style.display = "none";
    }, 3000)
}
// End alert-message

// Cập nhật số lượng sản phẩm trong giỏ hàng
const tableCart = document.querySelector("[table-cart]");
if(tableCart){
    const listInputQuantity = tableCart.querySelectorAll("input[name='quantity']");
    listInputQuantity.forEach((input) => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("item-id");
            const quantity = input.value;
            const path = input.getAttribute("data-path");
            
            fetch(path, {
                method: "PATCH",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: quantity
                })
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == "success"){
                        location.reload();
                    }
                })
        })
    })
}
// Hết Cập nhật số lượng sản phẩm trong giỏ hàng


// Show hidden password
const clickEye = document.querySelector(".fa-eye");
if(clickEye){
    clickEye.addEventListener("click", () => {
        const formPassword = document.querySelector(".form-password");
        if(formPassword.type == "password"){
            formPassword.type = "text"
        }
        else if(formPassword.type == "text"){
            formPassword.type = "password"
        }
    })
}
// End Show hidden password

// Preview ảnh
const uploadImageInput = document.querySelector("[upload-image-input]");
const uploadImagePreview = document.querySelector("[upload-image-preview]");
if(uploadImageInput){
    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })
}
// Hết Preview ảnh

// Active danh mục bài viết tương ứng
const listBlogCategoryButton = document.querySelectorAll("[blog-category-button]");
if(listBlogCategoryButton.length > 0){
    const pathname = window.location.pathname;
    let slug = pathname.split('/').pop();

    listBlogCategoryButton.forEach(button => {
        const path = button.getAttribute("href");
        const slugButton = path.split('/').pop();
               
        if(slug == slugButton){
            button.classList.add("active");
        }  
    })
}
// Hết Active danh mục bài viết tương ứng

// Phân trang
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0){
    let url = new URL(location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            if(page){
                url.searchParams.set("page", page);
            }
            else{
                url.searchParams.delete("page");
            }

            location.href = url.href;
        })
    });

    // Hiển thị mặc định
    const pageCurrent = url.searchParams.get("page") || 1;
    const buttonCurrent = document.querySelector(`[button-pagination='${pageCurrent}']`);
    if(buttonCurrent){
        buttonCurrent.classList.add("active");
    }
}
// Hết Phân trang


// Sắp xếp
const sortSelect = document.querySelector(".result__sort");
if(sortSelect){
    let url = new URL(location.href);

    sortSelect.addEventListener("change", () => {
        const value = sortSelect.value;
        if(value){
            const [sortKey, sortValue] = value.split("-");

            url.searchParams.set("sortKey", sortKey)
            url.searchParams.set("sortValue", sortValue)
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
        sortSelect.value = `${sortKeyCurrent}-${sortValueCurrent}`;
    }
}
// Hết Sắp xếp


