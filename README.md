Hướng dẫn sử dụng trang Web

**Phần I: Trang Client**

**1. **Header****

  1.1: Tìm kiếm và hiển thị sản phẩm gợi ý

      + Có thể tìm kiếm theo danh mục sản phẩm hoặc theo tên
      + Tìm kiếm theo tên có thể tìm kiếm chữ hoa thường, có dấu hay không dấu, khoảng trắng, thứ tự từ lộn xộn
      -> Bổ sung thêm: Tìm kiếm được cả bài viết, sẽ ra hiện ra 2 phần sản phẩm và bài viết
      
  ![image](https://github.com/user-attachments/assets/d482d0c6-42a8-4df8-bbd1-9fce009f6be3)
  ![image](https://github.com/user-attachments/assets/9359d6c3-7e50-4fdd-a091-33229b89809c)
   
  1.2: Nút giỏ hàng

      + Hiện sổ sản phẩm hiện có trong giỏ hàng

      + Khi hover vào: Nếu có sản phẩm sẽ hiện ra danh sách các sản phẩm trong giỏ hàng, nếu không sẽ hiện thông báo không có

      Luồng hoạt động: nếu không đăng nhập thì mỗi lần vô trang sẽ tạo mới một giỏ hàng, vẫn đặt hàng thanh toán được. Còn nếu có đăng nhập thì mỗi lần tạo một tài khoản, sẽ tự động tạo một giỏ hàng cho user đó, nên có   thể dùng máy khác đăng nhập vẫn giữ được giỏ hàng hiện tại
   ![image](https://github.com/user-attachments/assets/d83e212e-5af2-41f7-ac13-478efd3098fb)
  1.3: Hiển thị nút tương ứng

      + Nếu chưa đăng nhập: hiển thị đăng nhập, đăng ký
      + Nếu đã đăng nhập: hiện thông tin người dùng và nút đăng xuất
            + Thông tin người dùng nếu chưa có ảnh: thì để ảnh mặc định
            + Thông tin người dùng nếu đã có ảnh: thì hiển thị ảnh người dùng
  ![image](https://github.com/user-attachments/assets/f38201e0-8bad-4fa9-a142-c884f4f1b620)

**2. **Footer****

   2.1: Phần bản tin

        + Mới làm giao diện, chưa làm thêm do chưa thật sự hiểu logic sẽ làm gì
        -> Bổ sung thêm: chắc là cho nhập gmail, rồi gửi đến gmail họ thông báo gì đó.......
   2.2: Thông tin liên hệ

        + Đổ data từ CSDL phần setting general ra
   ![image](https://github.com/user-attachments/assets/1ec8522a-4c47-41cd-a28c-60774f5a0fec)

   2.3: Các trang Chính sách, Danh mục, Liên kết 

        + Đều link được tới mỗi trang: các trang Policy, FAQs, Term & Conditions đều đổ data trong CSDL ra
        + Cho phép quản trị viên nhập dữ liệu vào 1 model Information từ TinyMCE, rồi mỗi trang đổ dữ liệu tương ứng từ các trường tương ứng trong model Information
       VD: Trang Policy
   ![image](https://github.com/user-attachments/assets/07ddaa46-f674-4f29-a267-7baadddc6e8a)

**3. **Trang chủ****

  ![image](https://github.com/user-attachments/assets/b2f261b8-8a48-4373-acfa-1b597c8e9587)
  ![image](https://github.com/user-attachments/assets/3e259ad9-32c0-4cc7-96d4-a308872d65c1)

   + Hiển thị tối đa 5 danh mục nổi bật do mình chọn
   + Hiển thị các sản phẩm nổi bật, sản phẩm mới, sản phẩm khuyến mãi, sản phẩm gợi ý

**4. **Trang danh mục sản phẩm****

    + Khi click vào chọn danh mục trong phần danh mục sản phẩm hoặc danh mục nổi bật, sẽ hiện ra các sản phẩm tương ứng
   ![image](https://github.com/user-attachments/assets/7a28e901-ca75-4152-92e2-79575befbef1)

    + Có thể chọn cách sắp xếp tương ứng
   ![image](https://github.com/user-attachments/assets/11de8a3a-87d4-41df-b2fe-96a4edbaa3f6)

    -> Bổ sung thêm các tính năng lọc, vd:lọc theo giá......

**5. **Trang danh sách sản phẩm****

    + Khi click vào Sản phẩm, sẽ hiện ra tất cả sản phẩm, cũng có thể chọn cách sắp xếp tương ứng
   ![image](https://github.com/user-attachments/assets/6e59f8c7-0b3d-4786-8f5b-5b9c7f498e69)
**6. **Trang chi tiết sản phẩm****

    + Hiện ra thông tin sản phẩm, nếu còn hàng thì hiện nút thêm vào giỏ hàng, không thì hiện trạng thái hết hàng
   ![image](https://github.com/user-attachments/assets/a99f41ee-85cf-4c84-b71a-fe6584cfcf5e)
   ![image](https://github.com/user-attachments/assets/0ac9fb49-80ae-4cae-ab79-af50776a3e50)

**7. **Trang thông tin cá nhân và chỉnh sửa thông tin cá nhân****

    + Khi click vào Avatar cá nhân
   ![image](https://github.com/user-attachments/assets/521cfd6a-aebe-4cb9-9f6d-fbbe2958769d)
   ![image](https://github.com/user-attachments/assets/7076363e-7dca-427a-9df9-54df7e10b371)

**8. **Trang danh sách bài viết và chi tiết bài viết****

    + Có thể tìm ra bài viết theo danh mục tương ứng (đang copy bài viết của thegioididong)
   ![image](https://github.com/user-attachments/assets/8a8c6dda-77a7-476c-b3fd-2f9b0e2f9fd5)
   ![image](https://github.com/user-attachments/assets/c86c26d2-a572-4335-8333-069508bf420d)

    + Chi tiết bài viết: hiện nội dung đã nhập trong CSDL
   ![image](https://github.com/user-attachments/assets/3f8af4d9-5ab3-4e83-9933-5e8848a78654)

**9. **Trang liên hệ****
  ![image](https://github.com/user-attachments/assets/cad4c466-3075-440a-81f5-f40244527f7f)

**10. **Trang giỏ hàng****
  ![image](https://github.com/user-attachments/assets/d91cd318-f6f9-4619-9dfe-ea5c3a660aaa)

**11. **Trang đặt hàng****
  ![image](https://github.com/user-attachments/assets/da5dd152-a5e6-4769-9149-5986cacda1db)

**12. **Trang đặt hàng thành công****
  ![image](https://github.com/user-attachments/assets/6d9b401d-a922-4230-b0c8-e8fe3f116b93)

**13. **Trang đăng ký****
  ![image](https://github.com/user-attachments/assets/e8eb1960-32c8-4296-a652-6c5a684b550e)

**14. **Trang đăng nhập****
  ![image](https://github.com/user-attachments/assets/275a02fa-8179-4733-a31e-87b1af792850)

**15. **Quên mật khẩu****
  ![image](https://github.com/user-attachments/assets/c203112b-5c4c-45fe-a599-a91c7115ad34)

**16. **Trang xác thực OTP****
  ![image](https://github.com/user-attachments/assets/36c2426d-fb8a-40f9-adec-b6fa3fc3dfd3)

**17. **Trang đổi mật khẩu****
  ![image](https://github.com/user-attachments/assets/2bfb9e7e-86a6-43f2-a7e5-a79d65e52b4b)


**Phần II: Trang Admin**
-> Phải đăng nhập thì mới được sử dụng:
+ Tài khoản quản trị viên: buianh09dung@gmail.com
+ Mật khẩu: 123456

-> Có các trang con của mỗi phần, như chi tiết sản phẩm, sửa sản phẩm,.....: thấy hơi dài nên nghĩ không cần chụp ạ, hihi

**1. Trang tổng quan**
  ![image](https://github.com/user-attachments/assets/6ddc8917-c303-4f7c-8bc7-be4edeb7e17d)

**2. Trang thông tin cá nhân & chỉnh sửa thông tin cá nhân**
  ![image](https://github.com/user-attachments/assets/0f0de189-90b9-4c5f-ad78-b4e4b674de7f)
  ![image](https://github.com/user-attachments/assets/afd410df-08fe-46b0-af61-f2a938b4a4fe)

**3. Trang danh mục sản phẩm**
  ![image](https://github.com/user-attachments/assets/658d3242-9378-46fb-805b-229393a931d8)

**4. Trang danh sách sản phẩm và thùng rác**
  ![image](https://github.com/user-attachments/assets/3f42f241-0a73-4c02-b10b-37ec61428211)
  ![image](https://github.com/user-attachments/assets/2f335f06-4722-4551-b37b-ffe7289310d9)

**5. Trang danh mục bài viết**
  ![image](https://github.com/user-attachments/assets/8c20d6af-8820-4f84-86d5-52ac489e2c2b)

**6. Trang danh sách bài viết và thùng rác**
  ![image](https://github.com/user-attachments/assets/22048825-21fa-4a94-9e03-bc49ce581c0e)
  ![image](https://github.com/user-attachments/assets/9ad19e65-95b2-4504-9f9a-11f1147bbbd6)

**7. Trang quản ly đơn hàng**
  ![image](https://github.com/user-attachments/assets/7b26383f-ecd3-4c88-8fd7-acf63385e8fd)

**8. Trang quản lý tài khoản**
  ![image](https://github.com/user-attachments/assets/1ebe67de-dd20-4f40-87f9-5ffe8e1735e6)

**9. Trang quản lý nhóm quyền**
  ![image](https://github.com/user-attachments/assets/c3f9bbfd-66da-40a7-b122-ecc1e7d5338e)

**10. Trang phân quyền**
  ![image](https://github.com/user-attachments/assets/17ce8f88-27d7-44d4-af63-477032034a78)

**11. Trang cài đặt chung**
  ![image](https://github.com/user-attachments/assets/0768c782-af37-49f8-9b7f-919a85f81d95)


**Các tính năng sẽ làm thêm**
+ Hiển thị các sản phẩm gợi ý
+ Responsive lại giao diện
+ Thể hiện thêm nhiều hình ảnh của sản phẩm, thêm chuyển động cho các ảnh
































